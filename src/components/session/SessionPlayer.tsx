'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Session, SessionActivity } from '@/types/models';
import { DemoStore } from '@/lib/demo/demo-store';
import { speakArabicText, analyzeChildSpeech } from '@/lib/ai/speech';
import MascotAvatar from '@/components/child/MascotAvatar';
import ActivityRenderer, { SpokenFeedbackState } from './ActivityRenderer';
import CelebrationModal from './CelebrationModal';
import LiveCallSession from './LiveCallSession';
import InteractiveReadingTrainer from '@/components/reading/InteractiveReadingTrainer';
import ApiKeyNoticeModal from '@/components/common/ApiKeyNoticeModal';
import { ArrowRight, RotateCcw, Volume2, Sparkles, X, PhoneCall, BookOpen, Layers, VolumeX, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface SessionPlayerProps {
  session: Session;
}

export default function SessionPlayer({ session }: SessionPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mascotState, setMascotState] = useState<'idle' | 'speaking' | 'listening' | 'celebrating'>('idle');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [correctAttempts, setCorrectAttempts] = useState(0); // Must reach 2 to pass!
  const [feedback, setFeedback] = useState<SpokenFeedbackState | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLiveCall, setShowLiveCall] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'activities' | 'reading'>('activities');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const activeChild = DemoStore.getActiveChild();
  const currentActivity: SessionActivity = session.activities[currentIdx] || session.activities[0];
  const speechCancelRef = useRef<(() => void) | null>(null);
  const recognitionRef = useRef<any>(null);

  // Play audio on activity load
  useEffect(() => {
    setFeedback(null);
    setCorrectAttempts(0);
    setMascotState('idle');

    // Attempt playback if user has already interacted
    if (hasInteracted) {
      playPrompt(currentActivity.instruction_ar);
    }

    return () => {
      if (speechCancelRef.current) speechCancelRef.current();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
      }
    };
  }, [currentIdx, hasInteracted]);

  const unlockAudioAndPlay = () => {
    setHasInteracted(true);
    playPrompt(currentActivity.instruction_ar);
  };

  const playPrompt = (text: string) => {
    if (speechCancelRef.current) speechCancelRef.current();
    setIsSpeaking(true);
    setMascotState('speaking');

    const controller = speakArabicText(text, {
      pitch: 1.25, // Female child-friendly specialist pitch
      rate: 0.88,
      onEnd: () => {
        setIsSpeaking(false);
        setMascotState('idle');
      },
    });
    speechCancelRef.current = controller.cancel;
  };

  // Toggle child microphone listening
  const handleToggleMic = () => {
    setHasInteracted(true);

    // Check if API key is active as requested by user
    if (!DemoStore.hasActiveApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    // If speaking, interrupt (Barge-in!)
    if (speechCancelRef.current) {
      speechCancelRef.current();
      setIsSpeaking(false);
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore
        }
      }
      setIsListening(false);
      setMascotState('idle');
      return;
    }

    // Check browser speech recognition
    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
    };
    const SpeechRec = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRec) {
      setFeedback({
        text: '⚠️ متصفحك لا يدعم التعرف على الصوت المباشر أو المايك غير متوفر. يرجى استخدام متصفح حديث (مثل Chrome أو Edge) وتوصيل المايك.',
        status: 'mic_error',
        isCorrect: false,
      });
      playPrompt('المايكروفون غير متاح في متصفحك يا بطل، يرجى تفعيله للمتابعة.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.lang = 'ar-SA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      setMascotState('listening');

      recognition.onresult = (event: any) => {
        setIsListening(false);
        if (event.results && event.results[0] && event.results[0][0]) {
          const spoken = event.results[0][0].transcript;
          processChildSpeechAttempt(spoken);
        } else {
          handleNoSpeechDetected();
        }
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        setMascotState('idle');
        const errType = event?.error;

        if (errType === 'no-speech') {
          handleNoSpeechDetected();
        } else if (errType === 'not-allowed' || errType === 'permission-denied') {
          setFeedback({
            text: '⚠️ تم رفض إذن المايكروفون. يرجى السماح للمتصفح بالوصول للمايك من شريط العنوان أعلى الشاشة.',
            status: 'mic_error',
            isCorrect: false,
          });
          playPrompt('يرجى السماح بالمايكروفون للمتابعة يا بطل.');
        } else if (errType === 'audio-capture') {
          setFeedback({
            text: '⚠️ لم يتم العثور على مايكروفون موصول بالجهاز. تأكد من توصيل المايك وتحدث بوضوح.',
            status: 'mic_error',
            isCorrect: false,
          });
          playPrompt('المايك غير موصول بجهازك يا بطل، تأكد من توصيله.');
        } else {
          setFeedback({
            text: '⚠️ لم نتمكن من التقاط الصوت. تأكد من أن المايك يعمل وتحدث بصوت مرتفع وواضح.',
            status: 'mic_error',
            isCorrect: false,
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
      setMascotState('idle');
      setFeedback({
        text: '⚠️ حدث خطأ في تشغيل المايكروفون. يرجى التأكد من توصيله والسماح به للمتابعة.',
        status: 'mic_error',
        isCorrect: false,
      });
    }
  };

  const handleNoSpeechDetected = () => {
    setFeedback({
      text: 'لم نسمع صوتك يا بطل! لم يتم التقاط أي صوت.. اضغط على المايك وتحدث بوضوح.',
      status: 'unclear',
      isCorrect: false,
    });
    playPrompt('لم أسمعك يا بطل! افتح المايك وتحدث بصوت واضح.');
  };

  const processChildSpeechAttempt = (spoken: string) => {
    setAttempts(prev => prev + 1);
    const target = currentActivity.expected_speech_target || currentActivity.prompt_content;
    const analysis = analyzeChildSpeech(spoken, target);

    // CLINICAL CRITERIA:
    // 1. If wrong (< 40% similarity)
    if (analysis.isWrong) {
      setCorrectAttempts(0);
      setFeedback({
        text: `نطق غير دقيق (${analysis.similarityScore}%).. الكلمة المستهدفة هي «${target}»، اسمعني كويس وجرب تاني!`,
        status: 'wrong',
        isCorrect: false,
        score: analysis.similarityScore,
      });
      setMascotState('idle');
      // Speak correction
      playPrompt(`نطق غير صحيح يا بطل، اسمع الكلمة جيداً: ${target}، وحاول مرة أخرى.`);
      return;
    }

    // 2. If unclear (40% - 69% similarity)
    if (analysis.isUnclear) {
      setFeedback({
        text: `الصوت مش واضح قوي يا بطل (${analysis.similarityScore}%).. عيد تاني بهدوء وركز في مخرج الحرف!`,
        status: 'unclear',
        isCorrect: false,
        score: analysis.similarityScore,
      });
      setMascotState('idle');
      playPrompt('الصوت غير واضح يا بطل، أعد النطق بهدوء وركز في مخرج الحرف.');
      return;
    }

    // 3. If correct (>= 70% similarity) -> MUST PRONOUNCE IT TWICE!
    if (analysis.isMatch) {
      if (correctAttempts === 0) {
        // First successful repetition (1 of 2)
        setCorrectAttempts(1);
        setFeedback({
          text: `ممتاز يا بطل (${analysis.similarityScore}%)! نطقت صح.. باقي مرة كمان عشان نثبت نطق الحرف (1 من 2) 🌟`,
          status: 'correct',
          isCorrect: true,
          score: analysis.similarityScore,
        });
        setMascotState('celebrating');
        playPrompt(`أحسنت يا بطل! نطقك سليم، هيا كرر الكلمة مرة ثانية لتثبيت الحرف.`);
      } else {
        // Second successful repetition (2 of 2) -> MASTERED!
        setCorrectAttempts(2);
        setScore(prev => prev + 25);
        setMascotState('celebrating');
        setFeedback({
          text: `بطل حقيقي (2 من 2) 🏆! أتقنت نطق «${target}» مرتين بنجاح تام. اضغط على التالي للمتابعة.`,
          status: 'correct',
          isCorrect: true,
          score: analysis.similarityScore,
        });
        playPrompt(`رائع جداً يا بطل! أتقنت النطق مرتين بنجاح، هيا نكمل للنشاط التالي.`);

        // Auto advance after short celebration
        setTimeout(() => {
          handleAdvanceToNext();
        }, 2800);
      }
    }
  };

  const handleOptionAnswer = (isCorrect: boolean) => {
    setHasInteracted(true);
    setAttempts(prev => prev + 1);
    if (isCorrect) {
      setCorrectAttempts(2); // Option choices completed
      setScore(prev => prev + 25);
      setMascotState('celebrating');
      setFeedback({
        text: currentActivity.success_feedback_ar,
        status: 'correct',
        isCorrect: true,
      });
      playPrompt(currentActivity.success_feedback_ar);
      setTimeout(() => {
        handleAdvanceToNext();
      }, 2000);
    } else {
      setCorrectAttempts(0);
      setFeedback({
        text: currentActivity.encouragement_feedback_ar,
        status: 'wrong',
        isCorrect: false,
      });
      playPrompt(currentActivity.encouragement_feedback_ar);
    }
  };

  const handleAdvanceToNext = () => {
    setHasInteracted(true);
    if (currentIdx < session.activities.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleSessionCompleted();
    }
  };

  const handleSessionCompleted = () => {
    setShowCelebration(true);
    setMascotState('celebrating');

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
      ai_summary: `أتم ${activeChild.name} جميع أنشطة الجلسة بتفاعل لغوي ممتاز وحقق شرط التكرار والإتقان مرتين لكل حرف.`,
    });
  };

  const progressPct = Math.round(((currentIdx + 1) / session.activities.length) * 100);

  // If live call mode is triggered
  if (showLiveCall) {
    return (
      <LiveCallSession
        onEndCall={() => setShowLiveCall(false)}
        sessionTopic={session.title_ar}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-white flex flex-col justify-between p-3 sm:p-6 lg:p-8 animate-fade-in">
      
      {/* Top Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-sm border border-indigo-100 gap-3">
        
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          <Link
            href="/sessions"
            className="p-2 text-gray-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1 text-xs font-bold"
            title="خروج من الجلسة"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">إنهاء</span>
          </Link>

          {/* Live Call Button Trigger */}
          <button
            type="button"
            onClick={() => {
              if (!DemoStore.hasActiveApiKey()) {
                setShowApiKeyModal(true);
              } else {
                setShowLiveCall(true);
              }
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>مكالمة مباشرة مع الأخصائية 📞</span>
          </button>
        </div>

        {/* Title & Progress Bar */}
        <div className="flex-1 w-full sm:w-auto sm:mx-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-1">
            <span className="truncate max-w-[180px] sm:max-w-xs">{session.title_ar}</span>
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
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-black shrink-0">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{score} نقطة</span>
        </div>
      </div>

      {/* Browser Autoplay Sound Unlock Notice (Solves PC silence on first load!) */}
      {!hasInteracted && (
        <div className="max-w-4xl w-full mx-auto my-3 p-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl text-white shadow-lg flex items-center justify-between gap-4 animate-bounce-once">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <div>
              <p className="font-black text-sm">مرحباً بك يا بطل! اضغط هنا لبدء الجلسة وسماع صوت الأخصائية 🔊</p>
              <p className="text-xs text-purple-100">لتفعيل الصوت في المتصفح والبدء في نطق الكلمات معاً.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={unlockAudioAndPlay}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            بدء التفاعل وسماع الصوت 🔊
          </button>
        </div>
      )}

      {/* Mode Switcher Tabs (Activities vs Reading Mode) */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-center gap-2 my-2">
        <button
          type="button"
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'activities'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>أنشطة التخاطب والنطق</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reading')}
          className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'reading'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>تدريب القراءة وإضاءة الكلمات 📖</span>
          </span>
        </button>
      </div>

      {/* Center Interactive Stage */}
      <main className="max-w-4xl w-full mx-auto my-auto py-2 flex flex-col items-center">
        {activeTab === 'reading' ? (
          <InteractiveReadingTrainer />
        ) : (
          <>
            {/* Animated Friendly Mascot */}
            <div className="mb-4">
              <MascotAvatar state={mascotState} size="md" />
            </div>

            {/* Core Activity Renderer with Repetition Tracking */}
            <ActivityRenderer
              activity={currentActivity}
              isListening={isListening}
              isSpeaking={isSpeaking}
              correctAttempts={correctAttempts}
              onSpeakPrompt={playPrompt}
              onToggleMic={handleToggleMic}
              onAnswerSelected={handleOptionAnswer}
              spokenFeedback={feedback}
            />
          </>
        )}
      </main>

      {/* Bottom Controls */}
      <footer className="max-w-4xl w-full mx-auto flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              playPrompt(currentActivity.instruction_ar);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 hover:text-indigo-600 border border-gray-200 rounded-xl text-xs sm:text-sm font-bold shadow-2xs cursor-pointer hover:bg-gray-50"
          >
            <Volume2 className="w-4 h-4 text-indigo-500" />
            <span>اسمع بصوت المعلمة 🔊</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Repeat instruction button */}
          <button
            type="button"
            onClick={() => {
              setHasInteracted(true);
              const target = currentActivity.expected_speech_target || currentActivity.prompt_content;
              playPrompt(`اسمع نطق الحرف مرة أخرى يا بطل: ${target}`);
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة نموذج النطق</span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleAdvanceToNext}
            className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-md shadow-indigo-100 cursor-pointer active:scale-95"
          >
            <span>التالي</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
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
          setCorrectAttempts(0);
        }}
      />

      {/* API Key Guard Modal */}
      <ApiKeyNoticeModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        featureName="المحادثة الصوتية وتحليل النطق الفعلي"
      />
    </div>
  );
}
