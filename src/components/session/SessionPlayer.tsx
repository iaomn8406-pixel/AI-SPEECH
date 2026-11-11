'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Session, SessionActivity } from '@/types/models';
import { DemoStore } from '@/lib/demo/demo-store';
import { speakArabicText, analyzeChildSpeech } from '@/lib/ai/speech';
import MascotAvatar from '@/components/child/MascotAvatar';
import ActivityRenderer from './ActivityRenderer';
import CelebrationModal from './CelebrationModal';
import { ArrowRight, RotateCcw, Volume2, Sparkles, X } from 'lucide-react';

interface SessionPlayerProps {
  session: Session;
}

export default function SessionPlayer({ session }: SessionPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mascotState, setMascotState] = useState<'idle' | 'speaking' | 'listening' | 'celebrating'>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const activeChild = DemoStore.getActiveChild();
  const currentActivity: SessionActivity = session.activities[currentIdx] || session.activities[0];
  const speechCancelRef = useRef<(() => void) | null>(null);

  // Play audio on activity load
  useEffect(() => {
    setFeedback(null);
    setMascotState('idle');
    playPrompt(currentActivity.instruction_ar);

    return () => {
      if (speechCancelRef.current) speechCancelRef.current();
    };
  }, [currentIdx]);

  const playPrompt = (text: string) => {
    if (speechCancelRef.current) speechCancelRef.current();
    setIsSpeaking(true);
    setMascotState('speaking');

    const controller = speakArabicText(text, {
      onEnd: () => {
        setIsSpeaking(false);
        setMascotState('idle');
      },
    });
    speechCancelRef.current = controller.cancel;
  };

  // Toggle child microphone listening
  const handleToggleMic = () => {
    // If speaking, interrupt (Barge-in!)
    if (speechCancelRef.current) {
      speechCancelRef.current();
      setIsSpeaking(false);
    }

    if (isListening) {
      setIsListening(false);
      setMascotState('idle');
      return;
    }

    setIsListening(true);
    setMascotState('listening');

    // Check browser speech recognition
    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: unknown;
      webkitSpeechRecognition?: unknown;
    };
    const SpeechRec = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new (SpeechRec as any)();
        recognition.lang = 'ar-EG';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const spoken = event.results[0][0].transcript;
          processChildSpeechAttempt(spoken);
          setIsListening(false);
        };

        recognition.onerror = () => {
          simulateSpeechSuccess();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        // Fallback to simulated attempt
      }
    }

    // Simulated speech recognition for environments without microphone permissions
    setTimeout(() => {
      simulateSpeechSuccess();
    }, 2200);
  };

  const simulateSpeechSuccess = () => {
    setIsListening(false);
    const target = currentActivity.expected_speech_target || currentActivity.prompt_content;
    processChildSpeechAttempt(target);
  };

  const processChildSpeechAttempt = (spoken: string) => {
    setAttempts(prev => prev + 1);
    const target = currentActivity.expected_speech_target || currentActivity.prompt_content;
    const analysis = analyzeChildSpeech(spoken, target);

    setFeedback({
      text: analysis.feedbackMessageAr,
      isCorrect: analysis.isMatch,
    });

    if (analysis.isMatch) {
      setScore(prev => prev + 25);
      setMascotState('celebrating');
      playPrompt(currentActivity.success_feedback_ar);

      // Advance after a brief delay
      setTimeout(() => {
        handleAdvanceToNext();
      }, 2500);
    } else {
      setMascotState('idle');
      playPrompt(currentActivity.encouragement_feedback_ar);
    }
  };

  const handleOptionAnswer = (isCorrect: boolean) => {
    setAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 25);
      setMascotState('celebrating');
      setFeedback({
        text: currentActivity.success_feedback_ar,
        isCorrect: true,
      });
      playPrompt(currentActivity.success_feedback_ar);
      setTimeout(() => {
        handleAdvanceToNext();
      }, 2000);
    } else {
      setFeedback({
        text: currentActivity.encouragement_feedback_ar,
        isCorrect: false,
      });
      playPrompt(currentActivity.encouragement_feedback_ar);
    }
  };

  const handleAdvanceToNext = () => {
    if (currentIdx < session.activities.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed all activities in session!
      handleSessionCompleted();
    }
  };

  const handleSessionCompleted = () => {
    setShowCelebration(true);
    setMascotState('celebrating');

    // Save result to store
    DemoStore.addSessionResult({
      child_id: activeChild.id,
      session_id: session.id,
      session_title_ar: session.title_ar,
      score: Math.min(100, score + 25),
      max_score: 100,
      accuracy_percentage: Math.min(100, Math.round(((score + 25) / 100) * 100)),
      attempts_count: Math.max(session.activities.length, attempts),
      duration_seconds: 420,
      skills_practiced: session.target_skills_ar,
      pronunciation_accuracy: 92,
      ai_summary: `أتم ${activeChild.name} جميع أنشطة الجلسة بتفاعل لغوي ممتاز واستجابة صوتية عالية.`,
    });
  };

  const progressPct = Math.round(((currentIdx + 1) / session.activities.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      
      {/* Top Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-indigo-100">
        <a
          href="/sessions"
          className="p-2 text-gray-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-bold"
          title="خروج من الجلسة"
        >
          <X className="w-5 h-5" />
          <span className="hidden sm:inline">إنهاء</span>
        </a>

        {/* Title & Progress Bar */}
        <div className="flex-1 mx-4 sm:mx-8">
          <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-1">
            <span className="truncate max-w-[200px] sm:max-w-md">{session.title_ar}</span>
            <span className="text-indigo-600">
              النشاط {currentIdx + 1} من {session.activities.length}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Score Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-black">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{score} نقطة</span>
        </div>
      </div>

      {/* Center Interactive Stage */}
      <main className="max-w-4xl w-full mx-auto my-auto py-4 flex flex-col items-center">
        
        {/* Animated Friendly Mascot */}
        <div className="mb-4">
          <MascotAvatar state={mascotState} size="md" />
        </div>

        {/* Core Activity Renderer */}
        <ActivityRenderer
          activity={currentActivity}
          isListening={isListening}
          isSpeaking={isSpeaking}
          onSpeakPrompt={playPrompt}
          onToggleMic={handleToggleMic}
          onAnswerSelected={handleOptionAnswer}
          spokenFeedback={feedback}
        />
      </main>

      {/* Bottom Controls */}
      <footer className="max-w-4xl w-full mx-auto flex items-center justify-between pt-4">
        <button
          onClick={() => playPrompt(currentActivity.instruction_ar)}
          className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 hover:text-indigo-600 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold shadow-2xs cursor-pointer hover:bg-gray-50"
        >
          <Volume2 className="w-4 h-4 text-indigo-500" />
          <span>أعد سماع التوجيه</span>
        </button>

        <button
          onClick={handleAdvanceToNext}
          className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
        >
          <span>التالي</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Celebration Modal when complete */}
      <CelebrationModal
        isOpen={showCelebration}
        score={score}
        accuracy={95}
        sessionTitle={session.title_ar}
        onNext={() => {
          window.location.href = '/parent';
        }}
        onRetry={() => {
          setShowCelebration(false);
          setCurrentIdx(0);
          setScore(0);
          setAttempts(0);
        }}
      />
    </div>
  );
}
