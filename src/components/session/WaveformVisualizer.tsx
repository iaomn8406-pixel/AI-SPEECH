'use client';

import React from 'react';

interface WaveformVisualizerProps {
  isListening: boolean;
  className?: string;
}

export default function WaveformVisualizer({ isListening, className = '' }: WaveformVisualizerProps) {
  return (
    <div className={`flex items-center justify-center gap-1.5 h-10 ${className}`}>
      {[40, 75, 95, 60, 85, 50, 90, 65, 45].map((height, idx) => (
        <span
          key={idx}
          className={`w-1.5 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-gradient-to-t from-emerald-500 to-teal-400 animate-pulse'
              : 'bg-gray-200 h-2'
          }`}
          style={{
            height: isListening ? `${height}%` : '8px',
            animationDelay: `${idx * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
}
