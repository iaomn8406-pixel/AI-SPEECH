'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import MascotAvatar from '@/components/child/MascotAvatar';
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
  Volume2
} from 'lucide-react';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'هل المنصة بديل كامل عن أخصائي التخاطب؟',
      a: 'المنصة أداة تأهيلية وتدريبية ذكية مكثفة تم تصميمها لتعمل جنباً إلى جنب مع الأسرة، مع توفير بوابة مخصصة للأخصائي لمراجعة واعتماد الخطط، وليست بديلاً مستقلاً عن الفحوصات الطبية السريرية.',
    },
    {
      q: 'كيف يتعامل الذكاء الاصطناعي مع نطق الطفل غير الواضح؟',
      a: 'تعتمد المنصة على محرك تحليل صوتي متقدم يفهم خصوصية نطق الأطفال والتدرج اللغوي، ولا تعطي تقييماً سلبياً أو محبطاً، بل تشجع الطفل وتقدم نماذج نطق صحيحة خطوة بخطوة.',
    },
    {
      q: 'هل تدعم المنصة اللهجات العربية؟',
      a: 'نعم! تدعم المنصة العربية الفصحى المبسطة واللهجة المصرية بالإضافة للهجات العربية الشائعة لضمان إحساس الطفل بالألفة والدفء.',
    },
    {
      q: 'هل بيانات وتسجيلات طفلي آمنة؟',
      a: 'نلتزم بأعلى معايير الخصوصية الصارمة؛ لا يتم مشاركة بيانات الأطفال أو استخدامها في تدريب نماذج عامة، وجميع السجلات مشفرة بالكامل.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200/60 shadow-xs">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                  <span className="text-xs sm:text-sm font-extrabold text-indigo-900">
                    منصة الذكاء الاصطناعي التفاعلية الأولى لتأهيل نطق الأطفال
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.2] tracking-tight">
                  نُساعد طفلك أن يتكلم بثقة، <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-l from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    ويكتشف صوته الجميل!
                  </span>
                </h1>

                <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                  جلسات تخاطب تفاعلية ذكية، معالجة تأخر الكلام وعسر القراءة، وتنمية مهارات التواصل الاجتماعي عبر شخصيات محبوبة ومحادثة صوتية فورية تفهم طفلك وتشجعه.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <a
                    href="/parent"
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-black text-base rounded-2xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <span>تجربة المنصة الآن (Demo)</span>
                    <ArrowLeft className="w-5 h-5" />
                  </a>

                  <a
                    href="/parent/consultation"
                    className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-gray-50 text-indigo-700 border-2 border-indigo-100 font-extrabold text-base rounded-2xl shadow-xs transition-all text-center flex items-center justify-center gap-2"
                  >
                    <Bot className="w-5 h-5 text-indigo-600" />
                    <span>شات الاستشارة الذكي</span>
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-indigo-100/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>جلسات تفاعلية فورية جاهزة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>دعم اللهجة المصرية والفصحى</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>متابعة تفصيلية لولي الأمر</span>
                  </div>
                </div>
              </div>

              {/* Interactive Visual Hero Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-indigo-100 relative">
                  
                  {/* Floating Mascot */}
                  <div className="flex flex-col items-center mb-6">
                    <MascotAvatar state="speaking" size="lg" />
                    <h3 className="font-black text-lg text-gray-900 mt-4">البطل سمسم 🐻</h3>
                    <p className="text-xs text-indigo-600 font-bold">رفيق طفلك الذكي في كل خطوة</p>
                  </div>

                  {/* Sample Interactive Session Trigger */}
                  <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-900">جلسة تجريبية سريعة:</span>
                      <span className="text-[10px] font-bold bg-white text-indigo-600 px-2 py-0.5 rounded-full shadow-2xs">
                        حيوانات المزرعة 🐮
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      &quot;انظر إلى القطة اللطيفة، واسمع صوتها الجميل.. كرر معي: قِـطَّـة!&quot;
                    </p>
                    <a
                      href="/sessions/sess-sl-101"
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition-colors"
                    >
                      <PlayCircle className="w-4 h-4 text-yellow-300" />
                      <span>ابدأ الجلسة التفاعلية الآن</span>
                    </a>
                  </div>
                </div>
              </div>
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
                    <a
                      href="/sessions"
                      className="text-xs font-black text-gray-800 hover:text-indigo-600 flex items-center gap-1 group-hover:-translate-x-1 transition-transform"
                    >
                      <span>تصفح الجلسات</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </a>
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
                { step: '1', title: 'إنشاء ملف الطفل', desc: 'إدخال العمر، المشكلة اللغوية، واللهجة المفضلة.' },
                { step: '2', title: 'الاستشارة الذكية', desc: 'حوار استكشافي مع AI لتحليل الاحتياج وصياغة الخطة.' },
                { step: '3', title: 'الجلسات الصوتية التفاعلية', desc: 'الطفل يتحدث مباشرة مع الشخصية ويتعلم بالصوت والصورة.' },
                { step: '4', title: 'متابعة التقدم والنتائج', desc: 'تقارير فورية، رسوم بيانية، ومكافآت محفزة للطفل.' },
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
              انضم لمئات الأسر التي تساعد أطفالها يومياً على التحدث بطلاقة واكتساب الثقة بالنفس.
            </p>
            <div className="pt-2">
              <a
                href="/parent"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black text-base rounded-2xl shadow-xl hover:bg-yellow-300 hover:text-indigo-950 transition-all hover:scale-105 active:scale-95"
              >
                <span>ابدأ رحلة التدريب فوراً</span>
                <ArrowLeft className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
