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
  ChevronDown,
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
import { AppStepGuideModal } from '@/components/guide/AppStepGuideModal';
import { AppStepGuideInline } from '@/components/guide/AppStepGuideInline';

const isAppleStoreUrl = (url?: string) => Boolean(url?.includes('apps.apple.com'));
const isGooglePlayUrl = (url?: string) => Boolean(url?.includes('play.google.com'));

export const VerifiedAppsScreen: React.FC = () => {
  const { t, lang, isRtl } = useLanguage();
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedPackageId, setCopiedPackageId] = useState<string | null>(null);
  const [selectedAppForGuide, setSelectedAppForGuide] = useState<VerifiedApp | null>(null);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
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
              ? 'پاکستان کی سرکاری ایپس'
              : lang === 'ro'
              ? 'Pakistan Ke Official Certified Government Mobile Apps Directory'
              : 'Official Government Apps'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {lang === 'ur'
              ? 'جعلی ایپس اور فیک لنکس سے بچیں۔ نادرا پاک آئی ڈی، مریم نواز دستک، پاسپورٹ فیس آسان، اور ای پے پنجاب کی آفیشل پلے اسٹور لنکس اور 100% طریقہ کار حاصل کریں۔'
              : lang === 'ro'
              ? 'Fake apps se bachein! Pak Identity, Dastak by CM Maryam Nawaz, Passport Fee Asan, aur e-Pay Punjab ke verified Play Store links aur complete guides paayein.'
              : 'Find trusted government apps, simple instructions, and direct download links in one place.'}
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
                ? 'ایپ، نادرا، پاسپورٹ یا دستک تلاش کریں...'
                : 'Search by app name or service...'
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
          <React.Fragment key={app.id}>
            <div
              className={`group bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 relative overflow-hidden ${
                selectedAppForGuide?.id === app.id ? 'ring-2 ring-pakgreen-700 shadow-2xl' : ''
              }`}
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
              </div>

              {/* ACTION BUTTON ROW */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                {/* Detailed Operating Guide Button */}
                <button
                  onClick={() => {
                    setSelectedAppForGuide(selectedAppForGuide?.id === app.id ? null : app);
                  }}
                  className={`w-full py-3 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                    selectedAppForGuide?.id === app.id
                      ? 'bg-slate-900 text-pakgold-400 hover:bg-slate-800'
                      : 'bg-pakgreen-800 hover:bg-pakgreen-900 text-white shadow-pakgreen-900/20'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-pakgold-400" />
                  <span>
                    {selectedAppForGuide?.id === app.id
                      ? lang === 'ur'
                        ? 'گائیڈ بند کریں'
                        : 'Hide Instructions'
                      : lang === 'ur'
                      ? 'طریقہ کار دیکھیں'
                      : 'View Instructions'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      selectedAppForGuide?.id === app.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setExpandedAppId(expandedAppId === app.id ? null : app.id)}
                  className="w-full flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 text-left text-xs font-extrabold text-pakgreen-900 transition-colors hover:bg-emerald-100"
                  aria-expanded={expandedAppId === app.id}
                >
                  <span>{expandedAppId === app.id ? 'Hide App Features' : 'View App Features'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${expandedAppId === app.id ? 'rotate-180' : ''}`} />
                </button>

                {expandedAppId === app.id && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-3 animate-fadeIn">
                    <div>
                      <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-pakgreen-800">Key Features</p>
                      <ul className="space-y-1.5">
                        {(lang === 'ur' ? app.detailedGuide.keyFeaturesUrdu : app.detailedGuide.keyFeatures).map((feature, index) => (
                          <li key={`${app.id}-feature-${index}`} className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a href={app.playStoreUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-2 py-2 text-[10px] font-bold text-white hover:bg-slate-800">
                        <Download className="h-3.5 w-3.5 text-pakgold-400" /> Android / Official
                      </a>
                      <a href={app.appStoreUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2 text-[10px] font-bold text-slate-800 hover:bg-slate-100">
                        <ExternalLink className="h-3.5 w-3.5" /> iOS / Website
                      </a>
                    </div>
                  </div>
                )}

                {/* Dual Store Links */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-extrabold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isGooglePlayUrl(app.playStoreUrl) ? 'Google Play (Android)' : 'Android Portal'}</span>
                  </a>

                  <a
                    href={app.appStoreUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-all border border-slate-800"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-300" />
                    <span>{isAppleStoreUrl(app.appStoreUrl) ? 'App Store (iOS)' : 'Official Website'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Inline Expandable Operating Guide Panel */}
            {selectedAppForGuide?.id === app.id && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <AppStepGuideInline
                  app={app}
                  onClose={() => setSelectedAppForGuide(null)}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
