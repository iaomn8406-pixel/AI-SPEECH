'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import BrandLogo from '@/components/common/BrandLogo';
import { DemoStore } from '@/lib/demo/demo-store';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowLeft, 
  Stethoscope, 
  Ticket, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  HeartHandshake,
  UserCheck
} from 'lucide-react';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'parent' | 'specialist'>('parent');
  
  // Parent registration mode: with specialist invitation code, or independent family
  const [parentRegMode, setParentRegMode] = useState<'with_code' | 'independent'>('with_code');
  const [promoCode, setPromoCode] = useState('');
  const [promoVerified, setPromoVerified] = useState<{ valid: boolean; specialistName?: string } | null>(null);

  // Specialist specific fields
  const [specialization, setSpecialization] = useState('أخصائي تخاطب وتعديل سلوك');
  const [clinicName, setClinicName] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePromoChange = (val: string) => {
    setPromoCode(val);
    setErrorMsg('');
    if (val.trim().length >= 4) {
      const res = DemoStore.verifyPromoCode(val);
      if (res.valid && res.specialist) {
        setPromoVerified({ valid: true, specialistName: res.specialist.full_name });
      } else {
        setPromoVerified({ valid: false });
      }
    } else {
      setPromoVerified(null);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // If parent chose 'with_code', check code validity
    if (role === 'parent' && parentRegMode === 'with_code') {
      const res = DemoStore.verifyPromoCode(promoCode);
      if (!res.valid) {
        setErrorMsg('كود الدعوة غير صحيح! يرجى إدخال كود صالح من طبيبك (مثال: DR-AML-2026) أو النقر على "تسجيل فردي مستقل بدون طبيب" بالأسفل.');
        setIsLoading(false);
        return;
      }
    }

    const newId = `acc-${Date.now()}`;
    const generatedPromo = role === 'specialist' 
      ? `DR-${fullName.split(' ')[0]?.toUpperCase() || 'SPEC'}-${Math.floor(1000 + Math.random() * 9000)}` 
      : undefined;

    DemoStore.addRegisteredAccount({
      id: newId,
      email: email.trim(),
      full_name: fullName.trim(),
      role,
      registration_type: role === 'parent' ? (parentRegMode === 'with_code' ? 'with_specialist' : 'independent') : undefined,
      promo_code: role === 'specialist' ? generatedPromo : (parentRegMode === 'with_code' ? promoCode.trim().toUpperCase() : undefined),
      specialization: role === 'specialist' ? specialization : undefined,
      clinic_name: role === 'specialist' ? clinicName : undefined,
      linked_specialist_name: promoVerified?.specialistName,
      is_online: true,
      last_active_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      journey_summary: role === 'parent' 
        ? (parentRegMode === 'with_code' ? `حساب ولي أمر مرتبط بالعيادة (${promoVerified?.specialistName || 'الأخصائي'}).` : 'حساب ولي أمر مستقل (تدريب وتأهيل منزلي).')
        : `أخصائي معتمد كود الدعوة الخاص به: ${generatedPromo}`,
    });

    // If parent with a specialist code, link active child
    if (role === 'parent' && parentRegMode === 'with_code') {
      DemoStore.addChild({
        parent_id: newId,
        name: `طفل ${fullName.split(' ')[0]}`,
        avatar: '🦁',
        date_of_birth: '2021-01-01',
        gender: 'male',
        primary_language: 'العربية',
        dialect: 'اللهجة المصرية',
        primary_issue: 'تأخر كلام ومتابعة مع الأخصائي',
        additional_issues: [],
        description: 'تم تسجيل الطفل وربطه بالأخصائي عبر كود الدعوة.',
        speech_level: 2,
        comprehension_level: 3,
        communication_level: 2,
        pronunciation_level: 2,
        reading_level: 1,
        writing_level: 1,
        social_level: 3,
        specialist_name: promoVerified?.specialistName,
        specialist_code: promoCode.trim().toUpperCase(),
        registration_mode: 'specialist_linked',
      });
    }

    DemoStore.login(email || 'user@aispeech.com', role);
    setTimeout(() => {
      window.location.href = role === 'parent' ? '/parent' : '/specialist';
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <BrandLogo size="md" showSlogan={false} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">إنشاء حساب جديد</h1>
            <p className="text-xs text-gray-500">انضم لمنصة نُطق لتأهيل الكلام والنطق بالذكاء الاصطناعي</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setRole('parent');
                  setErrorMsg('');
                }}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'parent' ? 'bg-white text-indigo-700 shadow-xs' : 'text-gray-500'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>ولي أمر (Parent)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('specialist');
                  setErrorMsg('');
                }}
                className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'specialist' ? 'bg-white text-emerald-700 shadow-xs' : 'text-gray-500'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>أخصائي (Specialist)</span>
              </button>
            </div>

            {/* Parent Mode Options: Doctor Invitation Code OR Independent Registration */}
            {role === 'parent' && (
              <div className="space-y-3 pt-1">
                {parentRegMode === 'with_code' ? (
                  <div className="p-3.5 bg-gradient-to-br from-indigo-50/80 to-purple-50/50 rounded-2xl border border-indigo-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                        <Ticket className="w-3.5 h-3.5 text-indigo-600" />
                        <span>كود دعوة الطبيب / الأخصائي:</span>
                      </label>
                      <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded-full border border-indigo-100">
                        متابعة عيادية
                      </span>
                    </div>

                    <input
                      type="text"
                      required
                      value={promoCode}
                      onChange={(e) => handlePromoChange(e.target.value)}
                      placeholder="أدخل كود طبيبك (مثال: DR-AML-2026)"
                      className="w-full px-3.5 py-2.5 bg-white border border-indigo-200 rounded-xl text-xs sm:text-sm font-mono text-gray-900 uppercase focus:outline-hidden focus:border-indigo-600"
                    />

                    {promoVerified?.valid && (
                      <div className="p-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-[11px] font-bold flex items-center gap-1.5 animate-fade-in">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>تم التحقق: أنت تسجل مع ({promoVerified.specialistName}) ✓</span>
                      </div>
                    )}

                    {promoVerified && !promoVerified.valid && promoCode.length >= 4 && (
                      <p className="text-[11px] text-rose-600 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>كود غير موجود! تأكد من الكود أو اختر التسجيل المستقل.</span>
                      </p>
                    )}

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setParentRegMode('independent');
                          setPromoCode('');
                          setErrorMsg('');
                        }}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-black underline cursor-pointer"
                      >
                        لست تابعاً لطبيب؟ اضغط هنا للتسجيل الفردي المستقل
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        <span>تسجيل فردي مستقل (تدريب منزلي ذكي)</span>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100">
                        مفعل
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 leading-relaxed">
                      رائع! ستتولى أنت الإشراف المباشر على طفلك بالمنزل باستخدام أخصائية الذكاء الاصطناعي وجلسات النطق التفاعلية ومدرب القراءة دون الحاجة لعيادة.
                    </p>
                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setParentRegMode('with_code');
                          setErrorMsg('');
                        }}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                      >
                        معي كود من طبيب؟ العودة لإدخال كود الدعوة
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Specialist Profile Details */}
            {role === 'specialist' && (
              <div className="space-y-3 p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">التخصص الدقيق</label>
                  <input
                    type="text"
                    required
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="استشاري تخاطب، عسر قراءة، تعديل سلوك..."
                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">اسم العيادة أو المركز (اختياري)</label>
                  <input
                    type="text"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="عيادة الأمل للتخاطب..."
                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-hidden focus:border-emerald-600"
                  />
                </div>
                <p className="text-[10px] text-gray-500">
                  ✨ سيتم إنشاء كود دعوة تلقائي لحسابك في لوحتك فور التسجيل لتدعو به طلابك وأطفال عيادتك.
                </p>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold leading-relaxed flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الكامل</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="الاسم الثلاثي..."
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-indigo-500 text-gray-900"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-sm rounded-xl shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب والبدء فوراً'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500">
            لديك حساب بالفعل؟{' '}
            <a href="/login" className="font-bold text-indigo-600 hover:underline">
              تسجيل الدخول
            </a>
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
