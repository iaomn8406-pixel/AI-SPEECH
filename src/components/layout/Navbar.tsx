'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Menu, 
  X, 
  User, 
  ShieldAlert, 
  Stethoscope, 
  Bot, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child } from '@/types/models';
import BrandLogo from '@/components/common/BrandLogo';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [currentRole, setCurrentRole] = useState<'parent' | 'specialist' | 'admin'>('parent');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    setIsLoggedIn(DemoStore.isLoggedIn());
    setIsSuperAdmin(DemoStore.isSuperAdmin());
    setActiveChild(DemoStore.getActiveChild());
    setCurrentRole(DemoStore.getUserRole());
    setUserEmail(DemoStore.getUserEmail());

    const handleChildChange = () => {
      setActiveChild(DemoStore.getActiveChild());
    };
    const handleRoleChange = () => {
      setCurrentRole(DemoStore.getUserRole());
    };
    const handleAuthChange = () => {
      setIsLoggedIn(DemoStore.isLoggedIn());
      setIsSuperAdmin(DemoStore.isSuperAdmin());
      setUserEmail(DemoStore.getUserEmail());
    };

    window.addEventListener('child-changed', handleChildChange);
    window.addEventListener('role-changed', handleRoleChange);
    window.addEventListener('auth-changed', handleAuthChange);
    return () => {
      window.removeEventListener('child-changed', handleChildChange);
      window.removeEventListener('role-changed', handleRoleChange);
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    DemoStore.logout();
    window.location.href = '/login';
  };

  // Concise, role-specific nav links without wrapping or duplicates
  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/sessions', label: 'الجلسات' },
    { href: '/videos', label: 'فيديوهات التخاطب' },
    { href: '/specialists', label: 'الأخصائيين' },
    ...(isLoggedIn && isSuperAdmin ? [{ href: '/admin', label: 'لوحة الإدارة' }] : []),
    ...(isLoggedIn && !isSuperAdmin && currentRole === 'specialist' ? [{ href: '/specialist', label: 'لوحة الأخصائي' }] : []),
    ...(isLoggedIn && !isSuperAdmin && currentRole === 'parent' ? [{ href: '/parent', label: 'لوحة ولي الأمر' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="group flex items-center">
              <BrandLogo size="md" showSlogan={true} />
            </Link>
          </div>

          {/* Desktop Navigation Links (Always on 1 line with whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Bar (Left Side in RTL) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!isLoggedIn ? (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/login"
                  className="px-3 py-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-all whitespace-nowrap"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-200 hover:brightness-105 transition-all whitespace-nowrap"
                >
                  حساب جديد
                </Link>
              </div>
            ) : (
              <>
                {/* User Identity Pill */}
                {isSuperAdmin ? (
                  <Link
                    href="/admin"
                    className="hidden sm:flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full text-xs font-black shadow-2xs whitespace-nowrap"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>إدارة المنصة</span>
                  </Link>
                ) : currentRole === 'specialist' ? (
                  <Link
                    href="/specialist"
                    className="hidden sm:flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-black shadow-2xs whitespace-nowrap"
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                    <span>د. أمل الشريف</span>
                  </Link>
                ) : activeChild ? (
                  <Link
                    href="/parent"
                    className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 px-3 py-1.5 rounded-full hover:border-purple-300 transition-colors whitespace-nowrap"
                    title="الملف النشط حالياً"
                  >
                    <span className="text-base">{activeChild.avatar}</span>
                    <span className="text-xs font-bold text-purple-900">{activeChild.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </Link>
                ) : null}

                {/* Consultation Quick CTA */}
                <Link
                  href="/parent/consultation"
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:brightness-105 transition-all whitespace-nowrap"
                >
                  <Bot className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>استشر AI</span>
                </Link>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  title="تسجيل الخروج"
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-hidden"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/40 backdrop-blur-xs z-50">
          <div className="bg-white border-b border-indigo-100 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl rounded-b-3xl">
            
            {/* User status in mobile drawer */}
            {isLoggedIn && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">
                    {isSuperAdmin ? '🛡️' : currentRole === 'specialist' ? '👩‍⚕️' : activeChild?.avatar || '👶'}
                  </span>
                  <div>
                    <p className="text-xs font-black text-gray-900">
                      {isSuperAdmin ? 'حساب مدير المنصة' : currentRole === 'specialist' ? 'د. أمل الشريف (أخصائية)' : activeChild?.name || 'ولي أمر'}
                    </p>
                    <p className="text-[11px] text-gray-400">متصل الآن بالمنصة</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-lg font-bold"
                >
                  خروج
                </button>
              </div>
            )}

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm sm:text-base font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <Link
                href="/parent/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs sm:text-sm shadow-md"
              >
                شات الاستشارة الذكي للأمهات والآباء
              </Link>
              {!isLoggedIn && (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs sm:text-sm hover:bg-gray-50"
                  >
                    تسجيل الدخول
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-sm"
                  >
                    حساب جديد
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
