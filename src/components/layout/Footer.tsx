'use client';

import React from 'react';
import { ShieldCheck, PhoneCall, Lock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800/90 pt-12 sm:pt-16 pb-8 sm:pb-10 mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Col 1: Zero-Scam Assurance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-pakgold-400 font-extrabold text-lg">
              <div className="p-2 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-400 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>PakGuide AI Zero-Scam Assurance</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('trustGuaranteeBody')}
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-950/90 border border-emerald-700/80 rounded-xl text-emerald-300 text-xs font-semibold shadow-inner">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('zeroStorageNotice')}</span>
            </div>
          </div>

          {/* Col 2: Official Helplines */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-pakgold-400 uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-pakgold-400" />
              <span>Official Government Helplines</span>
            </h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <a
                href="tel:1777"
                className="p-2.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 rounded-xl flex items-center justify-between transition-all group"
              >
                <span className="text-slate-300 group-hover:text-white font-medium">NADRA Citizen Care</span>
                <span className="font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">1777</span>
              </a>
              <a
                href="tel:1991"
                className="p-2.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 rounded-xl flex items-center justify-between transition-all group"
              >
                <span className="text-slate-300 group-hover:text-white font-medium">FIA Cybercrime Fraud</span>
                <span className="font-mono font-extrabold text-red-400 bg-red-950/80 px-2 py-0.5 rounded-md border border-red-800/60">1991</span>
              </a>
              <a
                href="tel:080034477"
                className="p-2.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 rounded-xl flex items-center justify-between transition-all group"
              >
                <span className="text-slate-300 group-hover:text-white font-medium">Immigration & Passports</span>
                <span className="font-mono font-extrabold text-pakgold-400 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800/60">0800-34477</span>
              </a>
              <a
                href="tel:080026477"
                className="p-2.5 bg-slate-900 hover:bg-slate-800/90 border border-slate-800 rounded-xl flex items-center justify-between transition-all group"
              >
                <span className="text-slate-300 group-hover:text-white font-medium">BISP 8171 Kafaalat</span>
                <span className="font-mono font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60">0800-26477</span>
              </a>
            </div>
          </div>

          {/* Col 3: Verified Portals */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
              Verified Government Portals
            </h4>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <a
                href="https://id.nadra.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-all group"
              >
                <span className="font-medium truncate">Pak-Identity</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pakgold-400 shrink-0" />
              </a>
              <a
                href="https://dgip.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-all group"
              >
                <span className="font-medium truncate">Passport DGIP</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pakgold-400 shrink-0" />
              </a>
              <a
                href="https://8171.bisp.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-all group"
              >
                <span className="font-medium truncate">BISP 8171</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-pakgold-400 shrink-0" />
              </a>
              <a
                href="https://nr3c.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 hover:text-red-400 flex items-center justify-between transition-all group"
              >
                <span className="font-medium truncate">FIA NR3C</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-red-400 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 PakGuide AI. Government of Pakistan Public Information Navigator.</p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-slate-500">Powered by PakGuide AI Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-emerald-400 font-semibold">100% Verified Public Utility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
