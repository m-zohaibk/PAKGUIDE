'use client';

import React from 'react';
import { ShieldCheck, PhoneCall, Lock, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-8 sm:pt-10 pb-6 sm:pb-8 mt-10 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-pakgold-400 font-bold text-lg">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span>PakGuide AI Zero-Scam Assurance</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('trustGuaranteeBody')}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/80 border border-emerald-800/80 rounded-lg text-emerald-400 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>{t('zeroStorageNotice')}</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-pakgold-400 uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Official Government Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">NADRA Citizen Care:</span>
                <a href="tel:1777" className="font-mono font-bold text-emerald-400 hover:underline">1777</a>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">FIA Cybercrime Fraud Wing:</span>
                <a href="tel:1991" className="font-mono font-bold text-red-400 hover:underline">1991</a>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Immigration & Passports:</span>
                <a href="tel:080034477" className="font-mono font-bold text-pakgold-400 hover:underline">0800-34477</a>
              </li>
              <li className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">BISP 8171 Kafaalat:</span>
                <a href="tel:080026477" className="font-mono font-bold text-emerald-400 hover:underline">0800-26477</a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Verified Government Portals
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://id.nadra.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-colors"
              >
                <span>Pak-Identity</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://dgip.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-colors"
              >
                <span>Passport DGIP</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://8171.bisp.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-pakgold-300 flex items-center justify-between transition-colors"
              >
                <span>BISP 8171</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://nr3c.gov.pk"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800/80 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-red-400 flex items-center justify-between transition-colors"
              >
                <span>FIA NR3C</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 PakGuide AI. Government of Pakistan Public Information Navigator.</p>
          <p className="font-mono text-[11px]">Powered by PakGuide AI Engine</p>
        </div>
      </div>
    </footer>
  );
};
