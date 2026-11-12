'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import BrandLogo from '@/components/common/BrandLogo';
import { DemoStore } from '@/lib/demo/demo-store';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS } from '@/lib/demo/sample-data';
import { Sparkles, Mail, Lock, ArrowLeft, User, Stethoscope, ShieldAlert, CheckCircle2, Crown } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Check if logging in as Super Admin
    const isSuper = email.trim().toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
    const targetRole = isSuper ? 'admin' : (email.includes('dr.') || email.includes('spec') ? 'specialist' : 'parent');

    DemoStore.login(email.trim() || 'parent@aispeech.com', targetRole);
    setTimeout(() => {
      if (isSuper || targetRole === 'admin') window.location.href = '/admin';
      else if (targetRole === 'specialist') window.location.href = '/specialist';
      else window.location.href = '/parent';
    }, 400);
  };

  const handleSuperAdminLogin = () => {
    DemoStore.login(SUPER_ADMIN_EMAIL, 'admin');
    window.location.href = '/admin';
  };

  const handleDemoLogin = (role: 'parent' | 'specialist') => {
    const demoEmail = role === 'specialist' ? 'dr.amal@example.com' : 'parent.ahmed@example.com';
    DemoStore.login(demoEmail, role);
    if (role === 'parent') window.location.href = '/parent';
    else if (role === 'specialist') window.location.href = '/specialist';
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <BrandLogo size="md" showSlogan={false} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">تسجيل الدخول إلى نُطق</h1>
            <p className="text-xs text-gray-500">مرحباً بك مجدداً في منصة تأهيل وتطوير مهارات طفلك</p>
          </div>

          {/* Super Admin Quick Access Banner */}
          <div className="p-3.5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl border-2 border-amber-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>حساب مالك المنصة والمدير العام:</span>
              </span>
              <span className="text-[10px] font-mono bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Super Admin
              </span>
            </div>
            <p className="text-[11px] text-gray-600">
              البريد: <strong className="text-indigo-900 font-mono">{SUPER_ADMIN_EMAIL}</strong>
            </p>
            <button
              type="button"
              onClick={handleSuperAdminLogin}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>دخول فوري بحساب المدير العام (Omnia)</span>
            </button>
          </div>

          {/* Quick Demo Logins Section */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
            <p className="text-xs font-bold text-gray-600 text-center">
              أو الدخول التجريبي السريع:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('parent')}
                className="p-2.5 bg-white hover:bg-indigo-50 text-indigo-950 rounded-xl text-xs font-bold border border-indigo-100 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="w-4 h-4 text-indigo-600" />
                <span>حساب ولي أمر</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('specialist')}
                className="p-2.5 bg-white hover:bg-emerald-50 text-emerald-950 rounded-xl text-xs font-bold border border-emerald-100 shadow-2xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>حساب أخصائي</span>
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
                  placeholder="name@example.com"
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
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-sm rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</span>
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
