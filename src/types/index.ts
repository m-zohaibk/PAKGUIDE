export type Language = 'en' | 'ur' | 'ro'; // English, Urdu, Roman Urdu

export type NavScreen = 'dashboard' | 'navigator' | 'phishing' | 'matcher' | 'apps';

export interface FeeSchedule {
  category: string;
  normal: number; // PKR
  urgent: number; // PKR
  executive?: number; // PKR
  deliveryTimeDaysNormal: string;
  deliveryTimeDaysUrgent: string;
  deliveryTimeDaysExecutive?: string;
  notes?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  labelUrdu: string;
  labelRoman: string;
  isChecked: boolean;
  requiredCount: number;
  isMandatory: boolean;
  notes?: string;
  notesUrdu?: string;
}

export interface GovService {
  id: string;
  title: string;
  titleUrdu: string;
  titleRoman: string;
  department: string;
  departmentUrdu: string;
  jurisdiction: 'Federal' | 'Punjab' | 'Sindh' | 'Khyber Pakhtunkhwa' | 'Balochistan' | 'AJK' | 'Gilgit-Baltistan' | 'ICT';
  category: 'Identity' | 'Immigration' | 'Land Records' | 'Certificates' | 'Taxation' | 'Business' | 'Transport';
  summary: string;
  summaryUrdu: string;
  summaryRoman: string;
  fees: FeeSchedule;
  officialPortalUrl: string;
  verifiedGovDomain: string;
  checklist: ChecklistItem[];
  turnaroundEstimate: string;
  turnaroundEstimateUrdu: string;
  steps: {
    stepNumber: number;
    title: string;
    titleUrdu: string;
    description: string;
    descriptionUrdu: string;
  }[];
  officialAppName?: string;
  officialAppPackageName?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  formSubmissionProcedure?: string;
  formSubmissionProcedureUrdu?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  textUrdu?: string;
  timestamp: string;
  attachedImage?: string; // Base64 data URL for document inspection
  roadmapData?: GovService; // Embedded dynamic checklist card
  isAudio?: boolean;
}

export interface PhishingScanResult {
  url: string;
  cleanDomain: string;
  isSafe: boolean;
  threatLevel: 'safe' | 'low' | 'medium' | 'high' | 'critical';
  domainScore: number; // 0 to 100
  reason: string;
  reasonUrdu: string;
  reasonRoman: string;
  impersonatedEntity?: string;
  officialUrl?: string;
  verifiedHostingDetails?: string;
  fiaReportUrl: string;
  technicalChecks: {
    isGovDomainRegexMatch: boolean;
    hasSSL: boolean;
    isTyposquattingDetected: boolean;
    suspiciousTLD: boolean;
  };
}

export interface DocumentAuditResult {
  docType: 'cnic' | 'bform' | 'frc' | 'land_fard' | 'passport' | 'domicile' | 'marriage_nikahnama' | 'unknown';
  docName: string;
  isValidFormat: boolean;
  completenessScore: number; // 0 - 100
  extractedFields: {
    cnicNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    holderName?: string;
    fatherName?: string;
    district?: string;
    stampVerified?: boolean;
  };
  missingStampsOrSigns: string[];
  missingStampsOrSignsUrdu: string[];
  formattingErrors: string[];
  rejectionRiskAlerts: string[];
  recommendations: string[];
  recommendationsUrdu: string[];
}

export interface DemographicProfile {
  age: number;
  gender: 'male' | 'female' | 'transgender';
  province: 'Punjab' | 'Sindh' | 'Khyber Pakhtunkhwa' | 'Balochistan' | 'Islamabad (ICT)' | 'Azad Jammu & Kashmir' | 'Gilgit-Baltistan';
  district: string;
  monthlyIncome: number; // PKR
  employmentType: 'Daily Wager' | 'Farmer' | 'Student' | 'Small Business Owner' | 'Unemployed' | 'Private Employee' | 'Govt Employee' | 'Housewife';
  landOwnershipAcres: number;
  electricityTier: '< 200 units (Lifeline)' | '200 - 500 units' | '500+ units';
  householdMembers: number;
}

export interface SubsidyScheme {
  id: string;
  name: string;
  nameUrdu: string;
  nameRoman: string;
  organization: string;
  category: 'Cash Transfer' | 'Loan / Capital' | 'Agricultural' | 'Scholarship' | 'Housing' | 'Healthcare';
  stipendOrBenefitText: string;
  matchPercentage: number;
  eligibilityStatus: 'Eligible' | 'Highly Likely' | 'Partial Fit' | 'Not Eligible';
  whyMatched: string[];
  whyMatchedUrdu: string[];
  requiredDocs: string[];
  officialApplyUrl: string;
  deadlineText: string;
}

export interface AppStepInstruction {
  stepNumber: number;
  title: string;
  titleUrdu: string;
  description: string;
  descriptionUrdu: string;
  proTip?: string;
}

export interface AppDetailedGuide {
  overview: string;
  overviewUrdu: string;
  keyFeatures: string[];
  keyFeaturesUrdu: string[];
  stepByStepInstructions: AppStepInstruction[];
  prerequisites: string[];
  prerequisitesUrdu: string[];
  commonMistakesToAvoid: string[];
  commonMistakesToAvoidUrdu: string[];
  officialHelpline: string;
  videoGuideTitle: string;
  videoGuideSummary: string;
}

export interface VerifiedApp {
  id: string;
  name: string;
  nameUrdu: string;
  provider: string; // e.g. "NADRA", "PITB", "Federal Govt"
  jurisdiction: 'Federal' | 'Punjab' | 'Sindh' | 'Khyber Pakhtunkhwa' | 'KP' | 'Balochistan' | 'ICT';
  category: 'Identity' | 'Payments & Taxes' | 'Police & Safety' | 'Municipal' | 'Healthcare';
  description: string;
  descriptionUrdu: string;
  iconBg: string;
  playStoreUrl: string;
  appStoreUrl: string;
  packageName: string;
  verificationBadge: string;
  detailedGuide: AppDetailedGuide;
}

export interface CitizenUser {
  phoneNumber?: string;
  email?: string;
  name: string;
  isLoggedIn: boolean;
  savedApplications: string[]; // SubsidyScheme IDs
  savedServices: string[]; // GovService IDs
}
