'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { Sparkles, Mail, Lock, ArrowLeft, User, Stethoscope, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    DemoStore.login(email || 'parent@aispeech.com', 'parent');
    setTimeout(() => {
      window.location.href = '/parent';
    }, 400);
  };

  const handleDemoLogin = (role: 'parent' | 'specialist' | 'admin') => {
    DemoStore.login(`${role}@aispeech.com`, role);
    if (role === 'parent') window.location.href = '/parent';
    else if (role === 'specialist') window.location.href = '/specialist';
    else if (role === 'admin') window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">تسجيل الدخول إلى نُطق</h1>
            <p className="text-xs text-gray-500">مرحباً بك مجدداً في منصة تأهيل وتطوير مهارات طفلك</p>
          </div>

          {/* Quick Demo Logins Section */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 space-y-2.5">
            <p className="text-xs font-black text-indigo-900 text-center">
              الدخول السريع بضغطة واحدة (حسابات Demo):
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('parent')}
                className="p-2 bg-white hover:bg-indigo-600 hover:text-white text-indigo-950 rounded-xl text-[11px] font-bold border border-indigo-100 shadow-2xs transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>ولي أمر</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('specialist')}
                className="p-2 bg-white hover:bg-emerald-600 hover:text-white text-emerald-950 rounded-xl text-[11px] font-bold border border-emerald-100 shadow-2xs transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>أخصائي</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-2 bg-white hover:bg-amber-600 hover:text-white text-amber-950 rounded-xl text-[11px] font-bold border border-amber-100 shadow-2xs transition-colors flex flex-col items-center gap-1 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>المدير</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">كلمة المرور</label>
                <a href="/forgot-password" className="text-[11px] font-bold text-indigo-600 hover:underline">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-sm rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'جاري التحقق...' : 'تسجيل الدخول'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            ليس لديك حساب بعد؟{' '}
            <a href="/register" className="font-bold text-indigo-600 hover:underline">
              إنشاء حساب جديد
            </a>
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
