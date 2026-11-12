'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { DemoStore } from '@/lib/demo/demo-store';
import { EducationalVideo, VideoCategory } from '@/types/models';
import { 
  Video, 
  Play, 
  Heart, 
  Eye, 
  Clock, 
  Stethoscope, 
  Sparkles, 
  Share2, 
  Filter, 
  CheckCircle2, 
  X,
  Volume2,
  Award
} from 'lucide-react';
import Link from 'next/link';

export default function VideosPage() {
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [videos, setVideos] = useState<EducationalVideo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<EducationalVideo | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCategories(DemoStore.getVideoCategories());
    setVideos(DemoStore.getEducationalVideos());

    const handleUpdate = () => {
      setVideos(DemoStore.getEducationalVideos());
      setCategories(DemoStore.getVideoCategories());
    };
    window.addEventListener('videos-updated', handleUpdate);
    return () => window.removeEventListener('videos-updated', handleUpdate);
  }, []);

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(v => v.category_id === selectedCategory);

  const handleToggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setVideos(prev => prev.map(v => {
      if (v.id === id) {
        return {
          ...v,
          likes_count: likedMap[id] ? v.likes_count - 1 : v.likes_count + 1
        };
      }
      return v;
    }));
  };

  const handleOpenVideo = (vid: EducationalVideo) => {
    setActiveVideo(vid);
    // Increment view count
    setVideos(prev => prev.map(v => v.id === vid.id ? { ...v, views_count: v.views_count + 1 } : v));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Page Hero Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-3 z-10">
            <div className="inline-flex items-center gap-2 bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3.5 py-1.5 rounded-full text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مكتبة التمارين السريرية المصورة للأطفال والأهالي</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">فيديوهات التخاطب والتدريب المنزلي</h1>
            <p className="text-xs sm:text-sm text-purple-200/90 max-w-xl leading-relaxed">
              مقاطع تدريبية تفاعلية مصورة ومصنفة بإشراف أخصائيي النطق والتخاطب المعتمدين، لمساعدة طفلك على التدريب أمام المرآة وتثبيت مخارج الحروف.
            </p>
          </div>

          <div className="z-10 flex items-center gap-3">
            <Link
              href="/specialists"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>دليل الأخصائيين</span>
            </Link>
          </div>

          {/* Background decorative glow */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200'
                : 'bg-white text-gray-700 hover:bg-slate-100 border border-gray-200'
            }`}
          >
            جميع الفيديوهات ({videos.length})
          </button>

          {categories.map((cat) => {
            const count = videos.filter(v => v.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white text-gray-700 hover:bg-slate-100 border border-gray-200'
                }`}
              >
                <span>{cat.icon || '🎬'}</span>
                <span>{cat.title_ar || cat.name_ar}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => {
            const isLiked = likedMap[vid.id];
            const cat = categories.find(c => c.id === vid.category_id);
            const videoTitle = vid.title || vid.title_ar;
            const videoDesc = vid.description || vid.description_ar;
            const videoDuration = vid.duration || vid.duration_label || '04:15';

            return (
              <div
                key={vid.id}
                onClick={() => handleOpenVideo(vid)}
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col group"
              >
                {/* Thumbnail & Badges */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={vid.thumbnail_url || '/images/banners/specialist-call.jpg'}
                    alt={videoTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 mr-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-pink-400" />
                    <span>{videoDuration}</span>
                  </span>

                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-indigo-900 font-extrabold text-[11px] px-3 py-1 rounded-full shadow-xs">
                    {cat?.title_ar || cat?.name_ar || 'تمارين نطق'}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {videoTitle}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {videoDesc}
                    </p>
                  </div>

                  {/* Doctor badge & Views / Likes */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
                        👩‍⚕️
                      </div>
                      <span className="text-xs font-bold text-gray-700">{vid.specialist_name}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{vid.views_count}</span>
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(vid.id, e)}
                        className={`flex items-center gap-1 font-bold transition-all ${
                          isLiked ? 'text-pink-600 scale-110' : 'text-gray-400 hover:text-pink-600'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{vid.likes_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredVideos.length === 0 && (
          <div className="p-16 text-center text-gray-500 space-y-3 bg-white rounded-3xl border border-gray-200">
            <Video className="w-12 h-12 mx-auto text-gray-300" />
            <h3 className="font-black text-gray-700">لا توجد مقاطع فيديو في هذا التصنيف حالياً</h3>
            <p className="text-xs text-gray-400">يقوم الأخصائيون بإضافة تمارين جديدة أسبوعياً.</p>
          </div>
        )}

      </main>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 border border-white/10">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-400 text-xs font-bold">
                  تمرين معتمد
                </span>
                <h3 className="font-black text-sm sm:text-base line-clamp-1">{activeVideo.title || activeVideo.title_ar}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {activeVideo.video_url.includes('youtube') ? (
                <iframe
                  src={activeVideo.video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeVideo.title || activeVideo.title_ar}
                />
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-xl">
                    <Play className="w-10 h-10 mr-1 fill-current" />
                  </div>
                  <p className="text-xs text-slate-400">تشغيل الفيديو التعليمي عالي الدقة</p>
                </div>
              )}
            </div>

            {/* Video Metadata & Clinical Instructions */}
            <div className="p-6 space-y-4 bg-slate-900 text-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm">{activeVideo.specialist_name}</span>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-bold">
                      {activeVideo.specialist_title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    الفئة المستهدفة: {activeVideo.target_audience || 'الأطفال والأهالي'} • المدة: {activeVideo.duration || activeVideo.duration_label || '05:00'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeVideo.views_count} مشاهدة</span>
                  </span>
                  <span className="text-xs text-pink-400 flex items-center gap-1 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{activeVideo.likes_count} إعجاب</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-pink-300">تعليمات التطبيق المنزلي للطفل:</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                  {activeVideo.description || activeVideo.description_ar}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
      <MobileNav />
    </div>
  );
}
