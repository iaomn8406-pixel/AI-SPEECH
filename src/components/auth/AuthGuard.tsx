'use client';

import React, { useState, useEffect } from 'react';
import { DemoStore } from '@/lib/demo/demo-store';
import { Lock, Sparkles, User, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsAuth(DemoStore.isLoggedIn());
    };
    check();

    window.addEventListener('auth-changed', check);
    return () => window.removeEventListener('auth-changed', check);
  }, []);

  // During initial mount
  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated, block access and present login prompt
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50/80 via-white to-purple-50/50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-100 text-center space-y-6 animate-fade-in">
          
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
            <Lock className="w-8 h-8 text-yellow-300" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              تسجيل الدخول مطلوب للمتابعة
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              لحماية خصوصية بيانات الأطفال وسجلات التخاطب والجلسات، يلزم تسجيل الدخول أو إنشاء حساب قبل بدء التدريب.
            </p>
          </div>

          {/* Quick Demo Access Button */}
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-3">
            <p className="text-xs font-black text-indigo-950">هل تود الدخول السريع لتجربة المنصة؟</p>
            <button
              onClick={() => {
                DemoStore.login('parent@demo.com', 'parent');
                setIsAuth(true);
              }}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>دخول فوري بحساب ولي الأمر التجريبي</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-extrabold text-xs sm:text-sm rounded-xl transition-colors text-center"
            >
              صفحة تسجيل الدخول
            </a>
            <a
              href="/register"
              className="flex-1 py-3 border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-extrabold text-xs sm:text-sm rounded-xl transition-colors text-center"
            >
              إنشاء حساب جديد
            </a>
          </div>

          <div className="pt-2 text-center">
            <a href="/" className="text-xs text-gray-400 hover:text-gray-600 font-semibold inline-flex items-center gap-1">
              <span>العودة للرئيسية</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
