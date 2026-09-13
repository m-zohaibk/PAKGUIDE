'use client';

import React, { useState, useEffect } from 'react';
import { Gift, CheckCircle, Calculator, ExternalLink, Bookmark, Sparkles, Sliders, ArrowRight, UserCheck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { SuniyeButton } from '@/components/common/SuniyeButton';
import { DemographicProfile, SubsidyScheme, CitizenUser } from '@/types';
import { OFFICIAL_SUBSIDIES } from '@/data/pakistanGovData';
import { fetchSubsidiesFromFirestore, syncUserSavedApplication } from '@/lib/firebase/firestoreService';
import confetti from 'canvas-confetti';

interface BenefitMatcherScreenProps {
  apiKey: string;
  user: CitizenUser;
  onUpdateUser: (user: CitizenUser) => void;
}

export const BenefitMatcherScreen: React.FC<BenefitMatcherScreenProps> = ({
  apiKey,
  user,
  onUpdateUser,
}) => {
  const { t, lang, isRtl } = useLanguage();
  const [profile, setProfile] = useState<DemographicProfile>({
    age: 28,
    gender: 'female',
    province: 'Punjab',
    district: 'Lahore',
    monthlyIncome: 35000,
    employmentType: 'Farmer',
    landOwnershipAcres: 2.5,
    electricityTier: '< 200 units (Lifeline)',
    householdMembers: 5,
  });

  const [matchedSchemes, setMatchedSchemes] = useState<SubsidyScheme[] | null>(null);
  const [cloudSubsidies, setCloudSubsidies] = useState<SubsidyScheme[]>(OFFICIAL_SUBSIDIES);
  const [calculating, setCalculating] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>(user.savedApplications || []);
  const [matcherError, setMatcherError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubsidiesFromFirestore().then((subs) => {
      if (subs && subs.length > 0) {
        setCloudSubsidies(subs);
      }
    });
  }, []);

  const handleToggleSave = (schemeId: string) => {
    const isSaved = savedIds.includes(schemeId);
    const newSaved = isSaved
      ? savedIds.filter(id => id !== schemeId)
      : [...savedIds, schemeId];
    
    setSavedIds(newSaved);
    onUpdateUser({
      ...user,
      savedApplications: newSaved
    });

    // Sync to Firestore Cloud
    if (user.email || user.name) {
      syncUserSavedApplication(user.email || user.name, schemeId, !isSaved);
    }
  };

  const handleCalculate = async () => {
    setMatcherError(null);
    const numericProfile = [profile.age, profile.monthlyIncome, profile.landOwnershipAcres, profile.householdMembers];
    if (numericProfile.some((value) => !Number.isFinite(value) || value < 0) || profile.age < 1 || profile.age > 120 || profile.householdMembers < 1) {
      setMatcherError('Please enter valid age, income, land, and household values before matching.');
      return;
    }

    setCalculating(true);
    try {
      const response = await fetch('/api/gemini/match-benefits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, apiKey })
      });
      const res = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(res.error || 'The eligibility service could not process this profile.');
      }

      const schemes = Array.isArray(res.schemes)
        ? res.schemes.filter((scheme: SubsidyScheme) => scheme && typeof scheme.id === 'string')
        : cloudSubsidies;
      setMatchedSchemes(schemes.length > 0 ? schemes : cloudSubsidies);

      // Fire celebratory confetti!
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setMatchedSchemes(null);
      setMatcherError(err instanceof Error ? err.message : 'Unable to calculate eligibility. Please try again.');
    } finally {
      setCalculating(false);
    }
  };

  const handleToggleSaveScheme = (schemeId: string) => {
    let updated: string[] = [];
    if (savedIds.includes(schemeId)) {
      updated = savedIds.filter(id => id !== schemeId);
    } else {
      updated = [...savedIds, schemeId];
    }
    setSavedIds(updated);
    onUpdateUser({
      ...user,
      savedApplications: updated
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-pakgold-600 via-amber-600 to-pakgold-700 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-500/50 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/60 border border-amber-400/50 text-amber-100 text-xs font-bold">
          <Gift className="w-4 h-4 text-amber-200" />
          <span>Government Financial Aid Engine</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold">{t('matcherTitle')}</h2>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          {t('matcherSub')}
        </p>

        <SuniyeButton
          textToSpeak={`${t('matcherTitle')}. ${t('matcherSub')}`}
          variant="hero"
        />
      </div>

      {/* 3-STEP DEMOGRAPHIC QUESTIONNAIRE FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-8">
        {matcherError && (
          <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold leading-relaxed text-red-800">
            <p className="font-extrabold">Eligibility check needs attention</p>
            <p className="mt-1">{matcherError}</p>
          </div>
        )}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pakgreen-800" />
            <span>Citizen Profile Questionnaire</span>
          </h3>
          <span className="text-xs font-bold text-pakgold-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            3 Quick Steps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 1: DEMOGRAPHICS */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
              {t('step1Title')}
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('ageLabel')} {profile.age}
              </label>
              <input
                type="range"
                min={18}
                max={75}
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                className="w-full accent-pakgreen-800 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('genderLabel')}
              </label>
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-pakgreen-600"
              >
                <option value="female">Female (خاتون)</option>
                <option value="male">Male (مرد)</option>
                <option value="transgender">Transgender (خواجہ سرا)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('provinceLabel')}
              </label>
              <select
                value={profile.province}
                onChange={(e) => setProfile({ ...profile, province: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-pakgreen-600"
              >
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Islamabad (ICT)">Islamabad (ICT)</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>
          </div>

          {/* STEP 2: INCOME & OCCUPATION */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
              {t('step2Title')}
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{t('incomeLabel')}</span>
                <span className="font-mono text-pakgreen-800 font-bold">PKR {profile.monthlyIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={0}
                max={200000}
                step={5000}
                value={profile.monthlyIncome}
                onChange={(e) => setProfile({ ...profile, monthlyIncome: Number(e.target.value) })}
                className="w-full accent-pakgold-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('employmentLabel')}
              </label>
              <select
                value={profile.employmentType}
                onChange={(e) => setProfile({ ...profile, employmentType: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-pakgreen-600"
              >
                <option value="Daily Wager">Daily Wager (دیہاڑی دار)</option>
                <option value="Farmer">Farmer / Agriculture (کسان)</option>
                <option value="Student">Student (طالب علم)</option>
                <option value="Small Business Owner">Small Business Owner (چھوٹا تاجر)</option>
                <option value="Unemployed">Unemployed (بے روزگار)</option>
                <option value="Private Employee">Private Employee</option>
                <option value="Housewife">Housewife (خانہ دار)</option>
              </select>
            </div>
          </div>

          {/* STEP 3: HOUSEHOLD ASSETS */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
              {t('step3Title')}
            </h4>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>{t('landLabel')}</span>
                <span className="font-mono text-pakgreen-800 font-bold">{profile.landOwnershipAcres} Acres</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={0.5}
                value={profile.landOwnershipAcres}
                onChange={(e) => setProfile({ ...profile, landOwnershipAcres: Number(e.target.value) })}
                className="w-full accent-pakgreen-800 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('electricityLabel')}
              </label>
              <select
                value={profile.electricityTier}
                onChange={(e) => setProfile({ ...profile, electricityTier: e.target.value as any })}
                className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-pakgreen-600"
              >
                <option value="< 200 units (Lifeline)">&lt; 200 units (Lifeline Protected)</option>
                <option value="200 - 500 units">200 – 500 units</option>
                <option value="500+ units">500+ units</option>
              </select>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleCalculate}
          disabled={calculating}
          className="w-full py-4 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-extrabold rounded-2xl shadow-xl shadow-pakgreen-800/20 text-sm flex items-center justify-center gap-2 transition-all"
        >
          {calculating ? (
            <span>Calculating Gemini 3.5 Eligibility...</span>
          ) : (
            <>
              <Calculator className="w-5 h-5 text-pakgold-400" />
              <span>{t('calculateEligibilityBtn')}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>
      </div>

      {/* MATCHED RESULTS MATRIX */}
      {matchedSchemes && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
              <Gift className="w-6 h-6 text-pakgold-600" />
              <span>{t('matchedResultsTitle')}</span>
            </h3>
            <span className="text-xs font-extrabold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full">
              {matchedSchemes.length} Matched Schemes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedSchemes.map((scheme) => {
              const isSaved = savedIds.includes(scheme.id);
              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full uppercase tracking-wider">
                          {scheme.category}
                        </span>
                        <h4 className="font-bold text-lg text-slate-900 mt-1">
                          {lang === 'ur' ? scheme.nameUrdu : scheme.name}
                        </h4>
                        <p className="text-xs text-slate-500">{scheme.organization}</p>
                      </div>

                      {/* Match Score Badge */}
                      <div className="text-center p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl shrink-0">
                        <div className="text-xl font-black text-emerald-800 font-mono">
                          {scheme.matchPercentage}%
                        </div>
                        <div className="text-[9px] font-bold text-emerald-700 uppercase">
                          Fit Score
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 font-bold text-xs">
                      {scheme.stipendOrBenefitText}
                    </div>

                    {/* Why Matched List */}
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <p className="font-bold text-slate-900 text-[11px]">Why You Qualify:</p>
                      <ul className="space-y-1 pl-4 list-disc text-[11px] text-slate-600">
                        {(Array.isArray(scheme.whyMatched) ? scheme.whyMatched : []).map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleToggleSaveScheme(scheme.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isSaved
                          ? 'bg-pakgold-500 text-slate-950 shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>{isSaved ? t('savedSuccess') : t('saveToAppBtn')}</span>
                    </button>

                    <a
                      href={scheme.officialApplyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-pakgreen-800 hover:bg-pakgreen-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <span>{t('applyOfficialBtn')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
