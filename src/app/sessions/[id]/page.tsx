'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { DemoStore } from '@/lib/demo/demo-store';
import { PREBUILT_SESSIONS } from '@/lib/demo/prebuilt-curriculum';
import { Session } from '@/types/models';
import SessionPlayer from '@/components/session/SessionPlayer';
import { Loader2 } from 'lucide-react';

function SessionPlayContent() {
  const params = useParams();
  const sessionId = params?.id as string;
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (sessionId) {
      const found = DemoStore.getSessionById(sessionId) || 
        PREBUILT_SESSIONS.find(s => s.id === sessionId) || 
        PREBUILT_SESSIONS[0];
      setSession(found);
    }
  }, [sessionId]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-indigo-50">
        <div className="flex items-center gap-3 bg-white p-6 rounded-3xl shadow-md border border-indigo-100">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-sm font-bold text-gray-700">جاري تجهيز بيئة الجلسة التفاعلية...</span>
        </div>
      </div>
    );
  }

  return <SessionPlayer session={session} />;
}

export default function SessionPlayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-indigo-50">
          <div className="flex items-center gap-3 bg-white p-6 rounded-3xl shadow-md border border-indigo-100">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span className="text-sm font-bold text-gray-700">جاري تحميل الجلسة...</span>
          </div>
        </div>
      }
    >
      <SessionPlayContent />
    </Suspense>
  );
}
