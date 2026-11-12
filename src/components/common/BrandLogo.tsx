'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSlogan?: boolean;
}

export default function BrandLogo({ size = 'md', showSlogan = true }: BrandLogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 sm:w-11 sm:h-11 rounded-2xl',
    lg: 'w-14 h-14 rounded-3xl',
  }[size];

  const titleSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-4xl sm:text-5xl',
  }[size];

  return (
    <div className="flex items-center gap-3 group">
      {/* Professional Brand Emblem SVG */}
      <div className={`${iconSizes} bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform shrink-0 relative overflow-hidden p-2`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sound waves & Smile */}
          <path d="M10 14C10 10.6863 12.6863 8 16 8H24C27.3137 8 30 10.6863 30 14V22C30 25.3137 27.3137 28 24 28H15L10 32V27.5C10 27.5 10 23.5 10 22V14Z" fill="white" fillOpacity="0.25" />
          <rect x="14" y="15" width="2.5" height="8" rx="1.25" fill="white" />
          <rect x="18.5" y="12" width="2.5" height="14" rx="1.25" fill="#FDE047" />
          <rect x="23" y="15" width="2.5" height="8" rx="1.25" fill="white" />
          <circle cx="28" cy="10" r="2" fill="#FDE047" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        {/* Arabic Platform Title with sufficient padding to prevent letter "ق" tail clipping */}
        <span className={`font-black ${titleSizes} tracking-normal bg-gradient-to-l from-indigo-900 via-purple-700 to-pink-600 bg-clip-text text-transparent leading-[1.3] pb-1 px-1 overflow-visible inline-block select-none`}>
          نُـطْـق
        </span>
        {showSlogan && (
          <span className="text-[10px] sm:text-xs text-indigo-600 font-bold -mt-0.5 hidden sm:inline tracking-normal select-none">
            منصة الذكاء الاصطناعي لتأهيل الأطفال
          </span>
        )}
      </div>
    </div>
  );
}
