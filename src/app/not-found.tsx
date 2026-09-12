'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Home, Search, AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function NotFound() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      {/* Mini Header */}
      <header className="bg-pakgreen-800 text-white py-4 px-6 shadow-md border-b border-pakgreen-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-pakgreen-700 rounded-xl flex items-center justify-center text-pakgold-400 border border-pakgreen-600">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight text-white group-hover:text-pakgold-300">
                PakGuide AI
              </h1>
              <p className="text-xs text-pakgreen-200 font-urdu">پاک گائیڈ اے آئی | 404 صفحہ نہیں ملا</p>
            </div>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Card */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center relative overflow-hidden">
          {/* Top Decorative Strip */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pakgreen-800 via-pakgold-500 to-pakgreen-900"></div>

          {/* 404 Icon */}
          <div className="w-20 h-20 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-200 mb-6 shadow-inner">
            <AlertCircle className="w-10 h-10 animate-bounce" />
          </div>

          <span className="inline-block px-3 py-1 bg-pakgreen-100 text-pakgreen-800 font-extrabold text-xs rounded-full uppercase tracking-wider mb-2">
            Error 404
          </span>

          <h2 className="text-2xl font-black text-slate-900 mb-2">
            Page Not Found / صفحہ نہیں ملا
          </h2>

          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            The requested public service page or route could not be found. Please return to the official PakGuide AI Dashboard.
          </p>

          <p className="text-xs text-pakgreen-800 font-urdu mb-8 leading-loose bg-pakgreen-50/80 p-3 rounded-xl border border-pakgreen-200">
            مطلوبہ صفحہ دستیاب نہیں ہے۔ براہ کرم پاک گائیڈ اے آئی ہوم ڈیش بورڈ پر واپس جائیں۔
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3 px-4 bg-pakgreen-800 hover:bg-pakgreen-900 text-white font-bold text-sm rounded-xl shadow-lg shadow-pakgreen-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800">
        <p>PakGuide AI (.gov.pk) — Citizen Public Assistance Operating System</p>
      </footer>
    </div>
  );
}
