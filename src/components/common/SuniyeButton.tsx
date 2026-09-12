'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ttsController } from '@/lib/audio/speech';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface SuniyeButtonProps {
  textToSpeak: string;
  className?: string;
  variant?: 'pill' | 'compact' | 'hero';
}

export const SuniyeButton: React.FC<SuniyeButtonProps> = ({
  textToSpeak,
  className = '',
  variant = 'pill'
}) => {
  const { lang, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup audio on unmount
      if (isPlaying) {
        ttsController.stop();
      }
    };
  }, [isPlaying]);

  const handleToggle = () => {
    if (isPlaying) {
      ttsController.stop();
      setIsPlaying(false);
    } else {
      ttsController.speak(
        textToSpeak,
        lang,
        () => setIsPlaying(true),
        () => setIsPlaying(false),
        (err) => {
          console.warn('TTS error:', err);
          setIsPlaying(false);
        }
      );
    }
  };

  const label = isPlaying
    ? t('stopAudio')
    : lang === 'ur'
    ? 'سنیں / Listen'
    : lang === 'ro'
    ? 'Suniye / Listen'
    : 'Listen (Suniye)';

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        title={label}
        className={`inline-flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
          isPlaying
            ? 'bg-pakgold-500 text-pakgreen-950 animate-bounce'
            : 'bg-emerald-50 text-pakgreen-800 hover:bg-emerald-100 border border-emerald-200'
        } ${className}`}
      >
        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={handleToggle}
        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all duration-300 ${
          isPlaying
            ? 'bg-pakgold-500 text-slate-950 ring-4 ring-pakgold-300 scale-105'
            : 'bg-pakgold-600 hover:bg-pakgold-500 text-white shadow-pakgold-600/30'
        } ${className}`}
      >
        {isPlaying ? (
          <>
            <VolumeX className="w-5 h-5 animate-spin" />
            <span>{label}</span>
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5" />
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{label}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
        isPlaying
          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm animate-pulse'
          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200 hover:border-emerald-300'
      } ${className}`}
    >
      {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
      <span>{label}</span>
    </button>
  );
};
