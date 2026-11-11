'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child, SessionResult } from '@/types/models';
import { 
  TrendingUp, 
  Award, 
  Clock, 
  Target, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Bot
} from 'lucide-react';

export default function ProgressPage() {
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [results, setResults] = useState<SessionResult[]>([]);

  useEffect(() => {
    const child = DemoStore.getActiveChild();
    setActiveChild(child);
    setResults(DemoStore.getSessionResults(child?.id));
  }, []);

  if (!activeChild) return null;

  const skillBars = [
    { label: 'النطق ومخارج الحروف', level: activeChild.pronunciation_level, color: 'from-blue-500 to-cyan-500' },
    { label: 'الفهم والاستيعاب اللغوي', level: activeChild.comprehension_level, color: 'from-emerald-500 to-teal-500' },
    { label: 'التواصل والتعبير', level: activeChild.communication_level, color: 'from-indigo-500 to-purple-500' },
    { label: 'الوعي الصوتي والقراءة', level: activeChild.reading_level, color: 'from-amber-500 to-orange-500' },
    { label: 'التفاعل والمشاركة الاجتماعية', level: activeChild.social_level, color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-indigo-600" />
                <span>تقارير وتطور مهارات {activeChild.name}</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                قياس الأداء التفاعلي، معدل الإتقان الصوتي، والتحسن بمرور الوقت
              </p>
            </div>

            <a
              href="/parent/consultation"
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md hover:brightness-105 transition-all self-start sm:self-auto"
            >
              <Bot className="w-4 h-4 text-yellow-300" />
              <span>طلب تحليل AI لتطور الطفل</span>
            </a>
          </div>

          {/* Clinical Disclaimer Notice */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>ملاحظة منهجية مهمة:</strong> تفصل منصة نُطق بين نشاط الطفل التفاعلي في التمارين وبين التقييم السريري الشامل. لا تُعتبر نتائج الجلسات نسب شفاء طبية مستقلة، بل مقاييس لمدى استجابة الطفل للتدريب اللغوي تحت إشراف الأسرة والأخصائي.
            </div>
          </div>

          {/* Skills Breakdown Radiants */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-gray-900">مستويات المهارات اللغوية والسلوكية (من 5)</h3>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                تقييم مستمر
              </span>
            </div>

            <div className="space-y-4">
              {skillBars.map((sk) => {
                const pct = (sk.level / 5) * 100;
                return (
                  <div key={sk.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-800">
                      <span>{sk.label}</span>
                      <span className="text-indigo-600 font-black">{sk.level} من 5 ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`bg-gradient-to-r ${sk.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Historical Session Results Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-lg text-gray-900">سجل الجلسات التفاعلية والنتائج الصوتية</h3>

            {results.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">لم يتم إكمال أي جلسات بعد. ابدأ أول جلسة الآن!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold">
                      <th className="py-3 px-4">اسم الجلسة</th>
                      <th className="py-3 px-4">التاريخ</th>
                      <th className="py-3 px-4">النقاط</th>
                      <th className="py-3 px-4">دقة النطق</th>
                      <th className="py-3 px-4">المهارات المكتسبة</th>
                      <th className="py-3 px-4">ملخص الذكاء الاصطناعي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {results.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50/70">
                        <td className="py-4 px-4 font-extrabold text-gray-900">{r.session_title_ar}</td>
                        <td className="py-4 px-4 text-gray-500">
                          {new Date(r.completed_at).toLocaleDateString('ar-EG')}
                        </td>
                        <td className="py-4 px-4 font-black text-amber-600">+{r.score}</td>
                        <td className="py-4 px-4">
                          <span className="font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                            {r.accuracy_percentage}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{r.skills_practiced.join('، ')}</td>
                        <td className="py-4 px-4 text-gray-500 max-w-xs">{r.ai_summary || 'تفاعل ممتاز.'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
