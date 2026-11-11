'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { Settings, Shield, Bell, Moon, Globe, CheckCircle2 } from 'lucide-react';

export default function ParentSettingsPage() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bargeInEnabled, setBargeInEnabled] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
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
