'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child, SessionResult, ChildGoal } from '@/types/models';
import { 
  Stethoscope, 
  CheckCircle, 
  FileText, 
  Clock, 
  User, 
  Award, 
  TrendingUp, 
  Edit3, 
  Save, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function SpecialistDashboardPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [goals, setGoals] = useState<ChildGoal[]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);

  useEffect(() => {
    const list = DemoStore.getChildren();
    setChildren(list);
    if (list.length > 0) {
      setSelectedChild(list[0]);
      setClinicalNotes(list[0].specialist_notes || '');
      setGoals(DemoStore.getGoals(list[0].id));
      setResults(DemoStore.getSessionResults(list[0].id));
    }
  }, []);

  const handleSelectChild = (child: Child) => {
    setSelectedChild(child);
    setClinicalNotes(child.specialist_notes || '');
    setGoals(DemoStore.getGoals(child.id));
    setResults(DemoStore.getSessionResults(child.id));
    setNotesSaved(false);
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  if (!selectedChild) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Specialist Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>بوابة الأخصائي السريري المعتمد</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">متابعة واعتماد الخطط التأهيلية</h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
              مراجعة الخطط المقترحة بواسطة الذكاء الاصطناعي، اعتماد الأهداف العلاجية، وتدوين الملاحظات السريرية.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-2xl border border-white/10 shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
            <div className="text-xs">
              <p className="font-bold text-white">د. أمل الشريف</p>
              <p className="text-emerald-200 text-[11px]">أخصائي أول تخاطب وتعديل سلوك</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Assigned Children List (Sidebar) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-extrabold text-sm text-gray-700 px-1">الأطفال المصرح بمتابعتهم ({children.length})</h3>
            
            <div className="space-y-2">
              {children.map((child) => {
                const isSelected = child.id === selectedChild.id;
                return (
                  <button
                    key={child.id}
                    onClick={() => handleSelectChild(child)}
                    className={`w-full text-right p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-white shadow-md ring-2 ring-emerald-100'
                        : 'border-gray-200 bg-white/70 hover:bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-1 bg-emerald-50 rounded-xl">{child.avatar}</span>
                      <div>
                        <h4 className="font-black text-sm text-gray-900">{child.name}</h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{child.primary_issue}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Child Review & Action Area */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Child Profile Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">{selectedChild.name}</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    اللهجة: {selectedChild.dialect} | تاريخ التسجيل: {new Date(selectedChild.created_at).toLocaleDateString('ar-EG')}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  حالة نشطة
                </span>
              </div>

              {/* Skill Levels Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-bold">النطق</p>
                  <p className="text-lg font-black text-indigo-600">{selectedChild.pronunciation_level}/5</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-bold">الاستيعاب</p>
                  <p className="text-lg font-black text-emerald-600">{selectedChild.comprehension_level}/5</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-bold">القراءة</p>
                  <p className="text-lg font-black text-amber-600">{selectedChild.reading_level}/5</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-gray-100">
                  <p className="text-[11px] text-gray-500 font-bold">التواصل الاجتماعي</p>
                  <p className="text-lg font-black text-purple-600">{selectedChild.social_level}/5</p>
                </div>
              </div>

              {/* Parent Observations */}
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs text-indigo-950 space-y-1">
                <p className="font-bold">ملاحظات ولي الأمر المسجلة:</p>
                <p className="text-gray-700 leading-relaxed">{selectedChild.parent_notes || 'لا توجد ملاحظات إضافية.'}</p>
              </div>
            </div>

            {/* Approved Goals & Milestones */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>الأهداف التأهيلية واعتماد الخطط</span>
                </h3>
                <span className="text-xs text-gray-500 font-bold">قابلة للتعديل والاعتماد</span>
              </div>

              <div className="space-y-2.5">
                {goals.map((g) => (
                  <div key={g.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-900">{g.title_ar}</p>
                      <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                        {g.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        معتمد ✓
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Notes Input */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <span>تدوين التقرير والملاحظات السريرية للأخصائي</span>
              </h3>

              <textarea
                rows={4}
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="أدخل توجيهاتك المهنية لولي الأمر وخطة الجلسات القادمة..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-emerald-600"
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveNotes}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ الملاحظات في ملف الطفل</span>
                </button>
                {notesSaved && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>تم الحفظ بنجاح</span>
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
