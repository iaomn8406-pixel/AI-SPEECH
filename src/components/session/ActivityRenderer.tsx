'use client';

import React, { useState } from 'react';
import { SessionActivity } from '@/types/models';
import { Volume2, Mic, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import WaveformVisualizer from './WaveformVisualizer';

interface ActivityRendererProps {
  activity: SessionActivity;
  isListening: boolean;
  isSpeaking: boolean;
  onSpeakPrompt: (text: string) => void;
  onToggleMic: () => void;
  onAnswerSelected: (isCorrect: boolean, feedbackText?: string) => void;
  spokenFeedback?: { text: string; isCorrect: boolean } | null;
}

export default function ActivityRenderer({
  activity,
  isListening,
  isSpeaking,
  onSpeakPrompt,
  onToggleMic,
  onAnswerSelected,
  spokenFeedback,
}: ActivityRendererProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleOptionClick = (optionId: string, isCorrect: boolean) => {
    setSelectedOptionId(optionId);
    onAnswerSelected(isCorrect);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      
      {/* Activity Card */}
      <div className="w-full bg-white rounded-3xl p-5 sm:p-8 shadow-xl border-2 border-indigo-50 flex flex-col items-center text-center relative overflow-hidden">
        
        {/* Activity Category Pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
            {activity.title_ar}
          </span>
          {activity.hint_ar && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-amber-600 hover:text-amber-700 p-1 rounded-full hover:bg-amber-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="إظهار التلميح والمساعدة"
            >
              <HelpCircle className="w-4 h-4" />
              <span>مساعدة</span>
            </button>
          )}
        </div>

        {/* Child-friendly Instruction */}
        <h3 className="text-lg sm:text-2xl font-black text-gray-900 leading-relaxed mb-4">
          {activity.instruction_ar}
        </h3>

        {/* Expandable Educational Hint */}
        {showHint && activity.hint_ar && (
          <div className="w-full bg-amber-50/80 border border-amber-200 text-amber-900 text-xs sm:text-sm p-3 rounded-2xl mb-4 text-right animate-fade-in">
            💡 <strong>تلميح للبطل:</strong> {activity.hint_ar}
          </div>
        )}

        {/* Large Visual Cue & Prompt Target */}
        <div className="my-3 sm:my-5 flex flex-col items-center">
          {activity.visual_cue && (
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 border-4 border-indigo-100 shadow-inner flex items-center justify-center text-6xl sm:text-8xl mb-3 select-none hover:scale-105 transition-transform">
              {activity.visual_cue}
            </div>
          )}

          {/* Spoken Audio Button */}
          <button
            onClick={() => onSpeakPrompt(activity.prompt_content)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            <Volume2 className="w-5 h-5 text-yellow-300" />
            <span>اسمع الكلمة: &quot;{activity.prompt_content}&quot;</span>
          </button>
        </div>

        {/* Render Multiple Choice Options (if present) */}
        {activity.options && activity.options.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            {activity.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-gray-50 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-gray-800';
              if (isSelected) {
                btnStyle = opt.is_correct
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300'
                  : 'bg-rose-50 border-rose-300 text-rose-900';
              }
              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id, opt.is_correct)}
                  className={`p-4 rounded-2xl border-2 text-base sm:text-lg font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${btnStyle}`}
                >
                  <span>{opt.text_ar}</span>
                  {isSelected && opt.is_correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Realtime Microphone Trigger & Waveform */}
        <div className="w-full mt-6 pt-5 border-t border-gray-100 flex flex-col items-center">
          <p className="text-xs text-gray-500 font-bold mb-3">
            {isListening ? 'أنا أستمع إليك الآن.. انطق الكلمة بصوتك الجميل!' : 'اضغط على المايك وتحدث معي:'}
          </p>

          <button
            onClick={onToggleMic}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer active:scale-95 ${
              isListening
                ? 'bg-emerald-500 hover:bg-emerald-600 ring-8 ring-emerald-200 animate-pulse'
                : 'bg-gradient-to-tr from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200'
            }`}
          >
            <Mic className={`w-8 h-8 ${isListening ? 'animate-bounce' : ''}`} />
          </button>

          <div className="mt-3 w-full">
            <WaveformVisualizer isListening={isListening} />
          </div>

          {/* Feedback Display */}
          {spokenFeedback && (
            <div
              className={`w-full mt-4 p-4 rounded-2xl text-center text-sm font-black animate-fade-in flex items-center justify-center gap-2 ${
                spokenFeedback.isCorrect
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {spokenFeedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <span>{spokenFeedback.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
