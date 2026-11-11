'use client';

import React, { useState } from 'react';
import { Key, AlertTriangle, ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';

interface ApiKeyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export default function ApiKeyNoticeModal({
  isOpen,
  onClose,
  featureName = 'المحادثة الصوتية المباشرة',
}: ApiKeyNoticeModalProps) {
  const [keyInput, setKeyInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveQuickKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    DemoStore.setCustomApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative text-center space-y-5">
        
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-black text-gray-900">
            مفتاح API غير مربوط حالياً!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            ميزة <strong className="text-indigo-900">({featureName})</strong> تعتمد على معالجة الذكاء الاصطناعي السحابية وتتطلب ربط مفتاح API رسمي (Google Gemini أو OpenAI).
          </p>
        </div>

        {/* Quick API Key Input */}
        <form onSubmit={handleSaveQuickKey} className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-right">
          <label className="block text-xs font-bold text-gray-700">
            الصق مفتاح API الخاص بك هنا للتشغيل الفوري:
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy... أو sk-..."
            className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-mono text-gray-900 focus:outline-hidden focus:border-indigo-600"
          />
          <button
            type="submit"
            disabled={!keyInput.trim()}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
          >
            {savedSuccess ? 'تم حفظ وتفعيل المفتاح بنجاح ✓' : 'حفظ وتفعيل الاتصال'}
          </button>
        </form>

        <div className="pt-2 flex flex-col gap-2">
          <a
            href="/admin/ai-settings"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>فتح لوحة إدارة مفاتيح AI والشرح</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 font-bold"
          >
            إغلاق التنبيه
          </button>
        </div>
      </div>
    </div>
  );
}
