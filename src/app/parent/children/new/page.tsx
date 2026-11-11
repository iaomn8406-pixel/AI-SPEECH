'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { DemoStore } from '@/lib/demo/demo-store';
import { Sparkles, ArrowRight, Save, UserPlus } from 'lucide-react';

export default function NewChildPage() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🦁');
  const [dateOfBirth, setDateOfBirth] = useState('2021-01-01');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [dialect, setDialect] = useState('اللهجة المصرية');
  const [primaryIssue, setPrimaryIssue] = useState('');
  const [parentNotes, setParentNotes] = useState('');
  const [speechLevel, setSpeechLevel] = useState(2);
  const [pronunciationLevel, setPronunciationLevel] = useState(2);
  const [comprehensionLevel, setComprehensionLevel] = useState(3);
  const [isSaved, setIsSaved] = useState(false);

  const avatars = ['🦁', '🌸', '🐻', '🚀', '🐬', '⭐', '🦊', '🎨'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !primaryIssue.trim()) return;

    DemoStore.addChild({
      parent_id: 'parent-1',
      name: name.trim(),
      avatar,
      date_of_birth: dateOfBirth,
      gender,
      primary_language: 'العربية',
      dialect,
      primary_issue: primaryIssue.trim(),
      additional_issues: [],
      description: `طفل طموح بدأ رحلة التأهيل اللغوي في منصة نُطق. ${primaryIssue}`,
      speech_level: speechLevel,
      comprehension_level: comprehensionLevel,
      communication_level: 2,
      pronunciation_level: pronunciationLevel,
      reading_level: 1,
      writing_level: 1,
      social_level: 3,
      parent_notes: parentNotes,
      is_demo: false,
    });

    setIsSaved(true);
    setTimeout(() => {
      window.location.href = '/parent';
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <UserPlus className="w-8 h-8 text-indigo-600" />
              <span>إضافة ملف طفل جديد</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              ساعدنا على فهم حالة طفلك لتخصيص الخطة وجلسات الذكاء الاصطناعي الأنسب له
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            
            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">اختر الشخصية الرمزية (Avatar):</label>
              <div className="flex flex-wrap gap-2">
                {avatars.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-12 h-12 text-2xl rounded-2xl border-2 flex items-center justify-center transition-transform cursor-pointer ${
                      avatar === av
                        ? 'border-indigo-600 bg-indigo-50 scale-110 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Child Name & DOB */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">اسم الطفل *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: يوسف، مريم..."
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">تاريخ الميلاد *</label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            {/* Gender & Dialect */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">الجنس</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden"
                >
                  <option value="male">ولد 👦</option>
                  <option value="female">بنت 👧</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">اللهجة المفضلة للتدريب</label>
                <select
                  value={dialect}
                  onChange={(e) => setDialect(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:outline-hidden"
                >
                  <option value="اللهجة المصرية">اللهجة المصرية 🇪🇬</option>
                  <option value="العربية الفصحى المبسطة">العربية الفصحى المبسطة 🌍</option>
                  <option value="اللهجة الخليجية">اللهجة الخليجية 🇸🇦</option>
                  <option value="اللهجة الشامية">اللهجة الشامية 🇸🇾</option>
                </select>
              </div>
            </div>

            {/* Primary Issue Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">المشكلة أو التحدي الأساسي للطفل *</label>
              <textarea
                required
                rows={3}
                value={primaryIssue}
                onChange={(e) => setPrimaryIssue(e.target.value)}
                placeholder="مثال: تأخر في الكلام، قلة المفردات، صعوبة في نطق حرف معين (مثل الراء أو السين)، صعوبة في تهجئة الكلمات..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
              />
            </div>

            {/* Initial Self-Evaluation Sliders */}
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4">
              <h4 className="font-extrabold text-xs text-indigo-900">تقييمك الأولي لمهارات الطفل (تقريبي من 1 إلى 5):</h4>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>مستوى النطق ومخارج الحروف:</span>
                    <span className="text-indigo-600">{pronunciationLevel}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={pronunciationLevel}
                    onChange={(e) => setPronunciationLevel(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                    <span>مستوى الفهم والاستيعاب للأوامر:</span>
                    <span className="text-indigo-600">{comprehensionLevel}/5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={comprehensionLevel}
                    onChange={(e) => setComprehensionLevel(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ملاحظات إضافية (اختياري)</label>
              <input
                type="text"
                value={parentNotes}
                onChange={(e) => setParentNotes(e.target.value)}
                placeholder="أي ملاحظات حول اهتمامات الطفل، الأشياء التي يحبها، أو أوقات تركيزه..."
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-hidden text-gray-900"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaved}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-sm rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? 'تم الحفظ بنجاح! جاري التوجيه...' : 'حفظ وإنشاء ملف الطفل'}</span>
              </button>

              <a
                href="/parent/children"
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-xl transition-colors"
              >
                إلغاء
              </a>
            </div>
          </form>
        </main>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
