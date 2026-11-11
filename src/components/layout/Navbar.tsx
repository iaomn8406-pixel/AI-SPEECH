'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Menu, 
  X, 
  User, 
  ShieldAlert, 
  Stethoscope, 
  Bot, 
  BookOpen, 
  Heart,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { Child } from '@/types/models';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [children, setChildren] = useState<Child[]>([]);
  const [activeChild, setActiveChild] = useState<Child | null>(null);
  const [currentRole, setCurrentRole] = useState<'parent' | 'specialist' | 'admin'>('parent');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(DemoStore.isLoggedIn());
    setChildren(DemoStore.getChildren());
    setActiveChild(DemoStore.getActiveChild());
    setCurrentRole(DemoStore.getUserRole());

    const handleChildChange = () => {
      setChildren(DemoStore.getChildren());
      setActiveChild(DemoStore.getActiveChild());
    };
    const handleRoleChange = () => {
      setCurrentRole(DemoStore.getUserRole());
    };
    const handleAuthChange = () => {
      setIsLoggedIn(DemoStore.isLoggedIn());
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

  const changeRole = (role: 'parent' | 'specialist' | 'admin') => {
    DemoStore.setUserRole(role);
    setCurrentRole(role);
    setRoleDropdownOpen(false);
  };

  const handleLogout = () => {
    DemoStore.logout();
    window.location.href = '/login';
  };

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/parent', label: 'لوحة ولي الأمر' },
    { href: '/sessions', label: 'مكتبة الجلسات' },
    { href: '/parent/consultation', label: 'الاستشارة الذكية' },
    { href: '/specialist', label: 'الأخصائي' },
    { href: '/admin', label: 'الإدارة' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-yellow-200 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-l from-indigo-700 to-purple-600 bg-clip-text text-transparent leading-none">
                  نُـطْـق
                </span>
                <span className="text-[10px] sm:text-xs text-indigo-500 font-semibold mt-1.5 hidden sm:inline tracking-normal">
                  منصة الذكاء الاصطناعي لتأهيل الأطفال
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 shadow-2xs'
                      : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="px-3 py-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-all"
                >
                  تسجيل الدخول
                </a>
                <a
                  href="/register"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-200 hover:brightness-105 transition-all"
                >
                  حساب جديد
                </a>
              </div>
            ) : (
              <>
                {/* Active Child Pill */}
                {activeChild && (
                  <a
                    href="/parent"
                    className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 px-3 py-1.5 rounded-full hover:border-purple-300 transition-colors"
                    title="الملف النشط حالياً"
                  >
                    <span className="text-lg">{activeChild.avatar}</span>
                    <span className="text-xs font-bold text-purple-900">{activeChild.name}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </a>
                )}

                {/* Role Switcher Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    {currentRole === 'parent' && <User className="w-3.5 h-3.5 text-indigo-600" />}
                    {currentRole === 'specialist' && <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />}
                    {currentRole === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />}
                    <span className="hidden sm:inline">
                      {currentRole === 'parent' ? 'ولي الأمر' : currentRole === 'specialist' ? 'الأخصائي' : 'المدير'}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                      <div className="px-3 py-1 text-[11px] font-bold text-gray-400 border-b border-gray-50 mb-1">
                        تبديل وجهة المنصة:
                      </div>
                      <button
                        onClick={() => changeRole('parent')}
                        className={`w-full text-right px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-indigo-50 ${
                          currentRole === 'parent' ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-gray-700'
                        }`}
                      >
                        <User className="w-4 h-4 text-indigo-500" />
                        لوحة ولي الأمر (Parent)
                      </button>
                      <button
                        onClick={() => changeRole('specialist')}
                        className={`w-full text-right px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-emerald-50 ${
                          currentRole === 'specialist' ? 'text-emerald-600 font-bold bg-emerald-50/50' : 'text-gray-700'
                        }`}
                      >
                        <Stethoscope className="w-4 h-4 text-emerald-500" />
                        لوحة الأخصائي (Specialist)
                      </button>
                      <button
                        onClick={() => changeRole('admin')}
                        className={`w-full text-right px-4 py-2 text-xs font-medium flex items-center gap-2 hover:bg-amber-50 ${
                          currentRole === 'admin' ? 'text-amber-600 font-bold bg-amber-50/50' : 'text-gray-700'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                        لوحة الإدارة الكاملة (Admin)
                      </button>
                    </div>
                  )}
                </div>

                {/* Consultation Quick CTA */}
                <a
                  href="/parent/consultation"
                  className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg hover:brightness-105 transition-all"
                >
                  <Bot className="w-4 h-4 text-yellow-300" />
                  <span>استشر AI</span>
                </a>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  title="تسجيل الخروج"
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-hidden"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 sm:top-20 bg-black/40 backdrop-blur-xs z-50">
          <div className="bg-white border-b border-indigo-100 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl rounded-b-3xl">
            
            {/* Active Child in Mobile */}
            {activeChild && (
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activeChild.avatar}</span>
                  <div>
                    <p className="text-xs text-purple-600 font-medium">الطفل المحدد:</p>
                    <p className="text-sm font-bold text-purple-950">{activeChild.name}</p>
                  </div>
                </div>
                <a
                  href="/parent"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs bg-purple-600 text-white font-bold px-3 py-1.5 rounded-lg"
                >
                  تغيير
                </a>
              </div>
            )}

            {/* Mobile Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="/parent/consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md"
              >
                شات الاستشارة الذكي للأمهات والآباء
              </a>
              {!isLoggedIn ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50"
                  >
                    تسجيل الدخول
                  </a>
                  <a
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-sm"
                  >
                    حساب جديد
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 font-bold text-sm transition-colors cursor-pointer"
                >
                  تسجيل الخروج من الحساب
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
