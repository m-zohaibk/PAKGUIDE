'use client';

import React from 'react';
import { Shield, BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { NavScreen } from '@/types';

interface NavbarProps {
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onOpenApiKey: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  onOpenApiKey,
  onOpenGuide,
}) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-pakgreen-800 text-white shadow-lg border-b border-pakgreen-700">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* Shield Crest Logo */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-pakgreen-700 group-hover:bg-pakgreen-600 rounded-2xl flex items-center justify-center text-pakgold-400 border border-pakgreen-600 shadow-inner transition-all duration-300">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 animate-shield-glow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-base sm:text-xl tracking-tight text-white group-hover:text-pakgold-300 transition-colors truncate">
                PakGuide AI
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-pakgold-500 text-slate-950 rounded-full uppercase tracking-wider hidden sm:inline-block shadow-sm">
                .gov.pk
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-pakgreen-200 font-urdu leading-none truncate">پاک گائیڈ اے آئی | پاسپورٹ، نادرا، فرد</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 ml-auto">
          {/* 3-Way Language Selector */}
          <div className="relative inline-flex bg-pakgreen-900/80 p-1 rounded-xl border border-pakgreen-700/80 text-xs font-semibold">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en'
                  ? 'bg-pakgold-500 text-slate-950 font-bold shadow-sm'
                  : 'text-pakgreen-200 hover:text-white'
              }`}
            >
              <span className="sm:hidden">EN</span><span className="hidden sm:inline">English</span>
            </button>
            <button
              onClick={() => setLang('ur')}
              className={`px-2.5 py-1 rounded-lg font-urdu transition-all ${
                lang === 'ur'
                  ? 'bg-pakgold-500 text-slate-950 font-bold shadow-sm'
                  : 'text-pakgreen-200 hover:text-white'
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLang('ro')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'ro'
                  ? 'bg-pakgold-500 text-slate-950 font-bold shadow-sm'
                  : 'text-pakgreen-200 hover:text-white'
              }`}
            >
              <span className="sm:hidden">RO</span><span className="hidden sm:inline">Roman Urdu</span>
            </button>
          </div>

          {/* Guide Button */}
          <button
            onClick={onOpenGuide}
            title={t('userGuide')}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-pakgreen-700/60 hover:bg-pakgreen-700 text-pakgold-300 border border-pakgreen-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden md:inline">{t('userGuide')}</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-pakgreen-900/90 border-t border-pakgreen-700/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold no-scrollbar">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeScreen === 'dashboard'
                ? 'bg-pakgold-500 text-slate-950 font-bold shadow'
                : 'text-pakgreen-200 hover:bg-pakgreen-800 hover:text-white'
            }`}
          >
            {t('navHome')}
          </button>
          <button
            onClick={() => onNavigate('navigator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeScreen === 'navigator'
                ? 'bg-pakgold-500 text-slate-950 font-bold shadow'
                : 'text-pakgreen-200 hover:bg-pakgreen-800 hover:text-white'
            }`}
          >
            {t('navNavigator')}
          </button>
          <button
            onClick={() => onNavigate('phishing')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1 ${
              activeScreen === 'phishing'
                ? 'bg-scamred-600 text-white font-bold shadow'
                : 'text-pakgreen-200 hover:bg-pakgreen-800 hover:text-white'
            }`}
          >
            <span>{t('navPhishing')}</span>
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          </button>
          <button
            onClick={() => onNavigate('matcher')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeScreen === 'matcher'
                ? 'bg-pakgold-500 text-slate-950 font-bold shadow'
                : 'text-pakgreen-200 hover:bg-pakgreen-800 hover:text-white'
            }`}
          >
            {t('navMatcher')}
          </button>
          <button
            onClick={() => onNavigate('apps')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeScreen === 'apps'
                ? 'bg-pakgold-500 text-slate-950 font-bold shadow'
                : 'text-pakgreen-200 hover:bg-pakgreen-800 hover:text-white'
            }`}
          >
            {t('navApps')}
          </button>
        </div>
      </nav>
    </header>
  );
};
