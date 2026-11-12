'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child, SessionResult, ChildGoal, VideoCategory, EducationalVideo, SpecialistPost } from '@/types/models';
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
  ShieldCheck,
  Copy,
  Check,
  Video,
  Upload,
  Plus,
  Play,
  Printer,
  FileDown,
  MessageSquare,
  Send,
  Eye,
  Heart,
  Tag,
  Share2
} from 'lucide-react';
import Link from 'next/link';

export default function SpecialistDashboardPage() {
  const [activeTab, setActiveTab] = useState<'children' | 'videos' | 'posts'>('children');
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [notesSaved, setNotesSaved] = useState(false);
  const [goals, setGoals] = useState<ChildGoal[]>([]);
  const [results, setResults] = useState<SessionResult[]>([]);
  
  // Promo code copy state
  const specialistPromoCode = 'DR-AML-2026';
  const [copiedCode, setCopiedCode] = useState(false);

  // Videos state
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [videos, setVideos] = useState<EducationalVideo[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoDuration, setNewVideoDuration] = useState('04:15');
  const [newVideoCategory, setNewVideoCategory] = useState('cat-tongue');
  const [newVideoTarget, setNewVideoTarget] = useState('الأطفال من 4 إلى 8 سنوات');

  // Posts state
  const [posts, setPosts] = useState<SpecialistPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState('نصائح_أسرية, لدغة_الراء');
  const [showPrintReport, setShowPrintReport] = useState(false);

  useEffect(() => {
    const list = DemoStore.getChildren();
    setChildren(list);
    if (list.length > 0) {
      setSelectedChild(list[0]);
      setClinicalNotes(list[0].specialist_notes || '');
      setGoals(DemoStore.getGoals(list[0].id));
      setResults(DemoStore.getSessionResults(list[0].id));
    }
    setCategories(DemoStore.getVideoCategories());
    setVideos(DemoStore.getEducationalVideos());
    setPosts(DemoStore.getSpecialistPosts());

    const handleUpdate = () => {
      setVideos(DemoStore.getEducationalVideos());
      setPosts(DemoStore.getSpecialistPosts());
    };
    window.addEventListener('videos-updated', handleUpdate);
    window.addEventListener('posts-updated', handleUpdate);
    return () => {
      window.removeEventListener('videos-updated', handleUpdate);
      window.removeEventListener('posts-updated', handleUpdate);
    };
  }, []);

  const handleSelectChild = (child: Child) => {
    setSelectedChild(child);
    setClinicalNotes(child.specialist_notes || '');
    setGoals(DemoStore.getGoals(child.id));
    setResults(DemoStore.getSessionResults(child.id));
    setNotesSaved(false);
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(specialistPromoCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleSaveNotes = () => {
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideoTitle.trim()) return;

    DemoStore.addEducationalVideo({
      title_ar: newVideoTitle,
      title: newVideoTitle,
      description_ar: newVideoDesc || 'تمرين منزلي موجه بإشراف الأخصائي السريري.',
      description: newVideoDesc || 'تمرين منزلي موجه بإشراف الأخصائي السريري.',
      category_id: newVideoCategory,
      category_name_ar: categories.find(c => c.id === newVideoCategory)?.name_ar || 'تمارين نطق',
      video_url: newVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail_url: '/images/banners/specialist-call.jpg',
      duration: newVideoDuration || '05:00',
      duration_label: newVideoDuration || '05:00',
      specialist_id: 'acc-spec-aml',
      specialist_name: 'د. أمل الشريف',
      specialist_title: 'أخصائي أول تخاطب وتعديل سلوك',
      target_audience: newVideoTarget || 'الأطفال من 4 إلى 8 سنوات',
    });

    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoUrl('');
    setShowUploadModal(false);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const tagsArray = newPostTags.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean);

    DemoStore.addSpecialistPost({
      specialist_id: 'acc-spec-aml',
      specialist_name: 'د. أمل الشريف',
      specialist_avatar: '👩‍⚕️',
      specialist_title: 'أخصائي أول تخاطب وتعديل سلوك',
      content_ar: newPostContent,
      content: newPostContent,
      tag_ar: tagsArray[0] || 'نصائح_سريرية',
      tags: tagsArray,
    });

    setNewPostContent('');
  };

  const handlePrintReport = () => {
    window.print();
  };

  if (!selectedChild) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Specialist Header with Invite Promo Code Card */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>بوابة العيادة والأخصائي السريري المعتمد</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">إدارة الحالات والخطط العلاجية</h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl leading-relaxed">
              متابعة رحلة الأطفال التابعين لعيادتك، رفع وتصنيف فيديوهات التمارين، ونشر التوجيهات السريرية المعتمدة.
            </p>
          </div>

          {/* Specialist Promo Code Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 shadow-lg">
            <div>
              <p className="text-[11px] text-emerald-200 font-bold">رمز دعوة العيادة الخاص بك (Invite Code):</p>
              <p className="font-mono text-xl sm:text-2xl font-black text-yellow-300 tracking-wider">
                {specialistPromoCode}
              </p>
              <p className="text-[10px] text-emerald-100/70 mt-0.5">شاركه مع أولياء الأمور لربط أطفالهم مباشرة بعيادتك</p>
            </div>
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              {copiedCode ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('children')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'children'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>ملفات ومتابعة الأطفال ({children.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>مكتبة الفيديوهات والتمارين ({videos.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>نشر التوجيهات السريرية ({posts.length})</span>
          </button>
        </div>

        {/* TAB 1: Children Tracking & Clinical Management */}
        {activeTab === 'children' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Assigned Children List (Sidebar) */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="font-extrabold text-sm text-gray-700">الأطفال المرتبطين بعيادتك ({children.length})</h3>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                  كود: {specialistPromoCode}
                </span>
              </div>
              
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
                          <span className="text-[10px] text-emerald-600 font-bold mt-0.5 block">
                            نسبة التحسن: 78% • 4 جلسات
                          </span>
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
              
              {/* Child Profile Details Card with Report Button */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between border-b border-gray-100 pb-4 flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-black text-gray-900">{selectedChild.name}</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      اللهجة: {selectedChild.dialect} | تاريخ بدء التأهيل: {new Date(selectedChild.created_at).toLocaleDateString('ar-EG')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPrintReport(true)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-indigo-600" />
                      <span>تقرير التقدم الشامل</span>
                    </button>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      متابعة نشطة
                    </span>
                  </div>
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
                  <p className="font-bold">ملاحظات ولي الأمر المسجلة في الاستمارة الأولى:</p>
                  <p className="text-gray-700 leading-relaxed">{selectedChild.parent_notes || 'لا توجد ملاحظات إضافية.'}</p>
                </div>
              </div>

              {/* Approved Goals & Milestones */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    <span>الأهداف التأهيلية واعتماد الخطط السريرية</span>
                  </h3>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                    معتمد من الطبيب ✓
                  </span>
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
                          معتمد للتدريب ✓
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
        )}

        {/* TAB 2: Educational Videos Library & Upload */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">مكتبة الفيديوهات والتمارين السريرية</h2>
                <p className="text-xs text-gray-500 mt-1">
                  رفع مقاطع فيديو تعليمية للأطفال وأولياء الأمور للتدريب المنزلي مع تصنيفها حسب الحالة.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/videos"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <Eye className="w-4 h-4 text-indigo-600" />
                  <span>معاينة صفحة الفيديوهات العامة</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(true)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>إضافة فيديو جديد</span>
                </button>
              </div>
            </div>

            {/* Video List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => {
                const vidTitle = vid.title || vid.title_ar;
                const vidDesc = vid.description || vid.description_ar;
                const vidDuration = vid.duration || vid.duration_label || '04:15';
                const catObj = categories.find(c => c.id === vid.category_id);
                const catTitle = catObj?.title_ar || catObj?.name_ar || 'تمارين نطق';

                return (
                  <div key={vid.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
                    <div className="relative aspect-video bg-slate-900">
                      <img 
                        src={vid.thumbnail_url || '/images/banners/specialist-call.jpg'} 
                        alt={vidTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 mr-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md">
                        {vidDuration}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          {catTitle}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{vid.views_count}</span>
                          </span>
                          <span className="flex items-center gap-1 text-pink-600">
                            <Heart className="w-3.5 h-3.5 fill-current" />
                            <span>{vid.likes_count}</span>
                          </span>
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm text-gray-900 line-clamp-1">{vidTitle}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{vidDesc}</p>

                      <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                        الفئة المستهدفة: {vid.target_audience || 'الأطفال من 4 إلى 8 سنوات'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Clinical Tips & Social Posts */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-emerald-600" />
                  <span>كتابة نصيحة سريرية جديدة للأهالي</span>
                </h3>
                <p className="text-xs text-gray-500">
                  تظهر هذه النصائح في دليل الأخصائيين المعتمدين لجميع أولياء الأمور الذين يتابعون حسابك.
                </p>

                <form onSubmit={handleCreatePost} className="space-y-3">
                  <textarea
                    rows={4}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="اكتبي نصيحة عملية للأهالي، مثلاً: كيفية تدريب الطفل على تكرار جملة من 3 كلمات في المنزل..."
                    className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 focus:outline-hidden focus:border-emerald-600"
                    required
                  />

                  <div>
                    <label className="text-[11px] font-bold text-gray-600 mb-1 block">الوسوم (مفصولة بفواصل):</label>
                    <input
                      type="text"
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                      placeholder="نصائح_أسرية, لدغة_الراء, طلاقة"
                      className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>نشر النصيحة الآن</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-black text-base text-gray-900">منشوراتك وتوجيهاتك السريرية السابقة ({posts.length})</h3>
              
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1 bg-emerald-50 rounded-xl">{post.specialist_avatar || '👩‍⚕️'}</span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-gray-900">{post.specialist_name}</h4>
                          <span className="text-[11px] text-gray-400">{post.created_at}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full font-bold">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>{post.likes_count} إعجاب</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                      {post.content || post.content_ar}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                      {(post.tags || [post.tag_ar]).filter(Boolean).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          <span>#{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Upload Video Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-base text-gray-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-600" />
                <span>رفع وتصنيف فيديو تدريبي جديد</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">عنوان الفيديو التدريبي:</label>
                <input
                  type="text"
                  required
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="مثال: تمرين تقوية عضلات الفك ونطق الراء"
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">التصنيف الإكلينيكي:</label>
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.title_ar || c.name_ar}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">مدة الفيديو:</label>
                  <input
                    type="text"
                    value={newVideoDuration}
                    onChange={(e) => setNewVideoDuration(e.target.value)}
                    placeholder="04:15"
                    className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">الفئة المستهدفة:</label>
                  <input
                    type="text"
                    value={newVideoTarget}
                    onChange={(e) => setNewVideoTarget(e.target.value)}
                    placeholder="الأطفال من 4 إلى 8 سنوات"
                    className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">رابط الفيديو (YouTube أو Embed أو MP4):</label>
                <input
                  type="url"
                  value={newVideoUrl}
                  onChange={(e) => setNewVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs dir-ltr"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1 block">شرح وإرشادات التدريب لولي الأمر:</label>
                <textarea
                  rows={3}
                  value={newVideoDesc}
                  onChange={(e) => setNewVideoDesc(e.target.value)}
                  placeholder="وضح للأم أو الأب متى وكيف يطبقون التمرين أمام المرآة..."
                  className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  حفظ ونشر الفيديو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clinical Report Preview Modal */}
      {showPrintReport && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                  ⚕️
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900">تقرير المتابعة والتأهيل السريري الشامل</h3>
                  <p className="text-xs text-gray-500">منصة نُطق الذكية بالتعاون مع عيادة التخاطب المعتمدة</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintReport(false)}
                className="text-gray-400 hover:text-gray-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-xs">اسم الطفل:</span>
                  <span className="font-extrabold text-gray-900">{selectedChild.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">الطبيب / الأخصائي المشرف:</span>
                  <span className="font-extrabold text-emerald-800">د. أمل الشريف (كود: {specialistPromoCode})</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">التشخيص الأولي:</span>
                  <span className="font-bold text-gray-800">{selectedChild.primary_issue}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs">نسبة الإتقان العامة:</span>
                  <span className="font-black text-emerald-600">78% (مؤشر تقدم إيجابي)</span>
                </div>
              </div>

              <div>
                <h4 className="font-black text-gray-900 mb-2">الأهداف العلاجية المحققة:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                  <li>إتقان إخراج صوت الراء منفصلاً بنسبة 85%.</li>
                  <li>تركيب جملة ثنائية وثلاثية تعبيرية في المحادثة الذكية.</li>
                  <li>تمييز أصوات الحيوانات والكلمات البصرية.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-black text-gray-900 mb-2">التوصيات السريرية للمنزل:</h4>
                <p className="text-xs text-gray-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                  {clinicalNotes || 'الاستمرار في جلسات المحادثة الصوتية الذكية مرتين أسبوعياً مع مشاهدة تمارين حركة اللسان أمام المرآة لمدة 5 دقائق يومياً.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={handlePrintReport}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة أو حفظ PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
