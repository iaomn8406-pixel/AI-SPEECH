'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child } from '@/types/models';
import { UserCircle2, Plus, CheckCircle2, ChevronLeft, Bot, Calendar, MessageSquare } from 'lucide-react';

export default function ChildrenListPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [activeChildId, setActiveChildId] = useState<string>('');

  useEffect(() => {
    const list = DemoStore.getChildren();
    setChildren(list);
    const active = DemoStore.getActiveChild();
    if (active) setActiveChildId(active.id);

    const handleChildChange = () => {
      setChildren(DemoStore.getChildren());
      const c = DemoStore.getActiveChild();
      if (c) setActiveChildId(c.id);
    };

    window.addEventListener('child-changed', handleChildChange);
    return () => window.removeEventListener('child-changed', handleChildChange);
  }, []);

  const handleSelectChild = (id: string) => {
    DemoStore.setActiveChildId(id);
    setActiveChildId(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                <UserCircle2 className="w-8 h-8 text-indigo-600" />
                <span>ملفات الأطفال المسجلين</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                يمكنك إدارة ومتابعة أكثر من طفل والتنقل بين ملفاتهم وخططهم التأهيلية بسهولة
              </p>
            </div>

            <a
              href="/parent/children/new"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 self-start sm:self-auto transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة طفل جديد</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => {
              const isActive = child.id === activeChildId;
              const birthYear = parseInt(child.date_of_birth.slice(0, 4), 10) || 2021;
              const ageYears = Math.max(1, 2026 - birthYear);

              return (
                <div
                  key={child.id}
                  className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-xs flex flex-col justify-between ${
                    isActive
                      ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-md'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3.5">
                        <span className="text-4xl p-2 bg-indigo-50 rounded-2xl shadow-2xs border border-indigo-100">
                          {child.avatar}
                        </span>
                        <div>
                          <h3 className="font-black text-xl text-gray-900 flex items-center gap-2">
                            <span>{child.name}</span>
                            {isActive && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                                النشط حالياً ✓
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            العمر: {ageYears} سنوات ({child.dialect})
                          </p>
                        </div>
                      </div>

                      {child.is_demo && (
                        <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                          بيانات تجريبية
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <strong className="text-indigo-900">المشكلة الأساسية:</strong> {child.primary_issue}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 rounded-lg border border-gray-100">
                          <span className="text-gray-500">النطق: </span>
                          <span className="font-bold text-gray-900">{child.pronunciation_level}/5</span>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg border border-gray-100">
                          <span className="text-gray-500">الفهم: </span>
                          <span className="font-bold text-gray-900">{child.comprehension_level}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    {!isActive ? (
                      <button
                        onClick={() => handleSelectChild(child.id)}
                        className="flex-1 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        تحديد هذا الملف للتدريب
                      </button>
                    ) : (
                      <a
                        href="/parent"
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl text-center shadow-xs transition-colors"
                      >
                        لوحة متابعة {child.name}
                      </a>
                    )}

                    <a
                      href="/parent/consultation"
                      className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl"
                      title="استشارة الذكاء الاصطناعي حول الطفل"
                    >
                      <Bot className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
