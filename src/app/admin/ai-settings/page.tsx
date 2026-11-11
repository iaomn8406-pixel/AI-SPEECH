'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';
import AIProviderSettings from '@/components/admin/AIProviderSettings';

export default function AdminAISettingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AIProviderSettings />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
