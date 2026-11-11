'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Cpu, 
  Coins, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Settings,
  ArrowLeft
} from 'lucide-react';
import { PREBUILT_SPECIALIZATIONS, PREBUILT_LEARNING_PATHS, PREBUILT_SESSIONS } from '@/lib/demo/prebuilt-curriculum';
import { DEMO_CHILDREN, DEMO_SESSION_RESULTS } from '@/lib/demo/sample-data';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'إجمالي المستخدمين', value: '1,280', icon: Users, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'الأطفال المسجلين', value: `${DEMO_CHILDREN.length + 420}`, icon: Activity, color: 'text-purple-600 bg-purple-50' },
    { title: 'الجلسات المنفذة', value: `${DEMO_SESSION_RESULTS.length + 3150}`, icon: Sparkles, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'إجمالي الجلسات في المنهج', value: `${PREBUILT_SESSIONS.length}`, icon: BookOpen, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-yellow-300 border border-yellow-400/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>لوحة الإدارة المركزية (System Administration)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">إدارة منصة نُطق الذكية</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              إدارة المحتوى التعليمي، نماذج ومفاتيح الذكاء الاصطناعي، ومراقبة مؤشرات الأداء والتكلفة.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/admin/ai-settings"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:brightness-105 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-yellow-300" />
              <span>إعدادات مزودي AI</span>
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.title} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${st.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold">{st.title}</p>
                  <p className="text-xl sm:text-2xl font-black text-gray-900">{st.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Administration Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">إدارة مزودي الذكاء الاصطناعي</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              تكوين مفاتيح Google Gemini و OpenAI و Claude، فحص الاتصال وتعيين موديل لكل وظيفة سريرية.
            </p>
            <a
              href="/admin/ai-settings"
              className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-800"
            >
              <span>فتح الإعدادات</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">إدارة المنهج والجلسات (CMS)</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              استعراض وتعديل التخصصات الخمسة، المسارات، الجلسات، وبنك الأنشطة والتمارين.
            </p>
            <a
              href="/sessions"
              className="inline-flex items-center gap-1.5 text-xs font-black text-purple-600 hover:text-purple-800"
            >
              <span>استعراض المنهج</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">استهلاك التكلفة والـ Tokens</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              مراقبة عدد طلبات API والـ Tokens المستهلكة في الشات والجلسات الصوتية لضبط الميزانية.
            </p>
            <a
              href="/admin/ai-settings"
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-800"
            >
              <span>تفاصيل الاستهلاك</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
