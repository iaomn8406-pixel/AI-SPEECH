'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { SpecialistPost, RegisteredAccount } from '@/types/models';
import { 
  Stethoscope, 
  CheckCircle2, 
  Heart, 
  UserPlus, 
  UserCheck, 
  Copy, 
  Check, 
  Sparkles, 
  Award, 
  Star, 
  MapPin, 
  MessageSquare, 
  Filter, 
  Share2, 
  Tag,
  Clock,
  Video
} from 'lucide-react';
import Link from 'next/link';

export default function SpecialistsPage() {
  const [specialists, setSpecialists] = useState<RegisteredAccount[]>([]);
  const [posts, setPosts] = useState<SpecialistPost[]>([]);
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');

  useEffect(() => {
    const accounts = DemoStore.getRegisteredAccounts();
    const specAccounts = accounts.filter(a => a.role === 'specialist');
    setSpecialists(specAccounts);
    setPosts(DemoStore.getSpecialistPosts());
    setFollowedIds(DemoStore.getFollowedSpecialistIds());

    const handleUpdate = () => {
      setPosts(DemoStore.getSpecialistPosts());
      setFollowedIds(DemoStore.getFollowedSpecialistIds());
    };
    window.addEventListener('follow-changed', handleUpdate);
    window.addEventListener('posts-updated', handleUpdate);
    return () => {
      window.removeEventListener('follow-changed', handleUpdate);
      window.removeEventListener('posts-updated', handleUpdate);
    };
  }, []);

  const handleToggleFollow = (specialistId: string) => {
    DemoStore.toggleFollowSpecialist(specialistId);
    setFollowedIds(DemoStore.getFollowedSpecialistIds());
  };

  const handleCopyCode = (code: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeId(id);
      setTimeout(() => setCopiedCodeId(null), 2000);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes_count: p.likes_count + 1 };
      }
      return p;
    }));
  };

  const filteredPosts = feedFilter === 'following'
    ? posts.filter(p => followedIds.includes(p.specialist_id))
    : posts;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-black">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>دليل ونخبة أخصائيي النطق والتخاطب المعتمدين</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">تابع أطباء طفلك واستفد من نصائحهم السريرية</h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
              تصفح ملفات نخبة أخصائيي التخاطب المرخصين، احصل على كود العيادة للربط المباشر، وتابع إرشاداتهم اليومية للتدريب المنزلي الفعال.
            </p>
          </div>

          <div className="z-10 flex items-center gap-3">
            <Link
              href="/videos"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-yellow-300" />
              <span>فيديوهات الأخصائيين</span>
            </Link>
          </div>

          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Specialists Directory Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" />
              <span>الأطباء والاستشاريون المعتمدون في المنصة</span>
            </h2>
            <span className="text-xs text-gray-500 font-bold">
              {specialists.length} أخصائيين مرخصين
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialists.map((spec) => {
              const isFollowing = followedIds.includes(spec.id);
              const isCopied = copiedCodeId === spec.id;

              return (
                <div 
                  key={spec.id}
                  className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-100 to-teal-50 border border-emerald-200 flex items-center justify-center text-3xl shadow-xs shrink-0">
                        👩‍⚕️
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-black text-base sm:text-lg text-gray-900">{spec.name || spec.full_name}</h3>
                          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>معتمد</span>
                          </span>
                        </div>
                        <p className="text-xs font-bold text-gray-500 mt-0.5">
                          {spec.clinic_name || 'عيادة التخاطب المعتمدة'}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                          <span className="flex items-center gap-1 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>4.9 (120+ تقييم)</span>
                          </span>
                          <span>•</span>
                          <span>{spec.assigned_children_count || 14} طفل متابع</span>
                        </div>
                      </div>
                    </div>

                    {/* Follow Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleFollow(spec.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        isFollowing
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تتابع الآن ✓</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>متابعة</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Clinic Promo Code Box */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-gray-500 font-bold">كود العيادة للربط أثناء التسجيل:</p>
                      <p className="font-mono text-sm font-black text-emerald-800 tracking-wider">
                        {spec.promo_code || 'SPECIALIST'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(spec.promo_code || '', spec.id)}
                      className="px-3.5 py-1.5 bg-white text-gray-700 hover:text-emerald-700 border border-gray-200 rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'تم النسخ' : 'نسخ الكود'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Clinical Advice Feed */}
        <div className="space-y-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                <span>نصائح وتوجيهات الأطباء السريرية</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                إرشادات يومية وتنبيهات علاجية ينشرها الأخصائيون لمساعدة الأهالي على التعامل مع مشكلات التخاطب.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="inline-flex bg-slate-200/70 p-1 rounded-xl text-xs font-bold text-slate-700 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setFeedFilter('all')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  feedFilter === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                جميع النصائح ({posts.length})
              </button>
              <button
                type="button"
                onClick={() => setFeedFilter('following')}
                className={`px-4 py-1.5 rounded-lg transition-all ${
                  feedFilter === 'following' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                المتابعون فقط
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1 bg-emerald-50 rounded-xl">{post.specialist_avatar || '👩‍⚕️'}</span>
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-900">{post.specialist_name}</h4>
                        <p className="text-[11px] text-gray-500">{post.specialist_title}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono">{post.created_at}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                    {post.content || post.content_ar}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {(post.tags || [post.tag_ar]).filter(Boolean).map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />
                        <span>#{tag}</span>
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes_count} مفيد</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="p-12 text-center text-gray-500 space-y-2 bg-white rounded-3xl border border-gray-200">
              <MessageSquare className="w-10 h-10 mx-auto text-gray-300" />
              <p className="font-bold">لا توجد منشورات من الأطباء المتابعين حالياً</p>
              <button
                type="button"
                onClick={() => setFeedFilter('all')}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                عرض جميع النصائح المتاحة
              </button>
            </div>
          )}
        </div>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
