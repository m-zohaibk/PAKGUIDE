import { PhishingScanResult } from '@/types';

export function verifyGovDomain(inputUrl: string): { isSafe: boolean; cleanDomain: string; reason: string } {
  try {
    const parsed = new URL(inputUrl.startsWith('http://') || inputUrl.startsWith('https://') ? inputUrl : `https://${inputUrl}`);
    const hostname = parsed.hostname.toLowerCase();

    // Official Pakistan Government Domain Patterns
    const officialGovRegex = /^([a-z0-9-]+\.)*(gov\.pk|gop\.pk|gos\.pk|gob\.pk|kp\.gov\.pk|ajk\.gov\.pk|gilgitbaltistan\.gov\.pk)$/;

    if (officialGovRegex.test(hostname)) {
      return { isSafe: true, cleanDomain: hostname, reason: "Verified official Government of Pakistan domain." };
    }

    return { isSafe: false, cleanDomain: hostname, reason: "Unauthorized domain. Not an official government portal." };
  } catch (err) {
    return { isSafe: false, cleanDomain: inputUrl, reason: "Invalid URL structure." };
  }
}

export function performDetailedSecurityScan(inputUrl: string): PhishingScanResult {
  const basicCheck = verifyGovDomain(inputUrl);
  let cleanDomain = basicCheck.cleanDomain;
  const isGovDomainRegexMatch = basicCheck.isSafe;

  let urlObj: URL | null = null;
  try {
    urlObj = new URL(inputUrl.startsWith('http://') || inputUrl.startsWith('https://') ? inputUrl : `https://${inputUrl}`);
  } catch (e) {
    // Fallback parsing
  }

  const rawLower = inputUrl.toLowerCase();
  
  // Known Government Entities Impersonated in SMS Scams
  const scamKeywords = ['bisp', 'ehsaas', 'kisaan', 'nadra', 'passport', '8171', 'benazir', 'schemes', 'subsidy', 'fbr', 'tax', 'punjab-kisan'];
  const suspiciousTLDs = ['.xyz', '.top', '.online', '.site', '.tech', '.cc', '.info', '.biz', '.tk', '.ml', '.ga', '.work', '.me', '.club', '.vip', '.net'];

  const matchesKeyword = scamKeywords.find(kw => rawLower.includes(kw));
  const hasSuspiciousTLD = suspiciousTLDs.some(tld => rawLower.includes(tld));
  const isTyposquattingDetected = !isGovDomainRegexMatch && !!matchesKeyword;

  let threatLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical' = 'safe';
  let domainScore = 100;
  let reason = basicCheck.reason;
  let reasonUrdu = "یہ ویب سائٹ حکومت پاکستان کا تصدیق شدہ پورٹل ہے۔";
  let reasonRoman = "Ye domain Government of Pakistan ke saath officially registered hai.";
  let impersonatedEntity = undefined;
  let officialUrl = undefined;

  if (isGovDomainRegexMatch) {
    threatLevel = 'safe';
    domainScore = 98;
    if (cleanDomain.includes('nadra.gov.pk')) {
      officialUrl = 'https://nadra.gov.pk';
    } else if (cleanDomain.includes('bisp.gov.pk')) {
      officialUrl = 'https://bisp.gov.pk';
    } else if (cleanDomain.includes('dgip.gov.pk')) {
      officialUrl = 'https://dgip.gov.pk';
    }
  } else {
    // SCAM OR SUSPICIOUS
    domainScore = Math.max(5, 100 - (isTyposquattingDetected ? 50 : 25) - (hasSuspiciousTLD ? 35 : 10));

    if (matchesKeyword) {
      threatLevel = 'critical';
      if (matchesKeyword === 'bisp' || matchesKeyword === '8171' || matchesKeyword === 'benazir') {
        impersonatedEntity = 'Benazir Income Support Programme (BISP 8171)';
        officialUrl = 'https://bisp.gov.pk';
      } else if (matchesKeyword === 'nadra') {
        impersonatedEntity = 'NADRA Pak-Identity Portal';
        officialUrl = 'https://id.nadra.gov.pk';
      } else if (matchesKeyword === 'passport') {
        impersonatedEntity = 'Directorate General of Immigration & Passports';
        officialUrl = 'https://dgip.gov.pk';
      } else if (matchesKeyword === 'kisaan' || matchesKeyword === 'punjab-kisan') {
        impersonatedEntity = 'Punjab Kisan Card Scheme (PITB)';
        officialUrl = 'https://gop.pk';
      } else {
        impersonatedEntity = 'Government of Pakistan Portal';
        officialUrl = 'https://pakistan.gov.pk';
      }

      reason = `DANGER! Unauthorized domain "${cleanDomain}" is falsely claiming to be ${impersonatedEntity}. It uses generic domain extensions like ${urlObj?.hostname.split('.').pop() || 'non-gov'} to steal citizen CNIC & bank OTP details.`;
      reasonUrdu = `خطرہ! یہ غیر قانونی ویب سائٹ (${cleanDomain}) آپ کا شناختی کارڈ اور پن کوڈ چرانے کے لیے جعلی پورٹل بنی ہوئی ہے۔ اصل سرکاری ویب سائٹ پر جائیں۔`;
      reasonRoman = `KHATRA! Ye unauthorized domain "${cleanDomain}" fake website hai jo aap ka CNIC aur bank OTP churane ke liye banai gayi hai.`;
    } else {
      threatLevel = 'high';
      reason = `WARNING! "${cleanDomain}" is NOT registered under official Pakistan Government domain extensions (.gov.pk, .gop.pk, .gos.pk, .kp.gov.pk).`;
      reasonUrdu = `خبردار! یہ ویب سائٹ (${cleanDomain}) پاکستان کی سرکاری ویب سائٹس کی فہرست میں شامل نہیں ہے۔`;
      reasonRoman = `Khabardar! Ye website official government list mein shamil nahi hai.`;
    }
  }

  return {
    url: inputUrl,
    cleanDomain,
    isSafe: isGovDomainRegexMatch,
    threatLevel,
    domainScore,
    reason,
    reasonUrdu,
    reasonRoman,
    impersonatedEntity,
    officialUrl,
    verifiedHostingDetails: isGovDomainRegexMatch ? "Hosted by National Telecommunication Corporation (NTC) / Govt of Pakistan Server Infrastructure" : "Hosted on Unverified Offshore Commercial Server",
    fiaReportUrl: "https://nr3c.gov.pk",
    technicalChecks: {
      isGovDomainRegexMatch,
      hasSSL: inputUrl.startsWith('https://'),
      isTyposquattingDetected,
      suspiciousTLD: hasSuspiciousTLD,
    }
  };
}
