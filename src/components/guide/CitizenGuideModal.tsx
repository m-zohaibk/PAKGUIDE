'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  MessageSquare,
  Camera,
  ShieldAlert,
  Calculator,
  Smartphone,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  X,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { NavScreen } from '@/types';

interface CitizenGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (screen: NavScreen, query?: string) => void;
}

export const CitizenGuideModal: React.FC<CitizenGuideModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'navigator' | 'phishing' | 'matcher' | 'apps'>('navigator');

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLaunchModule = (screen: NavScreen) => {
    onClose();
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pakgreen-900 via-pakgreen-800 to-pakgreen-950 text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-pakgreen-700 shadow-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-pakgreen-700/80 rounded-2xl text-pakgold-400 border border-pakgreen-600 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl leading-tight">
                  {lang === 'ur'
                    ? 'پاک گائیڈ ایپ استعمال کرنے کا مکمل طریقہ'
                    : lang === 'ro'
                    ? 'PakGuide App Target Usage Guide'
                    : 'PakGuide App Tutorial & How-To Guide'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-pakgold-500 text-slate-950 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  Official Manual
                </span>
              </div>
              <p className="text-xs text-pakgreen-200 mt-0.5">
                {lang === 'ur'
                  ? 'اے آئی اسسٹنٹ، سیکیورٹی اسکینر اور سرکاری ایپس کو آسانی سے استعمال کریں'
                  : lang === 'ro'
                  ? 'AI Assistant, Security Scanner aur Govt Apps easily use karein'
                  : 'Master AI Assistant, Phishing Radar, Benefit Matcher & Official Apps in 4 Simple Steps'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-pakgreen-700/80 text-pakgreen-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Feature Tabs Bar */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('navigator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'navigator'
                ? 'bg-pakgreen-800 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-pakgold-400" />
            <span>1. AI Navigator & OCR</span>
          </button>

          <button
            onClick={() => setActiveTab('phishing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'phishing'
                ? 'bg-scamred-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>2. Phishing Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'matcher'
                ? 'bg-pakgold-500 text-slate-950 shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>3. Subsidy Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('apps')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'apps'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>4. Verified Apps</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-800 flex-1">
          {/* TAB 1: AI NAVIGATOR & OCR */}
          {activeTab === 'navigator' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-pakgreen-800 shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    How to Use AI Navigator (Smart Queries & Document Inspection)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Ask questions about CNIC renewal, Passport fees, Land Fard, or Domicile certificates in English, Urdu, or Roman Urdu. Get immediate step-by-step instructions, official PKR fee tables, and Play Store app buttons right inside the chatbox!
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800">
                    <span className="w-5 h-5 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                    <span>Ask Any Query</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Type your question or click the glowing microphone icon to speak naturally in Urdu or English.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800">
                    <span className="w-5 h-5 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                    <span>Upload Photo for Audit</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click the Camera icon to upload a photo of your CNIC, B-Form or Fard for instant in-memory OCR seal & date audit.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800">
                    <span className="w-5 h-5 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                    <span>View Official Fee Table</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    View official PKR Normal, Urgent, and Executive fee breakdown with turnaround delivery estimates.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-pakgreen-800">
                    <span className="w-5 h-5 bg-pakgreen-800 text-white rounded-full flex items-center justify-center text-[10px]">4</span>
                    <span>Download App Directly</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click the clean Google Play or App Store download buttons displayed once below each response to download official apps.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleLaunchModule('navigator')}
                  className="px-5 py-2.5 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <span>Open AI Navigator Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PHISHING RADAR */}
          {activeTab === 'phishing' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-scamred-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    How to Use Phishing Radar (SMS & WhatsApp Scam Scanner)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Protect yourself from fake BISP 8171 SMS messages, fraudulent Kisan Card links, and fake lottery sites claiming to be government portals.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Copy Suspicious Link</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Copy the URL from any suspicious SMS, WhatsApp message, or Facebook post claiming free money or government subsidies.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Scan Domain Legitimacy</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Paste the link into the Phishing Radar input bar and click "Scan Link Legitimacy".
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Combined Security Report</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Review Priority 1 (Official .gov.pk Whitelist Regex Scan) combined with Priority 2 (AI Security Heuristics) to see if the link is real or a scam.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-scamred-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Report Threat to FIA (1991)</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      If flagged as a scam, click "Report Threat to FIA Cybercrime Wing (1991)" to report fraudulent numbers and fake sites.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleLaunchModule('phishing')}
                  className="px-5 py-2.5 bg-scamred-600 hover:bg-scamred-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <span>Open Phishing Radar Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SUBSIDY MATCHER */}
          {activeTab === 'matcher' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <Calculator className="w-6 h-6 text-pakgold-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    How to Use Subsidy Matcher (Welfare Scheme Calculator)
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Check your eligibility for BISP Kafaalat, Punjab Kisan Card, PM Youth Loans, PEEF Scholarships, and NAVTTC Skill Training schemes without visiting government offices.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <span className="w-5 h-5 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-[10px]">1</span>
                    <span>Enter Basic Profile</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Select your age, province, monthly income tier, work profile, and land ownership status.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <span className="w-5 h-5 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-[10px]">2</span>
                    <span>Calculate Eligibility</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click "Calculate Eligibility" to run multi-criteria verification against official gazette rules.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <span className="w-5 h-5 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-[10px]">3</span>
                    <span>View Percentage Fit</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    View matching scores (e.g. 95% Eligible for Kisan Card or BISP Kafaalat) with reason breakdown.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 font-bold text-amber-900">
                    <span className="w-5 h-5 bg-pakgold-500 text-slate-950 rounded-full flex items-center justify-center text-[10px]">4</span>
                    <span>Apply Online Direct</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Click "Apply on Official Portal" to submit your application directly on verified .gov.pk portals.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleLaunchModule('matcher')}
                  className="px-5 py-2.5 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <span>Open Subsidy Matcher Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: VERIFIED APPS */}
          {activeTab === 'apps' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <Smartphone className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    How to Use Verified Government App Directory
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Access genuine government mobile apps (Pak Identity, Dastak, e-Pay Punjab, Passport Fee Asan, Citizen Portal) directly without downloading dangerous fake APKs.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Browse Official App Cards</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Filter by category (Identity, Payments, Municipal, Police) or jurisdiction (Federal, Punjab, Sindh, KP).
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Download Official Android / iOS App</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Click "Google Play" or "App Store" to open official store pages safely.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-3 shadow-sm">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                  <div>
                    <h5 className="font-bold text-slate-900">Open Operating Manual</h5>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Click "Open Step-by-Step Operating Guide" to view screenshots, prerequisite documents, and common mistakes to avoid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleLaunchModule('apps')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <span>Browse App Directory Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Emergency Helplines Bar */}
          <div className="p-4 bg-slate-950 text-white rounded-2xl space-y-2 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between">
              <h5 className="font-extrabold text-pakgold-400 text-xs uppercase tracking-wider flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-pakgold-400" />
                <span>Official Government Helplines (Toll-Free)</span>
              </h5>
              <span className="text-[10px] text-slate-400 font-mono">24/7 Available</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <a href="tel:1777" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors group">
                <span className="text-slate-400 block text-[10px]">NADRA Helpline</span>
                <span className="font-bold font-mono text-pakgold-300 group-hover:underline">1777</span>
              </a>
              <a href="tel:1991" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors group">
                <span className="text-slate-400 block text-[10px]">FIA Cybercrime</span>
                <span className="font-bold font-mono text-red-400 group-hover:underline">1991</span>
              </a>
              <a href="tel:080034477" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors group">
                <span className="text-slate-400 block text-[10px]">Passport DGIP</span>
                <span className="font-bold font-mono text-pakgold-300 group-hover:underline">0800-34477</span>
              </a>
              <a href="tel:080026477" className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors group">
                <span className="text-slate-400 block text-[10px]">BISP 8171</span>
                <span className="font-bold font-mono text-emerald-400 group-hover:underline">0800-26477</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            PakGuide AI • Government of Pakistan Public Navigator
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-pakgold-400" />
            <span>Got It, Start Exploring</span>
          </button>
        </div>
      </div>
    </div>
  );
};
