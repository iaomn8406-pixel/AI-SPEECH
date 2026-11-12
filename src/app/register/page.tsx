'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { Sparkles, Mail, Lock, User, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'specialist'>('parent');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    DemoStore.login(email || 'user@aispeech.com', role);
    setTimeout(() => {
      window.location.href = role === 'parent' ? '/parent' : '/specialist';
    }, 400);
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
            <h1 className="text-2xl font-black text-gray-900">إنشاء حساب جديد</h1>
            <p className="text-xs text-gray-500">انضم لمنصة نُطق وابدأ بتخصيص خطة طفلك فوراً</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  role === 'parent' ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500'
                }`}
              >
                ولي أمر (Parent)
              </button>
              <button
                type="button"
                onClick={() => setRole('specialist')}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  role === 'specialist' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500'
                }`}
              >
                أخصائي (Specialist)
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="أحمد محمود..."
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

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
              <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
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
              <span>{isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والبدء فوراً'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            لديك حساب بالفعل؟{' '}
            <a href="/login" className="font-bold text-indigo-600 hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
