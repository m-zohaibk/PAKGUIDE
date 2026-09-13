import { VERIFIED_APPS, OFFICIAL_SERVICES, OFFICIAL_SUBSIDIES } from '@/data/pakistanGovData';
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
  })),
  ...OFFICIAL_SUBSIDIES.filter((sub) => sub.officialApplyUrl).map((sub) => ({
    id: sub.id,
    name: sub.name,
    nameUrdu: sub.nameUrdu,
    provider: sub.organization,
    playStoreUrl: sub.officialApplyUrl,
    appStoreUrl: sub.officialApplyUrl,
    packageName: 'Official Application Portal',
    iconBg: 'bg-emerald-700 text-white',
    verificationBadge: `${sub.organization} Verified`
  }))
];

export function findAppsInText(text: string): MatchedAppInfo[] {
  if (!text) return [];
  const textLower = text.toLowerCase();
  const matchedApps: MatchedAppInfo[] = [];
  const addedKeys = new Set<string>();

  for (const app of ALL_APPS_LIST) {
    const key = app.packageName && app.packageName !== 'Official Government App' && app.packageName !== 'Official Application Portal'
      ? app.packageName
      : app.playStoreUrl || app.id;

    if (addedKeys.has(key)) continue;

    const nameLower = app.name.toLowerCase();
    const nameUrdu = app.nameUrdu;

    let isMatch = false;

    if (textLower.includes(nameLower)) isMatch = true;
    if (text.includes(nameUrdu)) isMatch = true;

    // Specific key phrases matching
    if (app.id.includes('e-bike') || app.id.includes('ebike') || nameLower.includes('e-bike') || nameLower.includes('bike')) {
      if (textLower.includes('ebike') || textLower.includes('e-bike') || textLower.includes('electric bike') || textLower.includes('punjab bike') || textLower.includes('bikes.punjab.gov.pk') || text.includes('ای بائیک') || text.includes('بائیک') || text.includes('بائیکس')) {
        isMatch = true;
      }
    } else if (app.id.includes('kisan') || nameLower.includes('kisan')) {
      if (textLower.includes('kisan') || textLower.includes('agripunjab') || text.includes('کسان')) {
        isMatch = true;
      }
    } else if (app.id.includes('laptop') || nameLower.includes('laptop')) {
      if (textLower.includes('laptop') || textLower.includes('pmybals') || text.includes('لیپ ٹاپ')) {
        isMatch = true;
      }
    } else if (app.id.includes('pm-youth-business-loan') || app.id.includes('youth') || nameLower.includes('youth loan')) {
      if (textLower.includes('youth loan') || textLower.includes('business loan') || textLower.includes('pmyp') || text.includes('یوتھ لون') || text.includes('قرضہ')) {
        isMatch = true;
      }
    } else if (app.id.includes('pak-identity') || nameLower.includes('pak identity')) {
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
    } else if (app.id.includes('peef') || nameLower.includes('peef')) {
      if (textLower.includes('peef') || text.includes('پی ای ای ایف')) {
        isMatch = true;
      }
    } else if (app.id.includes('navttc') || nameLower.includes('navttc')) {
      if (textLower.includes('navttc') || text.includes('نیوٹیک')) {
        isMatch = true;
      }
    } else if (app.id.includes('citizen-portal') || nameLower.includes('citizen portal')) {
      if (textLower.includes('citizen portal') || text.includes('سٹیزن پورٹل')) {
        isMatch = true;
      }
    }

    if (isMatch) {
      matchedApps.push(app);
      addedKeys.add(key);
    }
  }

  return matchedApps;
}
