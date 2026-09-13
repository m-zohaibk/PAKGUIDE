import { VERIFIED_APPS, OFFICIAL_SERVICES } from '@/data/pakistanGovData';
import { VerifiedApp } from '@/types';

export interface MatchedAppInfo {
  id: string;
  name: string;
  nameUrdu: string;
  provider: string;
  playStoreUrl: string;
  appStoreUrl: string;
  packageName: string;
  iconBg: string;
  verificationBadge: string;
}

const ALL_APPS_LIST: MatchedAppInfo[] = [
  ...VERIFIED_APPS.map((app) => ({
    id: app.id,
    name: app.name,
    nameUrdu: app.nameUrdu,
    provider: app.provider,
    playStoreUrl: app.playStoreUrl,
    appStoreUrl: app.appStoreUrl,
    packageName: app.packageName,
    iconBg: app.iconBg,
    verificationBadge: app.verificationBadge
  })),
  ...OFFICIAL_SERVICES.filter((svc) => svc.officialAppName && svc.playStoreUrl).map((svc) => ({
    id: svc.id,
    name: svc.officialAppName!,
    nameUrdu: svc.titleUrdu,
    provider: svc.department,
    playStoreUrl: svc.playStoreUrl!,
    appStoreUrl: svc.appStoreUrl || svc.officialPortalUrl,
    packageName: svc.officialAppPackageName || 'Official Government App',
    iconBg: 'bg-emerald-800 text-white',
    verificationBadge: `${svc.department} Verified`
  }))
];

export function findAppsInText(text: string): MatchedAppInfo[] {
  if (!text) return [];
  const textLower = text.toLowerCase();
  const matchedApps: MatchedAppInfo[] = [];
  const addedIds = new Set<string>();

  for (const app of ALL_APPS_LIST) {
    if (addedIds.has(app.id)) continue;

    const nameLower = app.name.toLowerCase();
    const nameUrdu = app.nameUrdu;

    let isMatch = false;

    if (textLower.includes(nameLower)) isMatch = true;
    if (text.includes(nameUrdu)) isMatch = true;

    // Specific key phrases matching
    if (app.id.includes('pak-identity') || nameLower.includes('pak identity')) {
      if (textLower.includes('pak identity') || textLower.includes('pak-identity') || textLower.includes('pakid') || text.includes('پاک آئی ڈی')) {
        isMatch = true;
      }
    } else if (app.id.includes('dastak') || nameLower.includes('dastak')) {
      if (textLower.includes('dastak') || text.includes('دستک')) {
        isMatch = true;
      }
    } else if (app.id.includes('epay') || nameLower.includes('epay') || nameLower.includes('e-pay')) {
      if (textLower.includes('epay') || textLower.includes('e-pay') || text.includes('ای پے')) {
        isMatch = true;
      }
    } else if (app.id.includes('passport-fee') || nameLower.includes('passport fee')) {
      if (textLower.includes('passport fee') || text.includes('پاسپورٹ فیس')) {
        isMatch = true;
      }
    } else if (app.id.includes('passtrack') || nameLower.includes('passtrack')) {
      if (textLower.includes('passtrack') || textLower.includes('pass track') || text.includes('پاس ٹریک')) {
        isMatch = true;
      }
    } else if (app.id.includes('bisp') || nameLower.includes('bisp')) {
      if (textLower.includes('bisp') || textLower.includes('8171') || text.includes('بی آئی ایس پی')) {
        isMatch = true;
      }
    } else if (app.id.includes('citizen-portal') || nameLower.includes('citizen portal')) {
      if (textLower.includes('citizen portal') || text.includes('سٹیزن پورٹل')) {
        isMatch = true;
      }
    }

    if (isMatch) {
      matchedApps.push(app);
      addedIds.add(app.id);
    }
  }

  return matchedApps;
}
