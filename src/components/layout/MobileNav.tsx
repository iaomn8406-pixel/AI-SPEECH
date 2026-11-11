'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Sparkles, 
  Bot, 
  UserCircle2, 
  TrendingUp 
} from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  // Hide mobile nav when inside a full-screen interactive session to keep kid focused!
  if (pathname.startsWith('/sessions/') && pathname.split('/').length > 2) {
    return null;
  }

  const tabs = [
    { href: '/parent', label: 'الرئيسية', icon: Home },
    { href: '/sessions', label: 'الجلسات', icon: Sparkles },
    { href: '/parent/consultation', label: 'استشر AI', icon: Bot, isCenter: true },
    { href: '/parent/progress', label: 'التقدم', icon: TrendingUp },
    { href: '/parent/children', label: 'الأطفال', icon: UserCircle2 },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-indigo-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;

          if (tab.isCenter) {
            return (
              <a
                key={tab.href}
                href={tab.href}
                className="relative -top-5 flex flex-col items-center group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-300 group-hover:scale-105 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6 text-yellow-200" />
                </div>
                <span className="text-[11px] font-extrabold text-indigo-700 mt-1">
                  {tab.label}
                </span>
              </a>
            );
          }

          return (
            <a
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-16 py-1 transition-colors ${
                isActive
                  ? 'text-indigo-600 font-extrabold'
                  : 'text-gray-500 hover:text-gray-900 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px]">{tab.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
