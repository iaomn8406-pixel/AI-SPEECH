import React from 'react';
import { Sparkles, Heart, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Vision */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="font-black text-2xl text-white">نُـطْـق | AI Speech</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              المنصة المتكاملة الأولى المدعومة بالذكاء الاصطناعي لمساعدة الأطفال على تجاوز تأخر الكلام، عسر القراءة، وتحسين النطق والتواصل الاجتماعي من خلال جلسات صوتية ومرئية تفاعلية ممتعة.
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>خصوصية بيانات الأطفال مشفرة ومحمية وفق أعلى المعايير.</span>
            </div>
          </div>

          {/* Specializations Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">التخصصات التأهيلية</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/sessions" className="hover:text-indigo-400 transition-colors">تأخر الكلام ونمو اللغة</a></li>
              <li><a href="/sessions" className="hover:text-indigo-400 transition-colors">مخارج الحروف وتصحيح اللدغات</a></li>
              <li><a href="/sessions" className="hover:text-indigo-400 transition-colors">عسر القراءة وصعوبات التعلم</a></li>
              <li><a href="/sessions" className="hover:text-indigo-400 transition-colors">مهارات التواصل الاجتماعي</a></li>
              <li><a href="/sessions" className="hover:text-indigo-400 transition-colors">المهارات السلوكية والانفعالية</a></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm">روابط الوصول السريع</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="/parent" className="hover:text-indigo-400 transition-colors">لوحة ولي الأمر</a></li>
              <li><a href="/parent/consultation" className="hover:text-indigo-400 transition-colors">الشات الاستشاري الذكي</a></li>
              <li><a href="/specialist" className="hover:text-indigo-400 transition-colors">بوابة الأخصائيين</a></li>
              <li><a href="/admin/ai-settings" className="hover:text-indigo-400 transition-colors">إعدادات مزودي AI</a></li>
              <li><a href="/login" className="hover:text-indigo-400 transition-colors">تسجيل الدخول</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-right">
          <p>© 2026 منصة نُطق لتأهيل الأطفال. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صُنعت بكل</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>لأجل مستقبل أطفالنا وأبطالنا الصغار.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
