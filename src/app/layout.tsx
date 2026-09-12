import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export const metadata: Metadata = {
  title: "PakGuide AI | Pakistan's Trusted Government Services Navigator",
  description: "Official .gov.pk verified procedures, NADRA CNIC renewal, Urgent Passport fees, Fard Malkiat land records, BISP 8171 subsidy matcher, and WhatsApp phishing link scanner powered by Google Gemini 3.5 Flash Lite.",
  keywords: "Pakistan government services, NADRA CNIC renewal, Passport fee, BISP 8171, Kisan card, Phishing link scanner, PakGuide AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 antialiased selection:bg-pakgreen-800 selection:text-pakgold-300">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
