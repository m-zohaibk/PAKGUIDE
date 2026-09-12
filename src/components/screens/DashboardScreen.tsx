'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, ShieldCheck, FileCheck, Gift, Smartphone, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { createSpeechRecognizer } from '@/lib/audio/speech';
import { NavScreen } from '@/types';

interface DashboardScreenProps {
  onNavigate: (screen: NavScreen, query?: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigate }) => {
  const { t, lang, isRtl } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('navigator', searchQuery.trim());
  };

  const handleMicToggle = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setSpeechError(null);
    const recognizer = createSpeechRecognizer(
      lang,
      (text) => {
        setSearchQuery(text);
        setIsListening(false);
      },
      (err) => {
        setSpeechError(err);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      setIsListening(true);
      try {
        recognizer.start();
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 pb-6 sm:pb-8 animate-fadeIn">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pakgreen-900 via-pakgreen-800 to-pakgreen-950 text-white p-4 sm:p-10 lg:p-12 shadow-2xl border border-pakgreen-700/80">
        {/* Background Decorative Shield Pattern */}
        <div className="absolute -right-10 -bottom-10 opacity-10 text-pakgold-400 pointer-events-none">
          <ShieldCheck className="w-96 h-96" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* Digital First Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pakgreen-700/80 border border-pakgreen-600 text-pakgold-300 text-xs font-bold shadow-inner">
            <Sparkles className="w-4 h-4 text-pakgold-400 animate-pulse" />
            <span>100% Digital-First Navigator — Zero Office Visits Required!</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-[1.7rem] sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {lang === 'ur'
              ? 'پاکستان کی تمام حکومتی خدمات حاصل کریں 100% آن لائن گھر بیٹھے!'
              : lang === 'ro'
              ? 'Pakistani Government Services 100% Online Ghar Baithay Hasil Karein!'
              : 'Access Pakistani Government Services 100% Digitally From Home!'}
          </h1>

          {/* Hero Subtitle */}
          <p className="text-sm sm:text-base text-pakgreen-100 max-w-2xl mx-auto leading-relaxed">
            {lang === 'ur'
              ? 'نادرا پاک آئی ڈی ایپ، وزیراعلیٰ مریم نواز دستک ڈور اسٹیپ سروس، پاسپورٹ فیس آسان اور ای پے پنجاب سے 100% آن لائن کام کروائیں—کسی ایجنٹ یا دفتر جانے کی ضرورت نہیں۔'
              : lang === 'ro'
              ? 'Pak Identity App, Dastak by CM Maryam Nawaz, Passport Fee Asan aur e-Pay Punjab se 100% online kaam karwayein—Zero office visits!'
              : 'Discover 100% digital app methods: Pak Identity camera biometrics, Dastak Doorstep by CM Maryam Nawaz (1202), Passport Fee Asan, and e-Pay Punjab. Zero agent commission!'}
          </p>

          {/* Audio TTS Button for Hero */}
          <div className="flex justify-center pt-1">
            <SuniyeButton
              textToSpeak={`${t('heroTitle')}. ${t('heroSubtitle')}`}
              variant="hero"
            />
          </div>

          {/* HERO SEARCH & VOICE HUB BAR */}
          <form onSubmit={handleSearchSubmit} className="pt-4 max-w-3xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border-2 border-pakgold-500/80 focus-within:ring-4 focus-within:ring-pakgold-400/40 transition-all">
              <Search className="w-6 h-6 text-pakgreen-800 shrink-0 ml-3 mr-2" />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full py-3 px-2 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base bg-transparent border-none focus:outline-none font-medium"
              />

              {/* Floating Glowing Mic Button */}
              <button
                type="button"
                onClick={handleMicToggle}
                title={t('micTooltip')}
                className={`relative shrink-0 p-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                  isListening
                    ? 'bg-red-600 text-white animate-pulse-glowing ring-4 ring-red-400'
                    : 'bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 shadow-md shadow-pakgold-500/30'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 animate-bounce" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              <button
                type="submit"
                className="shrink-0 px-3 sm:px-5 py-3.5 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-bold rounded-xl text-sm transition-all flex items-center gap-1.5 shadow"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Listening Feedback */}
            {isListening && (
              <div className="mt-3 p-2.5 bg-red-950/80 border border-red-800 text-red-200 rounded-xl text-xs font-semibold animate-pulse flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                <span>{t('listening')}</span>
              </div>
            )}

            {speechError && (
              <p className="mt-2 text-xs text-amber-300 font-semibold">{speechError}</p>
            )}

            {/* Quick Suggestion Chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-pakgreen-200 font-semibold">{t('heroQuickTip')}</span>
              <button
                type="button"
                onClick={() => onNavigate('navigator', 'Smart CNIC Renewal')}
                className="px-3 py-1 bg-pakgreen-700/60 hover:bg-pakgreen-600 text-pakgold-300 rounded-full border border-pakgreen-600 transition-colors"
              >
                {t('quickCnic')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('navigator', 'Urgent Passport Fee')}
                className="px-3 py-1 bg-pakgreen-700/60 hover:bg-pakgreen-600 text-pakgold-300 rounded-full border border-pakgreen-600 transition-colors"
              >
                {t('quickPassport')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('matcher')}
                className="px-3 py-1 bg-pakgreen-700/60 hover:bg-pakgreen-600 text-pakgold-300 rounded-full border border-pakgreen-600 transition-colors"
              >
                {t('quickKisan')}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('phishing')}
                className="px-3 py-1 bg-scamred-600/80 hover:bg-scamred-600 text-white rounded-full transition-colors flex items-center gap-1"
              >
                <ShieldAlert className="w-3 h-3" />
                <span>{t('quickPhishing')}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 4 PRIMARY FEATURE CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Primary Civic Command Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select a module below to start your verified government procedure
            </p>
          </div>
          <span className="text-xs font-bold text-pakgreen-800 bg-pakgreen-50 px-3 py-1 rounded-full border border-pakgreen-200">
            4 Verified Modules
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Anti-Scam Phishing Radar */}
          <div
            onClick={() => onNavigate('phishing')}
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-scamred-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-red-50 text-scamred-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-red-100 text-scamred-700 rounded-full uppercase tracking-wider">
                  {t('card1Badge')}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-scamred-600 transition-colors">
                  {t('card1Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('card1Subtitle')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <SuniyeButton
                textToSpeak={`${t('card1Title')}. ${t('card1Subtitle')}`}
                variant="compact"
              />
              <span className="text-xs font-bold text-scamred-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Scan Link <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </div>

          {/* Card 2: Subsidy & Grant Matcher */}
          <div
            onClick={() => onNavigate('matcher')}
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-pakgold-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-amber-50 text-pakgold-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Gift className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full uppercase tracking-wider">
                  {t('card2Badge')}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-pakgold-600 transition-colors">
                  {t('card2Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('card2Subtitle')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <SuniyeButton
                textToSpeak={`${t('card2Title')}. ${t('card2Subtitle')}`}
                variant="compact"
              />
              <span className="text-xs font-bold text-pakgold-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Match Schemes <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </div>

          {/* Card 3: Interactive Service Roadmaps */}
          <div
            onClick={() => onNavigate('navigator')}
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-pakgreen-600 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-emerald-50 text-pakgreen-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileCheck className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-emerald-100 text-pakgreen-900 rounded-full uppercase tracking-wider">
                  {t('card3Badge')}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-pakgreen-800 transition-colors">
                  {t('card3Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('card3Subtitle')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <SuniyeButton
                textToSpeak={`${t('card3Title')}. ${t('card3Subtitle')}`}
                variant="compact"
              />
              <span className="text-xs font-bold text-pakgreen-800 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                View Guides <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </div>

          {/* Card 4: Verified Official App Directory */}
          <div
            onClick={() => onNavigate('apps')}
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-slate-200 hover:border-blue-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-7 h-7" />
                </div>
                <span className="text-[10px] font-extrabold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full uppercase tracking-wider">
                  {t('card4Badge')}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                  {t('card4Title')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('card4Subtitle')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <SuniyeButton
                textToSpeak={`${t('card4Title')}. ${t('card4Subtitle')}`}
                variant="compact"
              />
              <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Browse Directory <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST GUARANTEE BANNER */}
      <section className="bg-gradient-to-r from-pakgreen-900 via-pakgreen-800 to-pakgreen-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-pakgreen-700">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-pakgreen-700/80 rounded-2xl text-pakgold-400 shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-pakgold-300">
              {t('trustGuaranteeTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-pakgreen-100 mt-1 max-w-2xl leading-relaxed">
              {t('trustGuaranteeBody')}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <SuniyeButton
            textToSpeak={`${t('trustGuaranteeTitle')}. ${t('trustGuaranteeBody')}`}
            variant="hero"
          />
        </div>
      </section>

      {/* LIVE STATS BAR */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-pakgreen-800">140+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{t('statPortals')}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-scamred-600">25,000+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{t('statScams')}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-pakgold-600">Rs 120B+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{t('statSubsidies')}</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">1.2M+</div>
          <div className="text-xs text-slate-500 font-semibold mt-1">{t('statCitizens')}</div>
        </div>
      </section>
    </div>
  );
};
