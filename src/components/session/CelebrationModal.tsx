'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  score: number;
  accuracy: number;
  sessionTitle: string;
  onNext: () => void;
  onRetry: () => void;
}

export default function CelebrationModal({
  isOpen,
  score,
  accuracy,
  sessionTitle,
  onNext,
  onRetry,
}: CelebrationModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger joyful celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#ec4899', '#f59e0b', '#10b981', '#38bdf8'],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-yellow-300 relative overflow-hidden">
        
        {/* Background glow & confetti stars */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-100 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-100 rounded-full blur-xl pointer-events-none" />

        {/* Big Golden Trophy Icon */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-200 animate-bounce">
          <Trophy className="w-12 h-12 text-amber-950" />
        </div>

        {/* Congratulatory Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          مبارك يا بطل! 🎉
        </h2>
        <p className="text-sm font-medium text-gray-600 mb-6">
          لقد أتممت بنجاح جلسة: <span className="font-bold text-indigo-700">{sessionTitle}</span>
        </p>

        {/* Score & Stars Display */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-4 border border-amber-200/60 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-7 h-7 text-amber-500 fill-amber-400" />
            <Star className="w-9 h-9 text-amber-500 fill-amber-400 -mt-2" />
            <Star className="w-7 h-7 text-amber-500 fill-amber-400" />
          </div>
          <div className="flex items-center justify-around mt-3 pt-3 border-t border-amber-200/50">
            <div>
              <p className="text-xs text-gray-500 font-bold">النقاط المكتسبة</p>
              <p className="text-2xl font-black text-amber-600">+{score}</p>
            </div>
            <div className="h-8 w-px bg-amber-200" />
            <div>
              <p className="text-xs text-gray-500 font-bold">دقة النطق والإجابة</p>
              <p className="text-2xl font-black text-emerald-600">{accuracy}%</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <p className="text-xs sm:text-sm text-indigo-900 bg-indigo-50 p-3 rounded-xl mb-6 font-semibold">
          🌟 فخورون بك جداً! تم حفظ نتائجك ووسامك في لوحة متابعة ولي الأمر.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onNext}
            className="w-full sm:flex-1 py-3.5 px-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <span>استمرار ومتابعة</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onRetry}
            className="w-full sm:w-auto py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة الجلسة</span>
          </button>
        </div>
      </div>
    </div>
  );
}
