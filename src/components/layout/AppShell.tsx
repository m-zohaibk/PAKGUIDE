'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { NavigatorScreen } from '@/components/screens/NavigatorScreen';
import { PhishingRadarScreen } from '@/components/screens/PhishingRadarScreen';
import { BenefitMatcherScreen } from '@/components/screens/BenefitMatcherScreen';
import { ModuleErrorBoundary } from '@/components/common/ModuleErrorBoundary';
import { VerifiedAppsScreen } from '@/components/screens/VerifiedAppsScreen';
import { ApiKeyModal } from '@/components/common/ApiKeyModal';
import { CitizenGuideModal } from '@/components/guide/CitizenGuideModal';
import { NavScreen, CitizenUser } from '@/types';

interface AppShellProps {
  initialScreen?: NavScreen;
}

export const AppShell: React.FC<AppShellProps> = ({ initialScreen = 'dashboard' }) => {
  const [activeScreen, setActiveScreen] = useState<NavScreen>(initialScreen);
  const [navQuery, setNavQuery] = useState<string | undefined>(undefined);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const [user, setUser] = useState<CitizenUser>({
    name: 'Citizen Guest',
    isLoggedIn: false,
    savedApplications: [],
    savedServices: [],
  });

  useEffect(() => {
    // Sync browser path on initial mount if available
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace('/', '');
      if (['navigator', 'phishing', 'matcher', 'apps'].includes(path)) {
        setActiveScreen(path as NavScreen);
      }
    }

    // Handle back/forward popstate
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      if (['navigator', 'phishing', 'matcher', 'apps'].includes(path)) {
        setActiveScreen(path as NavScreen);
      } else {
        setActiveScreen('dashboard');
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initialize & Seed Firestore Cloud Database
    import('@/lib/firebase/firestoreService').then(({ seedFirestoreDatabase }) => {
      seedFirestoreDatabase();
    });

    // Load local storage states
    const savedKey = localStorage.getItem('pakguide_gemini_key');
    if (savedKey) setApiKey(savedKey);

    const savedUserStr = localStorage.getItem('pakguide_user');
    if (savedUserStr) {
      try {
        setUser(JSON.parse(savedUserStr));
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('pakguide_gemini_key', key);
  };

  const handleUpdateUser = (updatedUser: CitizenUser) => {
    setUser(updatedUser);
    localStorage.setItem('pakguide_user', JSON.stringify(updatedUser));
  };

  const handleNavigate = (screen: NavScreen, query?: string) => {
    if (query) setNavQuery(query);
    setActiveScreen(screen);

    if (typeof window !== 'undefined') {
      const targetPath = screen === 'dashboard' ? '/' : `/${screen}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <Navbar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* MAIN SCREEN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        {activeScreen === 'dashboard' && (
          <DashboardScreen onNavigate={handleNavigate} />
        )}

        {activeScreen === 'navigator' && (
          <NavigatorScreen initialQuery={navQuery} apiKey={apiKey} />
        )}

        {activeScreen === 'phishing' && (
          <PhishingRadarScreen apiKey={apiKey} />
        )}

        {activeScreen === 'matcher' && (
          <ModuleErrorBoundary title="Subsidy Matcher">
            <BenefitMatcherScreen
              apiKey={apiKey}
              user={user}
              onUpdateUser={handleUpdateUser}
            />
          </ModuleErrorBoundary>
        )}

        {activeScreen === 'apps' && (
          <VerifiedAppsScreen />
        )}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <CitizenGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
};
