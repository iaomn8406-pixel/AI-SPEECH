'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import BrandLogo from '@/components/common/BrandLogo';
import { DemoStore } from '@/lib/demo/demo-store';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS } from '@/lib/demo/sample-data';
import { Mail, Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    // 1. Strict validation for Super Admin
    if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
      if (cleanPass !== SUPER_ADMIN_PASS) {
        setIsLoading(false);
        setErrorMessage('بيانات الدخول غير صحيحة، يرجى التأكد من البريد وكلمة المرور.');
        return;
      }
      DemoStore.login(SUPER_ADMIN_EMAIL, 'admin');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 400);
      return;
    }

    // 2. Validation for minimum password length
    if (cleanPass.length < 6) {
      setIsLoading(false);
      setErrorMessage('يجب أن تتكون كلمة المرور من 6 أحرف أو أرقام على الأقل.');
      return;
    }

    // 3. Authenticate regular accounts (Specialist vs Parent)
    const accounts = DemoStore.getRegisteredAccounts();
    const found = accounts.find(a => a.email.toLowerCase() === cleanEmail);

    let targetRole: 'parent' | 'specialist' | 'admin' = 'parent';
    if (found) {
      targetRole = found.role;
    } else if (cleanEmail.includes('dr.') || cleanEmail.includes('spec') || cleanEmail.includes('specialist')) {
      targetRole = 'specialist';
    }

    DemoStore.login(cleanEmail, targetRole);

    setTimeout(() => {
      if (targetRole === 'specialist') {
        window.location.href = '/specialist';
      } else {
        window.location.href = '/parent';
      }
    }, 400);
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
            <p className="text-xs text-gray-500">أدخل بيانات حسابك للمتابعة والوصول إلى سجلات التدريب</p>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

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
                <Link href="/forgot-password" className="text-[11px] font-bold text-indigo-600 hover:underline">
                  نسيت كلمة المرور؟
                </Link>
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
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-sm rounded-xl shadow-md hover:shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'جاري التحقق والدخول...' : 'تسجيل الدخول'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
            ليس لديك حساب بعد؟{' '}
            <Link href="/register" className="font-bold text-indigo-600 hover:underline">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
