'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff, ShieldCheck, FileCheck, Gift, Smartphone, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, BookOpen, MessageSquare, Camera, Zap } from 'lucide-react';
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
  const [guideStep, setGuideStep] = useState<number>(0);

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
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pakgreen-900 via-pakgreen-800 to-pakgreen-950 text-white p-5 sm:p-10 lg:p-12 shadow-2xl border border-pakgreen-700/80">
        {/* Background Decorative Shield Pattern */}
        <div className="absolute -right-10 -bottom-10 opacity-10 text-pakgold-400 pointer-events-none">
          <ShieldCheck className="w-96 h-96" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5">
          {/* Subdued Digital First Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pakgreen-800/90 border border-pakgreen-600/90 text-pakgold-300 text-[11px] sm:text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-pakgold-400 animate-pulse" />
            <span>100% Digital-First Navigator — Zero Office Visits Required!</span>
          </div>

          {/* Primary Hero Title - Dominant Hierarchy */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-4xl mx-auto">
            {lang === 'ur'
              ? 'پاکستان کی تمام حکومتی خدمات حاصل کریں 100% آن لائن گھر بیٹھے!'
              : lang === 'ro'
              ? 'Pakistani Government Services 100% Online Ghar Baithay Hasil Karein!'
              : 'Access Pakistani Government Services 100% Digitally From Home!'}
          </h1>

          {/* PRIMARY CTA: ELEVATED SEARCH & VOICE HUB BAR (IMMEDIATELY ACCESSIBLE ABOVE THE FOLD) */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-3xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border-2 border-pakgold-500 focus-within:ring-4 focus-within:ring-pakgold-400/40 transition-all">
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
                className="shrink-0 px-4 sm:px-6 py-3.5 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-extrabold rounded-xl text-sm transition-all flex items-center gap-1.5 shadow"
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
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
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

          {/* Sub-heading with Constrained Line Length (max-w-2xl mx-auto) */}
          <p className="text-xs sm:text-sm text-pakgreen-100 max-w-2xl mx-auto leading-relaxed pt-2">
            {lang === 'ur'
              ? 'نادرا پاک آئی ڈی ایپ، وزیراعلیٰ مریم نواز دستک ڈور اسٹیپ سروس، پاسپورٹ فیس آسان اور ای پے پنجاب سے 100% آن لائن کام کروائیں—کسی ایجنٹ یا دفتر جانے کی ضرورت نہیں۔'
              : lang === 'ro'
              ? 'Pak Identity App, Dastak by CM Maryam Nawaz, Passport Fee Asan aur e-Pay Punjab se 100% online kaam karwayein—Zero office visits!'
              : 'Discover 100% digital app methods: Pak Identity camera biometrics, Dastak Doorstep by CM Maryam Nawaz (1202), Passport Fee Asan, and e-Pay Punjab. Zero agent commission!'}
          </p>

          {/* Audio TTS Button */}
          <div className="flex justify-center pt-1">
            <SuniyeButton
              textToSpeak={`${t('heroTitle')}. ${t('heroSubtitle')}`}
              variant="hero"
            />
          </div>
        </div>
      </section>

      {/* 4 PRIMARY FEATURE CARDS */}
      <section className="space-y-4 pt-4 sm:pt-6">
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
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-scamred-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-pakgold-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-pakgreen-600 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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
            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-blue-500 cursor-pointer transition-all duration-300 flex flex-col justify-between"
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

      {/* INTERACTIVE 4-SCREEN PAKGUIDE APP TUTORIAL & HOW-TO SECTION */}
      <section className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 bg-pakgreen-800 text-pakgold-400 rounded-2xl shadow-sm">
                <BookOpen className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {lang === 'ur'
                      ? 'پاک گائیڈ ایپ استعمال کرنے کا طریقہ'
                      : lang === 'ro'
                      ? 'PakGuide App Kaise Use Karein?'
                      : 'How to Use PakGuide AI App'}
                  </h2>
                  <span className="text-[10px] font-black px-2.5 py-0.5 bg-pakgold-500 text-slate-950 rounded-full uppercase tracking-wider hidden sm:inline-block">
                    Interactive Guide (4 Screens)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Click through the 4 interactive guide screens below to master AI Navigator, Phishing Radar, Subsidy Matcher, and Official Apps.
                </p>
              </div>
            </div>
          </div>

          {/* Active Screen Badge Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 text-white rounded-full text-xs font-mono font-bold shadow-md shrink-0">
            <span className="w-2 h-2 rounded-full bg-pakgold-400 animate-pulse" />
            <span>Screen {guideStep + 1} of 4</span>
          </div>
        </div>

        {/* 4 Interactive Screen Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setGuideStep(0)}
            className={`px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              guideStep === 0
                ? 'bg-pakgreen-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-pakgold-400 shrink-0" />
            <span className="truncate">1. AI Navigator</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideStep(1)}
            className={`px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              guideStep === 1
                ? 'bg-scamred-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="truncate">2. Phishing Radar</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideStep(2)}
            className={`px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              guideStep === 2
                ? 'bg-pakgold-500 text-slate-950 shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span className="truncate">3. Subsidy Matcher</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideStep(3)}
            className={`px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 ${
              guideStep === 3
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span className="truncate">4. Verified Apps</span>
          </button>
        </div>

        {/* Dynamic Screen Guide Content Cards */}
        <div className="p-5 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
          {/* SCREEN 1: AI NAVIGATOR */}
          {guideStep === 0 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-pakgreen-800 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Screen 1 of 4: AI Navigator (Smart Queries & Procedure Guides)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Ask questions about CNIC renewal, Passport fees, Land Fard, or Domicile certificates in English, Urdu, or Roman Urdu. Get immediate step-by-step instructions, official PKR fee tables, and Play Store app buttons right inside the chatbox!
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('navigator')}
                  className="px-4 py-2 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-pakgold-400" />
                  <span>
                    {lang === 'ur'
                      ? 'ابھی AI نیویگیٹر استعمال کریں'
                      : lang === 'ro'
                      ? 'Abhi AI Navigator Use Karein'
                      : 'Use AI Navigator Now'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800 text-sm">
                    <span className="w-6 h-6 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Type Any Query</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Type your query in English, Urdu, or Roman Urdu (e.g. "Smart CNIC renewal fee" or "Urgent Passport price").
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800 text-sm">
                    <span className="w-6 h-6 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Voice Speech Input</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Click the glowing Mic icon to speak naturally in Urdu or English to ask questions completely hands-free.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800 text-sm">
                    <span className="w-6 h-6 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>View Official Fee Breakdown</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Get official PKR fee tables (Normal, Urgent, Executive) along with delivery time estimates.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800 text-sm">
                    <span className="w-6 h-6 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    <span>Direct App Download</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Click clean Google Play or App Store download buttons displayed directly inside the chat response.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: PHISHING RADAR */}
          {guideStep === 1 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-6 h-6 text-scamred-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Screen 2 of 4: Phishing Radar (SMS & WhatsApp Scam Scanner)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Protect yourself from fake BISP 8171 SMS messages, fraudulent Kisan Card links, and fake lottery sites claiming to be government portals.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('phishing')}
                  className="px-4 py-2 bg-scamred-600 hover:bg-scamred-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-white" />
                  <span>
                    {lang === 'ur'
                      ? 'ابھی فِشنگ ریڈار استعمال کریں'
                      : lang === 'ro'
                      ? 'Abhi Phishing Radar Use Karein'
                      : 'Use Phishing Radar Now'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-scamred-600 text-sm">
                    <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Copy Suspicious Link</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Copy any link received via SMS, WhatsApp, or Facebook claiming to be BISP 8171, Kisan Card, or NADRA.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-scamred-600 text-sm">
                    <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>Scan with AI Radar</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Paste into Phishing Radar for instant Priority 1 official whitelist regex + Priority 2 AI heuristic security scan.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-scamred-600 text-sm">
                    <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>Review Threat Verdict</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    View structured threat score cards, domain authenticity details, and official government portal links.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-scamred-600 text-sm">
                    <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    <span>Report to FIA (1991)</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    If flagged as critical scam, click 'Report to FIA Cybercrime' to log the fraud portal with NR3C wing.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: SUBSIDY MATCHER */}
          {guideStep === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <Gift className="w-6 h-6 text-pakgold-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Screen 3 of 4: Subsidy Matcher (BISP, Kisan Card & PM Loans)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Find Government of Pakistan financial relief schemes, agricultural subsidies, and youth business loans matching your demographic profile.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('matcher')}
                  className="px-4 py-2 bg-pakgold-500 hover:bg-pakgold-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-slate-950" />
                  <span>
                    {lang === 'ur'
                      ? 'ابھی سبسڈی میچر استعمال کریں'
                      : lang === 'ro'
                      ? 'Abhi Subsidy Matcher Use Karein'
                      : 'Use Subsidy Matcher Now'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgold-600 text-sm">
                    <span className="w-6 h-6 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">1</span>
                    <span>Fill Profile Details</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Enter your monthly household income, employment type (Farmer, Housewife, Unemployed), and province.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgold-600 text-sm">
                    <span className="w-6 h-6 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">2</span>
                    <span>Instant Eligibility Calculation</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    AI matches your profile against BISP 8171 Kafaalat, Punjab Kisan Card, PM Youth Loan, and Scholarships.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgold-600 text-sm">
                    <span className="w-6 h-6 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">3</span>
                    <span>View Payout Amounts</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    See exact PKR payout amounts (e.g. PKR 10,500/quarter BISP or PKR 150,000 Kisan Card credit line).
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgold-600 text-sm">
                    <span className="w-6 h-6 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">4</span>
                    <span>Apply via Official Portal</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Click direct verified government registration portal links to submit your application safely online.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: VERIFIED APPS */}
          {guideStep === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">
                      Screen 4 of 4: Verified Apps Directory (Official Store Links)
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Browse genuine government mobile applications from Google Play and Apple App Store without downloading risky third-party APKs.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('apps')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-white" />
                  <span>
                    {lang === 'ur'
                      ? 'ابھی تصدیق شدہ ایپس استعمال کریں'
                      : lang === 'ro'
                      ? 'Abhi Verified Apps Use Karein'
                      : 'Use Verified Apps Directory Now'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Browse Official Catalogue</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Browse verified apps for Pak Identity (NADRA), Dastak 1202 Doorstep, PassTrack, and e-Pay Punjab.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    <span>View Operating Guides</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Click 'Open Step-by-Step Operating Guide' for prerequisites, biometric steps, and common submission mistakes.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                    <span>Check Verified Package ID</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Verify official developer packages (e.g. pk.gov.nadra.pakidentity) to ensure zero malware or fake apps.
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-blue-600 text-sm">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                    <span>One-Click Store Install</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Click clean Google Play or App Store buttons to open the official app store listing directly on your phone.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM STEP PAGINATION & NAVIGATION CONTROLS */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            {/* Step Indicators */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-600">
                Screen {guideStep + 1} of 4
              </span>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setGuideStep(step)}
                    className={`h-2.5 rounded-full transition-all ${
                      guideStep === step
                        ? 'w-7 bg-pakgreen-800'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Go to Screen ${step + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Pagination & Dynamic Tool Launch Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              {/* Dynamic Use This Tool Now Button */}
              <button
                type="button"
                onClick={() => {
                  if (guideStep === 0) onNavigate('navigator');
                  else if (guideStep === 1) onNavigate('phishing');
                  else if (guideStep === 2) onNavigate('matcher');
                  else onNavigate('apps');
                }}
                className={`px-4 py-2.5 font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 ${
                  guideStep === 0
                    ? 'bg-pakgreen-800 hover:bg-pakgreen-700 text-white'
                    : guideStep === 1
                    ? 'bg-scamred-600 hover:bg-scamred-700 text-white'
                    : guideStep === 2
                    ? 'bg-pakgold-500 hover:bg-pakgold-600 text-slate-950'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>
                  {guideStep === 0 && (lang === 'ur' ? 'ابھی AI نیویگیٹر استعمال کریں' : lang === 'ro' ? 'Use AI Navigator Now' : 'Use AI Navigator Now')}
                  {guideStep === 1 && (lang === 'ur' ? 'ابھی فِشنگ ریڈار استعمال کریں' : lang === 'ro' ? 'Use Phishing Radar Now' : 'Use Phishing Radar Now')}
                  {guideStep === 2 && (lang === 'ur' ? 'ابھی سبسڈی میچر استعمال کریں' : lang === 'ro' ? 'Use Subsidy Matcher Now' : 'Use Subsidy Matcher Now')}
                  {guideStep === 3 && (lang === 'ur' ? 'ابھی تصدیق شدہ ایپس استعمال کریں' : lang === 'ro' ? 'Use Verified Apps Now' : 'Use Verified Apps Directory Now')}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              {guideStep > 0 && (
                <button
                  type="button"
                  onClick={() => setGuideStep(guideStep - 1)}
                  className="px-3.5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold rounded-xl text-xs transition-all flex items-center gap-1"
                >
                  <span>← Previous</span>
                </button>
              )}

              {guideStep < 3 && (
                <button
                  type="button"
                  onClick={() => setGuideStep(guideStep + 1)}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Next Screen ({guideStep + 2}/4)</span>
                  <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                </button>
              )}
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
