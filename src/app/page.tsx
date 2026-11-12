'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import MascotAvatar from '@/components/child/MascotAvatar';
import SpeechAudioButton from '@/components/common/SpeechAudioButton';
import { PREBUILT_SPECIALIZATIONS } from '@/lib/demo/prebuilt-curriculum';
import { 
  Sparkles, 
  Bot, 
  Mic, 
  BookOpen, 
  Users, 
  HeartHandshake, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  PlayCircle, 
  ShieldCheck, 
  ChevronDown,
  Volume2,
  PhoneCall,
  Flame,
  Award,
  Sparkle,
  Video,
  Stethoscope,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'هل المنصة بديل كامل عن أخصائي التخاطب؟',
      a: 'المنصة أداة تأهيلية وتدريبية ذكية مكثفة تم تصميمها لتعمل جنباً إلى جنب مع الأسرة، مع توفير بوابة مخصصة للأخصائي لمراجعة واعتماد الخطط ومتابعة التقدم، مع إمكانية التدريب المنزلي المستقل.',
    },
    {
      q: 'كيف يتعامل الذكاء الاصطناعي مع نطق الطفل غير الواضح؟',
      a: 'تعتمد المنصة على محرك تحليل صوتي متقدم يفهم خصوصية نطق الأطفال والتدرج اللغوي، ولا تعطي تقييماً سلبياً أو محبطاً، بل تشجع الطفل بنبرة دافئة وتقدم نماذج نطق صحيحة خطوة بخطوة.',
    },
    {
      q: 'ماذا يحدث إذا لم يفهم الطفل نقطة معينة أثناء المكالمة الصوتية؟',
      a: 'أثناء المكالمة الحية مع الأخصائية الذكية د. سارة، إذا قال الطفل «مش فاهم» أو استصعب كلمة، يفتح الشات تلقائياً وينشئ الذكاء الاصطناعي صورة كرتونية شارحة ومبسطة توضح الكلمة ومخرج الحرف في نفس السياق.',
    },
    {
      q: 'كيف يعمل مدرب القراءة التفاعلي (الكلمات المضيئة)؟',
      a: 'يفتح الطفل المايك ويقرأ القطعة المكتوبة؛ كل كلمة ينطقها الطفل بشكل صحيح تضيء باللون الأخضر، وإذا تعثر تضيء باللون الأحمر مع صوت تشجيعي لطيف يطلب منه الإعادة، مع توفر زر استماع صوتي لكل كلمة وجملة.',
    },
    {
      q: 'هل يمكن للأخصائي أو العيادة ربط مرضاهم بالمنصة؟',
      a: 'نعم! يملك كل أخصائي معتمد رمز دعوة خاص به (Invite Code)؛ يسجله ولي الأمر أثناء إنشاء الحساب ليتم ربطه بملف الطبيب مباشرة، ليتابع رحلة الطفل ويراجع نتائج جلساته ويصدر تقارير تقدم دورية.',
    },
    {
      q: 'هل تدعم المنصة اللهجات العربية؟',
      a: 'نعم! تدعم المنصة العربية الفصحى المبسطة واللهجة المصرية بالإضافة للهجات العربية الشائعة لضمان إحساس الطفل بالألفة والدفء.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* 1. Hero Section with Pixar 3D Visual Banners */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Column */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-right">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border border-indigo-200/60 shadow-xs">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span className="text-xs sm:text-sm font-extrabold text-indigo-900">
                    منصة الذكاء الاصطناعي التفاعلية الأولى لتأهيل نطق الأطفال
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center lg:justify-start gap-3">
                    <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-gray-900 leading-[1.25] tracking-tight">
                      نُساعد طفلك أن يتكلم بثقة، <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        ويكتشف صوته الجميل!
                      </span>
                    </h1>
                    <div className="hidden sm:block">
                      <SpeechAudioButton 
                        text="نساعد طفلك أن يتكلم بثقة، ويكتشف صوته الجميل! منصة الذكاء الاصطناعي لتأهيل الأطفال." 
                        size="md"
                        title="استمع للعنوان بصوت الأخصائية" 
                      />
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                    جلسات تخاطب تفاعلية ذكية، معالجة تأخر الكلام وعسر القراءة، وتنمية مهارات التواصل الاجتماعي عبر شخصيات كرتونية ومحادثة صوتية فورية تفهم طفلك وتشجعه كأخصائي تخاطب حقيقي.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-base rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>ابدأ رحلة طفلك الآن</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/parent/consultation"
                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-indigo-700 border-2 border-indigo-100 font-extrabold text-base rounded-2xl shadow-xs transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Bot className="w-5 h-5 text-indigo-600" />
                    <span>شات الاستشارة الذكي</span>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-indigo-100/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>جلسات تخاطب فورية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>دعم اللهجة المصرية والفصحى</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>إشراف أخصائيين معتمدين</span>
                  </div>
                </div>
              </div>

              {/* 3D Pixar Illustration Banner Column (Responsive Hero Banner) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-8 ring-indigo-50/80 group">
                  
                  {/* Desktop Hero Image */}
                  <img
                    src="/images/banners/hero-desktop.jpg"
                    alt="منصة نطق - تأهيل ذكي للأطفال"
                    className="hidden sm:block w-full h-auto object-cover rounded-2xl group-hover:scale-102 transition-transform duration-700"
                  />

                  {/* Mobile Hero Image */}
                  <img
                    src="/images/banners/hero-mobile.jpg"
                    alt="منصة نطق - تأهيل ذكي للأطفال"
                    className="block sm:hidden w-full h-auto object-cover rounded-2xl"
                  />

                  {/* Floating Overlay Badge on Hero */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-indigo-100 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black text-indigo-950">أخصائي الـ AI متصل ومستعد للمحادثة</span>
                  </div>

                  {/* Bottom interactive card over banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-lg shadow-md shrink-0">
                        🐻
                      </div>
                      <div>
                        <p className="text-xs font-black text-yellow-300">سمسم صديقك الذكي</p>
                        <p className="text-[11px] text-slate-200">صوت أنثوي لطيف يفهم نطق الأطفال</p>
                      </div>
                    </div>
                    <Link
                      href="/sessions/sess-sl-101"
                      className="px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-yellow-300" />
                      <span>اتصل الآن</span>
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 1.5 Professional Feature Showcase Banners with High-Quality 3D Illustrations */}
        <section className="py-12 bg-gradient-to-b from-white via-indigo-50/40 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Banner 1: Live Voice Call with AI Specialist */}
            <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-purple-500/30 border border-purple-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-yellow-300">
                    <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                    <span>ميزة حصرية: مكالمة مباشرة صوتية مع أخصائية التخاطب</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                    تحدث صوتياً مع الأخصائية الذكية د. سارة كأنك في عيادة حقيقية!
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed font-medium">
                    محادثة صوتية ذكية تفهم نطق الطفل بنبرة دافئة. وإذا قال الطفل «مش فاهم» يفتح الشات تلقائياً وينشئ الذكاء الاصطناعي كارت بصري مبسط يوضح الكلمة ومخرج الحرف بالصورة التوضيحية دون مقاطعة الجلسة.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/sessions/sess-sl-101"
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-purple-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-purple-950" />
                      <span>بدء المكالمة الصوتية الحية</span>
                    </Link>
                    <SpeechAudioButton 
                      text="تحدث صوتياً مع أخصائية التخاطب الذكية د. سارة، محادثة صوتية تفاعلية تفهم نطق الطفل وتساعده على الكلام بثقة." 
                      size="md" 
                    />
                  </div>
                </div>

                {/* 3D Specialist Call Banner Image */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-video bg-slate-950">
                    <img 
                      src="/images/banners/specialist-call.jpg"
                      alt="مكالمة أخصائية التخاطب الذكية"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-white">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>د. سارة (صوت أنثوي دافئ للأطفال ومخرج بصري ذكي)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Banner 2: Interactive Reading Highlighter */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-yellow-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>مدرب القراءة التفاعلي بالكلمات المضيئة (Karaoke Style)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black leading-snug">
                    الطفل يقرأ بصوته، والكلمة الصحيحة تنور أخضر والخطأ تنور أحمر!
                  </h3>
                  <p className="text-xs sm:text-sm text-teal-100 leading-relaxed font-medium">
                    يفتح الطفل المايك ويقرأ القطعة كلمة بكلمة؛ الذكاء الاصطناعي يحلل الصوت فورياً، فإذا نطق صح نورت أخضر، وإذا تعثر نورت أحمر ويوجهه الصوت اللطيف: «عيدي تاني يا بطلة» أو «عيد تاني يا بطل»، مع زر سماع صوتي لكل جملة أو زر في المنصة.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/sessions/sess-dys-301"
                      className="px-6 py-3 bg-white hover:bg-teal-50 text-teal-900 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4 text-emerald-600" />
                      <span>تجربة مدرب القراءة المضيء</span>
                    </Link>
                    <SpeechAudioButton 
                      text="مدرب القراءة التفاعلي: اقرأ الكلمات المضيئة، والكلمة الصحيحة تضيء بالأخضر، مع توجيه صوتي لطيف." 
                      size="md" 
                    />
                  </div>
                </div>

                {/* 3D Reading Trainer Banner Image */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 aspect-video bg-slate-950">
                    <img 
                      src="/images/banners/reading-trainer.jpg"
                      alt="مدرب القراءة الذكي بالكلمات المضيئة"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-200">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-slate-950 font-black">صحيح ✔</span>
                        <span className="px-2 py-0.5 rounded-md bg-rose-400 text-white font-black">إعادة ↻</span>
                        <span>تحليل النطق الفوري بالذكاء الاصطناعي</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Gateways: Videos & Specialists Directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Link
                href="/videos"
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-pink-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🎬
                  </div>
                  <div>
                    <h4 className="font-black text-base text-gray-900 group-hover:text-pink-600 transition-colors">
                      مكتبة الفيديوهات والتمارين المصورة
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      تمارين حركة اللسان، علاج لدغات الحروف، والتحفيز اللغوي الموجه للمنزل.
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 group-hover:text-pink-600 transition-all shrink-0" />
              </Link>

              <Link
                href="/specialists"
                className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ⚕️
                  </div>
                  <div>
                    <h4 className="font-black text-base text-gray-900 group-hover:text-emerald-600 transition-colors">
                      دليل الأخصائيين والنصائح السريرية
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      تابع استشاريي التخاطب المعتمدين، احصل على كود الربط، وتابع إرشاداتهم.
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 group-hover:text-emerald-600 transition-all shrink-0" />
              </Link>
            </div>

          </div>
        </section>

        {/* 2. Specializations Grid Section */}
        <section className="py-16 sm:py-24 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 uppercase tracking-wider">
                التخصصات التأهيلية المتكاملة
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2">
                مسارات تدريبية مصممة بأحدث الأساليب التربوية
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-3">
                تغطي المنصة جميع جوانب النطق، القراءة، السلوك، والتواصل مع برامج متدرجة تناسب كل مرحلة عمرية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {PREBUILT_SPECIALIZATIONS.map((spec) => (
                <div
                  key={spec.id}
                  className="bg-slate-50 hover:bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-indigo-200 shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-md shadow-indigo-100 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-7 h-7 text-yellow-200" />
                    </div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-gray-900 mb-2">
                      {spec.title_ar}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {spec.description_ar}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                      {spec.paths_count} مسارات تعليمية
                    </span>
                    <Link
                      href="/sessions"
                      className="text-xs font-black text-gray-800 hover:text-indigo-600 flex items-center gap-1 group-hover:-translate-x-1 transition-transform"
                    >
                      <span>تصفح الجلسات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How It Works Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-indigo-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 uppercase">
                رحلة التعلم السهلة
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2">
                كيف تعمل منصة نُطق؟
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { step: '1', title: 'إنشاء حساب وتسجيل الطفل', desc: 'إدخال العمر، المشكلة اللغوية، واللهجة المفضلة، أو كود الطبيب.' },
                { step: '2', title: 'الاستشارة الذكية', desc: 'حوار استكشافي مع AI لتحليل الاحتياج وصياغة الخطة العلاجية.' },
                { step: '3', title: 'المكالمات والجلسات الحية', desc: 'الطفل يتحدث صوتياً مع الأخصائية الذكية ويتعلم بالصوت والصورة.' },
                { step: '4', title: 'التقارير والمتابعة السريرية', desc: 'تقارير أداء فورية لولي الأمر مع إمكانية مراجعة واعتماد الطبيب.' },
              ].map((item) => (
                <div key={item.step} className="bg-white p-6 rounded-3xl border border-indigo-100 shadow-sm text-center relative">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4 shadow-md shadow-indigo-200">
                    {item.step}
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FAQ Section */}
        <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">الأسئلة الشائعة</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">إجابات واضحة لأكثر الاستفسارات التي تهم أولياء الأمور</p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-right font-extrabold text-sm sm:text-base text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Final CTA Banner */}
        <section className="py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl sm:text-4xl font-black">جاهز لبدء أول جلسة مع طفلك؟</h2>
            <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
              انضم لمئات الأسر والأخصائيين الذين يساعدون أطفالهم يومياً على التحدث بطلاقة واكتساب الثقة بالنفس.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black text-base rounded-2xl shadow-xl hover:bg-yellow-300 hover:text-indigo-950 transition-all hover:scale-105 active:scale-95"
              >
                <span>إنشاء حساب والبدء فوراً</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
