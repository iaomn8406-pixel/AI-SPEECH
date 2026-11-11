'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { Settings, Shield, Bell, Moon, Globe, CheckCircle2, Volume2, Sparkles, Mic } from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { speakArabicText } from '@/lib/ai/speech';

export default function ParentSettingsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bargeInEnabled, setBargeInEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [selectedVoiceId, setSelectedVoiceId] = useState('salma');
  const [saved, setSaved] = useState(false);

  const availableVoices = [
    { id: 'salma', nameAr: 'سلمى (أخصائية دافئة ومشجعة للأطفال)', type: 'female', sample: 'أهلاً بك يا بطل! أنا المعلمة سلمى، سعيدة جداً بالتدريب معك اليوم!' },
    { id: 'sara', nameAr: 'سارة (صوت مبهج ولطيف لمرحلة الروضة)', type: 'female', sample: 'مرحباً يا حلوين! هيا نلعب مع حيوانات المزرعة ونتعلم كلمات جديدة!' },
    { id: 'nour', nameAr: 'نور (صوت هادئ ومريح لفرط الحركة والتشتت)', type: 'female', sample: 'تنفس بهدوء يا بطل، اسمع صوتي ونكرر معاً خطوة بخطوة.' },
    { id: 'gemini-female', nameAr: 'Gemini Aoede (صوت ذكاء اصطناعي أنثوي متقدم)', type: 'cloud', sample: 'نظام التخاطب الذكي جاهز للاستماع لنطقك وتشجيعك.' },
    { id: 'openai-shimmer', nameAr: 'OpenAI Shimmer / Nova (صوت أنثوي فائق الواقعية)', type: 'cloud', sample: 'أنا جاهزة لمحادثتك الصوتية المباشرة في أي وقت.' },
  ];

  useEffect(() => {
    const pref = DemoStore.getPreferredVoice();
    if (pref?.id) {
      setSelectedVoiceId(pref.id);
    }
  }, []);

  const handleTestVoice = (sampleText: string) => {
    speakArabicText(sampleText, {
      pitch: 1.25,
      rate: 0.88,
    });
  };

  const handleSave = () => {
    const match = availableVoices.find(v => v.id === selectedVoiceId);
    if (match) {
      DemoStore.setPreferredVoice({
        id: match.id,
        nameAr: match.nameAr,
        gender: 'female',
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-3xl">
          
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-600" />
              <span>إعدادات الحساب وتفضيلات التدريب</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              تخصيص سلوك الجلسات الصوتية، تنبيهات التدريب اليومي، والخصوصية
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            
            {/* Audio & Barge-in Controls */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-2">
                تفضيلات الجلسات التفاعلية ومحادثة AI
              </h3>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">تشغيل الصوت والمؤثرات التحفيزية</h4>
                  <p className="text-[11px] text-gray-500">تشغيل نطق الكلمات وأصوات التشجيع تلقائياً</p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">خاصية مقاطعة الصوت الذكية (Barge-in)</h4>
                  <p className="text-[11px] text-gray-500">إيقاف صوت المعلم الذكي فور تحدث الطفل أو نطق الكلمة</p>
                </div>
                <input
                  type="checkbox"
                  checked={bargeInEnabled}
                  onChange={(e) => setBargeInEnabled(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">التذكير اليومي بموعد الجلسة</h4>
                  <p className="text-[11px] text-gray-500">إشعارات تشجيعية للأهل للحفاظ على استمرارية التدريب</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Voice Persona Selector */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-600" />
                    <span>اختيار صوت الأخصائية الذكية (أصوات مناسبة للأطفال)</span>
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    حدد الصوت المناسب لراحة طفلك ونبرته المفضلة أثناء المحادثة والجلسات
                  </p>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                  صوت أنثوي تشجيعي
                </span>
              </div>

              <div className="space-y-2.5">
                {availableVoices.map((voice) => {
                  const isSelected = selectedVoiceId === voice.id;
                  return (
                    <div
                      key={voice.id}
                      onClick={() => setSelectedVoiceId(voice.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-50/70 border-purple-400 shadow-xs'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="voice"
                          checked={isSelected}
                          onChange={() => setSelectedVoiceId(voice.id)}
                          className="w-4 h-4 accent-purple-600"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-900">{voice.nameAr}</span>
                            {voice.type === 'cloud' && (
                              <span className="text-[9px] bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.5 rounded-md">
                                سحابي متقدم
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">&quot;{voice.sample}&quot;</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestVoice(voice.sample);
                        }}
                        className="px-2.5 py-1.5 bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
                        title="تجربة الاستماع للصوت"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Privacy Section */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>الخصوصية وأمان بيانات الأطفال</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed bg-emerald-50 p-3.5 rounded-2xl border border-emerald-100">
                جميع بيانات طفلك وملفاته وسجلات الجلسات محمية بتشفير عالي، ولا يتم استخدام الصوت لتدريب أي نماذج خارجية. يمكنك طلب حذف حسابك وبيانات أطفالك بالكامل في أي وقت.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer"
              >
                حفظ التفضيلات
              </button>
              {saved && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم حفظ الإعدادات بنجاح</span>
                </span>
              )}
            </div>

          </div>
        </main>
      </div>

      <Footer />
      <MobileNav />
    </div>
  );
}
