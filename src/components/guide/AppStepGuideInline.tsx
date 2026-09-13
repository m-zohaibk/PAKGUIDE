'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  Info,
  CheckSquare,
  ShieldAlert,
  ChevronUp,
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

interface AppStepGuideInlineProps {
  app: VerifiedApp;
  onClose: () => void;
}

const isAppleStoreUrl = (url?: string) => Boolean(url?.includes('apps.apple.com'));
const isGooglePlayUrl = (url?: string) => Boolean(url?.includes('play.google.com'));

export const AppStepGuideInline: React.FC<AppStepGuideInlineProps> = ({ app, onClose }) => {
  const { lang } = useLanguage();
  const [guideTab, setGuideTab] = useState<'steps' | 'overview' | 'prereqs' | 'pitfalls'>('steps');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copiedPackage, setCopiedPackage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll into view when opened
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

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
      ref={containerRef}
      className="mt-4 rounded-3xl border-2 border-pakgreen-800/80 bg-white shadow-xl overflow-hidden animate-fadeIn space-y-0 text-slate-800"
    >
      {/* INLINE PANEL HEADER */}
      <div className="bg-gradient-to-r from-pakgreen-950 via-pakgreen-900 to-pakgreen-950 text-white p-4 sm:p-5 flex items-center justify-between border-b border-pakgreen-800">
        <div className="flex items-center gap-3 min-w-0">
          <AppIcon appId={app.id} iconBg={app.iconBg} size="sm" />
          <div className="min-w-0">
            <h4 className="font-extrabold text-base sm:text-lg leading-tight truncate">
              {lang === 'ur' ? app.nameUrdu : app.name} — {lang === 'ur' ? 'طریقہ کار' : 'Official Operating Manual'}
            </h4>
            <p className="text-xs text-pakgreen-200 mt-0.5 truncate">
              {app.verificationBadge}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded-xl bg-pakgreen-900/80 hover:bg-pakgreen-800 text-pakgold-400 font-bold text-xs flex items-center gap-1.5 transition-colors border border-pakgreen-700 shrink-0 ml-2"
        >
          <span>{lang === 'ur' ? 'بند کریں' : 'Hide Guide'}</span>
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {/* SEGMENTED TAB NAVIGATION */}
      <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-5 py-2 flex items-center gap-1.5 overflow-x-auto text-xs font-bold no-scrollbar">
        <button
          onClick={() => setGuideTab('steps')}
          className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            guideTab === 'steps'
              ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-pakgold-400" />
          <span>1. {lang === 'ur' ? 'طریقہ کار' : 'Step-by-Step Method'}</span>
        </button>

        <button
          onClick={() => setGuideTab('overview')}
          className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            guideTab === 'overview'
              ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span>2. {lang === 'ur' ? 'خصوصیات' : 'Features & Overview'}</span>
        </button>

        <button
          onClick={() => setGuideTab('prereqs')}
          className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            guideTab === 'prereqs'
              ? 'bg-pakgreen-800 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span>3. {lang === 'ur' ? 'ضروری کاغذات' : 'Prerequisites & Helpline'}</span>
        </button>

        <button
          onClick={() => setGuideTab('pitfalls')}
          className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            guideTab === 'pitfalls'
              ? 'bg-scamred-600 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-300" />
          <span>4. {lang === 'ur' ? 'سیکیورٹی اصول' : 'Anti-Phishing & Safety'}</span>
        </button>
      </div>

      {/* INLINE BODY CONTENT */}
      <div className="p-4 sm:p-5 space-y-5 text-sm text-slate-700">
        {/* TAB 1: INTERACTIVE TIMELINE STEPPER */}
        {guideTab === 'steps' && (
          <div className="space-y-5">
            {/* Step Progress Tracker */}
            <div className="bg-gradient-to-r from-pakgreen-50 to-emerald-50 border border-pakgreen-200 rounded-2xl p-3.5 space-y-1.5 shadow-sm">
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
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pakgreen-700 via-emerald-600 to-pakgold-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Title & Audio Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
              <div>
                <h5 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pakgreen-800" />
                  <span>{lang === 'ur' ? 'مکمل مرحلہ وار گائیڈ' : 'Step-by-Step Instructions'}</span>
                </h5>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'ur'
                    ? 'ایپ میں کام کرتے وقت ان مراحل پر عمل کریں۔'
                    : 'Follow these exact instructions inside the official app.'}
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

            {/* Connected Timeline Stepper */}
            <div className="space-y-3.5 relative">
              {steps.map((step, idx) => {
                const isCompleted = completedSteps.includes(step.stepNumber);
                const isLast = idx === steps.length - 1;

                return (
                  <div key={step.stepNumber} className="relative flex items-start gap-3 group">
                    {/* Connected Vertical Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-3.5 sm:left-4 top-9 bottom-0 w-0.5 transition-colors ${
                          isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                        aria-hidden="true"
                      ></div>
                    )}

                    {/* Step Checkbox Button */}
                    <button
                      onClick={() => toggleStepCompleted(step.stepNumber)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 transition-all shadow z-10 ${
                        isCompleted
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-200 scale-105'
                          : 'bg-pakgreen-900 text-pakgold-400 hover:bg-pakgreen-800'
                      }`}
                      title={isCompleted ? 'Mark incomplete' : 'Mark completed'}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.stepNumber}
                    </button>

                    {/* Step Card */}
                    <div
                      className={`flex-1 p-3.5 sm:p-4 rounded-2xl border transition-all shadow-sm space-y-2 ${
                        isCompleted
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 hover:border-pakgreen-500'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h6
                          className={`font-bold text-xs sm:text-sm cursor-pointer ${
                            isCompleted ? 'text-emerald-950 line-through decoration-emerald-500' : 'text-slate-900'
                          }`}
                          onClick={() => toggleStepCompleted(step.stepNumber)}
                        >
                          {lang === 'ur' ? step.titleUrdu : step.title}
                        </h6>

                        <button
                          onClick={() => toggleStepCompleted(step.stepNumber)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                            isCompleted
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          {isCompleted ? (lang === 'ur' ? 'مکمل' : 'Done') : (lang === 'ur' ? 'مارک کریں' : 'Check')}
                        </button>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {lang === 'ur' ? step.descriptionUrdu : step.description}
                      </p>

                      {step.proTip && (
                        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs flex items-start gap-2 font-medium">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
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
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-950 space-y-2">
              <h5 className="font-extrabold text-sm text-emerald-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'ur' ? 'ایپ کا خلاصہ' : 'Official App Overview'}</span>
              </h5>
              <p className="text-xs sm:text-sm leading-relaxed text-emerald-900 font-medium">
                {lang === 'ur' ? app.detailedGuide.overviewUrdu : app.detailedGuide.overview}
              </p>
            </div>

            <div className="space-y-2.5">
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                {lang === 'ur' ? 'اہم خصوصیات:' : 'Key Capabilities:'}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(lang === 'ur'
                  ? app.detailedGuide.keyFeaturesUrdu
                  : app.detailedGuide.keyFeatures
                ).map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-2.5"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-pakgreen-800 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {app.detailedGuide.videoGuideTitle && (
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-1.5 border border-slate-800 shadow">
                <div className="flex items-center gap-2 text-pakgold-400 font-bold text-[11px] uppercase tracking-wider">
                  <Video className="w-3.5 h-3.5" />
                  <span>Demonstration Summary</span>
                </div>
                <h6 className="font-bold text-xs sm:text-sm text-white">{app.detailedGuide.videoGuideTitle}</h6>
                <p className="text-xs text-slate-300 leading-relaxed">{app.detailedGuide.videoGuideSummary}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PREREQUISITES & HELPLINES */}
        {guideTab === 'prereqs' && (
          <div className="space-y-4">
            <h5 className="font-extrabold text-xs sm:text-sm text-slate-900">
              {lang === 'ur' ? 'ضروری ڈاکومنٹس:' : 'Required Prerequisites:'}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(lang === 'ur'
                ? app.detailedGuide.prerequisitesUrdu
                : app.detailedGuide.prerequisites
              ).map((req, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </div>
              ))}
            </div>

            {app.packageName && (
              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Package ID:</span>
                  <span className="font-mono text-slate-600 text-[11px]">{app.packageName}</span>
                </div>
                <button
                  onClick={handleCopyPackage}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-bold text-slate-800 flex items-center gap-1 shrink-0 text-xs shadow-sm"
                >
                  {copiedPackage ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-600" />}
                  <span>{copiedPackage ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            <div className="p-3.5 bg-pakgreen-50 border border-pakgreen-200 rounded-xl text-xs text-pakgreen-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div>
                <span className="font-bold text-slate-900">Government Support Helpline:</span>
                <p className="text-slate-600 text-[11px]">Toll-free direct call</p>
              </div>
              <a
                href={`tel:${app.detailedGuide.officialHelpline.replace(/[^0-9]/g, '')}`}
                className="font-bold font-mono text-pakgreen-900 text-xs flex items-center gap-2 px-3 py-1.5 bg-white border border-pakgreen-300 rounded-lg shadow-sm hover:bg-pakgreen-100 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-pakgreen-800" />
                <span>{app.detailedGuide.officialHelpline}</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: SAFETY TIPS */}
        {guideTab === 'pitfalls' && (
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-950 space-y-2.5">
              <h5 className="font-extrabold text-xs sm:text-sm text-red-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>{lang === 'ur' ? 'سیکیورٹی اصول' : 'Safety Check & Anti-Phishing'}</span>
              </h5>

              <p className="text-xs text-red-800 leading-relaxed font-medium">
                {lang === 'ur'
                  ? 'صرف ہمارے تصدیق شدہ لنکس استعمال کریں۔ ایجنٹوں کو کبھی پیسے نہ دیں۔'
                  : 'Use only authenticated Play Store / App Store links. Never pay outside official counters.'}
              </p>

              <ul className="space-y-1.5 text-xs pt-1 border-t border-red-200/60">
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
        )}
      </div>

      {/* INLINE PANEL FOOTER */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs font-medium text-slate-500 hidden sm:block">
          Official Store Redirect
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors shrink-0 border border-slate-300"
          >
            {lang === 'ur' ? 'بند کریں' : 'Hide Guide'}
          </button>

          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial px-4 py-2 bg-pakgreen-800 hover:bg-pakgreen-900 text-white font-bold rounded-xl text-xs shadow flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-pakgold-400" />
            <span>
              {isGooglePlayUrl(app.playStoreUrl)
                ? 'Google Play'
                : isAppleStoreUrl(app.playStoreUrl)
                ? 'Apple Store'
                : 'Official Website'}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
