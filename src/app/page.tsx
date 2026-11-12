'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import SpeechAudioButton from '@/components/common/SpeechAudioButton';
import { PREBUILT_SPECIALIZATIONS } from '@/lib/demo/prebuilt-curriculum';
import { 
  Sparkles, 
  Bot, 
  Mic, 
  BookOpen, 
  Users, 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown,
  PhoneCall,
  Award,
  Video,
  Stethoscope
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
        
        {/* 1. Full Hero Cinematic Banner (The 3D Pixar Illustration IS the Banner background with text on top) */}
        <section className="relative px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12">
          <div className="max-w-7xl mx-auto">
            
            {/* The Unified Hero Banner Container */}
            <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-indigo-100 min-h-[560px] sm:min-h-[620px] flex items-center">
              
              {/* Background Image: Desktop (16:9) vs Mobile (4:3) */}
              <div 
                className="hidden sm:block absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
                style={{ backgroundImage: "url('/images/banners/hero-desktop.jpg')" }}
              />
              <div 
                className="block sm:hidden absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/banners/hero-mobile.jpg')" }}
              />

              {/* Gradient Dark Overlay (Ensures crystal clear text contrast while keeping 3D art vibrant) */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/30 sm:to-transparent" />
              <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/85 to-slate-950/40" />

              {/* Hero Content Placed DIRECTLY ON the Banner */}
              <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-2xl text-right space-y-6">
                
                {/* Glowing Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 shadow-lg">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                  <span className="text-xs sm:text-sm font-black">
                    منصة الذكاء الاصطناعي التفاعلية الأولى لتأهيل نطق الأطفال
                  </span>
                </div>

                {/* Main Headline */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight drop-shadow-md">
                      نُساعد طفلك أن يتكلم بثقة، <br />
                      <span className="bg-gradient-to-l from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                        ويكتشف صوته الجميل!
                      </span>
                    </h1>
                    <div className="hidden sm:block shrink-0">
                      <SpeechAudioButton 
                        text="نساعد طفلك أن يتكلم بثقة، ويكتشف صوته الجميل! منصة الذكاء الاصطناعي لتأهيل الأطفال." 
                        size="md"
                        title="استمع للعنوان بصوت الأخصائية" 
                      />
                    </div>
                  </div>

                  <p className="text-sm sm:text-lg text-slate-200 leading-relaxed font-medium drop-shadow-sm max-w-xl">
                    جلسات تخاطب تفاعلية ذكية، معالجة تأخر الكلام وعسر القراءة، وتنمية مهارات التواصل الاجتماعي عبر شخصيات كرتونية ومحادثة صوتية فورية تفهم طفلك وتشجعه كأخصائي تخاطب حقيقي.
                  </p>
                </div>

                {/* Primary Action Buttons directly on banner */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href="/register"
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-pink-500/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2.5"
                  >
                    <span>ابدأ رحلة طفلك الآن</span>
                    <ArrowLeft className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/parent/consultation"
                    className="px-6 py-4 bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 backdrop-blur-md font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all text-center flex items-center justify-center gap-2 hover:border-white/50"
                  >
                    <Bot className="w-5 h-5 text-yellow-300" />
                    <span>شات الاستشارة الذكي</span>
                  </Link>
                </div>

                {/* Trust Indicators directly on banner */}
                <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>جلسات تخاطب فورية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>دعم اللهجة المصرية والفصحى</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>إشراف أخصائيين معتمدين</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 2. Feature Banners (Where the 3D Image IS the entire banner background with text ON it) */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Banner 1: Live Voice Call with AI Specialist (Image IS the banner background) */}
            <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-xl min-h-[420px] sm:min-h-[460px] flex items-center border border-indigo-900/30">
              
              {/* The 3D Image as Full Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
                style={{ backgroundImage: "url('/images/banners/specialist-call.jpg')" }}
              />

              {/* Gradient Dark/Indigo Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-purple-950/85 to-slate-950/30 sm:to-transparent" />
              <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-slate-950/95 via-purple-950/90 to-slate-950/40" />

              {/* Text, Badges, and Buttons Directly ON the Specialist Banner */}
              <div className="relative z-10 p-6 sm:p-12 lg:p-14 max-w-2xl text-right space-y-4 text-white">
                <div className="inline-flex items-center gap-2 bg-purple-500/30 border border-purple-400/40 px-3.5 py-1.5 rounded-full text-xs font-black text-yellow-300 backdrop-blur-md">
                  <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                  <span>ميزة حصرية: مكالمة مباشرة صوتية مع أخصائية التخاطب</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black leading-snug drop-shadow-md">
                  تحدث صوتياً مع الأخصائية الذكية د. سارة كأنك في عيادة حقيقية!
                </h3>

                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-medium drop-shadow-sm max-w-xl">
                  محادثة صوتية ذكية تفهم نطق الطفل بنبرة دافئة. وإذا قال الطفل «مش فاهم» يفتح الشات تلقائياً وينشئ الذكاء الاصطناعي كارت بصري مبسط يوضح الكلمة ومخرج الحرف بالصورة التوضيحية دون مقاطعة الجلسة.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/sessions/sess-sl-101"
                    className="px-7 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:brightness-110 text-purple-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
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

            </div>

            {/* Banner 2: Interactive Reading Highlighter (Image IS the banner background) */}
            <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-xl min-h-[420px] sm:min-h-[460px] flex items-center border border-teal-900/30">
              
              {/* The 3D Image as Full Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
                style={{ backgroundImage: "url('/images/banners/reading-trainer.jpg')" }}
              />

              {/* Gradient Dark/Teal Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-teal-950/85 to-slate-950/30 sm:to-transparent" />
              <div className="block sm:hidden absolute inset-0 bg-gradient-to-t from-slate-950/95 via-teal-950/90 to-slate-950/40" />

              {/* Text, Badges, and Buttons Directly ON the Reading Trainer Banner */}
              <div className="relative z-10 p-6 sm:p-12 lg:p-14 max-w-2xl text-right space-y-4 text-white">
                <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 px-3.5 py-1.5 rounded-full text-xs font-black text-yellow-300 backdrop-blur-md">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>مدرب القراءة التفاعلي بالكلمات المضيئة (Karaoke Style)</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black leading-snug drop-shadow-md">
                  الطفل يقرأ بصوته، والكلمة الصحيحة تنور أخضر والخطأ تنور أحمر!
                </h3>

                <p className="text-xs sm:text-sm text-teal-100 leading-relaxed font-medium drop-shadow-sm max-w-xl">
                  يفتح الطفل المايك ويقرأ القطعة كلمة بكلمة؛ الذكاء الاصطناعي يحلل الصوت فورياً، فإذا نطق صح نورت أخضر، وإذا تعثر نورت أحمر ويوجهه الصوت اللطيف: «عيدي تاني يا بطلة» أو «عيد تاني يا بطل»، مع زر سماع صوتي لكل جملة أو زر في المنصة.
                </p>

                {/* Reading visual indicators */}
                <div className="flex items-center gap-2 text-xs font-bold pt-1">
                  <span className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black shadow-sm">ذَهَبَ ✔</span>
                  <span className="px-3 py-1 rounded-lg bg-rose-500 text-white font-black shadow-sm">عُمَرُ ↻</span>
                  <span className="px-3 py-1 rounded-lg bg-white/20 text-white backdrop-blur-xs">إِلَى...</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/sessions/sess-dys-301"
                    className="px-7 py-3.5 bg-white hover:bg-teal-50 text-teal-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
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

            </div>

            {/* Quick Gateways to Videos & Specialists Directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Link
                href="/videos"
                className="bg-slate-50 hover:bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-pink-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
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
                className="bg-slate-50 hover:bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
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

        {/* 3. Specializations Grid Section */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-gray-200/60">
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
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-indigo-300 shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
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

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
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

        {/* 4. How It Works Section */}
        <section className="py-16 sm:py-24 bg-white">
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
                <div key={item.step} className="bg-slate-50 p-6 rounded-3xl border border-gray-200 shadow-xs text-center relative">
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

        {/* 5. FAQ Section */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-gray-200/60">
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
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-colors shadow-2xs"
                  >
                    <button
                      type="button"
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

        {/* 6. Final CTA Banner */}
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
