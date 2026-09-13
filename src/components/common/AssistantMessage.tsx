'use client';

import React, { useState } from 'react';
import { ExternalLink, Download, Smartphone, Copy, Check, ShieldCheck } from 'lucide-react';
import { findAppsInText, MatchedAppInfo } from '@/lib/appMatcher';

const isUrduText = (str: string) => /[\u0600-\u06FF]/.test(str);

/**
 * Parses inline formatting:
 * - Markdown links [label](url)
 * - Raw URLs (http/https/www)
 * - Bold **text** or __text__
 * - Italics *text* or _text_
 * - Code `text`
 */
function renderInlineFormattedText(text: string): React.ReactNode[] {
  if (!text) return [];

  // Step 1: Tokenize markdown links [label](url) and raw URLs
  // Regex to match [label](url) OR raw URLs
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s)]+|www\.[^\s)]+)/g;
  const nodes: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      nodes.push(...parseInlineStyles(text.slice(lastIdx, match.index), `txt-${lastIdx}`));
    }

    if (match[1] && match[2]) {
      // Markdown link [label](url)
      const label = match[1];
      const href = match[2];
      nodes.push(
        <a
          key={`md-link-${match.index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-pakgreen-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 px-2 py-0.5 rounded-lg underline underline-offset-2 transition-all text-xs sm:text-sm my-0.5"
        >
          <span>{label}</span>
          <ExternalLink className="h-3 w-3 shrink-0 text-emerald-700" />
        </a>
      );
    } else if (match[3]) {
      // Raw URL
      const rawUrl = match[3].replace(/[.,;:]+$/, '');
      const href = rawUrl.startsWith('www.') ? `https://${rawUrl}` : rawUrl;
      nodes.push(
        <a
          key={`raw-url-${match.index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-pakgreen-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 px-2 py-0.5 rounded-lg underline underline-offset-2 transition-all text-xs sm:text-sm break-all my-0.5"
        >
          <span>{rawUrl}</span>
          <ExternalLink className="h-3 w-3 shrink-0 text-emerald-700" />
        </a>
      );
    }

    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    nodes.push(...parseInlineStyles(text.slice(lastIdx), `txt-${lastIdx}`));
  }

  return nodes;
}

/**
 * Parses bold **text**, italics *text*, and inline code `text`
 */
function parseInlineStyles(text: string, keyPrefix: string): React.ReactNode[] {
  if (!text) return [];

  // Match bold **text** or __text__, code `text`, italic *text*
  const pattern = /(\*\*(.*?)\*\*|__(.*?)__|`(.*?)`|\*(.*?)\*|_(.*?)_)/g;
  const result: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIdx) {
      result.push(text.slice(lastIdx, match.index));
    }

    const key = `${keyPrefix}-${match.index}`;

    if (match[2] !== undefined || match[3] !== undefined) {
      // Bold
      const content = match[2] ?? match[3];
      result.push(
        <strong key={key} className="font-extrabold text-pakgreen-950 bg-pakgreen-50/70 px-1 py-0.5 rounded border border-pakgreen-100/60">
          {content}
        </strong>
      );
    } else if (match[4] !== undefined) {
      // Code
      result.push(
        <code key={key} className="font-mono text-xs text-emerald-800 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-semibold">
          {match[4]}
        </code>
      );
    } else if (match[5] !== undefined || match[6] !== undefined) {
      // Italic
      const content = match[5] ?? match[6];
      result.push(
        <em key={key} className="italic text-slate-700">
          {content}
        </em>
      );
    }

    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    result.push(text.slice(lastIdx));
  }

  return result;
}

const AppDownloadBadge: React.FC<{ app: MatchedAppInfo }> = ({ app }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPackage = () => {
    navigator.clipboard.writeText(app.packageName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isAppleUrl = app.appStoreUrl?.includes('apps.apple.com');
  const isPlayUrl = app.playStoreUrl?.includes('play.google.com');

  return (
    <div className="my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-pakgreen-950 text-white border border-blue-800/80 shadow-lg space-y-3 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl ${app.iconBg} flex items-center justify-center font-bold text-sm shadow shrink-0`}>
            <Smartphone className="w-4 h-4 text-pakgold-400" />
          </div>
          <div>
            <h5 className="font-extrabold text-sm sm:text-base text-white leading-tight">
              {app.name}
            </h5>
            <span className="text-[10px] text-emerald-300 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {app.verificationBadge}
            </span>
          </div>
        </div>

        {app.packageName && app.packageName !== 'Official Government App' && (
          <button
            onClick={handleCopyPackage}
            className="text-[10px] font-mono text-slate-300 bg-blue-900/90 px-2 py-1 rounded-lg border border-blue-700 flex items-center gap-1 hover:text-white transition-colors"
          >
            {copied ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Copied ID
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="w-3 h-3 text-slate-400" /> ID: {app.packageName}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <a
          href={app.playStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 px-3 bg-pakgold-500 hover:bg-pakgold-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>{isPlayUrl ? 'Google Play (Android)' : 'Android Download'}</span>
        </a>

        <a
          href={app.appStoreUrl}
          target="_blank"
          rel="noreferrer"
          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
          <span>{isAppleUrl ? 'App Store (iOS)' : 'Official Website / iOS'}</span>
        </a>
      </div>
    </div>
  );
};

export const AssistantMessage: React.FC<{ text: string }> = ({ text }) => {
  const matchedApps = findAppsInText(text);
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: { text: string; isUrdu: boolean }[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(
      <ol key={`list-${blocks.length}`} className="my-2.5 list-decimal space-y-2.5 pl-5 marker:font-extrabold marker:text-pakgreen-700">
        {listItems.map((item, index) => (
          <li
            key={`${index}-${item.text.slice(0, 20)}`}
            className={item.isUrdu ? 'font-urdu leading-[2.25] text-sm sm:text-base py-1' : 'leading-relaxed'}
          >
            {renderInlineFormattedText(item.text)}
          </li>
        ))}
      </ol>
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    const bulletMatch = trimmed.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);
    const hasUrdu = isUrduText(trimmed);

    if (!trimmed) {
      flushList();
      return;
    }

    if (headingMatch) {
      flushList();
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const headingUrdu = isUrduText(headingText);

      blocks.push(
        <div key={`heading-${index}`} className="mt-4 mb-2 first:mt-0">
          <h4
            className={`font-black text-pakgreen-900 border-b border-pakgreen-100 pb-1.5 ${
              headingUrdu ? 'font-urdu text-base sm:text-lg leading-[2.25] text-right' : 'text-sm sm:text-base'
            } ${level === 1 ? 'text-lg font-black text-pakgreen-950' : 'text-sm sm:text-base font-extrabold'}`}
          >
            {renderInlineFormattedText(headingText)}
          </h4>
        </div>
      );
      return;
    }

    if (bulletMatch) {
      listItems.push({ text: bulletMatch[1], isUrdu: hasUrdu });
      return;
    }

    flushList();
    blocks.push(
      <p
        key={`paragraph-${index}`}
        className={`my-2 ${
          hasUrdu
            ? 'font-urdu text-sm sm:text-base leading-[2.25] py-1 text-right space-y-2'
            : 'leading-relaxed text-xs sm:text-sm text-slate-800'
        }`}
      >
        {renderInlineFormattedText(trimmed)}
      </p>
    );
  });

  flushList();

  return (
    <div className="assistant-message space-y-2 text-slate-800 w-full">
      <div className="prose prose-slate max-w-none">{blocks}</div>

      {/* AUTO-DETECTED VERIFIED APP DOWNLOAD BADGES */}
      {matchedApps.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
          <p className="text-[11px] font-bold text-pakgreen-800 flex items-center gap-1 uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-pakgold-500" />
            <span>Official Government App Download Links:</span>
          </p>
          {matchedApps.map((app) => (
            <AppDownloadBadge key={`matched-app-${app.id}`} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AssistantMessage;
