'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { Mail, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">استعادة كلمة المرور</h1>
            <p className="text-xs text-gray-500">أدخل بريدك الإلكتروني المسجل لدينا</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors cursor-pointer"
            >
              إرسال رابط الاستعادة
            </button>
          </form>

          {/* Clear Notice about feature disabled per requirement #3 */}
          {showMessage && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>إشعار الأمان المؤقت:</span>
              </div>
              <p>
                وظيفة استعادة كلمة المرور عبر البريد معطلة مؤقتًا في هذه النسخة لأسباب أمنية حتى اكتمال تفعيل التحقق الثنائي عبر OTP وخادم البريد المعتمد.
              </p>
              <p className="font-semibold text-indigo-900">
                يمكنك تسجيل الدخول مباشرة عبر زر الحساب التجريبي أو إنشاء حساب جديد.
              </p>
            </div>
          )}

          <div className="text-center pt-2">
            <a href="/login" className="text-xs font-bold text-indigo-600 hover:underline inline-flex items-center gap-1">
              <span>العودة لصفحة تسجيل الدخول</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
