import { Language } from '@/types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Brand
    appTitle: "PakGuide AI",
    tagline: "Pakistan's Trusted Government Services Navigator",
    subtitle: "Zero-Scam verified procedures, AI checklists & instant subsidy matcher",
    verifiedBadge: "Official .gov.pk Verified",
    language: "Language",
    login: "Login / Register",
    loginWithPhone: "Login with Phone / Google",
    guestMode: "Citizen Guest Mode",
    mySavedAlerts: "Saved Alerts",
    apiKeySettings: "Gemini API Key",
    userGuide: "Citizen Safety Guide",
    
    // Nav Items
    navHome: "Home Dashboard",
    navNavigator: "Multimodal Navigator",
    navPhishing: "Phishing Radar",
    navMatcher: "Subsidy Matcher",
    navApps: "Verified Apps",

    // Screen 1: Command Center
    heroTitle: "Navigate Pakistani Government Services with 100% Security",
    heroSubtitle: "Ask anything in English, Urdu or Roman Urdu. Audit documents, spot SMS scams, and unlock official subsidies in seconds.",
    searchPlaceholder: "Ask anything (e.g. How do I get a Family Registration Certificate? Am I eligible for Punjab Kisan Card? Is this link genuine?)...",
    micTooltip: "Tap to speak in English or Urdu",
    listening: "Listening... Speak now",
    stopListening: "Stop listening",
    heroQuickTip: "Popular Searches:",
    quickCnic: "Smart CNIC Renewal",
    quickPassport: "Urgent Passport Fee",
    quickKisan: "Kisan Card Eligibility",
    quickPhishing: "Check WhatsApp Scam SMS",

    // 4 Primary Feature Cards
    card1Title: "Verify Government Link",
    card1Subtitle: "Anti-Scam WhatsApp & SMS URL Heuristic Scanner",
    card1Badge: "Anti-Phishing",

    card2Title: "Subsidy & Grant Matcher",
    card2Subtitle: "2-Minute questionnaire for BISP, Kisan & Youth Loans",
    card2Badge: "Financial Aid",

    card3Title: "Interactive Service Roadmaps",
    card3Subtitle: "Step-by-step NADRA, Passport & Fard Malkiat guides",
    card3Badge: "Checklist Generator",

    card4Title: "Verified Apps Directory",
    card4Subtitle: "Malware-free Google Play links for official Gov apps",
    card4Badge: "Official APK Directory",

    trustGuaranteeTitle: "Zero-Scam Guarantee",
    trustGuaranteeBody: "All links, fee structures, and document procedures are cross-referenced daily with official Government of Pakistan gazettes and verified .gov.pk portals.",

    // Live Stats
    statPortals: "Verified Gov Portals",
    statScams: "Scams Blocked",
    statSubsidies: "Official Subsidies Listed",
    statCitizens: "Citizens Guided",

    // Screen 2: Multimodal Navigator
    chatTitle: "Gemini 3.5 Flash Civic Assistant",
    chatSub: "Real-time bilingual guidance & in-memory document auditor",
    chatPlaceholder: "Type your query or upload a document photo...",
    inspectDocBtn: "Inspect Document (In-Memory OCR)",
    inspectDocSub: "Upload CNIC, B-Form or Land Fard to audit stamps & completeness",
    analyzingDoc: "Gemini Vision is auditing document compliance...",
    suniyeBtn: "Suniye / Listen",
    stopAudio: "Stop Audio",

    // Right Column: Dynamic Roadmap Card
    roadmapTitle: "Live Government Service Roadmap",
    roadmapSub: "Dynamic real-time requirement schedule & fee table",
    noActiveRoadmap: "Ask a service question or select a quick option to generate your interactive roadmap card.",
    deptLabel: "Responsible Authority:",
    jurisdictionLabel: "Jurisdiction:",
    checklistTitle: "Prerequisite Document Checklist",
    feeTableTitle: "Official Schedule of Fees (PKR)",
    feeNormal: "Normal Processing",
    feeUrgent: "Urgent Processing",
    feeExecutive: "Executive / Fast-Track",
    turnaroundTitle: "Official Processing Timeline",
    openPortalCTA: "Open Verified Official Portal",
    stepGuideTitle: "Step-by-Step Procedure",

    // Screen 3: Phishing Radar
    phishingTitle: "Phishing Radar & WhatsApp Link Audit",
    phishingSub: "Protect yourself from BISP scams, fake lottery links, and fraudulent government portals.",
    pasteUrlPlaceholder: "Paste suspicious link received via WhatsApp, SMS, or Social Media...",
    scanNowBtn: "Scan Link Legitimacy",
    scanningProgress: "Running Stage 1 Regex Domain Match & Stage 2 Gemini Heuristic Check...",
    testLinksTitle: "Try Sample Links to Test:",
    verdictSafeTitle: "VERIFIED SAFE GOVERNMENT PORTAL",
    verdictDangerTitle: "CRITICAL SECURITY ALERT! SCAM LINK DETECTED",
    domainVerifiedDetails: "Domain is registered with official Government TLD",
    impersonatingNotice: "This fake site is impersonating:",
    reportToFiaBtn: "Report Threat to FIA Cybercrime Wing (1991)",
    goOfficialInstead: "Visit Official Legitimate Portal Instead",
    fiaReportingTitle: "Report Fraudulent Link to FIA NR3C",
    fiaInstructions: "You are being routed to the official FIA Cybercrime reporting portal (nr3c.gov.pk) or national helpline 1991.",

    // Screen 4: Benefit Matcher
    matcherTitle: "Automated Benefit & Subsidy Matcher",
    matcherSub: "Discover official federal and provincial financial aid programs tailored to your family profile.",
    step1Title: "1. Demographic Baseline",
    step2Title: "2. Income & Occupation",
    step3Title: "3. Household Assets & Utility Tier",
    ageLabel: "Citizen Age (Years):",
    genderLabel: "Gender:",
    provinceLabel: "Province / Region:",
    districtLabel: "District:",
    incomeLabel: "Monthly Household Income (PKR):",
    employmentLabel: "Primary Occupation:",
    landLabel: "Agricultural Land Ownership (Acres):",
    electricityLabel: "Monthly Electricity Consumption Tier:",
    calculateEligibilityBtn: "Find My Eligible Subsidies & Grants",
    matchedResultsTitle: "Your Eligible Government Welfare Schemes",
    matchScore: "Eligibility Match Fit",
    saveToAppBtn: "Save to My Applications",
    savedSuccess: "Saved to your citizen dashboard!",
    applyOfficialBtn: "Apply on Official Portal",

    // Screen 5: Verified Apps Directory
    appsTitle: "Verified Government App Directory",
    appsSub: "Official, malware-checked mobile applications from Federal & Provincial Governments.",
    filterAll: "All Jurisdictions",
    filterFederal: "Federal",
    filterPunjab: "Punjab",
    filterSindh: "Sindh",
    filterKP: "Khyber Pakhtunkhwa",
    getOnPlayStore: "Get on Google Play",
    getOnAppStore: "Get on App Store",
    packageHash: "SHA-256 Package Verified",

    // User Guide Modal
    guideModalTitle: "PakGuide AI Citizen Safety & Operations Manual",
    guideStep1: "1. Never Pay Agents Outside Official Counters: All NADRA and Passport fees must be paid through official counters or e-Pay apps.",
    guideStep2: "2. Verify Web Links Before Entering CNIC: Always check the top address bar. Official domains end strictly in .gov.pk, .gop.pk, or .gos.pk.",
    guideStep3: "3. Document Pre-Check: Use our Multimodal Auditor before heading to government offices to ensure all seals, stamps, and B-Forms are present.",
    guideStep4: "4. Report SMS Fraud: Received SMS from unknown numbers claiming BISP 25,000 cash? Scan link here or report to 1991.",
    closeGuide: "Got it! Back to PakGuide AI",

    // General UI
    copyBtn: "Copy",
    copied: "Copied!",
    closeModal: "Close",
    loading: "Processing...",
    zeroStorageNotice: "Privacy Guarantee: Images and documents are processed in-memory and immediately destroyed. Zero file persistence."
  },
  ur: {
    // Header & Brand
    appTitle: "پاک گائیڈ اے آئی",
    tagline: "پاکستان کا قابلِ اعتماد حکومتی خدمات کا رہنما",
    subtitle: "زیرو اسکیم تصدیق شدہ طریقے، فوری اے آئی چیک لسٹس اور سبسڈیز",
    verifiedBadge: "سرکاری .gov.pk تصدیق شدہ",
    language: "زبان",
    login: "لاگ ان / رجسٹریشن",
    loginWithPhone: "فون نمبر / گوگل سے لاگ ان کریں",
    guestMode: "شہری گیسٹ موڈ",
    mySavedAlerts: "محفوظ الرٹس",
    apiKeySettings: "Gemini API کلید",
    userGuide: "شہری تحفظ گائیڈ",

    // Nav Items
    navHome: "ہوم ڈیش بورڈ",
    navNavigator: "ملٹی موڈل نيویگیٹر",
    navPhishing: "فشنگ رڈار",
    navMatcher: "سبسڈی میچر",
    navApps: "تصدیق شدہ ایپس",

    // Screen 1: Command Center
    heroTitle: "پاکستانی حکومتی خدمات کو 100% محفوظ طریقے سے حاصل کریں",
    heroSubtitle: "اردو، انگریزی یا رومن اردو میں پوچھیں۔ دستاویزات کی جانچ کریں، فراڈ لنکس پہچانیں اور سرکاری امداد حاصل کریں۔",
    searchPlaceholder: "کچھ بھی پوچھیں (مثلاً: فیملی رجسٹریشن سرٹیفکیٹ کیسے بنوائیں؟ کیا میں کسان کارڈ کا اہل ہوں؟)...",
    micTooltip: "اردو یا انگریزی بولنے کے لیے ٹیپ کریں",
    listening: "سنا جا رہا ہے... ابھی بولیں",
    stopListening: "بولنا بند کریں",
    heroQuickTip: "مقبول تلاش:",
    quickCnic: "سمارٹ شناختی کارڈ کی تجدید",
    quickPassport: "ارجنٹ پاسپورٹ فیس",
    quickKisan: "کسان کارڈ اہلیت",
    quickPhishing: "واٹس ایپ میسج کا سچ جانے",

    // 4 Primary Feature Cards
    card1Title: "سرکاری لنک کی تصدیق کریں",
    card1Subtitle: "جعلی میسج اور واٹس ایپ لنکس کی فوری جانچ",
    card1Badge: "اینٹی فراڈ اسکینر",

    card2Title: "سبسڈی و گرانٹ میچر",
    card2Subtitle: "بی آئی ایس پی، کسان اور یوتھ لون کے لیے 2 منٹ کا سوالنامہ",
    card2Badge: "مالی امداد",

    card3Title: "باہمی طریقہ کار گائیڈ",
    card3Subtitle: "نادرا، پاسپورٹ اور فرد ملکیت کے قدم بہ قدم رہنما",
    card3Badge: "چیک لسٹ جنریٹر",

    card4Title: "تصدیق شدہ سرکاری ایپس",
    card4Subtitle: "سرکاری ایپس کے ڈائریکٹ پلے اسٹور لنکس",
    card4Badge: "سرکاری ایپ ڈائریکٹری",

    trustGuaranteeTitle: "زیرو اسکیم ضمانت",
    trustGuaranteeBody: "تمام معلومات، فیسیں اور دستاویزات روزانہ سرکاری گزٹ اور .gov.pk پورٹلز سے تصدیق کی جاتی ہیں۔",

    // Live Stats
    statPortals: "تصدیق شدہ پورٹلز",
    statScams: "روکے گئے فراڈ",
    statSubsidies: "شامل سرکاری امداد",
    statCitizens: "رہنمائی پانے والے شہری",

    // Screen 2: Multimodal Navigator
    chatTitle: "جیٹ مینی 3.5 فلیش شہری اسسٹنٹ",
    chatSub: "ریئل ٹائم دو زبانوں میں رہنمائی اور ان میموری دستاویز کی جانچ",
    chatPlaceholder: "اپنا سوال لکھیں یا دستاویز کی تصویر اپ لوڈ کریں...",
    inspectDocBtn: "دستاویز کی جانچ کریں (ان میموری ocr)",
    inspectDocSub: "شناختی کارڈ یا بے فارم پر مہر اور تاریخ چیک کریں",
    analyzingDoc: "جیٹ مینی وژن دستاویز کا معائنہ کر رہا ہے...",
    suniyeBtn: "سنیں / Listen",
    stopAudio: "آواز بند کریں",

    // Right Column: Dynamic Roadmap Card
    roadmapTitle: "لائیو حکومتی سروس روڈ میپ",
    roadmapSub: "ضروری کاغذات کی چیک لسٹ اور فیس شیڈول",
    noActiveRoadmap: "اپنا سروس سوال پوچھیں تاکہ آپ کا روڈ میپ کارڈ تیار ہو سکے۔",
    deptLabel: "متعلقہ ادارہ:",
    jurisdictionLabel: "دائرہ اختیار:",
    checklistTitle: "لازمی کاغذات کی چیک لسٹ",
    feeTableTitle: "سرکاری فیس شیڈول (روپے)",
    feeNormal: "نارمل پروسیسنگ",
    feeUrgent: "ارجنٹ پروسیسنگ",
    feeExecutive: "ایگزیکٹو / فاسٹ ٹریک",
    turnaroundTitle: "تخمیناً وقت",
    openPortalCTA: "تصدیق شدہ پورٹل کھولیں",
    stepGuideTitle: "مرحلہ وار طریقہ کار",

    // Screen 3: Phishing Radar
    phishingTitle: "فشنگ رڈار اور واٹس ایپ لنکس کا معائنہ",
    phishingSub: "جعلی بے نظیر انکم سپورٹ یا لاٹری لنکس سے خود کو محفوظ رکھیں۔",
    pasteUrlPlaceholder: "واٹس ایپ یا ایس ایم ایس پر آیا ہوا مشکوک لنک یہاں پیسٹ کریں...",
    scanNowBtn: "لنک کی تصدیق کریں",
    scanningProgress: "مرحلہ 1 ڈومین تصدیق اور مرحلہ 2 اے آئی معائنہ جاری ہے...",
    testLinksTitle: "ٹیسٹ کے لیے لنکس آزمائیں:",
    verdictSafeTitle: "تصدیق شدہ اصل سرکاری پورٹل",
    verdictDangerTitle: "خطرہ! جعلی اور خطرناک لنک کی نشاندہی",
    domainVerifiedDetails: "یہ ڈومین حکومت پاکستان کی رجسٹرڈ ویب سائٹ ہے",
    impersonatingNotice: "یہ جعلی ویب سائٹ اس ادارے کا روپ دھار رہی ہے:",
    reportToFiaBtn: "ایف آئی اے سائبر کرائم کو رپورٹ کریں (1991)",
    goOfficialInstead: "اصل سرکاری ویب سائٹ پر جائیں",
    fiaReportingTitle: "ایف آئی اے سائبر کرائم رپورٹ",
    fiaInstructions: "آپ کو ایف آئی اے سائبر کرائم کی اصل ویب سائٹ (nr3c.gov.pk) پر بھیجا جا رہا ہے۔",

    // Screen 4: Benefit Matcher
    matcherTitle: "خودکار سبسڈی اور امداد میچر",
    matcherSub: "اپنی خاندانی اور معاشی معلومات کی بنیاد پر سرکاری اسکیمیں تلاش کریں۔",
    step1Title: "1. بنیادی معلومات",
    step2Title: "2. آمدن اور پیشہ",
    step3Title: "3. گھر کے اثاثے اور بجلی کا بل",
    ageLabel: "عمر (سال):",
    genderLabel: "جنس:",
    provinceLabel: "صوبہ / علاقہ:",
    districtLabel: "ضلع:",
    incomeLabel: "ماہانہ آمدن (روپے):",
    employmentLabel: "بنیادی پیشہ:",
    landLabel: "زرعی زمین (ایکڑ):",
    electricityLabel: "بجلی کا ماہانہ بل سلیب:",
    calculateEligibilityBtn: "میری اہلیت کی جانچ کریں",
    matchedResultsTitle: "آپ کی اہل سرکاری سکیمیں",
    matchScore: "اہلیت کا فیصد",
    saveToAppBtn: "میرے ڈیش بورڈ میں محفوظ کریں",
    savedSuccess: "ڈیش بورڈ میں محفوظ کر لیا گیا!",
    applyOfficialBtn: "سرکاری پورٹل پر درخواست دیں",

    // Screen 5: Verified Apps Directory
    appsTitle: "تصدیق شدہ سرکاری ایپس کی فہرست",
    appsSub: "وفاقی اور صوبائی حکومتوں کی وائرس سے پاک اصل ایپس۔",
    filterAll: "تمام علاقے",
    filterFederal: "وفاقی",
    filterPunjab: "پنجاب",
    filterSindh: "سندھ",
    filterKP: "خیبر پختونخوا",
    getOnPlayStore: "گوگل پلے سے ڈاؤن لوڈ کریں",
    getOnAppStore: "ایپل ایپ اسٹور سے ڈاؤن لوڈ کریں",
    packageHash: "SHA-256 پیکج تصدیق شدہ",

    // User Guide Modal
    guideModalTitle: "پاک گائیڈ اے آئی شہری رہنمائی گائیڈ",
    guideStep1: "1. ایجنٹوں کو کبھی پیسے نہ دیں: نادرا اور پاسپورٹ کی تمام فیسیں صرف سرکاری کاؤنٹر یا e-Pay ایپ سے ادا کریں۔",
    guideStep2: "2. شناختی کارڈ دینے سے پہلے ویب سائٹ کا لنک چیک کریں: اصل سرکاری سائٹس صرف .gov.pk، .gop.pk یا .gos.pk پر ختم ہوتی ہیں۔",
    guideStep3: "3. دفتر جانے سے پہلے کاغذات چیک کریں: ہمارے ملٹی موڈل اسکینر سے گھر بیٹھے مہریں اور بے فارم چیک کریں۔",
    guideStep4: "4. ایس ایم ایس فراڈ کی رپورٹ کریں: 25,000 روپے کا جعلی میسج آنے پر 1991 پر کال کریں۔",
    closeGuide: "سمجھ گیا! واپس پاک گائیڈ کی طرف",

    // General UI
    copyBtn: "کاپی",
    copied: "کاپی ہو گیا!",
    closeModal: "بند کریں",
    loading: "پروسیسنگ جاری ہے...",
    zeroStorageNotice: "پرائیویسی کی ضمانت: آپ کی تصاویر کمپیوٹر میں فوری پروسیس ہو کر ختم ہو جاتی ہیں۔ کوئی فائل محفوظ نہیں ہوتی۔"
  },
  ro: {
    // Header & Brand
    appTitle: "PakGuide AI",
    tagline: "Pakistan Ka Trusted Government Services Navigator",
    subtitle: "Zero-Scam verified tarika, AI checklists aur instant subsidy matcher",
    verifiedBadge: "Official .gov.pk Verified",
    language: "Language",
    login: "Login / Register",
    loginWithPhone: "Phone / Google se Login karein",
    guestMode: "Citizen Guest Mode",
    mySavedAlerts: "Saved Alerts",
    apiKeySettings: "Gemini API Key",
    userGuide: "Citizen Safety Guide",

    // Nav Items
    navHome: "Home Dashboard",
    navNavigator: "Multimodal Navigator",
    navPhishing: "Phishing Radar",
    navMatcher: "Subsidy Matcher",
    navApps: "Verified Apps",

    // Screen 1: Command Center
    heroTitle: "Pakistani Government Services Direct & Secure Tariqay Se Hasil Karein",
    heroSubtitle: "Urdu, English ya Roman Urdu mein poochein. Documents check karein, fraud links pehchanein aur sarkari imdad paayein.",
    searchPlaceholder: "Kuch bhi poochein (e.g. Family Registration Certificate kaise banayein? Punjab Kisan Card eligibility? Fake link check?)...",
    micTooltip: "Bolne ke liye tap karein",
    listening: "Suna ja raha hai... Abhi bolein",
    stopListening: "Stop karein",
    heroQuickTip: "Popular Searches:",
    quickCnic: "Smart CNIC Renewal",
    quickPassport: "Urgent Passport Fee",
    quickKisan: "Kisan Card Eligibility",
    quickPhishing: "WhatsApp Fraud Link Check",

    // 4 Primary Feature Cards
    card1Title: "Govt Link Verification",
    card1Subtitle: "Anti-Scam WhatsApp & SMS Link Scanner",
    card1Badge: "Anti-Phishing",

    card2Title: "Subsidy & Grant Matcher",
    card2Subtitle: "BISP, Kisan Card aur Youth Loans eligibility calculator",
    card2Badge: "Financial Aid",

    card3Title: "Interactive Service Roadmaps",
    card3Subtitle: "NADRA, Passport & Fard Malkiat step-by-step guide",
    card3Badge: "Checklist Generator",

    card4Title: "Verified Apps Directory",
    card4Subtitle: "Official Gov apps ke direct Play Store links",
    card4Badge: "Official APK Directory",

    trustGuaranteeTitle: "Zero-Scam Guarantee",
    trustGuaranteeBody: "Tamam fees, documents aur tareeqay daily official Government of Pakistan gazettes se cross-check kiye jaate hain.",

    // Live Stats
    statPortals: "Verified Gov Portals",
    statScams: "Scams Blocked",
    statSubsidies: "Official Subsidies Listed",
    statCitizens: "Citizens Assisted",

    // Screen 2: Multimodal Navigator
    chatTitle: "Gemini 3.5 Flash Civic Assistant",
    chatSub: "Real-time bilingual support aur document auditor",
    chatPlaceholder: "Apna sawal likhein ya document photo upload karein...",
    inspectDocBtn: "Inspect Document (In-Memory OCR)",
    inspectDocSub: "CNIC ya B-Form ki stamps aur dates check karein",
    analyzingDoc: "Gemini Vision document ki checking kar raha hai...",
    suniyeBtn: "Suniye / Listen",
    stopAudio: "Stop Audio",

    // Right Column: Dynamic Roadmap Card
    roadmapTitle: "Live Govt Service Roadmap",
    roadmapSub: "Zaroori documents ki list aur official fee schedule",
    noActiveRoadmap: "Apna sawal poochein taake aapka interactive roadmap card yahan tayar ho sakay.",
    deptLabel: "Department:",
    jurisdictionLabel: "Jurisdiction:",
    checklistTitle: "Zaroori Documents Checklist",
    feeTableTitle: "Official Fee Schedule (PKR)",
    feeNormal: "Normal Processing",
    feeUrgent: "Urgent Processing",
    feeExecutive: "Executive / Fast-Track",
    turnaroundTitle: "Processing Time Estimate",
    openPortalCTA: "Open Verified Official Portal",
    stepGuideTitle: "Step-by-Step Procedure",

    // Screen 3: Phishing Radar
    phishingTitle: "Phishing Radar & WhatsApp Link Audit",
    phishingSub: "Fake BISP, Lottery ya Govt links se khud ko mehfooz rakhein.",
    pasteUrlPlaceholder: "SMS ya WhatsApp par aya hua suspicious link yahan paste karein...",
    scanNowBtn: "Link Legitimacy Scan Karein",
    scanningProgress: "Stage 1 Domain Regex & Stage 2 Gemini AI Heuristic Check chal raha hai...",
    testLinksTitle: "Test ke liye ye links try karein:",
    verdictSafeTitle: "VERIFIED SAFE GOVERNMENT PORTAL",
    verdictDangerTitle: "CRITICAL SECURITY ALERT! SCAM LINK DETECTED",
    domainVerifiedDetails: "Ye domain Government of Pakistan ke saath officially registered hai",
    impersonatingNotice: "Ye fake site is official idaray ki nakal kar rahi hai:",
    reportToFiaBtn: "FIA Cybercrime ko Report Karein (1991)",
    goOfficialInstead: "Asli Official Website par Jaayein",
    fiaReportingTitle: "Report to FIA NR3C Cybercrime Wing",
    fiaInstructions: "Aap ko official FIA Cybercrime portal (nr3c.gov.pk) par connect kiya ja raha hai.",

    // Screen 4: Benefit Matcher
    matcherTitle: "Automated Benefit & Subsidy Matcher",
    matcherSub: "Apni family aur income profile ke mutabiq govt schemes dhundaein.",
    step1Title: "1. Demographics Baseline",
    step2Title: "2. Income & Occupation",
    step3Title: "3. Household Assets & Electricity",
    ageLabel: "Citizen Age (Years):",
    genderLabel: "Gender:",
    provinceLabel: "Province / Region:",
    districtLabel: "District:",
    incomeLabel: "Monthly Income (PKR):",
    employmentLabel: "Occupation / Pesha:",
    landLabel: "Zar'ai Zameen (Acres):",
    electricityLabel: "Electricity Monthly Consumption Tier:",
    calculateEligibilityBtn: "Meri Eligibility Check Karein",
    matchedResultsTitle: "Aap Ki Eligible Government Welfare Schemes",
    matchScore: "Match Score Fit",
    saveToAppBtn: "Save to My Dashboard",
    savedSuccess: "Dashboard mein save ho gaya!",
    applyOfficialBtn: "Official Portal par Apply Karein",

    // Screen 5: Verified Apps Directory
    appsTitle: "Verified Government App Directory",
    appsSub: "Federal & Provincial Govt ki malware-free official applications.",
    filterAll: "All Regions",
    filterFederal: "Federal",
    filterPunjab: "Punjab",
    filterSindh: "Sindh",
    filterKP: "Khyber Pakhtunkhwa",
    getOnPlayStore: "Get on Google Play",
    getOnAppStore: "Get on App Store",
    packageHash: "SHA-256 Package Verified",

    // User Guide Modal
    guideModalTitle: "PakGuide AI Citizen Safety Manual",
    guideStep1: "1. Agents ko paise na dein: NADRA aur Passport ki tamaam fees sirf official counters par ya e-Pay app se dein.",
    guideStep2: "2. Link hamesha check karein: Authentic govt websites strictly .gov.pk, .gop.pk ya .gos.pk par khatam hoti hain.",
    guideStep3: "3. Documents pehle check karein: Hamare AI Multimodal auditor se B-Form aur seals ghar baithay verify karein.",
    guideStep4: "4. Fake SMS ki report karein: 25,000 lottery cash ke SMS ki report 1991 par karein.",
    closeGuide: "Samajh gaya! Back to PakGuide AI",

    // General UI
    copyBtn: "Copy",
    copied: "Copied!",
    closeModal: "Close",
    loading: "Processing...",
    zeroStorageNotice: "Privacy Guarantee: Images strictly in-memory process hoto hain. Zero persistent storage."
  }
};
