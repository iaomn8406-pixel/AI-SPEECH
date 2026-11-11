'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { PREBUILT_SPECIALIZATIONS, PREBUILT_LEARNING_PATHS } from '@/lib/demo/prebuilt-curriculum';
import { DemoStore } from '@/lib/demo/demo-store';
import { Session, SpecializationSlug } from '@/types/models';
import { 
  Layers, 
  Sparkles, 
  Plus, 
  BookOpen, 
  Clock, 
  PlayCircle, 
  CheckCircle2, 
  Loader2,
  Trash2,
  Bot
} from 'lucide-react';

export default function AdminCurriculumPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<SpecializationSlug>('speech-language');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGenModal, setShowGenModal] = useState(false);

  // Form states for AI generation
  const [genSkill, setGenSkill] = useState('');
  const [genAge, setGenAge] = useState(5);
  const [genTarget, setGenTarget] = useState('');

  useEffect(() => {
    setSessions(DemoStore.getSessions());
  }, []);

  const handleGenerateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/generate-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specializationSlug: selectedSpec,
          targetSkill: genSkill || 'نطق وتسمية الأشياء',
          age: genAge,
          childName: genTarget || 'البطل الصغير',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.session) {
          DemoStore.addGeneratedSession(data.session);
          setSessions(DemoStore.getSessions());
          setShowGenModal(false);
          setGenSkill('');
        }
      }
    } catch {
      // Handled
    } finally {
      setIsGenerating(false);
    }
  };

  const filtered = sessions.filter(s => s.specialization_slug === selectedSpec);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>إدارة المناهج والجلسات (Curriculum CMS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">المحتوى التعليمي ومسارات التدريب</h1>
            <p className="text-xs sm:text-sm text-purple-100/80 mt-1 max-w-xl">
              تصفح التخصصات، إنشاء مسارات وجلسات جديدة يدوياً أو توليدها تلقائياً بالذكاء الاصطناعي.
            </p>
          </div>

          <button
            onClick={() => setShowGenModal(true)}
            className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Bot className="w-4 h-4 text-yellow-300" />
            <span>توليد جلسة جديدة بـ AI</span>
          </button>
        </div>

        {/* Specialization Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {PREBUILT_SPECIALIZATIONS.map((spec) => (
            <button
              key={spec.slug}
              onClick={() => setSelectedSpec(spec.slug)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                selectedSpec === spec.slug
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {spec.title_ar}
            </button>
          ))}
        </div>

        {/* Sessions in current Specialization */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900">
              الجلسات المتاحة في هذا التخصص ({filtered.length})
            </h3>
            <span className="text-xs text-gray-500">جاهزة للاستخدام والتجربة الفورية</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                      {s.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {s.duration_minutes} د
                    </span>
                  </div>

                  <h4 className="font-black text-base text-gray-900 mb-2">{s.title_ar}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">{s.description_ar}</p>

                  <div className="space-y-1 mb-4">
                    <p className="text-[11px] font-bold text-gray-500">الأنشطة المضمنة ({s.activities.length}):</p>
                    <ul className="text-[11px] text-gray-700 space-y-0.5">
                      {s.activities.map((a, i) => (
                        <li key={a.id} className="truncate">
                          • {a.title_ar} ({a.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={`/sessions/${s.id}`}
                  className="w-full py-2.5 bg-gray-100 hover:bg-indigo-600 hover:text-white text-gray-800 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>معاينة وتجربة الجلسة</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* AI Session Generation Modal */}
        {showGenModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-indigo-100 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-black text-lg text-gray-900 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <span>توليد جلسة جديدة بالذكاء الاصطناعي</span>
                </h3>
                <button onClick={() => setShowGenModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">
                  ✕
                </button>
              </div>

              <form onSubmit={handleGenerateSession} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">المهارة المستهدفة في الجلسة</label>
                  <input
                    type="text"
                    required
                    value={genSkill}
                    onChange={(e) => setGenSkill(e.target.value)}
                    placeholder="مثال: نطق حرف الكاف، تمييز الفواكه، جملة من كلمتين..."
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">العمر المستهدف (سنوات)</label>
                    <input
                      type="number"
                      min="2"
                      max="12"
                      value={genAge}
                      onChange={(e) => setGenAge(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">اسم الطفل (اختياري للتخصيص)</label>
                    <input
                      type="text"
                      value={genTarget}
                      onChange={(e) => setGenTarget(e.target.value)}
                      placeholder="البطل..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isGenerating || !genSkill.trim()}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري بناء وصياغة الجلسة...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>توليد وإضافة الجلسة فوراً</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowGenModal(false)}
                    className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
