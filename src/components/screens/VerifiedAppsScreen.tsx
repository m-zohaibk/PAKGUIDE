'use client';

import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  ShieldCheck,
  Download,
  ExternalLink,
  Filter,
  CheckCircle2,
  BookOpen,
  X,
  Info,
  CheckSquare,
  AlertTriangle,
  PhoneCall,
  Video,
  Sparkles,
  ChevronRight,
  Search,
  Copy,
  Check,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { AppIcon } from '@/components/common/AppIcon';
import { VERIFIED_APPS } from '@/data/pakistanGovData';
import { VerifiedApp } from '@/types';
import { fetchAppsFromFirestore } from '@/lib/firebase/firestoreService';

export const VerifiedAppsScreen: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedPackageId, setCopiedPackageId] = useState<string | null>(null);
  const [selectedAppForGuide, setSelectedAppForGuide] = useState<VerifiedApp | null>(null);
  const [guideTab, setGuideTab] = useState<'steps' | 'overview' | 'prereqs' | 'pitfalls'>('steps');
  const [cloudApps, setCloudApps] = useState<VerifiedApp[]>(VERIFIED_APPS);

  useEffect(() => {
    fetchAppsFromFirestore().then((apps) => {
      if (apps && apps.length > 0) {
        setCloudApps(apps);
      }
    });
  }, []);

  const handleCopyPackage = (packageName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(packageName);
    setCopiedPackageId(packageName);
    setTimeout(() => setCopiedPackageId(null), 2500);
  };

  const filteredApps = cloudApps.filter((app) => {
    const matchesJurisdiction =
      selectedJurisdiction === 'All' ||
      app.jurisdiction.toLowerCase() === selectedJurisdiction.toLowerCase();

    const matchesCategory =
      selectedCategory === 'All' ||
      app.category.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      app.name.toLowerCase().includes(query) ||
      app.nameUrdu.includes(query) ||
      app.provider.toLowerCase().includes(query) ||
      app.packageName.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query);

    return matchesJurisdiction && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* HERO BANNER - MOBILE FIRST OPTIMIZED */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-pakgreen-950 text-white p-6 sm:p-10 shadow-2xl border border-blue-900/80 space-y-6">
        <div className="absolute -right-8 -bottom-8 opacity-10 text-blue-400 pointer-events-none">
          <Smartphone className="w-80 h-80" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/90 border border-blue-700 text-blue-200 text-xs font-bold shadow-inner">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Official Android & iOS App Directory</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pakgold-500/20 border border-pakgold-500/40 text-pakgold-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-pakgold-400 animate-pulse" />
              <span>Zero Fake APK Malware Assurance</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {lang === 'ur'
              ? 'پاکستان کے آفیشل باضابطہ حکومتی موبائل ایپس ڈائریکٹری'
              : lang === 'ro'
              ? 'Pakistan Ke Official Certified Government Mobile Apps Directory'
              : 'Pakistan Official Certified Government Apps Directory'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ur'
              ? 'جعلی ایپس اور فیک لنکس سے بچیں۔ نادرا پاک آئی ڈی، مریم نواز دستک، پاسپورٹ فیس آسان، اور ای پے پنجاب کی آفیشل پلے اسٹور لنکس اور 100% طریقہ کار حاصل کریں۔'
              : lang === 'ro'
              ? 'Fake apps se bachein! Pak Identity, Dastak by CM Maryam Nawaz, Passport Fee Asan, aur e-Pay Punjab ke verified Play Store links aur complete guides paayein.'
              : 'Avoid scam apps and fake phishing APK downloads. Discover official Google Play & App Store links, authentic package names, and complete operating guides for Pak-Identity, Dastak, Passport Fee Asan, e-Pay Punjab, and PCP.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <SuniyeButton
              textToSpeak={`${t('appsTitle')}. ${t('appsSub')}`}
              variant="hero"
            />
          </div>
        </div>
      </div>

      {/* MOBILE-OPTIMIZED SEARCH & DUAL FILTERING CONTROLS */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-lg space-y-4">
        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === 'ur'
                ? 'ایپ کا نام، نادرا، پاسپورٹ، دستک یا پیکیج آئی ڈی تلاش کریں...'
                : 'Search app name, NADRA, Dastak, e-Pay, or package id (e.g. pk.gov.nadra)...'
            }
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pakgreen-800 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Row 1: Jurisdiction Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 shrink-0">
            <Filter className="w-4 h-4 text-pakgreen-800" />
            <span>Jurisdiction:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold no-scrollbar py-1">
            {['All', 'Federal', 'Punjab', 'Sindh', 'KP', 'ICT'].map((juris) => (
              <button
                key={juris}
                onClick={() => setSelectedJurisdiction(juris)}
                className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  selectedJurisdiction === juris
                    ? 'bg-pakgreen-800 text-white font-bold shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {juris === 'All' ? 'All Areas' : juris}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Row 2: Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold no-scrollbar py-1">
          <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {[
            { id: 'All', label: 'All Categories' },
            { id: 'Identity', label: 'Identity & NADRA' },
            { id: 'Municipal', label: 'Doorstep & Municipal' },
            { id: 'Payments & Taxes', label: 'Payments & Taxes' },
            { id: 'Police & Safety', label: 'Police & Safety' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-pakgold-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* APPS RESULTS COUNT & STATUS */}
      <div className="flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
        <span>Showing {filteredApps.length} Verified Government Apps</span>
        <span className="text-emerald-700 flex items-center gap-1 font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All Play Store Package IDs Authenticated</span>
        </span>
      </div>

      {/* APPS GRID LAYOUT - MOBILE FIRST RESPONSIVE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden"
          >
            {/* Top Security Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pakgreen-700 via-pakgold-500 to-pakgreen-900"></div>

            <div className="space-y-4 pt-1">
              {/* App Icon & Provider Info Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AppIcon appId={app.id} iconBg={app.iconBg} />
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-pakgreen-800 transition-colors leading-snug">
                      {lang === 'ur' ? app.nameUrdu : app.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{app.provider}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-lg uppercase tracking-wider shrink-0">
                  {app.jurisdiction}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                {lang === 'ur' ? app.descriptionUrdu : app.description}
              </p>

              {/* Verified Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] font-bold text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{app.verificationBadge}</span>
              </div>

              {/* Copyable Android Package Name Hash Box */}
              <div
                onClick={(e) => handleCopyPackage(app.packageName, e)}
                title="Click to copy official Play Store package name"
                className="p-2.5 bg-slate-950 text-slate-200 rounded-xl flex items-center justify-between text-[11px] font-mono border border-slate-800 cursor-pointer hover:border-pakgold-500/60 transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-slate-500 text-[10px]">ID:</span>
                  <span className="text-pakgold-300 font-bold truncate">{app.packageName}</span>
                </div>
                {copiedPackageId === app.packageName ? (
                  <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <span className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] shrink-0">
                    <Copy className="w-3 h-3" /> Copy
                  </span>
                )}
              </div>
            </div>

            {/* ACTION BUTTON ROW */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              {/* Detailed Operating Guide Button */}
              <button
                onClick={() => {
                  setSelectedAppForGuide(app);
                  setGuideTab('steps');
                }}
                className="w-full py-3 bg-pakgreen-800 hover:bg-pakgreen-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-pakgreen-900/20 transition-all"
              >
                <BookOpen className="w-4 h-4 text-pakgold-400" />
                <span>Open Step-by-Step Operating Guide</span>
                <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>

              {/* Dual Store Links */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-pakgold-400" />
                  <span>Google Play</span>
                </a>

                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all border border-slate-200"
                >
                  <span>Apple Store</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED APP OPERATING GUIDE MODAL DRAWER */}
      {selectedAppForGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pakgreen-900 via-pakgreen-800 to-pakgreen-950 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-pakgreen-700">
              <div className="flex items-center gap-3">
                <AppIcon appId={selectedAppForGuide.id} iconBg={selectedAppForGuide.iconBg} size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-lg sm:text-xl leading-tight">
                      {lang === 'ur' ? selectedAppForGuide.nameUrdu : selectedAppForGuide.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pakgold-500 text-slate-950 rounded-full">
                      {selectedAppForGuide.verificationBadge}
                    </span>
                  </div>
                  <p className="text-xs text-pakgreen-200 mt-0.5">
                    Official Step-by-Step Operating Manual & Security Standard
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedAppForGuide(null)}
                className="p-2 rounded-xl hover:bg-pakgreen-700 text-pakgreen-200 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Navigation Tabs - Touch Responsive Horizontal Scroll */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs font-bold no-scrollbar">
              <button
                onClick={() => setGuideTab('steps')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  guideTab === 'steps'
                    ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-pakgold-400" />
                <span>1. Step-by-Step Method</span>
              </button>

              <button
                onClick={() => setGuideTab('overview')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  guideTab === 'overview'
                    ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Info className="w-3.5 h-3.5 text-blue-400" />
                <span>2. Features & Overview</span>
              </button>

              <button
                onClick={() => setGuideTab('prereqs')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  guideTab === 'prereqs'
                    ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. Prerequisites & Helpline</span>
              </button>

              <button
                onClick={() => setGuideTab('pitfalls')}
                className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  guideTab === 'pitfalls'
                    ? 'bg-scamred-600 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-300" />
                <span>4. Anti-Phishing & Safety</span>
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1">
              {/* TAB 1: STEP BY STEP OPERATING METHOD */}
              {guideTab === 'steps' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-pakgreen-800" />
                        <span>Official Operating Instructions</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        Follow these exact steps inside the app to complete your service
                      </p>
                    </div>

                    <SuniyeButton
                      textToSpeak={selectedAppForGuide.detailedGuide.stepByStepInstructions
                        .map((s) => `Step ${s.stepNumber}: ${s.title}. ${s.description}`)
                        .join('. ')}
                      variant="pill"
                    />
                  </div>

                  <div className="space-y-4">
                    {selectedAppForGuide.detailedGuide.stepByStepInstructions.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 relative hover:border-pakgreen-600 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-pakgreen-800 text-pakgold-400 font-extrabold text-xs flex items-center justify-center shrink-0 shadow">
                            {step.stepNumber}
                          </span>
                          <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                            {lang === 'ur' ? step.titleUrdu : step.title}
                          </h5>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-10">
                          {lang === 'ur' ? step.descriptionUrdu : step.description}
                        </p>

                        {step.proTip && (
                          <div className="ml-10 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs flex items-start gap-2 font-medium shadow-inner">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-amber-900 font-bold">Pro Tip:</strong> {step.proTip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: OVERVIEW & KEY FEATURES */}
              {guideTab === 'overview' && (
                <div className="space-y-6">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-2">
                    <h4 className="font-extrabold text-sm text-emerald-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-emerald-700" />
                      <span>Official App Overview</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-emerald-900">
                      {lang === 'ur'
                        ? selectedAppForGuide.detailedGuide.overviewUrdu
                        : selectedAppForGuide.detailedGuide.overview}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm">Key Features & Capabilities:</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {(lang === 'ur'
                        ? selectedAppForGuide.detailedGuide.keyFeaturesUrdu
                        : selectedAppForGuide.detailedGuide.keyFeatures
                      ).map((feat, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-3">
                          <CheckSquare className="w-4 h-4 text-pakgreen-800 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Tutorial Card */}
                  <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800 shadow-lg">
                    <div className="flex items-center gap-2 text-pakgold-400 font-bold text-xs uppercase tracking-wider">
                      <Video className="w-4 h-4 text-pakgold-400" />
                      <span>YouTube Demonstration Summary</span>
                    </div>
                    <h5 className="font-bold text-sm text-white">
                      {selectedAppForGuide.detailedGuide.videoGuideTitle}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedAppForGuide.detailedGuide.videoGuideSummary}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: PREREQUISITES & HELPLINES */}
              {guideTab === 'prereqs' && (
                <div className="space-y-5">
                  <h4 className="font-extrabold text-base text-slate-900">
                    Required Hardware & Papers Before Opening App:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(lang === 'ur'
                      ? selectedAppForGuide.detailedGuide.prerequisitesUrdu
                      : selectedAppForGuide.detailedGuide.prerequisites
                    ).map((req, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-pakgreen-50 border border-pakgreen-200 rounded-2xl text-xs text-pakgreen-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-slate-900">Official Government Support Helpline:</span>
                      <p className="text-slate-600 text-[11px]">Toll-free direct call for app issues</p>
                    </div>
                    <span className="font-bold font-mono text-pakgreen-900 text-sm flex items-center gap-2 px-3 py-1.5 bg-white border border-pakgreen-300 rounded-xl shadow-sm">
                      <PhoneCall className="w-4 h-4 text-pakgreen-800" />
                      <span>{selectedAppForGuide.detailedGuide.officialHelpline}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 4: ANTI-PHISHING & SAFETY TIPS */}
              {guideTab === 'pitfalls' && (
                <div className="space-y-5">
                  <div className="p-5 bg-red-50 border border-red-200 rounded-2xl text-red-950 space-y-3 shadow-inner">
                    <h4 className="font-extrabold text-sm text-red-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>Anti-Malware & Security Assurance:</span>
                    </h4>

                    <p className="text-xs text-red-800 leading-relaxed">
                      Scammers create fake clones of government apps on unofficial websites and WhatsApp groups to steal bank account details and CNIC pictures. Always verify the Play Store Package Name before installing!
                    </p>

                    <div className="space-y-2 pt-2">
                      <h5 className="font-bold text-xs text-red-950">Safety Guidelines & Pitfalls to Avoid:</h5>
                      <ul className="space-y-2 text-xs">
                        {(lang === 'ur'
                          ? selectedAppForGuide.detailedGuide.commonMistakesToAvoidUrdu
                          : selectedAppForGuide.detailedGuide.commonMistakesToAvoid
                        ).map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 font-medium text-red-900">
                            <span className="text-red-600 font-bold">•</span>
                            <span className="leading-relaxed">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl space-y-2 text-xs border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">Official Play Store Package ID:</span>
                      <span className="font-mono text-pakgold-300 font-bold">{selectedAppForGuide.packageName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      When downloading from Google Play Store, match the URL details ID parameter with the string above.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Direct Download CTAs */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs font-mono text-slate-500 truncate max-w-xs">
                Package: <span className="text-pakgreen-800 font-bold">{selectedAppForGuide.packageName}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedAppForGuide(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
                >
                  Close Guide
                </button>

                <a
                  href={selectedAppForGuide.playStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-5 py-2.5 bg-pakgreen-800 hover:bg-pakgreen-900 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-pakgold-400" />
                  <span>Download on Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
