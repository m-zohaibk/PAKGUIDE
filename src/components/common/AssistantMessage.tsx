'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';

const URL_PATTERN = /(https?:\/\/[^\s)]+|www\.[^\s)]+)/g;

function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  // The model commonly emits [label](https://...). Keep the response clean
  // and make the destination itself the visible, reliable click target.
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$2');
  URL_PATTERN.lastIndex = 0;

  while ((match = URL_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const rawUrl = match[0].replace(/[.,;:]+$/, '');
    const href = rawUrl.startsWith('www.') ? `https://${rawUrl}` : rawUrl;
    nodes.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 break-all rounded-md bg-emerald-50 px-1.5 py-0.5 font-semibold text-pakgreen-800 underline decoration-emerald-300 underline-offset-2 transition-colors hover:bg-emerald-100 hover:text-pakgreen-950"
      >
        {rawUrl}
        <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

export const AssistantMessage: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push(
      <ol key={`list-${blocks.length}`} className="my-2 list-decimal space-y-1.5 pl-5 marker:font-bold marker:text-pakgreen-700">
        {listItems.map((item, index) => <li key={`${index}-${item.slice(0, 20)}`}>{renderInline(item)}</li>)}
      </ol>
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const heading = trimmed.match(/^#{1,6}\s+(.+)$/);
    const bullet = trimmed.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);

    if (!trimmed) {
      flushList();
      return;
    }
    if (heading) {
      flushList();
      blocks.push(<h4 key={`heading-${index}`} className="mt-4 border-b border-slate-100 pb-1 text-sm font-extrabold text-pakgreen-900 first:mt-0">{renderInline(heading[1])}</h4>);
      return;
    }
    if (bullet) {
      listItems.push(bullet[1]);
      return;
    }
    flushList();
    blocks.push(<p key={`paragraph-${index}`} className="my-1.5 leading-7">{renderInline(trimmed)}</p>);
  });

  flushList();
  return <div className="assistant-message text-xs sm:text-sm font-medium text-slate-800">{blocks}</div>;
};

export default AssistantMessage;
