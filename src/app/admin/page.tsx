'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Cpu, 
  Coins, 
  Activity, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Settings,
  ArrowLeft,
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  Stethoscope,
  Key,
  ShieldCheck,
  Filter,
  Video,
  Baby,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { DemoStore } from '@/lib/demo/demo-store';
import { RegisteredAccount } from '@/types/models';
import { SUPER_ADMIN_EMAIL } from '@/lib/demo/sample-data';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [accounts, setAccounts] = useState<RegisteredAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'parent' | 'specialist' | 'admin'>('all');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [providerConfig, setProviderConfig] = useState<any>({ provider: 'gemini' });

  useEffect(() => {
    // Load accounts
    const loadedAccounts = DemoStore.getRegisteredAccounts();
    setAccounts(loadedAccounts);
    setHasApiKey(DemoStore.hasActiveApiKey());
    setProviderConfig(DemoStore.getCustomProviderConfig());

    const handleUpdate = () => {
      setAccounts(DemoStore.getRegisteredAccounts());
      setHasApiKey(DemoStore.hasActiveApiKey());
    };

    window.addEventListener('accounts-updated', handleUpdate);
    window.addEventListener('api-key-changed', handleUpdate);
    return () => {
      window.removeEventListener('accounts-updated', handleUpdate);
      window.removeEventListener('api-key-changed', handleUpdate);
    };
  }, []);

  const totalUsers = accounts.length;
  const activeNowCount = accounts.filter(a => a.is_online).length;
  const specialistsCount = accounts.filter(a => a.role === 'specialist').length;
  const parentsCount = accounts.filter(a => a.role === 'parent').length;
  const totalSessionsCompleted = accounts.reduce((acc, a) => acc + (a.sessions_count || 0), 14);

  const filteredAccounts = accounts.filter(acc => {
    const displayName = acc.name || acc.full_name || '';
    const matchesSearch = 
      displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (acc.child_name && acc.child_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (acc.promo_code && acc.promo_code.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || acc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Mask sensitive email for display (keep super admin recognizable)
  const formatEmailDisplay = (email: string) => {
    if (email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
      return email;
    }
    const [user, domain] = email.split('@');
    if (!domain) return email;
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
    return `${maskedUser}@${domain}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Admin Header with Super Admin Badge */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-indigo-500/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-yellow-300 border border-yellow-400/30 px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>لوحة الإدارة المركزية العليا • الحساب المعتمد: {SUPER_ADMIN_EMAIL}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">مركز التحكم والرقابة السريرية الشاملة</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              متابعة حسابات أولياء الأمور والأخصائيين المعتمدين، خطط سير وتأهيل الأطفال، وحالة مفاتيح ونماذج الذكاء الاصطناعي المطبقة على كافة مستخدمي المنصة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/ai-settings"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-yellow-300" />
              <span>إدارة مفاتيح الـ AI العامة</span>
            </Link>
            <Link
              href="/videos"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/10 transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4 text-pink-400" />
              <span>مكتبة الفيديوهات</span>
            </Link>
          </div>
        </div>

        {/* Global AI Status Alert Banner */}
        <div className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          hasApiKey 
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
            : 'bg-amber-50/90 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              hasApiKey ? 'bg-emerald-600 text-white shadow-sm' : 'bg-amber-500 text-white shadow-sm'
            }`}>
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base">
                  {hasApiKey ? 'مفتاح الـ API المركزي نشط ومفعل لجميع مستخدمي المنصة' : 'تنبيه: لم يتم ربط API مركزي بعد!'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                  hasApiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {hasApiKey ? `مزود: ${providerConfig.provider || 'Gemini'}` : 'وضع محدود'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {hasApiKey 
                  ? 'المفتاح المضبوط من قبل الإدارة العليا مطبق تلقائياً على كل طفل وولي أمر وأخصائي في المكالمات الصوتية وتحليل النطق.'
                  : 'عند محاولة بدء مكالمة ذكية أو فحص صوتي بدون ربط API، سيتم تنبيه المستخدمين بلطف لربطه من لوحة الإدارة.'}
              </p>
            </div>
          </div>
          <Link
            href="/admin/ai-settings"
            className="px-4 py-2 bg-white text-slate-800 font-bold text-xs rounded-xl shadow-xs border border-slate-200 hover:bg-slate-50 transition-all self-start sm:self-auto shrink-0 flex items-center gap-1.5"
          >
            <Settings className="w-3.5 h-3.5 text-indigo-600" />
            <span>تعديل مزود الـ AI</span>
          </Link>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">إجمالي المستخدمين</p>
              <p className="text-xl sm:text-2xl font-black text-gray-900">{totalUsers}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 relative">
              <Activity className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">نشط الآن في المنصة</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <p className="text-xl sm:text-2xl font-black text-emerald-600">{activeNowCount}</p>
                <span className="text-xs text-gray-400 font-normal">أعضاء</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">أخصائيين معتمدين</p>
              <p className="text-xl sm:text-2xl font-black text-purple-600">{specialistsCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">جلسات تخاطب منجزة</p>
              <p className="text-xl sm:text-2xl font-black text-amber-600">{totalSessionsCompleted}</p>
            </div>
          </div>
        </div>

        {/* Registered Users Table Card */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          
          {/* Table Header & Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <span>سجل الحسابات ورحلات الأطفال والأخصائيين</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                عرض تفصيلي لبيانات المسجلين، الحالة النشطة، الأخصائي المتابع، ونسبة التحسن المحرزة.
              </p>
            </div>

            {/* Filter buttons & Search */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Role filter buttons */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                <button
                  type="button"
                  onClick={() => setRoleFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'}`}
                >
                  الكل ({accounts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRoleFilter('parent')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'parent' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'}`}
                >
                  أولياء الأمور ({parentsCount})
                </button>
                <button
                  type="button"
                  onClick={() => setRoleFilter('specialist')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${roleFilter === 'specialist' ? 'bg-white text-indigo-600 shadow-xs' : 'hover:text-slate-900'}`}
                >
                  الأخصائيين ({specialistsCount})
                </button>
              </div>

              {/* Search input */}
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="بحث بالاسم، الكود، الطفل..."
                  className="w-full pr-9 pl-3 py-2 text-xs bg-slate-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-gray-500 text-xs font-bold border-b border-gray-100">
                  <th className="py-3.5 px-4 sm:px-6">المستخدم والدور</th>
                  <th className="py-3.5 px-4">الحالة والنشاط</th>
                  <th className="py-3.5 px-4">رحلة الطفل / العيادة</th>
                  <th className="py-3.5 px-4 text-center">الجلسات</th>
                  <th className="py-3.5 px-4 text-center">التقدم والتحسن</th>
                  <th className="py-3.5 px-4">رمز الدعوة / الارتباط</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                {filteredAccounts.map((acc) => {
                  const isSuperAdminAccount = acc.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
                  const displayName = acc.name || acc.full_name || 'مستخدم';

                  return (
                    <tr key={acc.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* User & Role */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                            isSuperAdminAccount 
                              ? 'bg-amber-100 text-amber-800 ring-2 ring-amber-400'
                              : acc.role === 'specialist'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-indigo-100 text-indigo-700'
                          }`}>
                            {displayName.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-gray-900">{displayName}</span>
                              {isSuperAdminAccount && (
                                <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                                  المالك الأعلى (Owner)
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gray-500 dir-ltr font-mono block">
                              {formatEmailDisplay(acc.email)}
                            </span>
                            <span className="text-[10px] text-indigo-600 font-bold">
                              {acc.role === 'admin' ? 'مدير المنصة' : acc.role === 'specialist' ? 'أخصائي نطق وتخاطب' : 'ولي أمر'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Active Status */}
                      <td className="py-4 px-4">
                        {acc.is_online ? (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-full text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>نشط الآن</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-slate-500 text-xs">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{acc.last_seen || 'غير متصل'}</span>
                          </div>
                        )}
                      </td>

                      {/* Child Journey / Clinic Details */}
                      <td className="py-4 px-4">
                        {acc.role === 'specialist' ? (
                          <div>
                            <div className="font-bold text-gray-800 flex items-center gap-1.5">
                              <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
                              <span>{acc.clinic_name || 'عيادة التخاطب التخصصية'}</span>
                            </div>
                            <span className="text-[11px] text-gray-500">
                              متابع لـ {acc.assigned_children_count || 12} أطفال
                            </span>
                          </div>
                        ) : (
                          <div>
                            <div className="font-bold text-gray-800 flex items-center gap-1.5">
                              <Baby className="w-3.5 h-3.5 text-indigo-600" />
                              <span>الطفل: {acc.child_name || 'غير محدد'}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 block max-w-xs truncate">
                              المسار: {acc.journey_stage || 'تأهيل الحروف والطلاقة'}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Sessions Count */}
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block bg-slate-100 font-bold px-2.5 py-1 rounded-lg text-slate-700">
                          {acc.sessions_count || 0}
                        </span>
                      </td>

                      {/* Improvement Percentage */}
                      <td className="py-4 px-4 text-center">
                        {acc.role === 'specialist' ? (
                          <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-1 rounded-lg">
                            نسبة نجاح 94%
                          </span>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            <div className="w-16 bg-gray-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
                                style={{ width: `${acc.improvement_rate || 50}%` }}
                              />
                            </div>
                            <span className="font-bold text-xs text-slate-700">{acc.improvement_rate || 0}%</span>
                          </div>
                        )}
                      </td>

                      {/* Promo Code or Specialist Association */}
                      <td className="py-4 px-4">
                        {acc.role === 'specialist' ? (
                          <span className="font-mono text-xs font-black bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg">
                            {acc.promo_code || 'SPECIALIST'}
                          </span>
                        ) : acc.linked_specialist_code ? (
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800">
                              {acc.linked_specialist_name || 'طبيب متابع'}
                            </span>
                            <span className="font-mono text-[10px] text-gray-400">
                              كود: {acc.linked_specialist_code}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                            تدريب منزلي ذكي
                          </span>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="p-12 text-center text-gray-500 space-y-2">
              <Users className="w-10 h-10 mx-auto text-gray-300" />
              <p className="font-bold">لم يتم العثور على حسابات مطابقة للبحث</p>
            </div>
          )}

        </div>

      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
