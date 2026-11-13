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

            {/* MOBILE HERO BANNER (Cinematic Side-Aligned Layout Like Desktop - Text on Right, Characters on Left) */}
            <div className="block sm:hidden relative w-full min-h-[245px] aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-indigo-900/40 bg-slate-950">
              
              {/* Full Wide Scene Anchored Left so Girl, Boy & Robot Are 100% Visible on Left */}
              <div 
                className="absolute inset-0 bg-cover bg-left"
                style={{ backgroundImage: "url('/images/banners/hero-desktop.jpg')" }}
              />
              
              {/* Smooth Cinematic Right-to-Left Gradient Matching Desktop */}
              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 via-slate-950/75 to-transparent" />
              
              {/* Side-Aligned Content on Right (Identical Cinematic Composition to Desktop) */}
              <div className="relative z-10 p-4 pr-5 h-full w-[62%] mr-0 flex flex-col justify-center items-start text-right text-white space-y-2">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 text-[9px] font-black shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                  <span>منصة التخاطب الذكية</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <h1 className="text-base font-black text-white leading-snug drop-shadow-md">
                    نُساعد طفلك أن يتكلم بثقة، <br />
                    <span className="bg-gradient-to-l from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                      ويكتشف صوته الجميل! ✨
                    </span>
                  </h1>
                </div>

                <p className="text-[10px] text-slate-200 leading-relaxed font-medium line-clamp-2 drop-shadow-xs">
                  جلسات تخاطب تفاعلية ومحادثة صوتية فورية تفهم طفلك وتشجعه كأخصائي حقيقي.
                </p>

                {/* Compact Side-by-Side Buttons */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <Link
                    href="/register"
                    className="px-3 py-1.5 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-black text-[10px] rounded-lg shadow-md flex items-center gap-1 active:scale-95 transition-transform"
                  >
                    <span>ابدأ الآن</span>
                    <ArrowLeft className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/parent/consultation"
                    className="px-2.5 py-1.5 bg-white/15 text-white border border-white/25 font-bold text-[10px] rounded-lg flex items-center gap-1 backdrop-blur-md"
                  >
                    <Bot className="w-3 h-3 text-yellow-300" />
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

        {/* CONTENT SECTION 1 (Between Hero & Call Banner): Smart Speech Mastery & AI Assessment */}
        <section className="px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>لماذا يثق الأهل والأطباء في منصة نُطق؟</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
                تقييم سريري ذكي وتدريب صوتي حقيقي بالمايك
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                لا نكتفي بالصور فقط؛ ندمج بين تحليل النطق الفعلي للطفل وبناء خطة علاجية متدرجة تناسب قدراته.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Illustrated Content Card 1: Real Mic Mastery (2/2) */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                  <img
                    src="/images/content/feature-mic-mastery.jpg"
                    alt="تحليل النطق بالمايك وإتقان الحرف مرتين"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                    تحقق صوتي فعلي (2/2)
                  </span>
                </div>
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">
                      مايك حقيقي يختبر نطق الطفل ولا يمرر الخطأ
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      يستمع النظام لصوت الطفل فعلياً عبر الميكروفون؛ ويشترط نطق الحرف أو الكلمة بشكل صحيح <strong>مرتين متتاليتين</strong> للتأكد من إتقان المخرج الصوتي، مع تنبيه واضح عند عدم الوضوح أو الخطأ وإمكانية سماع نموذج المعلمة في أي لحظة.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      دقة صوتية لحظية
                    </span>
                    <Link
                      href="/sessions"
                      className="text-xs sm:text-sm font-black text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5"
                    >
                      <span>استكشف جلسات النطق</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Illustrated Content Card 2: Smart AI Assessment & Parent Map */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                  <img
                    src="/images/content/feature-ai-assessment.jpg"
                    alt="استشارة الذكاء الاصطناعي وخطة الطفل المخصصة"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-purple-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                    خطة ذكية مخصصة
                  </span>
                </div>
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">
                      استشارة أولية وخارطة تعلم تناسب عمر ولهجة طفلك
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      من خلال حوار ذكي وسريع مع ولي الأمر، يحدد الذكاء الاصطناعي نقاط القوة والتحديات (تأخر الكلام، اللدغات، التلعثم، أو عسر القراءة)، ويصمم مساراً تدريجياً مبهجاً يدعم اللهجة المصرية والعربية الفصحى.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                      دعم مصري وفصحى
                    </span>
                    <Link
                      href="/parent/consultation"
                      className="text-xs sm:text-sm font-black text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1.5"
                    >
                      <span>ابدأ الاستشارة الذكية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANNER 1: Live Voice Call with AI Specialist (Full-Bleed Desktop & Side-Aligned Cinematic Mobile) */}
        <section className="px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="w-full bg-slate-950 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-indigo-900/30">
              
              {/* DESKTOP LAYOUT (100% Full-Bleed - Therapist & Boy on Left, Text on Right) */}
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

              {/* MOBILE LAYOUT (Cinematic Side-Aligned Layout Like Desktop - Text on Right, Characters on Left) */}
              <div className="block sm:hidden relative w-full min-h-[240px] aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-indigo-900/40 bg-slate-950">
                <div
                  className="absolute inset-0 bg-cover bg-[position:12%_center]"
                  style={{ backgroundImage: "url('/images/banners/specialist-call-desktop.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 via-slate-950/75 to-transparent" />

                <div className="relative z-10 p-4 pr-5 h-full w-[62%] mr-0 flex flex-col justify-center items-start text-right space-y-2 text-white">
                  <span className="bg-purple-900/85 backdrop-blur-md text-yellow-300 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-purple-400/40">
                    مكالمة حية د. سارة
                  </span>

                  <h3 className="text-sm font-black leading-snug drop-shadow-md">
                    تحدث صوتياً مع الأخصائية كأنك في عيادة حقيقية!
                  </h3>

                  <p className="text-[10px] text-purple-100 leading-relaxed line-clamp-2 drop-shadow-xs">
                    محادثة صوتية ذكية تفهم نطق الطفل وتنشئ كروت صور شارحة فوراً.
                  </p>

                  <Link
                    href="/sessions/sess-sl-101"
                    className="px-3.5 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-950 font-black text-[10px] rounded-lg shadow-lg inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-purple-950" />
                    <span>بدء المكالمة الحية</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTENT SECTION 2 (Between Call Banner & Reading Banner): Specialist Portal & Video Library */}
        <section className="px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-black border border-teal-100">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                <span>منظومة متكاملة للعيادات والأسر</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
                متابعة الأخصائيين ومكتبة الفيديوهات التدريبية
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                تواصل مع أخصائي تخاطب معتمد بكود الربط الخاص به، أو درّب طفلك في المنزل عبر تمارين الفيديو المصنفة.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Illustrated Content Card 3: Specialist Portal & Invite Code */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                  <img
                    src="/images/content/portal-specialist-clinic.jpg"
                    alt="لوحة الأخصائي ومتابعة خط سير الطفل وتقارير التحسن"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                    ربط مباشر بالطبيب
                  </span>
                </div>
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">
                      كود دعوة الأخصائي وتقارير التحسن السريرية
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      يمتلك كل أخصائي كود دعوة خاص يربط به طلابه ليتابع رحلة الطفل ونتائج جلساته ومؤشرات تحسن النطق خطوة بخطوة، مع إمكانية إصدار وتحميل تقارير احترافية منظمة لولي الأمر.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full">
                      تقارير احترافية جاهزة
                    </span>
                    <Link
                      href="/specialists"
                      className="text-xs sm:text-sm font-black text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5"
                    >
                      <span>تصفح دليل الأخصائيين</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Illustrated Content Card 4: Categorized Video Library */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
                <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
                  <img
                    src="/images/content/portal-video-library.jpg"
                    alt="مكتبة الفيديوهات التدريبية المصنفة للأطفال"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-pink-600/90 backdrop-blur-md text-white text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
                    مكتبة فيديو مصنفة
                  </span>
                </div>
                <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-xl font-black text-gray-900">
                      مكتبة فيديوهات وتمارين منزلية بإشراف الأخصائيين
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      شاهد تمارين حركة اللسان، علاج لدغات الحروف، وأنشطة التحفيز اللغوي المصورة التي يرفعها الأخصائيون وتُصنف تلقائياً حسب التخصص لتطبيقها بسهولة في المنزل بعد تسجيل الدخول.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full">
                      تصنيفات متخصصة
                    </span>
                    <Link
                      href="/videos"
                      className="text-xs sm:text-sm font-black text-pink-600 hover:text-pink-800 inline-flex items-center gap-1.5"
                    >
                      <span>استكشف مكتبة الفيديوهات</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BANNER 2: Interactive Reading Highlighter (Full-Bleed Desktop & Side-Aligned Cinematic Mobile) */}
        <section className="px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="w-full bg-slate-950 rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-xl border border-teal-900/30">
              
              {/* DESKTOP LAYOUT (100% Width - Boy & Owl on Left, Text on Right) */}
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

              {/* MOBILE LAYOUT (Cinematic Side-Aligned Layout Like Desktop - Text on Right, Boy & Owl on Left) */}
              <div className="block sm:hidden relative w-full min-h-[240px] aspect-[16/10] rounded-3xl overflow-hidden shadow-xl border border-teal-900/40 bg-slate-950">
                <div
                  className="absolute inset-0 bg-cover bg-left"
                  style={{ backgroundImage: "url('/images/banners/reading-trainer-desktop.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 via-slate-950/75 to-transparent" />

                <div className="relative z-10 p-4 pr-5 h-full w-[62%] mr-0 flex flex-col justify-center items-start text-right space-y-2 text-white">
                  <span className="bg-teal-900/85 backdrop-blur-md text-emerald-300 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-teal-400/40">
                    كلمات مضيئة تفاعلية
                  </span>

                  <h3 className="text-sm font-black leading-snug drop-shadow-md">
                    الطفل يقرأ بصوته، والكلمة تضيء بالأخضر والخطأ بالأحمر!
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-400 text-slate-950 font-black">ذَهَبَ ✔</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500 text-white font-black">عُمَرُ ↻</span>
                  </div>
                  <Link
                    href="/sessions/sess-dys-301"
                    className="px-3.5 py-2 bg-white text-teal-950 font-black text-[10px] rounded-lg shadow-lg inline-flex items-center gap-1.5 active:scale-95 transition-transform"
                  >
                    <Mic className="w-3.5 h-3.5 text-emerald-600" />
                    <span>بدء تجربة القراءة</span>
                  </Link>
                </div>
              </div>

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
