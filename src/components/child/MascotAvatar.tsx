'use client';

import React from 'react';

interface MascotAvatarProps {
  state: 'idle' | 'speaking' | 'listening' | 'celebrating';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function MascotAvatar({ state = 'idle', size = 'md', className = '' }: MascotAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 sm:w-36 sm:h-36',
    lg: 'w-40 h-40 sm:w-48 sm:h-48',
    xl: 'w-56 h-56 sm:w-64 sm:h-64',
  }[size];

  const stateColors = {
    idle: 'from-amber-400 to-orange-400 border-amber-300',
    speaking: 'from-indigo-500 to-purple-500 border-indigo-400 animate-pulse',
    listening: 'from-emerald-400 to-teal-500 border-emerald-300 ring-4 ring-emerald-200 animate-bounce',
    celebrating: 'from-pink-500 to-yellow-400 border-yellow-300 scale-105',
  }[state];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* Glow Backdrop */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-40 bg-gradient-to-tr ${stateColors}`} />

      {/* Main Mascot Container */}
      <div className={`relative ${sizeClasses} rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-300 shadow-xl flex items-center justify-center overflow-hidden transition-all duration-300`}>
        
        {/* Mascot Bear Ears */}
        <div className="absolute -top-1 left-3 w-7 h-7 sm:w-9 sm:h-9 bg-amber-300 rounded-full border-2 border-amber-400 flex items-center justify-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink-300 rounded-full" />
        </div>
        <div className="absolute -top-1 right-3 w-7 h-7 sm:w-9 sm:h-9 bg-amber-300 rounded-full border-2 border-amber-400 flex items-center justify-center">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink-300 rounded-full" />
        </div>

        {/* Mascot Face */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Eyes */}
          <div className="flex items-center gap-6 sm:gap-8 mb-2">
            {state === 'celebrating' ? (
              <>
                <span className="text-xl sm:text-2xl font-black text-amber-900">^</span>
                <span className="text-xl sm:text-2xl font-black text-amber-900">^</span>
              </>
            ) : state === 'listening' ? (
              <>
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-900 rounded-full ring-2 ring-emerald-400 animate-ping" />
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-900 rounded-full ring-2 ring-emerald-400 animate-ping" />
              </>
            ) : (
              <>
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-900 rounded-full flex items-start justify-end p-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-slate-900 rounded-full flex items-start justify-end p-0.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </>
            )}
          </div>

          {/* Rosy Cheeks */}
          <div className="flex items-center justify-between w-16 sm:w-20 -my-1">
            <div className="w-3 h-2 bg-pink-400/60 rounded-full blur-[1px]" />
            <div className="w-3 h-2 bg-pink-400/60 rounded-full blur-[1px]" />
          </div>

          {/* Nose & Snout */}
          <div className="w-7 h-5 sm:w-8 sm:h-6 bg-white/80 rounded-full flex flex-col items-center justify-center shadow-2xs mt-1">
            <div className="w-3 h-2 bg-amber-950 rounded-full mb-0.5" />
            
            {/* Mouth */}
            {state === 'speaking' ? (
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
            ) : state === 'celebrating' ? (
              <div className="w-4 h-2.5 border-b-2 border-amber-950 rounded-b-full bg-rose-400" />
            ) : (
              <div className="w-2.5 h-1 border-b-2 border-amber-950 rounded-b-full" />
            )}
          </div>
        </div>

        {/* State Badge Tooltip */}
        <div className="absolute bottom-1 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black shadow-xs">
          {state === 'speaking' && <span className="text-indigo-600">يتكلم الآن 🗣️</span>}
          {state === 'listening' && <span className="text-emerald-600">يسمعك يا بطل 👂</span>}
          {state === 'celebrating' && <span className="text-amber-600">فرحان بيك! 🎉</span>}
          {state === 'idle' && <span className="text-gray-600">جاهز معك ⭐</span>}
        </div>
      </div>
    </div>
  );
}
