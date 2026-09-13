'use client';

import React, { useEffect } from 'react';
import { BookOpen, ShieldAlert, CheckCircle, AlertTriangle, PhoneCall, ExternalLink, X } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface CitizenGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitizenGuideModal: React.FC<CitizenGuideModalProps> = ({ isOpen, onClose }) => {
  const { t, lang } = useLanguage();

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-pakgreen-800 text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-pakgreen-700 rounded-xl text-pakgold-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{t('guideModalTitle')}</h3>
              <p className="text-xs text-pakgreen-200">Zero-Scam Citizen Operational Rules & Safety Rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-pakgreen-700 text-pakgreen-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Rule 1 */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-950 mb-1">
                1. Never Pay Agents Outside Official Counters
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                {t('guideStep1')}
              </p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950 mb-1">
                2. Check Address Bar before entering CNIC or Bank Details
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                {t('guideStep2')}
              </p>
              <div className="mt-2 text-xs font-mono bg-white p-2 rounded border border-amber-300 text-slate-800">
                Official: <span className="text-emerald-700 font-bold">https://id.nadra.gov.pk</span> | <span className="text-emerald-700 font-bold">https://8171.bisp.gov.pk</span>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-950 mb-1">
                3. Pre-Audit Paper Work with In-Memory Multimodal Vision
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                {t('guideStep3')}
              </p>
            </div>
          </div>

          {/* Emergency Helplines Box */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <h4 className="font-bold text-pakgold-400 text-xs uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <span>Official Government Toll-Free Helplines</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center">
                <span>NADRA Helpline:</span>
                <span className="font-bold font-mono text-pakgold-300">1777 / 051-111-786-100</span>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center">
                <span>FIA Cybercrime Helpline:</span>
                <span className="font-bold font-mono text-red-400">1991</span>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center">
                <span>Passport DGIP:</span>
                <span className="font-bold font-mono text-pakgold-300">0800-34477</span>
              </div>
              <div className="p-2.5 bg-slate-800 rounded-lg flex justify-between items-center">
                <span>BISP 8171 Helpline:</span>
                <span className="font-bold font-mono text-emerald-400">0800-26477</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-semibold rounded-xl text-xs shadow-md transition-all"
          >
            {t('closeGuide')}
          </button>
        </div>
      </div>
    </div>
  );
};
