'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import MascotAvatar from '@/components/child/MascotAvatar';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child, SessionResult, ChildGoal, Session } from '@/types/models';
import { PREBUILT_SESSIONS } from '@/lib/demo/prebuilt-curriculum';
import { 
  Sparkles, 
  PlayCircle, 
  TrendingUp, 
  Target, 
  Award, 
  Bot, 
  Clock, 
  Calendar, 
  ArrowLeft,
  ChevronLeft,
  CheckCircle2,
  Plus
} from 'lucide-react';

export default function ParentDashboardPage() {
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [goals, setGoals] = useState<ChildGoal[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const child = DemoStore.getActiveChild();
    setActiveChild(child);
    setResults(DemoStore.getSessionResults(child?.id));
    setGoals(DemoStore.getGoals(child?.id));
    setSessions(DemoStore.getSessions());

    const handleUpdate = () => {
      const c = DemoStore.getActiveChild();
      setActiveChild(c);
      setResults(DemoStore.getSessionResults(c?.id));
      setGoals(DemoStore.getGoals(c?.id));
    };

    window.addEventListener('child-changed', handleUpdate);
    window.addEventListener('session-completed', handleUpdate);
    return () => {
      window.removeEventListener('child-changed', handleUpdate);
      window.removeEventListener('session-completed', handleUpdate);
    };
  }, []);

  if (!activeChild) return null;

  const totalMinutes = results.reduce((acc, r) => acc + Math.round(r.duration_seconds / 60), 0);
  const avgAccuracy = results.length > 0
    ? Math.round(results.reduce((acc, r) => acc + r.accuracy_percentage, 0) / results.length)
    : 90;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 overflow-x-hidden">
          
          {/* Welcome & Child Hero Card */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10 space-y-3 text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-yellow-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>لوحة متابعة البطل</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black">
                أهلاً بك في رحلة تطور {activeChild.name}! 🌟
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 max-w-xl leading-relaxed">
                {activeChild.description}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                <a
                  href="/sessions"
                  className="px-5 py-2.5 bg-white text-indigo-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:bg-yellow-300 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <PlayCircle className="w-4 h-4 text-indigo-600" />
                  <span>بدء جلسة اليوم المقترحة</span>
                </a>
                <a
                  href="/parent/consultation"
                  className="px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5"
                >
                  <Bot className="w-4 h-4 text-yellow-300" />
                  <span>استشارة AI حول {activeChild.name}</span>
                </a>
              </div>
            </div>

            {/* Mascot Avatar in Hero */}
            <div className="shrink-0 relative z-10">
              <MascotAvatar state="idle" size="md" />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">الجلسات المكتملة</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900">{results.length} جلسات</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">وقت التدريب</p>
                <p className="text-xl sm:text-2xl font-black text-gray-900">{totalMinutes} دقيقة</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">متوسط الدقة</p>
                <p className="text-xl sm:text-2xl font-black text-emerald-600">{avgAccuracy}%</p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold">الأهداف النشطة</p>
                <p className="text-xl sm:text-2xl font-black text-amber-600">{goals.length} أهداف</p>
              </div>
            </div>
          </div>

          {/* Recommended Sessions for Child */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-gray-900">الجلسات الموصى بها لـ {activeChild.name}</h2>
                <p className="text-xs text-gray-500">تم اختيارها بناءً على مستواه الحالي وملاحظات الأخصائي</p>
              </div>
              <a href="/sessions" className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                <span>عرض الكل</span>
                <ChevronLeft className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessions.slice(0, 3).map((sess) => (
                <div
                  key={sess.id}
                  className="bg-white rounded-3xl p-5 border border-indigo-100/70 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-extrabold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full">
                        {sess.difficulty === 'beginner' ? 'مبتدئ' : sess.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {sess.duration_minutes} د
                      </span>
                    </div>

                    <h3 className="font-extrabold text-base text-gray-900 mb-2 leading-snug">
                      {sess.title_ar}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      {sess.description_ar}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {sess.target_skills_ar.slice(0, 2).map((sk, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`/sessions/${sess.id}`}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <PlayCircle className="w-4 h-4 text-yellow-300" />
                    <span>بدء الجلسة الآن</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Active Goals & Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Goals Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <span>الأهداف التأهيلية الحالية</span>
                </h3>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                  معتمدة من الأخصائي ✓
                </span>
              </div>

              <div className="space-y-3">
                {goals.map((g) => (
                  <div key={g.id} className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-800">{g.title_ar}</span>
                      <span className="font-black text-indigo-600">{g.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full"
                        style={{ width: `${g.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Completed Sessions Log */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>سجل الجلسات المنجزة حديثاً</span>
                </h3>
                <a href="/parent/progress" className="text-xs font-bold text-indigo-600">
                  عرض كل التقارير
                </a>
              </div>

              <div className="space-y-3">
                {results.slice(0, 3).map((r) => (
                  <div key={r.id} className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{r.session_title_ar}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        المهارات: {r.skills_practiced.slice(0, 2).join('، ')}
                      </p>
                    </div>
                    <div className="text-left shrink-0">
                      <span className="font-black text-sm text-emerald-600">+{r.score} نقطة</span>
                      <p className="text-[10px] text-gray-400 font-bold">{r.accuracy_percentage}% دقة</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
