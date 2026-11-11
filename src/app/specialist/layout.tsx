'use client';

import React from 'react';
import AuthGuard from '@/components/auth/AuthGuard';

export default function SpecialistLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
