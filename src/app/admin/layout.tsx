'use client';

import React, { useState, useEffect } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import { DemoStore } from '@/lib/demo/demo-store';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { SUPER_ADMIN_EMAIL } from '@/lib/demo/sample-data';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSuper, setIsSuper] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      setIsSuper(DemoStore.isSuperAdmin());
    };
    check();
    window.addEventListener('auth-changed', check);
    return () => window.removeEventListener('auth-changed', check);
  }, []);

  return (
    <AuthGuard>
      {isSuper === false ? (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-100 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-red-100 text-red-600 flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-gray-900">
                منطقة إدارية محمية ومحظورة
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                لوحة الإدارة المركزية وإعدادات النظام مخصصة حصرياً لمالك المنصة وإدارتها العليا. لا تملك صلاحية الوصول إلى هذه الصفحة.
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="/login"
                className="w-full py-2.5 bg-indigo-600 text-white font-extrabold text-xs sm:text-sm rounded-xl hover:bg-indigo-700 transition-colors"
              >
                الذهاب لصفحة تسجيل الدخول
              </a>
              <a
                href="/parent"
                className="w-full py-2.5 bg-gray-100 text-gray-700 font-extrabold text-xs sm:text-sm rounded-xl hover:bg-gray-200 transition-colors"
              >
                العودة للوحة ولي الأمر
              </a>
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </AuthGuard>
  );
}
