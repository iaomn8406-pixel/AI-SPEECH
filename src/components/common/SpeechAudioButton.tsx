'use client';

import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { speakArabicText } from '@/lib/ai/speech';
import { DemoStore } from '@/lib/demo/demo-store';
import ApiKeyNoticeModal from './ApiKeyNoticeModal';

interface SpeechAudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  title?: string;
}

export default function SpeechAudioButton({
  text,
  size = 'sm',
  className = '',
  title = 'استمع بصوت المعلمة',
}: SpeechAudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Check if API key is active
    if (!DemoStore.hasActiveApiKey()) {
      setShowApiKeyModal(true);
      return;
    }

    if (isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    speakArabicText(text, {
      pitch: 1.25, // Sweet friendly female pitch for kids
      rate: 0.85,
      onEnd: () => setIsPlaying(false),
      onStart: () => setIsPlaying(true),
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 w-7 h-7',
    md: 'p-2 w-9 h-9',
    lg: 'p-2.5 w-11 h-11',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title={title}
        className={`rounded-full flex items-center justify-center transition-all cursor-pointer ${sizeClasses} ${
          isPlaying
            ? 'bg-rose-500 text-white animate-pulse shadow-md ring-2 ring-rose-200'
            : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white shadow-2xs'
        } ${className}`}
      >
        <Volume2 className={iconSizes} />
      </button>

      <ApiKeyNoticeModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        featureName="الاستماع الصوتي الذكي"
      />
    </>
  );
}
