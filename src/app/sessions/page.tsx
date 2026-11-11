'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { PREBUILT_SPECIALIZATIONS } from '@/lib/demo/prebuilt-curriculum';
import { Session, SpecializationSlug } from '@/types/models';
import { 
  Sparkles, 
  Search, 
  Clock, 
  PlayCircle, 
  Filter, 
  BookOpen, 
  Layers, 
  Award,
  ArrowLeft
} from 'lucide-react';

export default function SessionsCatalogPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSpec, setSelectedSpec] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSessions(DemoStore.getSessions());
  }, []);

  const filteredSessions = sessions.filter((s) => {
    const matchesSpec = selectedSpec === 'all' || s.specialization_slug === selectedSpec;
    const matchesDiff = selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;
    const matchesSearch =
      s.title_ar.includes(searchQuery) ||
      s.description_ar.includes(searchQuery) ||
      s.target_skills_ar.some(sk => sk.includes(searchQuery));
    return matchesSpec && matchesDiff && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مكتبة المنهج التفاعلي المتكامل</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">جلسات التخاطب والتعلم التفاعلية</h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-xl leading-relaxed">
              اختر الجلسة المناسبة لاحتياج طفلك للبدء في تدريب ممتع بالصوت والصورة والشخصيات الكرتونية التشجيعية.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shrink-0 text-center">
            <p className="text-xs text-indigo-100 font-bold">إجمالي الجلسات الجاهزة</p>
            <p className="text-2xl sm:text-3xl font-black text-yellow-300">{sessions.length}+ جلسات</p>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-gray-400 absolute right-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن جلسة، حرف، أو مهارة (مثل: حرف الراء، حيوانات، حركات قصيرة)..."
                className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 focus:bg-white text-gray-900"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400 shrink-0" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-xs sm:text-sm font-bold text-gray-700 focus:outline-hidden cursor-pointer"
              >
                <option value="all">جميع المستويات</option>
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>
          </div>

          {/* Specialization Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
            <button
              onClick={() => setSelectedSpec('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSpec === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              جميع التخصصات
            </button>

            {PREBUILT_SPECIALIZATIONS.map((spec) => (
              <button
                key={spec.slug}
                onClick={() => setSelectedSpec(spec.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpec === spec.slug
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {spec.title_ar}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((sess) => (
            <div
              key={sess.id}
              className="bg-white rounded-3xl p-6 border-2 border-indigo-50 hover:border-indigo-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-black bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">
                    {sess.target_age_range}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400 font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{sess.duration_minutes} دقيقة</span>
                  </div>
                </div>

                <h3 className="font-black text-lg text-gray-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
                  {sess.title_ar}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {sess.description_ar}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex flex-wrap gap-1.5">
                    {sess.target_skills_ar.map((skill, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-indigo-50/70 text-indigo-700 font-semibold px-2 py-0.5 rounded-md"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] text-gray-500 font-bold">
                    عدد الأنشطة: {sess.activities.length} أنشطة تفاعلية
                  </div>
                </div>
              </div>

              <a
                href={`/sessions/${sess.id}`}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-indigo-100 active:scale-95 transition-all"
              >
                <PlayCircle className="w-4 h-4 text-yellow-300" />
                <span>بدء الجلسة التفاعلية الآن</span>
              </a>
            </div>
          ))}
        </div>

        {filteredSessions.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
            <p className="text-gray-500 font-bold text-sm">لم نجد جلسات تطابق بحثك حالياً.</p>
            <button
              onClick={() => {
                setSelectedSpec('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
