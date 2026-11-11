'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Volume2, CheckCircle2, RotateCcw, Sparkles, Award } from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { speakArabicText, normalizeArabicText, calculateArabicSimilarity } from '@/lib/ai/speech';
import SpeechAudioButton from '@/components/common/SpeechAudioButton';
import ApiKeyNoticeModal from '@/components/common/ApiKeyNoticeModal';

interface ReadingWord {
  id: number;
  text: string;
  cleanText: string;
  status: 'idle' | 'correct' | 'wrong' | 'current';
}

export default function InteractiveReadingTrainer() {
  const activeChild = DemoStore.getActiveChild();
  const isFemale = activeChild?.gender === 'female';

  // Sample reading passages
  const passages = [
    {
      title: 'رِحْلَةُ عُمَرَ فِي الْحَدِيقَةِ',
      sentence: 'ذَهَبَ عُمَرُ إِلَى حَدِيقَةِ الْأَزْهَارِ لِيَلْعَبَ بِالْكُرَةِ مَعَ أَبِيهِ.',
    },
    {
      title: 'الْفَرَاشَاتُ الْمُلَوَّنَةُ',
      sentence: 'فَرِحَتْ سَارَةُ بِرُؤْيَةِ الْفَرَاشَاتِ الْمُلَوَّنَةِ تَطِيرُ فَوْقَ الشَّجَرِ.',
    },
  ];

  const [currentPassageIdx, setCurrentPassageIdx] = useState(0);
  const [words, setWords] = useState<ReadingWord[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    loadPassage(currentPassageIdx);
  }, [currentPassageIdx]);

  const loadPassage = (idx: number) => {
    const rawSentence = passages[idx].sentence;
    const split = rawSentence.split(' ').map((w, i) => ({
      id: i,
      text: w,
      cleanText: normalizeArabicText(w),
      status: (i === 0 ? 'current' : 'idle') as 'idle' | 'correct' | 'wrong' | 'current',
    }));
    setWords(split);
    setCurrentWordIdx(0);
    setFeedbackMsg('');
  };

  const handleStartReading = () => {
    // Check if API key is active as instructed by user
    if (!DemoStore.hasActiveApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setFeedbackMsg('أنا أستمع إليكِ الآن.. اقرئي الكلمة المحددة بصوت واضح!');

    // Speech Recognition
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
          evaluateSpokenWord(spoken);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        // Fallback
      }
    }

    // If browser does not support Speech Recognition or permission denied
    setIsListening(false);
    setFeedbackMsg('يرجى السماح بالوصول للميكروفون في المتصفح لبدء نطق الكلمة المحددة.');
  };

  const evaluateSpokenWord = (spoken: string) => {
    const targetWord = words[currentWordIdx];
    if (!targetWord) return;

    const similarity = calculateArabicSimilarity(spoken, targetWord.cleanText);
    const isCorrect = similarity >= 70;

    const updated = [...words];

    if (isCorrect) {
      updated[currentWordIdx].status = 'correct';
      const encouragement = isFemale ? 'نطق ممتاز يا بطلة!' : 'نطق ممتاز يا بطل!';
      setFeedbackMsg(encouragement);

      speakArabicText(encouragement, {
        pitch: 1.25,
        rate: 0.9,
      });

      // Advance to next word
      if (currentWordIdx < words.length - 1) {
        updated[currentWordIdx + 1].status = 'current';
        setCurrentWordIdx(prev => prev + 1);
      } else {
        setFeedbackMsg(isFemale ? 'أتممتِ قراءة القطعة كاملة بنجاح باهر! مبارك يا بطلة!' : 'أتممت قراءة القطعة كاملة بنجاح باهر! مبارك يا بطل!');
      }
    } else {
      updated[currentWordIdx].status = 'wrong';
      const retryMsg = isFemale ? 'عيدي تاني يا بطلة، استمعي للكلمة وجربي بهدوء!' : 'عيد تاني يا بطل، استمع للكلمة وجرب بهدوء!';
      setFeedbackMsg(retryMsg);

      speakArabicText(retryMsg, {
        pitch: 1.25,
        rate: 0.85,
      });
    }

    setWords(updated);
  };

  const currentPassage = passages[currentPassageIdx];

  return (
    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-indigo-100 shadow-xl space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              تدريب القراءة الذاتي (Voice Highlighter)
            </span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
              بصوت المعلمة سلمى 🎙️
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
            <span>{currentPassage.title}</span>
            <SpeechAudioButton text={currentPassage.sentence} size="md" title="قراءة القطعة بالكامل" />
          </h3>
        </div>

        {/* Change Passage Selector */}
        <div className="flex items-center gap-2">
          {passages.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPassageIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentPassageIdx === idx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              قطعة {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Reading Passage Interactive Stage */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-50/40 via-purple-50/30 to-pink-50/40 rounded-3xl border border-indigo-100/70 text-center space-y-4">
        <p className="text-xs text-gray-500 font-bold">
          اضغط على المايك واقرأ الكلمات بالترتيب.. ستنور الكلمة الصحيحة بالأخضر والخطأ بالأحمر:
        </p>

        <div className="text-2xl sm:text-4xl font-extrabold leading-loose text-gray-900 flex flex-wrap justify-center items-center py-4">
          {words.map((w, idx) => (
            <span
              key={w.id}
              onClick={() => speakArabicText(w.text, { pitch: 1.25, rate: 0.85 })}
              className={`reading-word ${
                w.status === 'correct' ? 'word-correct' :
                w.status === 'wrong' ? 'word-wrong' :
                w.status === 'current' ? 'word-current' : ''
              }`}
              title="اضغط لسماع الكلمة بصوت المعلمة"
            >
              {w.text}
            </span>
          ))}
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-200 text-sm font-black text-indigo-950 inline-block shadow-xs animate-fade-in">
            {feedbackMsg}
          </div>
        )}
      </div>

      {/* Reading Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleStartReading}
          className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer active:scale-95 ${
            isListening
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white ring-8 ring-emerald-200 animate-pulse'
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white'
          }`}
        >
          <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
          <span>{isListening ? 'أنا أستمع لك الآن... تحدث!' : 'اضغط على المايك وابدأ القراءة'}</span>
        </button>

        <button
          onClick={() => loadPassage(currentPassageIdx)}
          className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>إعادة المحاولة من البداية</span>
        </button>
      </div>

      {/* Api Key Guard Modal */}
      <ApiKeyNoticeModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        featureName="تحليل القراءة الصوتي الفوري"
      />
    </div>
  );
}
