'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Info,
  CheckSquare,
  ShieldAlert,
  X,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Video,
  AlertTriangle,
  Download,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { AppIcon } from '@/components/common/AppIcon';
import { VerifiedApp } from '@/types';

interface AppStepGuideModalProps {
  app: VerifiedApp | null;
  onClose: () => void;
}

const isAppleStoreUrl = (url?: string) => Boolean(url?.includes('apps.apple.com'));
const isGooglePlayUrl = (url?: string) => Boolean(url?.includes('play.google.com'));

export const AppStepGuideModal: React.FC<AppStepGuideModalProps> = ({ app, onClose }) => {
  const { lang, isRtl } = useLanguage();
  const [guideTab, setGuideTab] = useState<'steps' | 'overview' | 'prereqs' | 'pitfalls'>('steps');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedPackage, setCopiedPackage] = useState(false);

  // Lock background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!app) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [app, onClose]);

  if (!app) return null;

  const steps = app.detailedGuide.stepByStepInstructions || [];
  const totalSteps = steps.length;
  const completedCount = completedSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNum) ? prev.filter((s) => s !== stepNum) : [...prev, stepNum]
    );
  };

  const handleCopyPackage = () => {
    if (!app.packageName) return;
    navigator.clipboard.writeText(app.packageName);
    setCopiedPackage(true);
    setTimeout(() => setCopiedPackage(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-pakgreen-950 via-pakgreen-900 to-pakgreen-950 text-white p-4 sm:p-6 flex items-center justify-between shrink-0 border-b border-pakgreen-800 shadow-md">
          <div className="flex items-center gap-3.5 min-w-0">
            <AppIcon appId={app.id} iconBg={app.iconBg} size="md" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-lg sm:text-2xl leading-tight truncate">
                  {lang === 'ur' ? app.nameUrdu : app.name}
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-pakgold-500 text-slate-950 rounded-full shrink-0 shadow-sm">
                  {app.verificationBadge}
                </span>
              </div>
              <p className="text-xs text-pakgreen-200 mt-0.5 truncate font-medium">
                {lang === 'ur'
                  ? 'رسمی مرحلہ وار آپریٹنگ گائیڈ اور سیکیورٹی گائیڈ'
                  : 'Official Step-by-Step Operating Manual & Security Standard'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-pakgreen-900/60 hover:bg-pakgreen-800 text-pakgreen-200 hover:text-white transition-colors shrink-0 ml-2 border border-pakgreen-700/50"
            aria-label="Close guide"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* TAB NAVIGATION - TOUCH-OPTIMIZED SEGMENTED BAR */}
        <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-6 py-2.5 flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs font-bold no-scrollbar shrink-0">
          <button
            onClick={() => setGuideTab('steps')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              guideTab === 'steps'
                ? 'bg-pakgreen-800 text-white shadow-md font-bold'
                : 'text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <BookOpen className="w-4 h-4 text-pakgold-400" />
            <span>1. {lang === 'ur' ? 'طریقہ کار' : 'Step-by-Step Method'}</span>
          </button>

          <button
            onClick={() => setGuideTab('overview')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              guideTab === 'overview'
                ? 'bg-pakgreen-800 text-white shadow-md font-bold'
                : 'text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <Info className="w-4 h-4 text-blue-400" />
            <span>2. {lang === 'ur' ? 'خصوصیات' : 'Features & Overview'}</span>
          </button>

          <button
            onClick={() => setGuideTab('prereqs')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              guideTab === 'prereqs'
                ? 'bg-pakgreen-800 text-white shadow-md font-bold'
                : 'text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-emerald-400" />
            <span>3. {lang === 'ur' ? 'ضروری کاغذات' : 'Prerequisites & Support'}</span>
          </button>

          <button
            onClick={() => setGuideTab('pitfalls')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
              guideTab === 'pitfalls'
                ? 'bg-scamred-600 text-white shadow-md font-bold'
                : 'text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-300" />
            <span>4. {lang === 'ur' ? 'سیکیورٹی اصول' : 'Anti-Phishing & Safety'}</span>
          </button>
        </div>

        {/* MODAL SCROLLABLE BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1 overscroll-contain">
          {/* TAB 1: INTERACTIVE TIMELINE STEPPER */}
          {guideTab === 'steps' && (
            <div className="space-y-6">
              {/* Step Progress Tracker Bar */}
              <div className="bg-gradient-to-r from-pakgreen-50 to-emerald-50 border border-pakgreen-200 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-pakgreen-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pakgreen-700" />
                    <span>
                      {lang === 'ur'
                        ? `${totalSteps} میں سے ${completedCount} مراحل مکمل`
                        : `${completedCount} of ${totalSteps} Steps Completed`}
                    </span>
                  </span>
                  <span className="text-pakgreen-800 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pakgreen-700 via-emerald-600 to-pakgold-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Audio Listen & Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-pakgreen-800" />
                    <span>{lang === 'ur' ? 'مکمل گائیڈ اور طریقہ کار' : 'Official Operating Instructions'}</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {lang === 'ur'
                      ? 'ایپ استعمال کرتے ہوئے ان مراحل پر عمل کریں۔ مکمل ہونے پر چیک بوکس پر کلک کریں۔'
                      : 'Follow these exact steps inside the app. Click checkboxes to track your progress.'}
                  </p>
                </div>

                <div className="shrink-0">
                  <SuniyeButton
                    textToSpeak={steps
                      .map((s) => `Step ${s.stepNumber}: ${lang === 'ur' ? s.titleUrdu : s.title}. ${lang === 'ur' ? s.descriptionUrdu : s.description}`)
                      .join('. ')}
                    variant="pill"
                  />
                </div>
              </div>

              {/* Connected Stepper Timeline */}
              <div className="space-y-4 relative">
                {steps.map((step, idx) => {
                  const isCompleted = completedSteps.includes(step.stepNumber);
                  const isLast = idx === steps.length - 1;

                  return (
                    <div key={step.stepNumber} className="relative flex items-start gap-3 sm:gap-4 group">
                      {/* Connected Line */}
                      {!isLast && (
                        <div
                          className={`absolute left-4 sm:left-5 top-10 bottom-0 w-0.5 transition-colors ${
                            isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                          aria-hidden="true"
                        ></div>
                      )}

                      {/* Step Number Circle / Checkbox */}
                      <button
                        onClick={() => toggleStepCompleted(step.stepNumber)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 transition-all shadow-md z-10 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-105'
                            : 'bg-pakgreen-900 text-pakgold-400 hover:bg-pakgreen-800'
                        }`}
                        title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.stepNumber}
                      </button>

                      {/* Step Content Card */}
                      <div
                        className={`flex-1 p-4 sm:p-5 rounded-2xl border transition-all shadow-sm space-y-2.5 ${
                          isCompleted
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-pakgreen-600'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h5
                            className={`font-bold text-sm sm:text-base cursor-pointer ${
                              isCompleted ? 'text-emerald-950 line-through decoration-emerald-500' : 'text-slate-900'
                            }`}
                            onClick={() => toggleStepCompleted(step.stepNumber)}
                          >
                            {lang === 'ur' ? step.titleUrdu : step.title}
                          </h5>

                          <span
                            onClick={() => toggleStepCompleted(step.stepNumber)}
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                              isCompleted
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }`}
                          >
                            {isCompleted ? (lang === 'ur' ? 'مکمل' : 'Done') : (lang === 'ur' ? 'مارک کریں' : 'Check')}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {lang === 'ur' ? step.descriptionUrdu : step.description}
                        </p>

                        {step.proTip && (
                          <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl text-amber-950 text-xs flex items-start gap-2.5 font-medium shadow-inner">
                            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-amber-900 font-bold">Pro Tip:</strong> {step.proTip}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW & KEY FEATURES */}
          {guideTab === 'overview' && (
            <div className="space-y-6">
              <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-2.5 shadow-sm">
                <h4 className="font-extrabold text-base text-emerald-900 flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-700" />
                  <span>{lang === 'ur' ? 'سرکاری ایپ کی معلومات' : 'Official App Overview'}</span>
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-emerald-900 font-medium">
                  {lang === 'ur' ? app.detailedGuide.overviewUrdu : app.detailedGuide.overview}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">
                  {lang === 'ur' ? 'اہم خصوصیات اور طریقہ کار:' : 'Key Features & Digital Capabilities:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(lang === 'ur'
                    ? app.detailedGuide.keyFeaturesUrdu
                    : app.detailedGuide.keyFeatures
                  ).map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-3 hover:border-pakgreen-400 transition-colors"
                    >
                      <CheckSquare className="w-4 h-4 text-pakgreen-800 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Tutorial Card */}
              {app.detailedGuide.videoGuideTitle && (
                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800 shadow-lg">
                  <div className="flex items-center gap-2 text-pakgold-400 font-bold text-xs uppercase tracking-wider">
                    <Video className="w-4 h-4 text-pakgold-400" />
                    <span>Video Demonstration Summary</span>
                  </div>
                  <h5 className="font-bold text-sm text-white">{app.detailedGuide.videoGuideTitle}</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">{app.detailedGuide.videoGuideSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PREREQUISITES & HELPLINES */}
          {guideTab === 'prereqs' && (
            <div className="space-y-5">
              <h4 className="font-extrabold text-base text-slate-900">
                {lang === 'ur' ? 'ایپ کھولنے سے پہلے ضروری سامان اور ڈاکومنٹس:' : 'Required Prerequisites Before Starting:'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(lang === 'ur'
                  ? app.detailedGuide.prerequisitesUrdu
                  : app.detailedGuide.prerequisites
                ).map((req, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Package ID Copy Box */}
              {app.packageName && (
                <div className="p-4 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">Authenticated Package Name ID:</span>
                    <span className="font-mono text-slate-600 text-[11px]">{app.packageName}</span>
                  </div>
                  <button
                    onClick={handleCopyPackage}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl font-bold text-slate-800 flex items-center gap-1.5 transition-all shrink-0 shadow-sm"
                  >
                    {copiedPackage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Helpline Box */}
              <div className="p-4 bg-pakgreen-50 border border-pakgreen-200 rounded-2xl text-xs text-pakgreen-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <span className="font-bold text-slate-900">Official Government Support Helpline:</span>
                  <p className="text-slate-600 text-[11px]">Toll-free direct call for assistance</p>
                </div>
                <a
                  href={`tel:${app.detailedGuide.officialHelpline.replace(/[^0-9]/g, '')}`}
                  className="font-bold font-mono text-pakgreen-900 text-sm flex items-center gap-2 px-4 py-2 bg-white border border-pakgreen-300 rounded-xl shadow-sm hover:bg-pakgreen-100 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-pakgreen-800" />
                  <span>{app.detailedGuide.officialHelpline}</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY TIPS */}
          {guideTab === 'pitfalls' && (
            <div className="space-y-5">
              <div className="p-5 bg-red-50 border border-red-200 rounded-2xl text-red-950 space-y-3 shadow-inner">
                <h4 className="font-extrabold text-sm text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>{lang === 'ur' ? 'سیکیورٹی وارننگ اور دھوکہ دہی سے بچاؤ' : 'Official Scam Warning & Safety Check'}</span>
                </h4>

                <p className="text-xs text-red-800 leading-relaxed font-medium">
                  {lang === 'ur'
                    ? 'صرف ہمارے تصدیق شدہ لنکس استعمال کریں۔ ایجنٹوں کو کبھی پیسے نہ دیں۔'
                    : 'Use only verified Google Play or Apple Store download buttons below. Never pay cash outside official government counters.'}
                </p>

                <div className="space-y-2 pt-2 border-t border-red-200/60">
                  <h5 className="font-bold text-xs text-red-950">Common Pitfalls & Fake Apps to Avoid:</h5>
                  <ul className="space-y-2 text-xs">
                    {(lang === 'ur'
                      ? app.detailedGuide.commonMistakesToAvoidUrdu
                      : app.detailedGuide.commonMistakesToAvoid
                    ).map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 font-medium text-red-900">
                        <span className="text-red-600 font-bold">•</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            Verified Package: <span className="font-mono text-slate-700">{app.packageName}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors shrink-0 border border-slate-300"
            >
              {lang === 'ur' ? 'بند کریں' : 'Close Guide'}
            </button>

            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>{isGooglePlayUrl(app.playStoreUrl) ? 'Google Play (Android)' : 'Android App'}</span>
              </a>

              {app.appStoreUrl && (
                <a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md flex items-center justify-center gap-2 transition-all border border-slate-800"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                  <span>{isAppleStoreUrl(app.appStoreUrl) ? 'App Store (iOS)' : 'Official Website'}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
