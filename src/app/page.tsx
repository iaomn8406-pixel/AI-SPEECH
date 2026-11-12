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
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown,
  PhoneCall,
  Video,
  Stethoscope,
  Volume2
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

      <main className="flex-1 space-y-10 sm:space-y-16">
        
        {/* 1. HERO BANNER SECTION (Full Width - Zero Gap - Clean 2-Line Desktop Headline) */}
        <section className="px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
          <div className="max-w-7xl mx-auto">
            
            {/* DESKTOP HERO BANNER (100% Container Width - 2 Clean Unwrapped Lines) */}
            <div className="hidden sm:block relative w-full h-[460px] lg:h-[500px] rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-2xl border border-indigo-100/40 bg-slate-950">
              {/* Full Background Illustration */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-102"
                style={{ backgroundImage: "url('/images/banners/hero-desktop.jpg')" }}
              />

              {/* Seamless Full-width Right-to-Left Gradient */}
              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/40 to-transparent w-full" />

              {/* Desktop Hero Content - Wide Enough for 2 Clean Unbroken Lines */}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-14 max-w-2xl text-right space-y-4">
                
                {/* Sleek Compact Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 shadow-md self-start text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                  <span>منصة التخاطب الذكية الأولى للأطفال</span>
                </div>

                {/* Main Headline - Guaranteed 2 Clean Lines, Never Broken Word-by-Word */}
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl xl:text-[34px] font-black text-white leading-snug drop-shadow-md">
                    <span className="block whitespace-nowrap">نُساعد طفلك أن يتكلم بثقة،</span>
                    <span className="block whitespace-nowrap bg-gradient-to-l from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-transparent mt-1">
                      ويكتشف صوته الجميل! ✨
                    </span>
                  </h1>
                  <SpeechAudioButton 
                    text="نساعد طفلك أن يتكلم بثقة، ويكتشف صوته الجميل!" 
                    size="sm"
                    title="استمع للعنوان بصوت الأخصائية" 
                  />
                </div>

                {/* Short Punchy Description */}
                <p className="text-xs lg:text-sm text-purple-100/90 leading-relaxed font-medium drop-shadow-xs max-w-md">
                  جلسات تخاطب ذكية ومحادثة صوتية فورية تفهم طفلك وتشجعه كأخصائي حقيقي، لعلاج تأخر الكلام وعسر القراءة.
                </p>

                {/* Sleek Action Buttons Side by Side */}
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs lg:text-sm rounded-xl shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>ابدأ رحلة طفلك الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/parent/consultation"
                    className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-bold text-xs lg:text-sm rounded-xl transition-all flex items-center gap-2 hover:border-white/50"
                  >
                    <Bot className="w-4 h-4 text-yellow-300" />
                    <span>شات الاستشارة الذكي</span>
                  </Link>
                </div>

              </div>
            </div>

            {/* MOBILE HERO BANNER (True Mobile 5:6 Proportions - Zero Cropped Characters - Text Centered) */}
            <div className="block sm:hidden relative w-full aspect-[5/6] rounded-3xl overflow-hidden shadow-2xl border border-indigo-900/40 bg-slate-950">
              
              {/* Full Mobile Illustration - True Proportions, Zero Cut Characters */}
              <img
                src="/images/banners/hero-mobile.jpg"
                alt="منصة نطق لتأهيل الأطفال"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
              
              {/* Balanced Full-Card Vignette for Crisp Centered Text */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/55 to-slate-950/30" />
              
              {/* Centered Content Inside Banner */}
              <div className="relative z-10 p-5 h-full flex flex-col justify-center items-center text-center text-white space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-yellow-300 text-[10px] font-black shadow-md">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>منصة التخاطب الذكية الأولى للأطفال</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-xl font-black text-white leading-snug drop-shadow-md">
                    نُساعد طفلك أن يتكلم بثقة، <br />
                    <span className="bg-gradient-to-l from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                      ويكتشف صوته الجميل ✨
                    </span>
                  </h1>
                  <SpeechAudioButton 
                    text="نساعد طفلك أن يتكلم بثقة، ويكتشف صوته الجميل!" 
                    size="sm" 
                  />
                </div>

                <p className="text-xs text-slate-100 leading-relaxed font-medium max-w-xs drop-shadow-sm">
                  جلسات تخاطب تفاعلية ومحادثة صوتية فورية تفهم طفلك وتشجعه كأخصائي حقيقي.
                </p>

                {/* Mobile Action Buttons */}
                <div className="flex items-center gap-2 w-full max-w-xs pt-1">
                  <Link
                    href="/register"
                    className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-xs rounded-xl shadow-lg text-center flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <span>ابدأ الآن</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/parent/consultation"
                    className="px-4 py-2.5 bg-slate-900/75 hover:bg-slate-900/90 text-white border border-white/30 font-bold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 backdrop-blur-md"
                  >
                    <Bot className="w-3.5 h-3.5 text-yellow-300" />
                    <span>استشر AI</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Dedicated Trust Indicators Bar */}
            <div className="mt-4 p-3.5 sm:p-4 bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs flex flex-wrap items-center justify-around gap-3 text-xs sm:text-sm font-bold text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>جلسات تخاطب فورية تفاعلية</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>دعم اللهجة المصرية والفصحى</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>إشراف ومتابعة أخصائيين معتمدين</span>
              </div>
            </div>

          </div>
        </section>

        {/* 2. FEATURE BANNERS (100% Full-Bleed on Desktop - True Mobile Proportions & Centered Text) */}
        <section className="px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* BANNER 1: Live Voice Call with AI Specialist (New Full-Bleed Room + Holographic Flashcards) */}
            <div className="w-full bg-slate-950 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-indigo-900/30">
              
              {/* DESKTOP LAYOUT (100% Full-Bleed - Zero Black Edges - Therapist & Boy on Left, Text on Right) */}
              <div className="hidden sm:block relative w-full h-[420px] lg:h-[460px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-102"
                  style={{ backgroundImage: "url('/images/banners/specialist-call-desktop.jpg')" }}
                />
                {/* Seamless Full-width Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/50 to-transparent w-full" />

                <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 max-w-xl text-right space-y-3.5 text-white">
                  <div className="inline-flex items-center gap-2 bg-purple-500/30 border border-purple-400/40 px-3 py-1 rounded-full text-xs font-black text-yellow-300 backdrop-blur-md self-start">
                    <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                    <span>مكالمة مباشرة مع أخصائية التخاطب الذكية د. سارة</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black leading-snug drop-shadow-md">
                    تحدث صوتياً مع الأخصائية الذكية كأنك في عيادة حقيقية!
                  </h3>

                  <p className="text-xs lg:text-sm text-purple-100 leading-relaxed font-medium max-w-md">
                    محادثة صوتية تفهم نطق الطفل، وإذا قال الطفل «مش فاهم» يفتح الشات تلقائياً وينشئ كارت بصري مبسط يوضح الكلمة ومخرج الحرف دون مقاطعة الجلسة.
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="/sessions/sess-sl-101"
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:brightness-110 text-purple-950 font-black text-xs lg:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 text-purple-950" />
                      <span>بدء المكالمة الصوتية الحية</span>
                    </Link>
                    <SpeechAudioButton 
                      text="تحدث صوتياً مع أخصائية التخاطب الذكية د. سارة، محادثة صوتية تفهم نطق طفلك وتشجعه." 
                      size="sm" 
                    />
                  </div>
                </div>
              </div>

              {/* MOBILE LAYOUT (1:1 True Mobile Aspect - Zero Cut Heads - Text Centered) */}
              <div className="block sm:hidden relative w-full aspect-square rounded-3xl overflow-hidden shadow-xl border border-indigo-900/40 bg-slate-950">
                <img
                  src="/images/banners/specialist-call-mobile.jpg"
                  alt="مكالمة أخصائية التخاطب"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-slate-950/60" />

                <div className="relative z-10 p-5 h-full flex flex-col justify-center items-center text-center space-y-3 text-white">
                  <span className="bg-purple-900/85 backdrop-blur-md text-yellow-300 text-[10px] font-black px-3 py-1 rounded-full border border-purple-400/40">
                    مكالمة صوتية حية د. سارة
                  </span>

                  <h3 className="text-lg font-black leading-snug drop-shadow-md max-w-xs">
                    تحدث صوتياً مع الأخصائية كأنك في عيادة حقيقية
                  </h3>
                  <p className="text-xs text-purple-100 leading-relaxed font-medium max-w-xs drop-shadow-sm">
                    محادثة صوتية ذكية تفهم نطق طفلك وتشجعه، وتنشئ كروت صور شارحة فورياً.
                  </p>
                  <Link
                    href="/sessions/sess-sl-101"
                    className="w-full max-w-xs py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 font-black text-xs rounded-xl shadow-lg text-center flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-4 h-4 text-purple-950" />
                    <span>بدء المكالمة الحية الآن</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* BANNER 2: Interactive Reading Highlighter (Boy Reading Glowing Book with Owl Mascot) */}
            <div className="w-full bg-slate-950 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-teal-900/30">
              
              {/* DESKTOP LAYOUT (100% Width - Zero Black Edges) */}
              <div className="hidden sm:block relative w-full h-[420px] lg:h-[460px]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-102"
                  style={{ backgroundImage: "url('/images/banners/reading-trainer-desktop.jpg')" }}
                />
                {/* Seamless Full-width Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/45 to-transparent w-full" />

                <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 max-w-xl text-right space-y-3.5 text-white">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/30 border border-emerald-400/40 px-3 py-1 rounded-full text-xs font-black text-yellow-300 backdrop-blur-md self-start">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>مدرب القراءة التفاعلي بالكلمات المضيئة (Karaoke Style)</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black leading-snug drop-shadow-md">
                    الطفل يقرأ بصوته، والكلمة الصحيحة تنور أخضر والخطأ تنور أحمر!
                  </h3>

                  <p className="text-xs lg:text-sm text-teal-100 leading-relaxed font-medium max-w-md">
                    يفتح الطفل المايك ويقرأ؛ الذكاء الاصطناعي يحلل الصوت فورياً، وإذا تعثر يرشده الصوت اللطيف للإعادة مع توفر زر سماع صوتي لكل جملة.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold pt-1">
                    <span className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black shadow-sm">ذَهَبَ ✔</span>
                    <span className="px-3 py-1 rounded-lg bg-rose-500 text-white font-black shadow-sm">عُمَرُ ↻</span>
                    <span className="px-3 py-1 rounded-lg bg-white/20 text-white backdrop-blur-xs">إِلَى...</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="/sessions/sess-dys-301"
                      className="px-6 py-3 bg-white hover:bg-teal-50 text-teal-950 font-black text-xs lg:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
                    >
                      <Mic className="w-4 h-4 text-emerald-600" />
                      <span>تجربة مدرب القراءة المضيء</span>
                    </Link>
                    <SpeechAudioButton 
                      text="مدرب القراءة التفاعلي: اقرأ الكلمات المضيئة، والكلمة الصحيحة تضيء بالأخضر." 
                      size="sm" 
                    />
                  </div>
                </div>
              </div>

              {/* MOBILE LAYOUT (14:15 True Mobile Aspect - Full Scene - Text Centered) */}
              <div className="block sm:hidden relative w-full aspect-[14/15] rounded-3xl overflow-hidden shadow-xl border border-teal-900/40 bg-slate-950">
                <img
                  src="/images/banners/reading-trainer-mobile.jpg"
                  alt="مدرب القراءة الذكي"
                  className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-slate-950/60" />

                <div className="p-5 h-full flex flex-col justify-center items-center text-center space-y-3 text-white relative z-10">
                  <span className="bg-teal-900/85 backdrop-blur-md text-emerald-300 text-[10px] font-black px-3 py-1 rounded-full border border-teal-400/40">
                    كلمات مضيئة تفاعلية
                  </span>

                  <h3 className="text-lg font-black leading-snug drop-shadow-md max-w-xs">
                    الطفل يقرأ بصوته، والكلمة تضيء بالأخضر والخطأ بالأحمر!
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-[11px] font-bold">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-400 text-slate-950 font-black">ذَهَبَ ✔</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-500 text-white font-black">عُمَرُ ↻</span>
                  </div>
                  <Link
                    href="/sessions/sess-dys-301"
                    className="w-full max-w-xs py-2.5 bg-white text-teal-950 font-black text-xs rounded-xl shadow-lg text-center flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Mic className="w-4 h-4 text-emerald-600" />
                    <span>بدء تجربة القراءة الآن</span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Quick Gateways to Videos & Specialists Directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
              <Link
                href="/videos"
                className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-pink-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    🎬
                  </div>
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-pink-600 transition-colors">
                      مكتبة الفيديوهات والتمارين المصورة
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      تمارين حركة اللسان، علاج لدغات الحروف، والتحفيز اللغوي للمنزل.
                    </p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 group-hover:text-pink-600 transition-all shrink-0" />
              </Link>

              <Link
                href="/specialists"
                className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    ⚕️
                  </div>
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-gray-900 group-hover:text-emerald-600 transition-colors">
                      دليل الأخصائيين والنصائح السريرية
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
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
        <section className="py-12 sm:py-20 bg-slate-50 border-t border-b border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 uppercase tracking-wider">
                التخصصات التأهيلية المتكاملة
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2">
                مسارات تدريبية مصممة بأحدث الأساليب التربوية
              </h2>
              <p className="text-xs sm:text-base text-gray-600 mt-2">
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
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-5 shadow-md shadow-indigo-100 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-yellow-200" />
                    </div>
                    <h3 className="font-extrabold text-base sm:text-xl text-gray-900 mb-2">
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
        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 uppercase">
                رحلة التعلم السهلة
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mt-2">
                كيف تعمل منصة نُطق؟
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { step: '1', title: 'إنشاء حساب وتسجيل الطفل', desc: 'إدخال العمر، المشكلة اللغوية، واللهجة المفضلة، أو كود الطبيب.' },
                { step: '2', title: 'الاستشارة الذكية', desc: 'حوار استكشافي مع AI لتحليل الاحتياج وصياغة الخطة العلاجية.' },
                { step: '3', title: 'المكالمات والجلسات الحية', desc: 'الطفل يتحدث صوتياً مع الأخصائية الذكية ويتعلم بالصوت والصورة.' },
                { step: '4', title: 'التقارير والمتابعة السريرية', desc: 'تقارير أداء فورية لولي الأمر مع إمكانية مراجعة واعتماد الطبيب.' },
              ].map((item) => (
                <div key={item.step} className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-xs text-center relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-2xl bg-indigo-600 text-white font-black text-base sm:text-lg flex items-center justify-center mb-3 shadow-md shadow-indigo-200">
                    {item.step}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section className="py-12 sm:py-20 bg-slate-50 border-t border-gray-200/60">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
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
                      className="w-full p-4 sm:p-5 text-right font-extrabold text-xs sm:text-base text-gray-900 flex items-center justify-between gap-4 hover:bg-gray-50 cursor-pointer"
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
        <section className="py-14 sm:py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="text-2xl sm:text-4xl font-black">جاهز لبدء أول جلسة مع طفلك؟</h2>
            <p className="text-xs sm:text-base text-indigo-100 max-w-xl mx-auto leading-relaxed">
              انضم لمئات الأسر والأخصائيين الذين يساعدون أطفالهم يومياً على التحدث بطلاقة واكتساب الثقة بالنفس.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 bg-white text-indigo-700 font-black text-sm sm:text-base rounded-2xl shadow-xl hover:bg-yellow-300 hover:text-indigo-950 transition-all hover:scale-105 active:scale-95"
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
