'use client';

import React from 'react';
import { Shield, Key, BookOpen, UserCheck, Smartphone, Bookmark, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Language, NavScreen, CitizenUser } from '@/types';

interface NavbarProps {
  activeScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  user: CitizenUser;
  onOpenAuth: () => void;
  onOpenApiKey: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeScreen,
  onNavigate,
  user,
  onOpenAuth,
  onOpenApiKey,
  onOpenGuide,
}) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-pakgreen-800 text-white shadow-lg border-b border-pakgreen-700">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Shield Crest Logo */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-pakgreen-700 group-hover:bg-pakgreen-600 rounded-2xl flex items-center justify-center text-pakgold-400 border border-pakgreen-600 shadow-inner transition-all duration-300">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 animate-shield-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-pakgold-300 transition-colors">
                PakGuide AI
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-pakgold-500 text-slate-950 rounded-full uppercase tracking-wider hidden sm:inline-block shadow-sm">
                .gov.pk
              </span>
            </div>
            <p className="text-xs text-pakgreen-200 font-urdu leading-none">پاک گائیڈ اے آئی | پاسپورٹ، نادرا، فرد</p>
          </div>
        </div>

        {/* Action Controls & Auth */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
              English
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
              Roman Urdu
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

          {/* Auth Button */}
          <button
            onClick={onOpenAuth}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
              user.isLoggedIn
                ? 'bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500'
                : 'bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 shadow-pakgold-500/20'
            }`}
          >
            {user.isLoggedIn ? (
              <>
                <UserCheck className="w-4 h-4 text-pakgold-300" />
                <span className="max-w-[90px] truncate">{user.name}</span>
                {user.savedApplications.length > 0 && (
                  <span className="px-1.5 py-0.5 bg-pakgold-400 text-slate-950 text-[10px] font-black rounded-full">
                    {user.savedApplications.length}
                  </span>
                )}
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">{t('loginWithPhone')}</span>
                <span className="sm:hidden">Login</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="bg-pakgreen-900/90 border-t border-pakgreen-700/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 text-xs font-semibold no-scrollbar">
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
