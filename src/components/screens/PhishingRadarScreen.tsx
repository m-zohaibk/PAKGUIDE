'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Search, AlertOctagon, ExternalLink, ArrowRight, RefreshCw, Lock, Radio } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { PhishingScanResult } from '@/types';
import { performDetailedSecurityScan } from '@/lib/security/domainVerifier';

interface PhishingRadarScreenProps {
  apiKey: string;
}

export const PhishingRadarScreen: React.FC<PhishingRadarScreenProps> = ({ apiKey }) => {
  const { t, lang, isRtl } = useLanguage();
  const [urlInput, setUrlInput] = useState('');
  const [scanResult, setScanResult] = useState<PhishingScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [showFiaModal, setShowFiaModal] = useState(false);

  const handleScan = async (urlToScan?: string) => {
    const targetUrl = urlToScan || urlInput;
    if (!targetUrl.trim()) return;

    setScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/gemini/verify-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl.trim(), apiKey })
      }).then(r => r.json());

      setScanResult(res);
    } catch (err) {
      // Deterministic local security fallback
      const fallbackRes = performDetailedSecurityScan(targetUrl.trim());
      setScanResult(fallbackRes);
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HEADER HERO */}
      <div className="bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-red-900/60 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-red-500 pointer-events-none p-6">
          <Radio className="w-80 h-80 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/80 border border-red-700 text-red-300 text-xs font-bold">
            <ShieldAlert className="w-4 h-4 text-red-400 animate-ping" />
            <span>Anti-Phishing & Anti-Malware Radar</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            {t('phishingTitle')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t('phishingSub')}
          </p>

          <SuniyeButton
            textToSpeak={`${t('phishingTitle')}. ${t('phishingSub')}`}
            variant="hero"
          />
        </div>
      </div>

      {/* INPUT ZONE */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-4">
        <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Paste Suspicious Link (SMS / WhatsApp / Facebook):
        </label>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t('pasteUrlPlaceholder')}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={scanning}
            className="w-full sm:w-auto px-6 py-3 bg-scamred-600 hover:bg-scamred-700 text-white font-bold rounded-xl shadow-lg shadow-scamred-600/20 text-xs shrink-0 flex items-center justify-center gap-2 transition-all"
          >
            {scanning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <span>{t('scanNowBtn')}</span>
                <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </form>

        {/* QUICK TEST SAMPLES */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">{t('testLinksTitle')}</span>
          <button
            onClick={() => {
              setUrlInput('https://nadra.gov.pk');
              handleScan('https://nadra.gov.pk');
            }}
            className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 font-mono text-[11px] transition-colors"
          >
            nadra.gov.pk (Safe)
          </button>

          <button
            onClick={() => {
              setUrlInput('http://bisp-ehsaas-gov-pk.xyz');
              handleScan('http://bisp-ehsaas-gov-pk.xyz');
            }}
            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-scamred-700 rounded-lg border border-red-300 font-mono text-[11px] transition-colors"
          >
            bisp-ehsaas-gov-pk.xyz (Scam)
          </button>

          <button
            onClick={() => {
              setUrlInput('https://punjab-kisan-card-subsidy.net');
              handleScan('https://punjab-kisan-card-subsidy.net');
            }}
            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-scamred-700 rounded-lg border border-red-300 font-mono text-[11px] transition-colors"
          >
            punjab-kisan-card-subsidy.net (Scam)
          </button>
        </div>
      </div>

      {/* SCAN RESULT VERDICT UI */}
      {scanning && (
        <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-3 shadow-md animate-pulse">
          <RefreshCw className="w-8 h-8 text-scamred-600 animate-spin mx-auto" />
          <h4 className="font-bold text-slate-900 text-base">{t('scanningProgress')}</h4>
          <p className="text-xs text-slate-500">
            Checking official .gov.pk TLD whitelist & Gemini 3.5 Flash Lite typosquatting heuristics...
          </p>
        </div>
      )}

      {scanResult && (
        <div className="animate-fadeIn">
          {scanResult.isSafe ? (
            /* VERIFIED SAFE SHIELD */
            <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-800 rounded-2xl text-emerald-300 shrink-0">
                    <ShieldCheck className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-emerald-800 text-emerald-200 rounded-full">
                      Domain Score: {scanResult.domainScore} / 100
                    </span>
                    <h3 className="font-black text-xl sm:text-2xl text-white mt-1">
                      {t('verdictSafeTitle')}
                    </h3>
                  </div>
                </div>

                <SuniyeButton
                  textToSpeak={`${t('verdictSafeTitle')}. ${scanResult.reason}`}
                  variant="hero"
                />
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-emerald-100">
                <p><strong>Clean Domain:</strong> <span className="font-mono text-emerald-300 font-bold">{scanResult.cleanDomain}</span></p>
                <p><strong>Reason:</strong> {scanResult.reason}</p>
                <p><strong>Hosting Infrastructure:</strong> {scanResult.verifiedHostingDetails}</p>
              </div>

              {scanResult.officialUrl && (
                <div className="pt-2">
                  <a
                    href={scanResult.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all"
                  >
                    <span>Proceed to Official Government Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ) : (
            /* THREAT DETECTED FLAGGED BANNER */
            <div className="bg-red-950 text-white rounded-3xl p-6 sm:p-8 border-4 border-red-600 shadow-2xl space-y-6 animate-pulse">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-red-900 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-900 rounded-2xl text-red-400 shrink-0">
                    <AlertOctagon className="w-10 h-10 animate-spin" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-red-900 text-red-300 rounded-full">
                      THREAT LEVEL: CRITICAL (SCORE: {scanResult.domainScore}/100)
                    </span>
                    <h3 className="font-black text-xl sm:text-2xl text-red-200 mt-1">
                      {t('verdictDangerTitle')}
                    </h3>
                  </div>
                </div>

                <SuniyeButton
                  textToSpeak={`${t('verdictDangerTitle')}. ${scanResult.reason}`}
                  variant="hero"
                />
              </div>

              <div className="bg-red-900/60 p-4 rounded-xl border border-red-800 space-y-2 text-xs sm:text-sm text-red-100">
                {scanResult.impersonatedEntity && (
                  <p className="text-red-300 font-bold text-sm">
                    {t('impersonatingNotice')} <span className="underline">{scanResult.impersonatedEntity}</span>
                  </p>
                )}
                <p className="leading-relaxed">
                  <strong>Explanation:</strong> {lang === 'ur' ? scanResult.reasonUrdu : scanResult.reason}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={() => setShowFiaModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-scamred-600 hover:bg-scamred-700 text-white font-bold rounded-xl text-xs shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>{t('reportToFiaBtn')}</span>
                </button>

                {scanResult.officialUrl && (
                  <a
                    href={scanResult.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-pakgold-300" />
                    <span>{t('goOfficialInstead')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FIA REPORTING MODAL */}
      {showFiaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3 text-scamred-600 font-bold text-lg">
              <ShieldAlert className="w-6 h-6" />
              <h3>{t('fiaReportingTitle')}</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t('fiaInstructions')}
            </p>

            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-950 font-mono">
              Reported Link: {scanResult?.url}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowFiaModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <a
                href="https://nr3c.gov.pk"
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowFiaModal(false)}
                className="px-5 py-2.5 bg-scamred-600 hover:bg-scamred-700 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Open FIA nr3c.gov.pk Portal
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
