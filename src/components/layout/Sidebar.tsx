'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  Bot, 
  TrendingUp, 
  UserCircle2, 
  Settings, 
  BookOpen, 
  Award,
  PlusCircle
} from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';

export default function Sidebar() {
  const pathname = usePathname();
  const activeChild = DemoStore.getActiveChild();

  const links = [
    { href: '/parent', label: 'نظرة عامة', icon: Home },
    { href: '/sessions', label: 'مكتبة الجلسات', icon: Sparkles },
    { href: '/parent/consultation', label: 'الشات الاستشاري AI', icon: Bot, badge: 'ذكي' },
    { href: '/parent/progress', label: 'تقارير التقدم', icon: TrendingUp },
    { href: '/parent/children', label: 'ملفات الأطفال', icon: UserCircle2 },
    { href: '/parent/settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-l border-indigo-50 min-h-[calc(100vh-5rem)] p-4 lg:p-6 shrink-0">
      
      {/* Active Child Summary Card */}
      {activeChild && (
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 rounded-2xl border border-indigo-100/60 mb-6 shadow-2xs">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl p-2 bg-white rounded-xl shadow-xs">{activeChild.avatar}</span>
            <div>
              <p className="text-xs text-indigo-600 font-bold">الطفل الحالي</p>
              <h3 className="font-extrabold text-gray-900 text-base">{activeChild.name}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600 bg-white/70 px-2.5 py-1.5 rounded-lg border border-indigo-50 mt-2">
            <span>مستوى النطق:</span>
            <span className="font-bold text-indigo-700">{activeChild.pronunciation_level}/5 ⭐</span>
          </div>
          <div className="mt-3 flex gap-2">
            <a
              href="/parent/children"
              className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 flex-1 text-center py-1 bg-white rounded-md shadow-2xs border border-indigo-100"
            >
              تبديل الطفل
            </a>
            <a
              href="/parent/children/new"
              className="text-[11px] font-bold text-purple-700 hover:text-purple-900 px-2 py-1 bg-white rounded-md shadow-2xs border border-purple-100 flex items-center justify-center"
              title="إضافة طفل جديد"
            >
              <PlusCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Main Navigation List */}
      <div className="space-y-1.5 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
          لوحة التحكم
        </p>
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-100'
                  : 'text-gray-600 hover:bg-indigo-50/70 hover:text-indigo-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-200' : 'text-gray-400'}`} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {link.badge}
                </span>
              )}
            </a>
          );
        })}
      </div>

      {/* Safety & Medical Disclaimer in Sidebar */}
      <div className="mt-auto pt-4 border-t border-gray-100 text-[11px] text-gray-400 leading-relaxed text-center">
        💡 إرشاد: المنصة أداة تأهيلية وتدريبية ذكية وليست بديلاً عن الفحص الطبي السريري.
      </div>
    </aside>
  );
}
