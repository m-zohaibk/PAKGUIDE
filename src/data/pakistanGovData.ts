import { GovService, SubsidyScheme, VerifiedApp } from '@/types';

export const OFFICIAL_SERVICES: GovService[] = [
  {
    id: 'b-form-child-registration',
    title: 'B-Form / Child Registration Certificate (CRC)',
    titleUrdu: 'بچوں کا بے فارم / رجسٹریشن سرٹیفکیٹ (CRC)',
    titleRoman: 'B-Form / Child Registration Certificate (CRC)',
    department: 'National Database and Registration Authority (NADRA)',
    departmentUrdu: 'قومی اندارج و معلوماتي اتھارٹی (نادرا)',
    jurisdiction: 'Federal',
    category: 'Certificates',
    summary: 'Official NADRA Child Registration Certificate (CRC / B-Form) for minors under 18 years. Apply via Pak Identity App or NADRA Registration Center.',
    summaryUrdu: '18 سال سے کم عمر بچوں کے لیے نادرا کا آفیشل بے فارم (CRC)۔ پاک آئی ڈی ایپ یا نادرا سینٹر سے حاصل کریں۔',
    summaryRoman: 'Under 18 bacho ke liye official NADRA B-Form (CRC). Pak Identity App ya NADRA center se banwayein.',
    fees: {
      category: 'NADRA B-Form (CRC) Registration Fees',
      normal: 50,
      urgent: 500,
      executive: 1000,
      deliveryTimeDaysNormal: '15 Working Days',
      deliveryTimeDaysUrgent: '7 Working Days',
      deliveryTimeDaysExecutive: 'Same Day / 2 Days',
      notes: 'Official NADRA fixed B-Form fee is Rs 50 (Executive Rs 500-1000).'
    },
    officialPortalUrl: 'https://id.nadra.gov.pk',
    verifiedGovDomain: 'id.nadra.gov.pk',
    officialAppName: 'Pak Identity App (NADRA Official)',
    officialAppPackageName: 'pk.gov.nadra.pakid',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.gov.nadra.pakid',
    appStoreUrl: 'https://apps.apple.com/us/app/pak-identity/id1563975817',
    formSubmissionProcedure: '1. Open Pak Identity App or Visit NADRA Center -> 2. Submit Parents CNIC Copies & Union Council Birth Certificate -> 3. Verify Child Name & Date of Birth -> 4. Pay Rs 50 Fee -> 5. Receive Printed Official NADRA B-Form (CRC).',
    formSubmissionProcedureUrdu: '1. پاک آئی ڈی ایپ کھولیں یا نادرا سینٹر جائیں -> 2. والدین کے شناختی کارڈ اور برتھ سرٹیفکیٹ دیں -> 3. بچے کا نام اور تاریخ پیدائش چیک کریں -> 4. 50 روپے فیس دیں -> 5. نادرا سے بے فارم حاصل کریں۔',
    turnaroundEstimate: 'Same Day to 15 Days',
    turnaroundEstimateUrdu: 'اسی دن سے 15 دن',
    checklist: [
      {
        id: 'bf1',
        label: 'Parents Original Valid Smart CNICs',
        labelUrdu: 'والدین کے اصل نادرا سمارٹ شناختی کارڈز',
        labelRoman: 'Parents Original Smart CNICs',
        isChecked: false,
        requiredCount: 2,
        isMandatory: true
      },
      {
        id: 'bf2',
        label: 'Union Council Birth Certificate / Hospital Birth Slip',
        labelUrdu: 'یونین کونسل برتھ سرٹیفکیٹ کاپی',
        labelRoman: 'Union Council Birth Certificate',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'bf3',
        label: 'Pak Identity Mobile App or NADRA Center Token',
        labelUrdu: 'پاک آئی ڈی ایپ یا نادرا ٹوکن',
        labelRoman: 'Pak Identity App or NADRA Token',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain Union Council Birth Registration Slip',
        titleUrdu: 'یونین کونسل سے برتھ سرٹیفکیٹ حاصل کریں',
        description: 'Get child official birth record registered at your local Union Council or Cantonment Board.',
        descriptionUrdu: 'مقامی یونین کونسل سے بچے کا برتھ سرٹیفکیٹ درج کروائیں۔'
      },
      {
        stepNumber: 2,
        title: 'Open Pak Identity App or Visit NADRA Center',
        titleUrdu: 'پاک آئی ڈی ایپ یا نادرا سینٹر جائیں',
        description: 'Launch Pak Identity App, tap "Child Registration Certificate (CRC)", or visit nearest NADRA Registration Center with both parents.',
        descriptionUrdu: 'پاک آئی ڈی ایپ میں بی فارم منتخب کریں یا والدین کے ساتھ نادرا سینٹر کا وزٹ کریں۔'
      },
      {
        stepNumber: 3,
        title: 'Verify Child Record & Pay Rs 50 Fee',
        titleUrdu: 'بچے کا ڈیٹا چیک کریں اور 50 روپے فیس دیں',
        description: 'Verify spelling of child name, father/mother CNIC link, and pay official Rs 50 NADRA fee.',
        descriptionUrdu: 'بچے کا نام اور تاریخ پیدائش کی تصدیق کر کے 50 روپے فیس ادا کریں۔'
      },
      {
        stepNumber: 4,
        title: 'Receive Official Printed B-Form (CRC)',
        titleUrdu: 'اصل نادرا بے فارم حاصل کریں',
        description: 'Collect official printed green NADRA Child Registration Certificate (B-Form).',
        descriptionUrdu: 'نادرا کا آفیشل سبز رنگ کا بے فارم (CRC) وصول کریں۔'
      }
    ]
  },
  {
    id: 'cnic-renewal',
    title: 'Smart CNIC Renewal (100% Digital via Pak-Identity App)',
    titleUrdu: 'سمارٹ شناختی کارڈ کی تجدید (100% ڈیجیٹل موبائل ایپ سے)',
    titleRoman: 'Smart CNIC Renewal (100% Digital Mobile App)',
    department: 'National Database and Registration Authority (NADRA)',
    departmentUrdu: 'قومی اندارج و معلوماتي اتھارٹی (نادرا)',
    jurisdiction: 'Federal',
    category: 'Identity',
    summary: '100% Digital CNIC Renewal — Scan fingerprints using your smartphone camera and receive your Smart CNIC at home via Pakistan Post!',
    summaryUrdu: 'گھر بیٹھے 100% ڈیجیٹل طریقے سے موبائل کیمرے سے فنگر پرنٹ دیں اور سمارٹ شناختی کارڈ گھر پر حاصل کریں۔',
    summaryRoman: 'Ghar baithay mobile camera se fingerprints dein aur Smart CNIC home delivery hasil karein.',
    fees: {
      category: 'Smart CNIC Renewal Fees (Online & Delivery)',
      normal: 750,
      urgent: 1500,
      executive: 2500,
      deliveryTimeDaysNormal: '31 Working Days',
      deliveryTimeDaysUrgent: '15 Working Days',
      deliveryTimeDaysExecutive: '7 Working Days',
      notes: 'Home delivery via Pakistan Post requires Rs. 250 additional courier charge.'
    },
    officialPortalUrl: 'https://id.nadra.gov.pk',
    verifiedGovDomain: 'id.nadra.gov.pk',
    officialAppName: 'Pak Identity App (NADRA)',
    officialAppPackageName: 'pk.gov.nadra.pakid',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.gov.nadra.pakid',
    appStoreUrl: 'https://apps.apple.com/us/app/pak-identity/id1563975817',
    formSubmissionProcedure: '1. Download Pak Identity App -> 2. Select CNIC Renewal / New CNIC -> 3. Smartphone Camera Fingerprint Scanning -> 4. White Backdrop Photo -> 5. Online Card Payment -> 6. Track Courier Home Delivery.',
    formSubmissionProcedureUrdu: '1. پاک آئی ڈی ایپ انسٹال کریں -> 2. شناختی کارڈ کی تجدید منتخب کریں -> 3. کیمرے سے فنگر پرنٹ اسکین کریں -> 4. سفید بیک گراؤنڈ پر تصویر بنائیں -> 5. فیس پے کریں -> 6. شناختی کارڈ گھر حاصل کریں۔',
    turnaroundEstimate: '7 to 31 Working Days (Home Delivered)',
    turnaroundEstimateUrdu: '7 سے 31 دن (گھر پر ڈلیوری)',
    checklist: [
      {
        id: 'c1',
        label: 'Pak Identity Mobile App (iOS / Android)',
        labelUrdu: 'پاک آئی ڈی موبائل ایپ',
        labelRoman: 'Pak Identity Mobile App',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true,
        notes: 'Download from official Play Store or App Store.'
      },
      {
        id: 'c2',
        label: 'Existing CNIC 13-Digit Number',
        labelUrdu: 'موجودہ 13 ہندسوں والا شناختی کارڈ نمبر',
        labelRoman: '13-Digit CNIC Number',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'c3',
        label: 'Smartphone with 8MP+ Rear Camera & Flash',
        labelUrdu: 'کیمرے اور فلیش والا اسمارٹ فون',
        labelRoman: 'Smartphone with Camera',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true,
        notes: 'Used for camera-based fingerprint biometrics.'
      },
      {
        id: 'c4',
        label: 'Debit / Credit Card or Mobile Wallet for Payment',
        labelUrdu: 'آن لائن ادائیگی کے لیے ڈیبٹ کارڈ یا ای پے',
        labelRoman: 'Debit Card or Online Banking',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Download Official Pak Identity App',
        titleUrdu: 'پاک آئی ڈی ایپ ڈاؤن لوڈ کریں',
        description: 'Install official Pak Identity App by NADRA from Google Play Store or Apple App Store and verify mobile OTP.',
        descriptionUrdu: 'گوگل پلے یا ایپ اسٹور سے پاک آئی ڈی ایپ ڈاؤن لوڈ کر کے او ٹی پی سے لاگ ان کریں۔'
      },
      {
        stepNumber: 2,
        title: 'Select "Identity Card Renewal"',
        titleUrdu: 'شناختی کارڈ کی تجدید منتخب کریں',
        description: 'Choose CNIC Renewal, enter 13-digit CNIC number, and select processing tier (Normal, Urgent, Executive).',
        descriptionUrdu: 'درخواست کی قسم میں تجدید منتخب کریں اور اپنا 13 ہندسوں کا نادرا نمبر درج کریں۔'
      },
      {
        stepNumber: 3,
        title: 'Scan Fingerprints with Smartphone Camera',
        titleUrdu: 'موبائل کیمرے سے فنگر پرنٹ اسکین کریں',
        description: 'Place 4 fingers of left and right hand in front of rear phone camera in bright lighting until green circle locks.',
        descriptionUrdu: 'روشنی میں موبائل کیمرے کے سامنے چاروں انگلیاں رکھیں تاکہ فنگر پرنٹ اسکین ہو جائیں۔'
      },
      {
        stepNumber: 4,
        title: 'Capture White Background Photo & Pay Online',
        titleUrdu: 'تصویر لیں اور آن لائن فیس دیں',
        description: 'Take selfie against a white wall and pay fee via card. Track courier delivery on your mobile.',
        descriptionUrdu: 'سفید پس منظر میں تصویر کھینچیں اور کارڈ سے فیس پے کریں۔ کارڈ آپ کے گھر ڈلیور ہوگا۔'
      }
    ]
  },
  {
    id: 'domicile-certificate-dastak',
    title: 'Domicile Certificate (100% Doorstep via Dastak App)',
    titleUrdu: 'ڈومیسائل سرٹیفکیٹ (100% ڈور اسٹیپ دستک ایپ سے)',
    titleRoman: 'Domicile Certificate (100% Doorstep via Dastak App)',
    department: 'Government of Punjab & PITB (CM Maryam Nawaz Initiative)',
    departmentUrdu: 'حکومت پنجاب و پی آئی ٹی بی (دستک سروس)',
    jurisdiction: 'Punjab',
    category: 'Certificates',
    summary: '100% Doorstep Facilitation — Dastak Official Representative visits your home to take biometrics. Zero visits to DC or AC offices!',
    summaryUrdu: 'دستک ایپ کے ذریعے پنجاب حکومت کا نمائندہ خود آپ کے گھر آ کر بائیو میٹرک لے گا اور ڈومیسائل گھر پہنچائے گا۔',
    summaryRoman: 'Dastak App se official facilitator ghar aaye ga. Zero office visits required!',
    fees: {
      category: 'Domicile & Doorstep Service Charges',
      normal: 200,
      urgent: 1200,
      deliveryTimeDaysNormal: '5 to 7 Working Days (Home Delivered)',
      deliveryTimeDaysUrgent: '3 Working Days',
      notes: 'Fee includes official DC domicile fee + Rs. 1,200 doorstep facilitator service.'
    },
    officialPortalUrl: 'https://dastak.punjab.gov.pk',
    verifiedGovDomain: 'dastak.punjab.gov.pk',
    officialAppName: 'Dastak Doorstep Services App (CM Maryam Nawaz)',
    officialAppPackageName: 'pk.pitb.gov.dastakHomeDelivery',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.pitb.gov.dastakHomeDelivery',
    appStoreUrl: 'https://apps.apple.com/us/app/dastak-doorstep-services/id6479348922',
    formSubmissionProcedure: '1. Open Dastak App or Call Helpline 1202 -> 2. Select Domicile Certificate -> 3. Choose Appointment Date & Time -> 4. Facilitator Visits Home & Scans Biometrics -> 5. Verified Domicile Delivered to Doorstep.',
    formSubmissionProcedureUrdu: '1. دستک ایپ یا 1202 پر کال کریں -> 2. ڈومیسائل منتخب کریں -> 3. وقت بک کریں -> 4. سرکاری نمائندہ گھر آ کر بائیو میٹرک لے گا -> 5. ڈومیسائل گھر ڈلیور ہوگا۔',
    turnaroundEstimate: '3 to 7 Days (Delivered to Doorstep)',
    turnaroundEstimateUrdu: '3 سے 7 دن (گھر کی دہلیز پر)',
    checklist: [
      {
        id: 'd1',
        label: 'Dastak Doorstep Mobile App or Helpline 1202',
        labelUrdu: 'دستک ایپ یا ہیلپ لائن 1202',
        labelRoman: 'Dastak App or Helpline 1202',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'd2',
        label: 'Applicant Original Smart CNIC (Above 18) or B-Form',
        labelUrdu: 'اصل سمارٹ شناختی کارڈ یا بے فارم',
        labelRoman: 'Original Smart CNIC or B-Form',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'd3',
        label: 'Electricity / Gas Utility Bill Copy of Punjab Address',
        labelUrdu: 'رہائشی بجلی کا بل کاپی',
        labelRoman: 'Electricity Bill Copy',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'd4',
        label: 'Matric / Educational Marksheet Copy',
        labelUrdu: 'میٹرک کی سند کی کاپی',
        labelRoman: 'Matric Result Card Copy',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Open Dastak App & Select "Domicile Certificate"',
        titleUrdu: 'دستک ایپ میں ڈومیسائل سرٹیفکیٹ منتخب کریں',
        description: 'Install Dastak app by Punjab Govt or call 1202. Choose "Domicile Certificate" under DC services.',
        descriptionUrdu: 'دستک ایپ کھولیں یا 1202 پر کال کر کے ڈومیسائل سروس بک کریں۔'
      },
      {
        stepNumber: 2,
        title: 'Book Home Visit Time Slot',
        titleUrdu: 'گھر پر آمد کا وقت بک کریں',
        description: 'Pick a convenient date and time for the official Dastak Facilitator to visit your residence.',
        descriptionUrdu: 'نمائندے کی آمد کے لیے اپنی مرضی کی تاریخ اور وقت سلیکٹ کریں۔'
      },
      {
        stepNumber: 3,
        title: 'Facilitator Home Arrival & Biometric Capture',
        titleUrdu: 'نمائندے کی آمد اور بائیو میٹرک',
        description: 'Verified Dastak Facilitator wearing official jacket arrives at your home, scans CNIC & fingerprints on tablet.',
        descriptionUrdu: 'سرکاری ڈریس میں ملبوس نمائندہ آپ کے گھر آ کر فنگر پرنٹس اور کاغذات اسکین کرے گا۔'
      },
      {
        stepNumber: 4,
        title: 'Doorstep Delivery of Official Domicile',
        titleUrdu: 'ڈومیسائل کی گھر پر ڈلیوری',
        description: 'Pay official fee + service charge. The processed original Domicile Certificate is delivered to your home.',
        descriptionUrdu: 'فیس ادا کریں، اور اصل ڈومیسائل سرٹیفکیٹ 5 دنوں میں آپ کے گھر پہنچا دیا جائے گا۔'
      }
    ]
  },
  {
    id: 'machine-readable-passport',
    title: 'e-Passport & MRP Renewal (100% Online Portal & Fee Asan App)',
    titleUrdu: 'پاسپورٹ کی تجدید (100% آن لائن پورٹل و ایپ سے)',
    titleRoman: 'e-Passport Renewal (100% Online Portal & App)',
    department: 'Directorate General of Immigration & Passports',
    departmentUrdu: 'ڈائریکٹوریٹ جنرل آف امیگریشن اینڈ پاسپورٹس',
    jurisdiction: 'Federal',
    category: 'Immigration',
    summary: '100% Online Passport Renewal via DGIP Portal (onlinemrp.dgip.gov.pk) & 17-digit PSID fee payment via Passport Fee Asan App!',
    summaryUrdu: 'آن لائن پورٹل سے پاسپورٹ کی تجدید کروائیں اور پاسپورٹ فیس آسان ایپ سے 0% ایجنٹ کمیشن پر فیس پے کریں۔',
    summaryRoman: 'Online MRP Portal se passport renew karein aur Fee Asan App se online payment karein.',
    fees: {
      category: 'Ordinary 36-Page Passport Fees (5 Years)',
      normal: 4500,
      urgent: 7500,
      executive: 12500,
      deliveryTimeDaysNormal: '15 Working Days (Courier Delivered)',
      deliveryTimeDaysUrgent: '4 Working Days',
      deliveryTimeDaysExecutive: '2 Working Days',
      notes: 'Generate 17-digit PSID starting with 9999... and pay via 1Bill/EasyPaisa.'
    },
    officialPortalUrl: 'https://onlinemrp.dgip.gov.pk',
    verifiedGovDomain: 'dgip.gov.pk',
    officialAppName: 'Passport Fee Asan App & DGIP Portal',
    officialAppPackageName: 'com.dgip.epayment',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.dgip.epayment',
    appStoreUrl: 'https://apps.apple.com/ie/app/passport-fee-asaan/id1636201133',
    formSubmissionProcedure: '1. Generate 17-Digit PSID on Passport Fee Asan App -> 2. Pay via Mobile Banking 1Bill -> 3. Complete Application Form on onlinemrp.dgip.gov.pk -> 4. Receive Courier Passport at Home.',
    formSubmissionProcedureUrdu: '1. پاسپورٹ فیس آسان ایپ سے 17 ہندسوں کا PSID حاصل کریں -> 2. ایزی پیسہ یا بینک ایپ سے فیس پے کریں -> 3. آن لائن پورٹل پر فارم فل کریں -> 4. پاسپورٹ گھر حاصل کریں۔',
    turnaroundEstimate: '2 to 15 Working Days (Home Courier)',
    turnaroundEstimateUrdu: '2 سے 15 دن (کورئیر ڈلیوری)',
    checklist: [
      {
        id: 'p1',
        label: 'Passport Fee Asan Mobile App for 17-Digit PSID',
        labelUrdu: 'پاسپورٹ فیس آسان ایپ (PSID فیس کوڈ)',
        labelRoman: 'Passport Fee Asan App',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'p2',
        label: 'Original Valid CNIC / Smart CNIC Number',
        labelUrdu: 'اصل نادرا سمارٹ شناختی کارڈ نمبر',
        labelRoman: 'Original Smart CNIC Number',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'p3',
        label: 'Old Passport Photo/Scan (For Online Renewal)',
        labelUrdu: 'پرانے پاسپورٹ کی اسکین کاپی',
        labelRoman: 'Old Passport Scan',
        isChecked: false,
        requiredCount: 1,
        isMandatory: false
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Generate 17-Digit PSID via Passport Fee Asan App',
        titleUrdu: 'پاسپورٹ فیس آسان ایپ سے PSID حاصل کریں',
        description: 'Open app, select passport validity (5/10 Years) & category, enter CNIC to generate 17-digit PSID code.',
        descriptionUrdu: 'ایپ میں پاسپورٹ اور CNIC کی تفصیلات لکھ کر 17 ہندسوں کا PSID نمبر حاصل کریں۔'
      },
      {
        stepNumber: 2,
        title: 'Pay Online via Mobile Banking / EasyPaisa (0% Commission)',
        titleUrdu: 'آن لائن بینکنگ یا ایزی پیسہ سے فیس ادا کریں',
        description: 'Pay via 1Bill in your banking app. Zero agent commission charged.',
        descriptionUrdu: 'بینک ایپ یا ایزی پیسہ کے 1Bill آپشن سے فیس پے کریں۔ ایجنٹوں کو فالتو پیسے نہ دیں۔'
      },
      {
        stepNumber: 3,
        title: 'Apply Online on DGIP Portal (onlinemrp.dgip.gov.pk)',
        titleUrdu: 'ڈی جی آئی پی پورٹل پر آن لائن اپلائی کریں',
        description: 'Log into official portal, upload photo & fingerprint form, and submit application for home delivery.',
        descriptionUrdu: 'ڈی جی آئی پی ویب سائٹ پر تصویر اور بائیو میٹرک فارم اپ لوڈ کر کے ہوم ڈلیوری حاصل کریں۔'
      }
    ]
  },
  {
    id: 'fard-malkiat-land-record',
    title: 'Digital Fard Malkiat (100% Instant PDF Download)',
    titleUrdu: 'ڈیجیٹل فرد ملکیت (100% فوری پی ڈی ایف آن لائن)',
    titleRoman: 'Digital Fard Malkiat (100% Instant PDF Online)',
    department: 'Punjab / Sindh Land Records Authority (PLRA / SRCA)',
    departmentUrdu: 'پنجاب اراضی ریکارڈ اتھارٹی (PLRA)',
    jurisdiction: 'Punjab',
    category: 'Land Records',
    summary: '100% Instant Digital Fard Issuance — Search your property on Punjab Zamin Portal, pay Rs. 150 via e-Pay Punjab, and download QR-code verified PDF Fard instantly!',
    summaryUrdu: 'گھر بیٹھے 150 روپے ای پے پنجاب سے ادا کر کے اپنی زمین کی کیو آر کوڈ والی اصل فرد ملکیت پی ڈی ایف فوری ڈاؤن لوڈ کریں۔',
    summaryRoman: 'Ghar baithay Rs. 150 e-Pay se dein aur QR code verified PDF Fard Malkiat instant download karein.',
    fees: {
      category: 'Digital Fard Issuance Government Fee',
      normal: 150,
      urgent: 150,
      deliveryTimeDaysNormal: 'Instant Digital PDF Download (0 Minutes)',
      deliveryTimeDaysUrgent: 'Instant Digital PDF Download',
      notes: 'Carries official QR verification accepted by banks for loans and property registries.'
    },
    officialPortalUrl: 'https://www.punjab-zamin.gov.pk',
    verifiedGovDomain: 'punjab-zamin.gov.pk',
    officialAppName: 'e-Pay Punjab & Punjab Zamin Portal',
    officialAppPackageName: 'com.pitb.ePayGateway',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pitb.ePayGateway',
    appStoreUrl: 'https://apps.apple.com/us/app/epay-punjab/id1465068821',
    formSubmissionProcedure: '1. Visit punjab-zamin.gov.pk -> 2. Input District, Tehsil, & CNIC -> 3. Generate PSID -> 4. Pay Rs 150 on e-Pay Punjab App -> 5. Instant Download Watermarked QR PDF Fard.',
    formSubmissionProcedureUrdu: '1. پنجاب زمین پورٹل پر جائیں -> 2. شناختی کارڈ سے اراضی تلاش کریں -> 3. PSID بنائیں -> 4. ای پے ایپ پر 150 فیس پے کریں -> 5. پی ڈی ایف فرد فوری ڈاؤن لوڈ کریں۔',
    turnaroundEstimate: 'Instant PDF Download (0 Minutes)',
    turnaroundEstimateUrdu: 'فوری آن لائن پی ڈی ایف (0 منٹ)',
    checklist: [
      {
        id: 'f1',
        label: 'Property Owner CNIC Number',
        labelUrdu: 'مالک کا شناختی کارڈ نمبر',
        labelRoman: 'Owner CNIC Number',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'f2',
        label: 'Khewat Number / Murabba Number / Property Registration ID',
        labelUrdu: 'کھوٹ نمبر / مربع نمبر',
        labelRoman: 'Khewat Number / Murabba Number',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'f3',
        label: 'e-Pay Punjab App for Rs. 150 Payment',
        labelUrdu: 'ای پے پنجاب ایپ (150 روپے فیس)',
        labelRoman: 'e-Pay Punjab App',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Search Property on Punjab Zamin Portal',
        titleUrdu: 'پنجاب زمین پورٹل پر اراضی تلاش کریں',
        description: 'Visit punjab-zamin.gov.pk, select District, Tehsil, and Mauza, and enter owner CNIC.',
        descriptionUrdu: 'پنجاب زمین پورٹل پر اپنا ضلع، تحصیل اور موضع درج کر کے شناختی کارڈ سے اراضی نکالیں۔'
      },
      {
        stepNumber: 2,
        title: 'Generate PSID & Pay Rs. 150 via e-Pay Punjab',
        titleUrdu: '150 روپے کی ادائیگی ای پے سے کریں',
        description: 'System generates PSID. Pay Rs. 150 through e-Pay Punjab app or JazzCash/EasyPaisa.',
        descriptionUrdu: 'پی ایس آئی ڈی بنا کر ای پے پنجاب یا جاز کیش سے 150 روپے فیس جمع کروائیں۔'
      },
      {
        stepNumber: 3,
        title: 'Download QR-Verified PDF Fard Malkiat',
        titleUrdu: 'کیو آر کوڈ والی پی ڈی ایف فرد ڈاؤن لوڈ کریں',
        description: 'Instantly download watermarked, QR code verified PDF land title directly onto your device.',
        descriptionUrdu: 'فوری طور پر کیو آر کوڈ والی تصدیق شدہ فرد پی ڈی ایف میں ڈاؤن لوڈ کریں۔'
      }
    ]
  },
  {
    id: 'family-registration-certificate',
    title: 'Family Registration Certificate (100% Instant PDF via Pak-Identity)',
    titleUrdu: 'فیملی رجسٹریشن سرٹیفکیٹ (100% آن لائن پی ڈی ایف)',
    titleRoman: 'Family Registration Certificate (100% Instant PDF)',
    department: 'National Database and Registration Authority (NADRA)',
    departmentUrdu: 'قومی اندارج و معلوماتي اتھارٹی (نادرا)',
    jurisdiction: 'Federal',
    category: 'Certificates',
    summary: '100% Online FRC Certificate — Download official NADRA family tree PDF on your email within minutes using Pak Identity App!',
    summaryUrdu: 'گھر بیٹھے پاک آئی ڈی ایپ سے اپنے تمام خاندانی افراد کا نادرا ایف آر سی سرٹیفکیٹ پی ڈی ایف میں ای میل پر حاصل کریں۔',
    summaryRoman: 'Pak Identity App se apna family FRC certificate email par PDF format mein instant paayein.',
    fees: {
      category: 'FRC Digital Certificate Fee',
      normal: 1000,
      urgent: 1000,
      deliveryTimeDaysNormal: 'Instant Electronic PDF Download (Email Delivered)',
      deliveryTimeDaysUrgent: 'Instant Electronic PDF Download',
      notes: 'Official NADRA fixed fee Rs 1,000 paid online.'
    },
    officialPortalUrl: 'https://id.nadra.gov.pk',
    verifiedGovDomain: 'id.nadra.gov.pk',
    officialAppName: 'Pak Identity App (NADRA)',
    officialAppPackageName: 'pk.gov.nadra.pakid',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.gov.nadra.pakid',
    appStoreUrl: 'https://apps.apple.com/us/app/pak-identity/id1563975817',
    formSubmissionProcedure: '1. Open Pak Identity App -> 2. Select FRC (Parents & Siblings or Spouse & Children) -> 3. Verify Master Family Tree -> 4. Pay Rs 1,000 -> 5. Instant High-Res PDF FRC Sent to Email.',
    formSubmissionProcedureUrdu: '1. پاک آئی ڈی ایپ میں FRC منتخب کریں -> 2. نادرا خاندانی ڈیٹا دیکھیں -> 3. 1000 فیس پے کریں -> 4. ای میل پر FRC پی ڈی ایف فوری حاصل کریں۔',
    turnaroundEstimate: 'Instant Electronic PDF (Email Delivered)',
    turnaroundEstimateUrdu: 'فوری ای میل پی ڈی ایف ڈلیوری',
    checklist: [
      {
        id: 'frc1',
        label: 'CNIC Numbers of all Family Members',
        labelUrdu: 'تمام خاندانی افراد کے شناختی کارڈ نمبرز',
        labelRoman: 'Tamam family members ke CNIC numbers',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'frc2',
        label: 'Child CRC (B-Form) Numbers for minors',
        labelUrdu: 'بچوں کے بے فارم نمبرز',
        labelRoman: 'Under 18 bacho ke B-Form numbers',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      },
      {
        id: 'frc3',
        label: 'Pak Identity Mobile App or Portal',
        labelUrdu: 'پاک آئی ڈی ایپ یا پورٹل',
        labelRoman: 'Pak Identity App',
        isChecked: false,
        requiredCount: 1,
        isMandatory: true
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Login to Pak Identity App',
        titleUrdu: 'پاک آئی ڈی ایپ میں لاگ ان کریں',
        description: 'Open app, select "Family Registration Certificate (FRC)", and choose Parents & Siblings OR Spouse & Children.',
        descriptionUrdu: 'پاک آئی ڈی ایپ میں جا کر ایف آر سی سروس کا انتخاب کریں۔'
      },
      {
        stepNumber: 2,
        title: 'Verify Automatically Loaded Family Tree',
        titleUrdu: 'نادرا خاندانی ڈیٹا کی تصدیق کریں',
        description: 'Review full names and relationship tags fetched directly from NADRA master database.',
        descriptionUrdu: 'نادرا کی طرف سے دکھائے گئے ناموں اور لنکس کا معائنہ کریں۔'
      },
      {
        stepNumber: 3,
        title: 'Pay Rs. 1000 & Receive PDF on Email',
        titleUrdu: '1000 روپے فیس پے کر کے ای میل سے پی ڈی ایف پائیں',
        description: 'Pay online via card or 1Bill and receive official high-res PDF FRC directly in your email inbox.',
        descriptionUrdu: 'آن لائن فیس دیں اور اپنے ای میل پر نادرا کا آفیشل FRC پی ڈی ایف فوری حاصل کریں۔'
      }
    ]
  }
];

export const OFFICIAL_SUBSIDIES: SubsidyScheme[] = [
  {
    id: 'bisp-kafaalat',
    name: 'Benazir Kafaalat Quarterly Stipend (BISP 8171)',
    nameUrdu: 'بینظیر کفالت سہ ماہی وظیفہ (بی آئی ایس پی 8171)',
    nameRoman: 'Benazir Kafaalat Quarterly Cash (BISP 8171)',
    organization: 'Benazir Income Support Programme',
    category: 'Cash Transfer',
    stipendOrBenefitText: 'PKR 10,500 per Quarter Direct Cash Support',
    matchPercentage: 96,
    eligibilityStatus: 'Eligible',
    whyMatched: [
      'Household income is under Poverty Scorecard PMT threshold (below PKR 32,000/month)',
      'Female head of family registered in NSER Dynamic Registry',
      'No federal/provincial government employee in immediate household'
    ],
    whyMatchedUrdu: [
      'گھریلو ماہانہ آمدن 32,000 روپے سے کم ہے',
      'خاتون سربراہ قومی خوشحالی رجسٹری (NSER) میں درج ہیں',
      'گھر میں کوئی سرکاری ملازم نہیں ہے'
    ],
    requiredDocs: ['Original Smart CNIC of Female Head', 'NSER Survey Slip', 'Biometric Fingerprint Verification'],
    officialApplyUrl: 'https://8171.bisp.gov.pk',
    deadlineText: 'Quarterly Ongoing Payments'
  },
  {
    id: 'punjab-kisan-card',
    name: 'Chief Minister Punjab Kisan Card (Interest-Free Agri Credit)',
    nameUrdu: 'وزیر اعلیٰ پنجاب کسان کارڈ (بلا سود زراعت قرضہ)',
    nameRoman: 'CM Punjab Kisan Card (Bila Sood Agri Loan)',
    organization: 'Punjab Information Technology Board & Dept of Agriculture',
    category: 'Agricultural',
    stipendOrBenefitText: 'PKR 150,000 Interest-Free Loan for Fertilizer/Seeds',
    matchPercentage: 92,
    eligibilityStatus: 'Eligible',
    whyMatched: [
      'Owns up to 12.5 acres of agricultural land registered in Punjab Land Records',
      'Valid CNIC and SIM registered against applicant CNIC',
      'Clear e-CIB credit rating at State Bank of Pakistan'
    ],
    whyMatchedUrdu: [
      'پنجاب لینڈ ریکارڈ میں 12.5 ایکڑ تک زرعی زمین درج ہے',
      'شناختی کارڈ کے نام پر ایکٹو فون سم موجود ہے',
      'بینکوں سے ڈیفالٹ نہیں ہیں'
    ],
    requiredDocs: ['CNIC Original', 'Fard Malkiat Land Title', 'Biometric Scan at HBL Konnect Agent'],
    officialApplyUrl: 'https://agripunjab.gov.pk',
    deadlineText: 'Open for Rabi & Kharif Seasons'
  },
  {
    id: 'pm-youth-business-loan',
    name: 'Prime Minister Youth Business & Agriculture Loans (PMYB&ALS)',
    nameUrdu: 'وزیر اعظم یوتھ بزنس اینڈ ایگری کلچر لون اسکیم',
    nameRoman: 'PM Youth Business & Agri Loans (PMYB&ALS)',
    organization: 'Prime Minister Youth Programme & National Banks',
    category: 'Loan / Capital',
    stipendOrBenefitText: 'Tier 1: Up to PKR 500,000 Interest-Free (0% Markup)',
    matchPercentage: 88,
    eligibilityStatus: 'Highly Likely',
    whyMatched: [
      'Pakistani citizen aged between 21 and 45 years',
      'Viable small business idea / shop expansion plan',
      'Tier 1 requires zero collateral security'
    ],
    whyMatchedUrdu: [
      'عمر 21 سے 45 سال کے درمیان ہے',
      'نیا چھوٹا کاروبار شروع کرنے کا قابل عمل منصوبہ',
      'ٹائر 1 میں کسی ضمانت کی ضرورت نہیں'
    ],
    requiredDocs: ['CNIC Copy', 'Business Plan Summary', 'Educational/Skill Certificate (If applicable)'],
    officialApplyUrl: 'https://pmyp.gov.pk',
    deadlineText: 'Applications Open Year-Round'
  },
  {
    id: 'peef-scholarships',
    name: 'Punjab Educational Endowment Fund (PEEF Master Scholarships)',
    nameUrdu: 'پنجاب ایجوکیشنل اینڈومنٹ فنڈ (پی ای ای ایف وظائف)',
    nameRoman: 'Punjab Educational Endowment Fund (PEEF)',
    organization: 'PEEF Government of Punjab',
    category: 'Scholarship',
    stipendOrBenefitText: 'Full Tuition Fee Coverage + PKR 6,000 Monthly Maintenance',
    matchPercentage: 85,
    eligibilityStatus: 'Highly Likely',
    whyMatched: [
      'Secured minimum 60% marks in Matriculation / Intermediate Board exam',
      'Monthly parental income is less than PKR 60,000',
      'Enrolled in recognized public university or college'
    ],
    whyMatchedUrdu: [
      'میٹرک یا انٹرمیڈل بورڈ امتحان میں کم از کم 60 فیصد نمبر حاصل کیے ہیں',
      'والدین کی ماہانہ آمدن 60,000 روپے سے کم ہے'
    ],
    requiredDocs: ['Matric/Inter Result Card', 'Income Certificate by AC/Tehsildar', 'CNIC/B-Form'],
    officialApplyUrl: 'https://peef.org.pk',
    deadlineText: 'Deadline: November 30'
  },
  {
    id: 'navttc-skill-training',
    name: 'NAVTTC Skill Development & Technical Training',
    nameUrdu: 'نیوٹیک ہنر مندی اور فنی تربیت پروگرام',
    nameRoman: 'NAVTTC Skill Training',
    organization: 'National Vocational & Technical Training Commission',
    category: 'Scholarship',
    stipendOrBenefitText: 'Free market-oriented technical courses, certification, and selected trainee support',
    matchPercentage: 85,
    eligibilityStatus: 'Highly Likely',
    whyMatched: ['Open to eligible Pakistani youth based on the selected batch and course criteria', 'Student, unemployed, and early-career profiles may qualify for skills training'],
    whyMatchedUrdu: ['منتخب بیچ اور کورس کی شرائط کے مطابق پاکستانی نوجوان درخواست دے سکتے ہیں', 'طلبہ، بے روزگار اور نئے کیریئر والے افراد کے لیے ہنر مندی کے مواقع'],
    requiredDocs: ['CNIC or B-Form', 'Educational certificate', 'Active mobile number'],
    officialApplyUrl: 'https://navttc.gov.pk',
    deadlineText: 'Batch-based intake — verify the latest announcement on NAVTTC portal'
  },
  {
    id: 'pm-youth-laptop-scheme',
    name: 'Prime Minister Youth Laptop Scheme',
    nameUrdu: 'وزیر اعظم یوتھ لیپ ٹاپ اسکیم',
    nameRoman: 'PM Youth Laptop Scheme',
    organization: 'Higher Education Commission / Prime Minister Youth Programme',
    category: 'Scholarship',
    stipendOrBenefitText: 'Merit-based laptop opportunity for eligible students enrolled in participating institutions',
    matchPercentage: 82,
    eligibilityStatus: 'Highly Likely',
    whyMatched: ['Student profile matches the primary audience for the laptop scheme', 'Final eligibility depends on institution, academic record, and latest phase rules'],
    whyMatchedUrdu: ['طلبہ کا پروفائل لیپ ٹاپ اسکیم کے بنیادی امیدواروں سے مطابقت رکھتا ہے', 'حتمی اہلیت ادارے، تعلیمی ریکارڈ اور تازہ مرحلے کی شرائط پر منحصر ہے'],
    requiredDocs: ['CNIC/B-Form', 'University enrollment record', 'Student registration details'],
    officialApplyUrl: 'https://laptop.pmyp.gov.pk',
    deadlineText: 'Phase-based — check the latest HEC/PMYP announcement'
  },
  {
    id: 'pm-youth-e-bike-scheme',
    name: 'Prime Minister Youth Electric Bike Opportunity',
    nameUrdu: 'وزیر اعظم یوتھ الیکٹرک بائیک موقع',
    nameRoman: 'PM Youth E-Bike Opportunity',
    organization: 'Prime Minister Youth Programme / Participating Banks',
    category: 'Loan / Capital',
    stipendOrBenefitText: 'Selected youth may access subsidized or financed electric bikes under the active phase terms',
    matchPercentage: 78,
    eligibilityStatus: 'Highly Likely',
    whyMatched: ['Youth, student, and working profiles may match transport opportunity criteria', 'Final terms depend on active phase, age, city, bank, and repayment rules'],
    whyMatchedUrdu: ['نوجوان، طلبہ اور ملازمت پیشہ افراد موجودہ شرائط کے تحت اہل ہو سکتے ہیں', 'حتمی شرائط مرحلے، عمر، شہر، بینک اور ادائیگی کے اصولوں پر منحصر ہیں'],
    requiredDocs: ['CNIC', 'Proof of student/employment status', 'Bank or financing documents if required'],
    officialApplyUrl: 'https://pmyp.gov.pk',
    deadlineText: 'Phase-based — verify current availability and terms before applying'
  }
];

export const VERIFIED_APPS: VerifiedApp[] = [
  {
    id: 'dastak-doorstep',
    name: 'Dastak Doorstep Service',
    nameUrdu: 'دستک ڈور اسٹیپ سروس (پنجاب)',
    provider: 'Government of Punjab & PITB (CM Maryam Nawaz)',
    jurisdiction: 'Punjab',
    category: 'Municipal',
    description: 'Get Domicile, Birth Certificate, Marriage Certificate delivered directly to your doorstep by official facilitators. Zero office visits!',
    descriptionUrdu: 'ڈومیسائل، برتھ سرٹیفکیٹ اور برتھ و نکاح ریکارڈ گھر کی دہلیز پر حاصل کریں۔ سرکاری دفاتر کی لائنوں سے 100% آزادی۔',
    iconBg: 'bg-amber-600 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.pitb.gov.dastakHomeDelivery',
    appStoreUrl: 'https://apps.apple.com/us/app/dastak-doorstep-services/id6479348922',
    packageName: 'pk.pitb.gov.dastakHomeDelivery',
    verificationBadge: 'CM Maryam Nawaz Doorstep Verified',
    detailedGuide: {
      overview: 'Dastak is Chief Minister Punjab Maryam Nawaz flagship doorstep service delivery initiative. Verified Dastak Facilitators visit citizen homes to collect fingerprints and physical documents, saving citizens from visiting offices.',
      overviewUrdu: 'دستک وزیراعلیٰ پنجاب مریم نواز کا انقلابی فلیگ شپ پروگرام ہے جس کے تحت پنجاب حکومت کا آفیشل نمائندہ خود آپ کے گھر آ کر بائیو میٹرک اور دستاویزات لے جاتا ہے۔',
      keyFeatures: [
        'CMIT queries and Punjab government complaint/request tracking',
        'Police services: character, general, employee and tenant verification; FIR copies; lost reports; vehicle verification/registration; police record checks',
        'Social welfare agency registration and citizen welfare services',
        'Local government: birth, death, marriage, divorce, character and domicile certificates, including birth certificate corrections',
        'Board of Revenue Fard services: issue, request, application, milkiyat, malik, baqaya and haqooq records',
        'Special and agriculture services: credit, machinery, loans, subsidies, licenses, taxes and department information',
        'Population welfare, transport and sanitation services delivered through the digital service directory',
        'Verified facilitator booking, biometric capture, document upload, fee payment and doorstep tracking'
      ],
      keyFeaturesUrdu: [
        'سی ایم آئی ٹی سوالات اور پنجاب حکومت کی شکایت و درخواست ٹریکنگ',
        'پولیس خدمات: کریکٹر، جنرل، ملازم اور کرایہ دار تصدیق، ایف آئی آر کاپی، گمشدگی رپورٹ، گاڑی تصدیق و رجسٹریشن اور پولیس ریکارڈ چیک',
        'سوشل ویلفیئر ایجنسی رجسٹریشن اور شہری فلاحی خدمات',
        'بلدیاتی خدمات: پیدائش، موت، شادی، طلاق، کریکٹر اور ڈومیسائل سرٹیفکیٹ، پیدائش سرٹیفکیٹ کی اصلاح سمیت',
        'بورڈ آف ریونیو فرد خدمات: اجرا، درخواست، اپلیکیشن، ملکیت، مالک، بقایا اور حقوق ریکارڈ',
        'خصوصی و زرعی خدمات: کریڈٹ، مشینری، قرض، سبسڈی، لائسنس، ٹیکس اور محکمے کی معلومات',
        'پاپولیشن ویلفیئر، ٹرانسپورٹ اور صفائی کی خدمات',
        'تصدیق شدہ نمائندہ بکنگ، بائیو میٹرک، کاغذات اپ لوڈ، فیس ادائیگی اور گھر تک ٹریکنگ'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Download App & Select City',
          titleUrdu: 'ایپ ڈاؤن لوڈ کریں اور شہر منتخب کریں',
          description: 'Install "Dastak - Doorstep Services" from Google Play Store or App Store and select your district (e.g. Lahore, Rawalpindi, Faisalabad).',
          descriptionUrdu: 'پلے اسٹور سے "دستک" ایپ ڈاؤن لوڈ کریں اور اپنا ضلع اور تحصیل منتخب کریں۔',
          proTip: 'You can also call helpline 1202 to book a facilitator over phone.'
        },
        {
          stepNumber: 2,
          title: 'Choose Service & Book Appointment Slot',
          titleUrdu: 'سروس اور ملاقات کا وقت بک کریں',
          description: 'Select desired service (e.g. "Domicile Certificate") and pick a convenient date and time window for the facilitator home visit.',
          descriptionUrdu: 'مطلوبہ سروس جیسے "ڈومیسائل سرٹیفکیٹ" منتخب کریں اور اپنے لیے مناسب تاریخ اور وقت بک کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Prepare Required Physical Documents',
          titleUrdu: 'ضروری کاغذات تیار رکھیں',
          description: 'Keep original CNIC, copies of utility bill (electricity/gas), matric certificate, and passport size photographs ready.',
          descriptionUrdu: 'اصل شناختی کارڈ، بجلی کا بل، میٹرک رزلٹ کارڈ اور پاسپورٹ سائز تصاویر تیار رکھیں۔'
        },
        {
          stepNumber: 4,
          title: 'Facilitator Visit & Biometric Scan',
          titleUrdu: 'نمائندے کی آمد اور بائیو میٹرک کیپچر',
          description: 'Official Dastak Facilitator wearing official jacket arrives at your home, verifies your original CNIC, scans fingerprints, and uploads documents.',
          descriptionUrdu: 'دستک کا تربیت یافتہ نمائندہ آپ کے گھر آ کر فنگر پرنٹس لے گا اور کاغذات اسکین کرے گا۔'
        },
        {
          stepNumber: 5,
          title: 'Pay Official Fee & Receive Certificate at Home',
          titleUrdu: 'فیس دیں اور گھر بیٹھے سرٹیفکیٹ پائیں',
          description: 'Pay official fee + Rs. 1,200 doorstep charge via cash or e-Pay. The processed certificate is delivered back to your home within 5 to 7 days.',
          descriptionUrdu: 'سرکاری فیس اور 1200 روپے ڈور اسٹیپ سروس چارجز ادا کریں، سرٹیفکیٹ 5 سے 7 دنوں میں آپ کے گھر پہنچا دیا جائے گا۔'
        }
      ],
      prerequisites: [
        'Pakistani Mobile Number for OTP registration',
        'Original Smart CNIC of applicant',
        'Electricity bill copy matching current home address in Punjab',
        'Matric / Academic certificate copy'
      ],
      prerequisitesUrdu: [
        'او ٹی پی کے لیے فعال پاکستانی موبائل نمبر',
        'درخواست دہندہ کا اصل سمارٹ شناختی کارڈ',
        'پنجاب کا رہائشی بجلی کا بل',
        'میٹرک کی سند کی کاپی'
      ],
      commonMistakesToAvoid: [
        'Always check the Dastak Facilitator official identity badge and QR code before allowing entry.',
        'Ensure utility bill address matches the district where you are requesting Domicile.',
        'Never pay extra cash beyond the official receipt generated in the app.'
      ],
      commonMistakesToAvoidUrdu: [
        'نمائندے کو گھر داخل کرنے سے پہلے اس کا سرکاری کارڈ اور QR کوڈ ضرور تصدیق کریں۔',
        'بجلی کا بل اسی ضلع کا ہونا چاہیے جہاں کا ڈومیسائل بنوانا ہے۔',
        'ایپ میں بنے رسید کے علاوہ ایک روپیہ بھی فالتو نہ دیں۔'
      ],
      officialHelpline: '1202 (Punjab Citizen Call Center Toll-Free)',
      videoGuideTitle: 'Complete Dastak App Booking Demonstration & Home Visit Guide',
      videoGuideSummary: 'Learn how to book a Dastak facilitator step-by-step for Domicile & Birth certificates without stepping out of your house.'
    }
  },
  {
    id: 'pak-identity',
    name: 'Pak Identity',
    nameUrdu: 'پاک آئی ڈی (نادرا آفیشل)',
    provider: 'NADRA Official',
    jurisdiction: 'Federal',
    category: 'Identity',
    description: 'Official NADRA app for CNIC renewal, biometric scanning via phone camera, and FRC document orders. 100% Digital!',
    descriptionUrdu: 'شناختی کارڈ کی آن لائن تجدید، فنگر پرنٹ اسکیننگ اور نادرا بائیو میٹرک کے لیے آفیشل ایپ۔ 100% ڈیجیٹل۔',
    iconBg: 'bg-emerald-800 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=pk.gov.nadra.pakid',
    appStoreUrl: 'https://apps.apple.com/us/app/pak-identity/id1563975817',
    packageName: 'pk.gov.nadra.pakid',
    verificationBadge: 'NADRA Government Authenticated',
    detailedGuide: {
      overview: 'Pak Identity is NADRA official mobile application allowing resident and overseas Pakistanis to apply for Smart CNIC renewal, NICOP, FRC, and perform smartphone camera fingerprint biometrics.',
      overviewUrdu: 'پاک آئی ڈی نادرا کی آفیشل ایپ ہے جس کے ذریعے آپ گھر بیٹھے موبائل کیمرے سے شناختی کارڈ، ایف آر سی اور بایومیٹرک تصدیق کر سکتے ہیں۔',
      keyFeatures: [
        'CNIC, NICOP and POC card updates, information correction, smart-card conversion and overseas-card conversion',
        'ID card cancellation and surrender requests',
        'Family tree, Child Registration Certificate (CRC/Form-B), FRC and family shajra services',
        'Passport renewal, reprint, modification and new application workflows',
        'Smartphone biometric verification and ICAO-compliant photograph capture',
        'National NCCIA complaints, application tracking and status updates',
        'Provincial birth, death, marriage and divorce registry services for Punjab, Sindh, Balochistan, KPK and ICT',
        'Life proof / Hayat certificates for pensioners, digital ID, arms licences and health card services',
        'Online payment, application status and Pakistan Post home-courier tracking'
      ],
      keyFeaturesUrdu: [
        'CNIC، NICOP اور POC کارڈ اپ ڈیٹ، معلومات کی اصلاح، سمارٹ کارڈ اور اوورسیز کارڈ میں تبدیلی',
        'شناختی کارڈ منسوخی اور سرنڈر درخواستیں',
        'فیملی ٹری، چائلڈ رجسٹریشن سرٹیفکیٹ (CRC/بے فارم)، FRC اور فیملی شجرہ خدمات',
        'پاسپورٹ تجدید، ری پرنٹ، ترمیم اور نئی درخواست',
        'موبائل بائیو میٹرک تصدیق اور معیاری تصویر کیپچر',
        'قومی NCCIA شکایات، درخواست ٹریکنگ اور اسٹیٹس اپ ڈیٹ',
        'پنجاب، سندھ، بلوچستان، کے پی کے اور آئی سی ٹی کے پیدائش، موت، شادی اور طلاق رجسٹری ریکارڈ',
        'پنشنرز کے لیے لائف پروف/حیات سرٹیفکیٹ، ڈیجیٹل ID، اسلحہ لائسنس اور ہیلتھ کارڈ خدمات',
        'آن لائن ادائیگی، درخواست اسٹیٹس اور پاکستان پوسٹ گھر تک ڈلیوری ٹریکنگ'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Register & Verify Mobile OTP',
          titleUrdu: 'اکاؤنٹ بنائیں اور او ٹی پی تصدیق کریں',
          description: 'Download "Pak Identity" app, create account with your mobile number, and enter the SMS verification code.',
          descriptionUrdu: 'پاک آئی ڈی ایپ کھول کر اپنے نمبر پر او ٹی پی کوڈ حاصل کریں اور لاگ ان کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Select Application Type (CNIC / FRC)',
          titleUrdu: 'درخواست کی قسم منتخب کریں (CNIC / FRC)',
          description: 'Tap "CNIC Renewal" or "Family Registration Certificate" and input your 13-digit CNIC number.',
          descriptionUrdu: 'شناختی کارڈ کی تجدید یا ایف آر سی منتخب کریں اور اپنا 13 ہندسوں کا نادرا نمبر درج کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Capture Fingerprints via Smartphone Camera',
          titleUrdu: 'موبائل کیمرے سے انگلیوں کے نشانات دیں',
          description: 'Hold 4 fingers of your left hand, then right hand, 2-3 inches away from rear phone camera in bright room lighting until green circle locks.',
          descriptionUrdu: 'کیمرے کے سامنے چاروں انگلیاں رکھیں یہاں تک کہ روشنی کا دائرہ سبز ہو کر انگلیوں کے نشان فکس کر لے۔',
          proTip: 'Place fingers against a plain white paper backdrop for instant 100% camera lock.'
        },
        {
          stepNumber: 4,
          title: 'Take ICAO Compliant Photograph',
          titleUrdu: 'سفید پس منظر کے ساتھ تصویر لیں',
          description: 'Stand in front of a plain white wall, face straight into camera, and ensure eyes are open without shadows or glasses reflection.',
          descriptionUrdu: 'سفید دیوار کے سامنے بغیر چشمیے کے سیدھا دیکھ کر سیلفی یا تصویر بنائیں۔'
        },
        {
          stepNumber: 5,
          title: 'Pay Fee via Credit/Debit Card or e-Pay',
          titleUrdu: 'فیس کی آن لائن ادائیگی کریں',
          description: 'Select processing speed (Normal: Rs 750 | Urgent: Rs 1,500 | Executive: Rs 2,500) and pay securely via bank card.',
          descriptionUrdu: 'نارمل، ارجنٹ یا ایگزیکٹو فیس منتخب کریں اور کارڈ کے ذریعے فیس پے کریں۔'
        }
      ],
      prerequisites: [
        'Android or iPhone with rear camera (8MP+ with flash focus)',
        'Applicant 13-digit CNIC number',
        'Debit/Credit card or JazzCash/1Bill for fee payment',
        'Plain white background for photograph'
      ],
      prerequisitesUrdu: [
        'کم از کم 8 میگا پکسل کیمرے والا اسمارٹ فون',
        'درخواست دہندہ کا 13 ہندسوں والا شناختی کارڈ نمبر',
        'آن لائن ادائیگی کے لیے ڈیبٹ کارڈ یا ای پے',
        'تصویر کے لیے سفید بیک گراؤنڈ'
      ],
      commonMistakesToAvoid: [
        'Avoid dim yellow lighting when capturing fingerprints; sunlight or white LED works best.',
        'Do not wear white shirt when taking photograph against white wall background.',
        'Verify spellings of mother name and father CNIC before submitting FRC application.'
      ],
      commonMistakesToAvoidUrdu: [
        'روشنی مدہم نہ ہو، انگلیوں کی اسکیننگ کے لیے ٹیوب لائٹ یا دھوپ کا استعمال کریں۔',
        'سفید کپڑے پہن کر سفید دیوار کے سامنے تصویر نہ کھینچیں۔',
        'ایف آر سی بنانے سے پہلے والدین کے ناموں کا اندراج چیک کریں۔'
      ],
      officialHelpline: '1777 (NADRA Call Center) / +92-51-111-786-100',
      videoGuideTitle: 'Complete Nadra Pak Identity Mobile Camera Fingerprint & FRC Tutorial',
      videoGuideSummary: 'Step-by-step video breakdown showing exact hand placement for smartphone camera fingerprint scanning.'
    }
  },
  {
    id: 'passport-fee-asan',
    name: 'Passport Fee Asan',
    nameUrdu: 'پاسپورٹ فیس آسان (سرکاری)',
    provider: 'Directorate General of Immigration & Passports',
    jurisdiction: 'Federal',
    category: 'Payments & Taxes',
    description: 'Official fee payment app for Passport PSID creation without paying commission to agents.',
    descriptionUrdu: 'پاسپورٹ فیس خود آن لائن 17 ہندسوں کے PSID سے ادا کرنے کے لیے سرکاری ایپ۔',
    iconBg: 'bg-emerald-700 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.dgip.epayment',
    appStoreUrl: 'https://apps.apple.com/ie/app/passport-fee-asaan/id1636201133',
    packageName: 'com.dgip.epayment',
    verificationBadge: 'DGIP Federal Approved',
    detailedGuide: {
      overview: 'Passport Fee Asan eliminates travel agent extortion by enabling citizens to generate official 17-digit PSID payment tokens directly and pay online via 1Bill or mobile banking.',
      overviewUrdu: 'پاسپورٹ فیس آسان ایپ کے ذریعے شہری 17 ہندسوں کا سرکاری PSID بنا کر بینک ایپ یا ایزی پیسہ سے فیس خود جمع کروا سکتے ہیں۔',
      keyFeatures: [
        'Direct 17-Digit PSID Generation for Ordinary MRP & e-Passport',
        'Saves Rs 500 – Rs 1,000 travel agent commission',
        'Official Fee Schedule Calculation for 36, 72, and 100 Page passports (5-Year & 10-Year validity)',
        'Instant payment reconciliation accepted at all Regional Passport Offices across Pakistan'
      ],
      keyFeaturesUrdu: [
        '17 ہندسوں کا آفیشل PSID نمبر خود بنائیں',
        'ایجنٹوں کے 500 سے 1000 روپے کی بچت',
        '5 سال اور 10 سالہ پاسپورٹ فیس کی آن لائن کیلکولیشن',
        'تمام ریجنل پاسپورٹ دفاتر میں قابل قبول چالان'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Open Passport Fee Asan & Select Passport Type',
          titleUrdu: 'ایپ کھولیں اور پاسپورٹ کی قسم منتخب کریں',
          description: 'Launch app, tap "Passport Fee Payment" and select either Machine Readable Passport (MRP) or e-Passport.',
          descriptionUrdu: 'ایپ کھول کر "پاسپورٹ فیس آن لائن" منتخب کریں اور ایم آر پی یا ای پاسپورٹ کا انتخاب کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Choose Page Count & Validity Duration',
          titleUrdu: 'صفحات اور میعاد کا انتخاب کریں',
          description: 'Select 36-Page, 72-Page, or 100-Page and validity period (5 Years or 10 Years).',
          descriptionUrdu: '36، 72 یا 100 صفحات اور 5 یا 10 سال کی میعاد منتخب کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Select Category (Normal / Urgent / Fast-Track)',
          titleUrdu: 'نارمل، ارجنٹ یا ایگزیکٹو فیس منتخب کریں',
          description: 'Choose processing category (Normal: Rs 4,500 | Urgent: Rs 7,500 | Executive: Rs 12,500).',
          descriptionUrdu: 'نارمل (4500)، ارجنٹ (7500) یا ایگزیکٹو فیس کا انتخاب کریں۔'
        },
        {
          stepNumber: 4,
          title: 'Enter CNIC & Generate 17-Digit PSID',
          titleUrdu: 'شناختی کارڈ درج کریں اور PSID حاصل کریں',
          description: 'Input applicant CNIC number and phone. A 17-digit PSID number starting with 9999... will appear on screen and SMS.',
          descriptionUrdu: 'شناختی کارڈ نمبر لکھ کر 17 ہندسوں کا PSID چالان کوڈ حاصل کریں۔'
        },
        {
          stepNumber: 5,
          title: 'Pay via Mobile Banking / JazzCash / EasyPaisa',
          titleUrdu: 'بینک ایپ یا ایزی پیسہ سے فیس ادا کریں',
          description: 'Open your banking app or EasyPaisa -> Go to "Bills Payment / 1Bill Over the Counter (PSID)" -> Paste 17-digit PSID -> Confirm payment.',
          descriptionUrdu: 'اپنی بینک ایپ، جاز کیش یا ایزی پیسہ میں 1Bill چالان والے آپشن میں 17 ہندسوں کا کوڈ لکھ کر فیس جمع کروائیں۔'
        }
      ],
      prerequisites: [
        'Valid CNIC number',
        'Active mobile banking app, JazzCash, or EasyPaisa account',
        'Active phone number for receiving PSID SMS'
      ],
      prerequisitesUrdu: [
        'درست نادرا شناختی کارڈ نمبر',
        'موبائل بینکنگ، جاز کیش یا ایزی پیسہ اکاؤنٹ',
        'ایس ایم ایس موصول کرنے کے لیے ایکٹو موبائل نمبر'
      ],
      commonMistakesToAvoid: [
        'Do not pay double fee to agents outside Passport Offices.',
        'Ensure 17-digit PSID is generated using applicant exact CNIC number.',
        'Keep paid bank transaction receipt screenshot saved on phone.'
      ],
      commonMistakesToAvoidUrdu: [
        'پاسپورٹ دفتر کے باہر کھڑے ایجنٹوں کو کبھی پیسے نہ دیں۔',
        'پی ایس آئی ڈی نمبر ہمیشہ درخواست دہندہ کے اصل CNIC پر بنائیں۔',
        'ادائیگی کے بعد ٹرانزیکشن رسید اپنے پاس محفوظ رکھیں۔'
      ],
      officialHelpline: '0800-34477 (Directorate General of Immigration & Passports)',
      videoGuideTitle: 'How to Pay Passport Fee Online via Passport Fee Asan App',
      videoGuideSummary: 'Full step-by-step video guide showing 17-digit PSID generation and payment through mobile banking apps.'
    }
  },
  {
    id: 'epay-punjab',
    name: 'e-Pay Punjab',
    nameUrdu: 'ای پے پنجاب (ٹیکس و چالان)',
    provider: 'Punjab Information Technology Board (PITB)',
    jurisdiction: 'Punjab',
    category: 'Payments & Taxes',
    description: 'Pay Token Tax, Property Tax, Fard Fee, Driving License and Traffic Challans in Punjab.',
    descriptionUrdu: 'ٹوکن ٹیکس، ڈرائیونگ لائسنس اور اراضی فیس ادا کرنے کی آفیشل ایپ۔',
    iconBg: 'bg-green-800 text-yellow-400',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.pitb.ePayGateway',
    appStoreUrl: 'https://apps.apple.com/us/app/epay-punjab/id1465068821',
    packageName: 'com.pitb.ePayGateway',
    verificationBadge: 'PITB Punjab Certified',
    detailedGuide: {
      overview: 'e-Pay Punjab is the centralized digital payment gateway of Punjab Government, facilitating token tax, property tax, and traffic challan clearing via 17-digit PSID.',
      overviewUrdu: 'ای پے پنجاب کے ذریعے پنجاب بھر کے گاڑیوں کے ٹوکن ٹیکس، پراپرٹی ٹیکس اور ٹریفک چالان آن لائن ادا کیے جاتے ہیں۔',
      keyFeatures: [
        'Vehicle Token Tax, New Registration, and Transfer Fee Payment',
        'Property Tax & Commercial Tax Clearing',
        'Fard Malkiat Fee (Rs. 150) and Land Mutation Charges',
        'Traffic Police Challan & Safe City e-Challan Clearing',
        'Instant digital receipt generation verified by Punjab Excise and Police'
      ],
      keyFeaturesUrdu: [
        'گاڑیوں کا ٹوکن ٹیکس اور نئی رجسٹریشن فیس',
        'پراپرٹی ٹیکس اور کمرشل ٹیکس کی آن لائن ادائیگی',
        'اراضی ریکارڈ کی فرد ملکیت کی 150 روپے فیس',
        'ٹریفک پولیس اور سیف سٹی ای چالان کی صفائی'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Register Account with CNIC',
          titleUrdu: 'شناختی کارڈ سے اکاؤنٹ بنائیں',
          description: 'Install e-Pay Punjab app and sign up using your CNIC number, full name, and mobile number.',
          descriptionUrdu: 'ایپ انسٹال کر کے اپنے شناختی کارڈ اور موبائل نمبر سے رجسٹر کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Select Department (Excise / Revenue / Police)',
          titleUrdu: 'متعلقہ محکمہ منتخب کریں',
          description: 'Tap "Excise & Taxation" for Token Tax OR "Board of Revenue" for Fard Malkiat OR "Traffic Police" for Challans.',
          descriptionUrdu: 'ٹوکن ٹیکس کے لیے ایکسائز، فرد کے لیے اراضی یا ٹریفک چالان آپشن منتخب کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Enter Registration or Chassis Number',
          titleUrdu: 'گاڑی یا رجسٹریشن نمبر درج کریں',
          description: 'Input vehicle registration number (e.g. LEB-19-1234) or Challan ID.',
          descriptionUrdu: 'اپنی گاڑی کا نمبر یا چالان نمبر درج کریں۔'
        },
        {
          stepNumber: 4,
          title: 'Generate PSID & Pay Online',
          titleUrdu: 'PSID بنا کر فیس پے کریں',
          description: 'App calculates total tax due and displays 17-digit PSID. Pay via JazzCash, EasyPaisa, or Mobile Banking.',
          descriptionUrdu: '17 ہندسوں کا کوڈ بنا کر اپنے ایزی پیسہ یا بینک ایپ سے پے کریں۔'
        }
      ],
      prerequisites: ['CNIC Number', 'Vehicle Registration Number or Challan ID', 'Bank / Wallet App'],
      prerequisitesUrdu: ['شناختی کارڈ نمبر', 'گاڑی کا نمبر یا چالان آئی ڈی', 'بینک یا ایزی پیسہ ایپ'],
      commonMistakesToAvoid: [
        'Check vehicle owner CNIC matches Excise database before paying token tax.',
        'Save PDF receipt on mobile for showing to Excise inspectors.'
      ],
      commonMistakesToAvoidUrdu: [
        'ٹوکن ٹیکس دینے سے پہلے گاڑی کے مالک کا نام چیک کریں۔',
        'ایکسائز انسپکٹر کو دکھانے کے لیے پی ڈی ایف رسید موبائل میں رکھیں۔'
      ],
      officialHelpline: '0800-08786 (PITB e-Pay Helpline)',
      videoGuideTitle: 'e-Pay Punjab Vehicle Token Tax & Challan Payment Demonstration',
      videoGuideSummary: 'Learn how to pay vehicle token tax and get instant rebate through e-Pay Punjab app.'
    }
  },
  {
    id: 'passtrack-pakistan',
    name: 'PassTrack Pakistan',
    nameUrdu: 'پاس ٹریک پاکستان (ہوائی اڈے پورٹل)',
    provider: 'Ministry of Information Technology & Telecommunication (NITB)',
    jurisdiction: 'Federal',
    category: 'Identity',
    description: 'Official Airport Customs & Health Declaration app for all inbound and outbound international travelers in Pakistan.',
    descriptionUrdu: 'پاکستان کے تمام ایئرپورٹس پر بین الاقوامی مسافروں کی کسٹمز اور ہیلتھ ڈیکلریشن کے لیے سرکاری ایپ۔',
    iconBg: 'bg-indigo-900 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.passtrack.nitb.gov.pk',
    appStoreUrl: 'https://cd.nitb.gov.pk/projects/pass-track',
    packageName: 'com.passtrack.nitb.gov.pk',
    verificationBadge: 'NITB Ministry Approved',
    detailedGuide: {
      overview: 'PassTrack is mandatory for international travelers arriving in or departing from Pakistan. It digitalizes Customs Currency Declaration and Airport Immigration clearance into a single mobile QR pass.',
      overviewUrdu: 'پاس ٹریک ایپ بیرون ملک سفر کرنے والے مسافروں کے لیے لازمی ہے جس سے کسٹمز اور امیگریشن کے عمل میں تیزی آتی ہے۔',
      keyFeatures: [
        'Digital Customs Currency & Baggage Declaration Form',
        'Airport Immigration Fast-Track QR Pass Generation',
        'Accepted at Islamabad (ISB), Lahore (LHE), Karachi (KHI), and Peshawar (PEW) airports',
        'Multilingual support for Overseas Pakistanis'
      ],
      keyFeaturesUrdu: [
        'کسٹمز کرنسی اور سامان ڈیکلریشن فارم',
        'امیگریشن پر فوری کیو آر پاس اسکیننگ',
        'اسلام آباد، لاہور، کراچی اور پشاور ایئرپورٹس پر قابل قبول'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Install PassTrack & Select Flight Direction',
          titleUrdu: 'ایپ ڈاؤن لوڈ کریں اور فلائٹ کا انتخاب کریں',
          description: 'Open PassTrack app and tap "Arriving to Pakistan" or "Departing from Pakistan".',
          descriptionUrdu: 'پاس ٹریک ایپ کھول کر آمد یا روانگی کا انتخاب کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Input Passport & Flight Details',
          titleUrdu: 'پاسپورٹ اور فلائٹ کی تفصیل درج کریں',
          description: 'Enter your Passport Number, Full Name, Flight Number, and Airport of arrival.',
          descriptionUrdu: 'اپنا پاسپورٹ نمبر اور فلائٹ کا نمبر درج کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Complete Customs Currency Declaration',
          titleUrdu: 'کرنسی ڈیکلریشن فارم پُر کریں',
          description: 'Declare currency carried (foreign/local PKR) according to State Bank limits.',
          descriptionUrdu: 'سٹیٹ بینک کی ہدایات کے مطابق کرنسی کی رقم کا اندراج کریں۔'
        },
        {
          stepNumber: 4,
          title: 'Show Digital QR Pass at Airport Counter',
          titleUrdu: 'ایئرپورٹ پر کیو آر کوڈ اسکین کروائیں',
          description: 'App generates verified QR pass. Scan it at the airport PassTrack counter for instant clearance.',
          descriptionUrdu: 'ایئرپورٹ پر نمائندے کو اپنا کیو آر کوڈ دکھا کر فوری کلیئرنس پائیں۔'
        }
      ],
      prerequisites: ['Valid Passport', 'Flight Ticket / Boarding Pass', 'Mobile Phone'],
      prerequisitesUrdu: ['اصل پاسپورٹ', 'فلائٹ ٹکٹ', 'موبائل فون'],
      commonMistakesToAvoid: ['Fill PassTrack form 24 hours prior to flight departure to avoid airport queue delays.'],
      commonMistakesToAvoidUrdu: ['فلائٹ سے 24 گھنٹے پہلے فارم پُر کر کے کیو آر کوڈ محفوظ کر لیں۔'],
      officialHelpline: '051-9200000 (NITB Helpdesk)',
      videoGuideTitle: 'PassTrack Pakistan International Traveler Customs Guide',
      videoGuideSummary: 'How overseas Pakistanis can complete PassTrack digital airport clearance in 2 minutes.'
    }
  },
  {
    id: 'city-app-islamabad',
    name: 'City App Islamabad (ICT Admin)',
    nameUrdu: 'سٹی ایپ اسلام آباد (وفاقی دارالحکومت)',
    provider: 'Islamabad Capital Territory Administration',
    jurisdiction: 'ICT',
    category: 'Municipal',
    description: 'Vehicle Token Tax, Domicile, Arms License Renewal, and Emergency Services for Islamabad Capital Territory.',
    descriptionUrdu: 'اسلام آباد میں گاڑیوں کا ٹوکن ٹیکس، ڈومیسائل اور اسلحہ لائسنس کی تجدید کی آفیشل سپر ایپ۔',
    iconBg: 'bg-teal-800 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.nitb.pak.islamabad',
    appStoreUrl: 'https://apps.apple.com/us/app/pakistan-app/id6467834448',
    packageName: 'com.nitb.pak.islamabad',
    verificationBadge: 'ICT Administration Approved',
    detailedGuide: {
      overview: 'City App Islamabad is the all-in-one civic super app for citizens residing in Islamabad Capital Territory (ICT), providing 25+ e-services directly through phone.',
      overviewUrdu: 'سٹی ایپ اسلام آباد وفاقی دارالحکومت کے شہریوں کے لیے 25 سے زائد ڈیجیٹل سروسز فراہم کرتی ہے۔',
      keyFeatures: [
        'ICT Vehicle Token Tax & Smart Card Registration Payment',
        'Islamabad Domicile Certificate Booking & Status Tracking',
        'Arms License Renewal & Verification',
        'Islamabad Traffic Police e-Challan Clearing',
        'Emergency Helplines: Rescue 1122, Police 15, ICT One-Window'
      ],
      keyFeaturesUrdu: [
        'اسلام آباد کی گاڑیوں کا ٹوکن ٹیکس اور رجسٹریشن فیس',
        'ڈومیسائل سرٹیفکیٹ کی درخواست اور ٹریکنگ',
        'اسلحہ لائسنس کی تجدید'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Sign Up with CNIC',
          titleUrdu: 'شناختی کارڈ سے اکاؤنٹ بنائیں',
          description: 'Install City App Islamabad and register using your CNIC and mobile number.',
          descriptionUrdu: 'ایپ ڈاؤن لوڈ کر کے شناختی کارڈ اور نمبر درج کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Select Service (Excise / Domicile / Arms)',
          titleUrdu: 'مطلوبہ سروس منتخب کریں',
          description: 'Tap "Vehicle Token Tax" or "Domicile Certificate" or "Arms License".',
          descriptionUrdu: 'ٹوکن ٹیکس یا ڈومیسائل سروس پر کلک کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Generate PSID & Pay Online',
          titleUrdu: 'PSID حاصل کر کے فیس ادا کریں',
          description: 'App displays tax/fee amount and 17-digit PSID. Pay via banking app or JazzCash.',
          descriptionUrdu: '17 ہندسوں کا کوڈ بنا کر آن لائن فیس ادا کریں۔'
        }
      ],
      prerequisites: ['CNIC Number', 'ICT Address Proof', 'Banking App / Wallet'],
      prerequisitesUrdu: ['شناختی کارڈ نمبر', 'اسلام آباد کا رہائشی ثبوت', 'ایزی پیسہ / بینک ایپ'],
      commonMistakesToAvoid: ['Verify ICT registration number format (e.g. ICT-1234) before generating PSID.'],
      commonMistakesToAvoidUrdu: ['گاڑی کا اسلام آباد نمبر صحیح فارمیٹ میں درج کریں۔'],
      officialHelpline: '051-9260408 (ICT Citizen Helpdesk)',
      videoGuideTitle: 'Islamabad City App Vehicle Token Tax & Domicile Registration Guide',
      videoGuideSummary: 'Learn how to pay Islamabad vehicle token tax and apply for ICT domicile digitally.'
    }
  },
  {
    id: 'bisp-8171-app',
    name: 'BISP 8171 Mobile Portal',
    nameUrdu: 'بی آئی ایس پی 8171 موبائل پورٹل',
    provider: 'Benazir Income Support Programme Official',
    jurisdiction: 'Federal',
    category: 'Payments & Taxes',
    description: 'Check BISP 8171 Kafaalat quarterly cash balance (Rs 10,500), NSER scorecard status, and payment centers.',
    descriptionUrdu: 'بینظیر کفالت 10,500 روپے وظیفہ کی رقم کی تصدیق اور NSER سروے کا سٹیٹس مفت چیک کریں۔',
    iconBg: 'bg-emerald-900 text-pakgold-400',
    playStoreUrl: 'https://8171.bisp.gov.pk/',
    appStoreUrl: 'https://bisp.gov.pk/',
    packageName: 'Official web portal — no verified app listing',
    verificationBadge: 'BISP Federal Authenticated',
    detailedGuide: {
      overview: 'Official BISP mobile portal allowing deserving families to check 8171 quarterly payment release status, Taleemi Wazaif stipend balances, and find nearest Bank Alfalah / HBL Konnect payment centers.',
      overviewUrdu: 'بی آئی ایس پی پورٹل سے مستحق خواتین اپنے 8171 کی فنڈز کی موجودگی اور حبیب بینک / الفلاح بائیو میٹرک سینٹر تلاش کر سکتی ہیں۔',
      keyFeatures: [
        'Instant 8171 CNIC Payment Eligibility Check (Rs 10,500 stipend)',
        'NSER Dynamic Registry Survey Status Lookup',
        'Benazir Taleemi Wazaif stipend status for school children',
        'Map of nearest Biometric Payment Campsite'
      ],
      keyFeaturesUrdu: [
        'شناختی کارڈ سے 10,500 روپے وظیفہ چیک کریں',
        'این ایس ای آر سروے کا سٹیٹس معلوم کریں',
        'بچوں کے تعلیمی وظائف کا فنڈ دیکھیں'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Enter 13-Digit Female Head CNIC',
          titleUrdu: 'خاتون سربراہ کا شناختی کارڈ درج کریں',
          description: 'Open BISP 8171 portal and type 13-digit CNIC without dashes.',
          descriptionUrdu: 'بغیر ڈیشز کے 13 ہندسوں کا شناختی کارڈ نمبر لکھیں۔'
        },
        {
          stepNumber: 2,
          title: 'Enter Captcha Code & Tap Search',
          titleUrdu: 'کوڈ درج کر کے تلاش کریں',
          description: 'Type 4-digit captcha image security code and tap "Check Status".',
          descriptionUrdu: 'تصویر میں دیا گیا کوڈ لکھ کر تلاش کا بٹن دبائیں۔'
        },
        {
          stepNumber: 3,
          title: 'View Release Status & Visit Biometric Center',
          titleUrdu: 'رقم کا سٹیٹس دیکھ کر بائیو میٹرک سینٹر جائیں',
          description: 'If eligible, visit designated HBL Konnect / Bank Alfalah campsite with original Smart CNIC for fingerprint verification.',
          descriptionUrdu: 'رقم جاری ہونے پر اپنا اصل شناختی کارڈ لے کر قریبی بائیو میٹرک کیمپ سے رقم وصول کریں۔'
        }
      ],
      prerequisites: ['Female Head Smart CNIC', 'Registered NSER Mobile Number'],
      prerequisitesUrdu: ['اصل سمارٹ شناختی کارڈ', 'رجسٹرڈ موبائل نمبر'],
      commonMistakesToAvoid: ['Never pay any fee or deduction to agents; BISP 8171 payment is 100% free.'],
      commonMistakesToAvoidUrdu: ['کٹوتی کرنے والے ایجنٹوں کی شکایت 0800-26477 پر فوری درج کرائیں۔'],
      officialHelpline: '0800-26477 (BISP Toll-Free Helpline)',
      videoGuideTitle: 'BISP 8171 Online CNIC Check & Payment Withdrawal Method',
      videoGuideSummary: 'Official BISP video explaining how to check quarterly 10,500 cash status online.'
    }
  },
  {
    id: 'pakistan-citizen-portal',
    name: 'Pakistan Citizen Portal (PCP)',
    nameUrdu: 'پاکستان سٹیزن پورٹل (وزیراعظم آفس)',
    provider: 'Prime Minister Performance Delivery Unit (PMDU)',
    jurisdiction: 'Federal',
    category: 'Police & Safety',
    description: 'Lodge complaints directly to Deputy Commissioners, Ministries, Electricity Boards, and Police Chiefs.',
    descriptionUrdu: 'حکومتی محکموں اور ڈپٹی کمشنرز کو براہ راست شکایات درج کروائیں اور لائیو ٹریک کریں۔',
    iconBg: 'bg-pakgreen-800 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.govpk.citizensportal',
    appStoreUrl: 'https://web.citizenportal.gov.pk/',
    packageName: 'com.govpk.citizensportal',
    verificationBadge: 'PMDU Federal Official',
    detailedGuide: {
      overview: 'Pakistan Citizen Portal is nationwide grievance redressal system established under Prime Minister Performance Delivery Unit (PMDU), connecting citizens to over 8,000 government officers.',
      overviewUrdu: 'پاکستان سٹیزن پورٹل کے ذریعے ہر شہری براہ راست ڈپٹی کمشنرز، وزراء اور پولیس چیفس کو شکایات درج کروا سکتا ہے۔',
      keyFeatures: [
        'Direct Complaint Lodging to 8,000+ Federal and Provincial Public Sector Officers',
        'Categories include Municipal Sanitation, Electricity Overbilling, Price Hikes, Land Infringement, and Police Misconduct',
        'Time-bound SLA resolution monitored by Prime Minister Office',
        'Attachment support for photos, video clips, and PDF evidence'
      ],
      keyFeaturesUrdu: [
        '8000 سے زائد سرکاری افسران کو براہ راست شکایت بھجوانا',
        'بجلی کے زائد بلوں، صفائی، مہنگائی اور پولیس کی شکایات کا ازالہ',
        'وزیراعظم آفس کی جانب سے لائیو مانیٹرنگ اور ٹائم فریم',
        'ویڈیو اور تصویر ثبوت کے ساتھ بھیجنے کی سہولت'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Sign Up with CNIC & Mobile Number',
          titleUrdu: 'شناختی کارڈ سے سائن اپ کریں',
          description: 'Download app, register using your 13-digit CNIC, mobile number, and set up profile.',
          descriptionUrdu: 'ایپ ڈاؤن لوڈ کر کے اپنے شناختی کارڈ اور نمبر سے رجسٹر ہوں۔'
        },
        {
          stepNumber: 2,
          title: 'Tap "+" New Complaint',
          titleUrdu: 'نئی شکایت درج کریں',
          description: 'Tap the red '+' icon at the bottom of screen and choose category (e.g. "Municipal Services" or "Energy & Petroleum").',
          descriptionUrdu: 'سرخ رنگ کا پلس آئیکن دبا کر شکایت کا شعبہ منتخب کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Select Location & Describe Grievance',
          titleUrdu: 'مقام اور تفصیل درج کریں',
          description: 'Select your District, Tehsil, and write clear details of your issue in English or Urdu.',
          descriptionUrdu: 'اپنا ضلع منتخب کریں اور اپنے مسئلے کی تفصیلات اردو یا انگریزی میں لکھیں۔'
        },
        {
          stepNumber: 4,
          title: 'Attach Photo/Video Evidence & Submit',
          titleUrdu: 'تصویر ثبوت کے ساتھ جمع کروائیں',
          description: 'Attach photo of broken road, electricity bill, or site location and submit complaint for SLA tracking.',
          descriptionUrdu: 'ٹوٹی سڑک یا بل کی تصویر لگا کر شکایت جمع کروائیں۔'
        }
      ],
      prerequisites: ['Valid CNIC', 'Active Phone Number', 'Photo/Video evidence of issue'],
      prerequisitesUrdu: ['شناختی کارڈ نمبر', 'ایکٹو فون نمبر', 'مسئلے کی تصویر'],
      commonMistakesToAvoid: ['Write specific street location and landmark so DC officers can dispatch team.'],
      commonMistakesToAvoidUrdu: ['اپنا گلی نمبر اور قریبی مشہور جگہ کی نشاندہی واضح کریں۔'],
      officialHelpline: '051-9000000 (PMDU Citizen Cell)',
      videoGuideTitle: 'How to File Complaint on Pakistan Citizen Portal & Track Status',
      videoGuideSummary: 'Comprehensive tutorial on lodging complaints against WAPDA, Municipalities, and Police on PCP.'
    }
  },
  {
    id: 'kp-citizens-portal',
    name: 'KP Citizen Portal & Zameen KP',
    nameUrdu: 'کے پی سٹیزن پورٹل (خیبر پختونخوا)',
    provider: 'Government of Khyber Pakhtunkhwa (KPITB)',
    jurisdiction: 'KP',
    category: 'Municipal',
    description: 'KP Domicile Certificate verification, Land Fard Record, and Vehicle E-Challan clearing in KP.',
    descriptionUrdu: 'خیبر پختونخوا میں ڈومیسائل، اراضی ریکارڈ اور ٹریفک چالان کی آفیشل ایپ۔',
    iconBg: 'bg-emerald-950 text-white',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.govpk.citizensportal',
    appStoreUrl: 'https://pmru.kp.gov.pk/kp-citizen-portal.php',
    packageName: 'com.govpk.citizensportal',
    verificationBadge: 'KPITB Approved Official',
    detailedGuide: {
      overview: 'Digital public services app of Khyber Pakhtunkhwa Government providing Domicile applications, Land Fard records in Peshawar, Swat, Mardan, and KP Revenue tax payments.',
      overviewUrdu: 'خیبر پختونخوا حکومت کا پورٹل جس سے ڈومیسائل اور اراضی فرد گھر بیٹھے حاصل کی جا سکتی ہے۔',
      keyFeatures: [
        'KP Domicile Certificate Verification & Digital Issuance',
        'KP Land Record Fard Malkiat Download',
        'Vehicle Token Tax & Traffic Police E-Challan Payment',
        'Citizen Public Complaint Redressal System'
      ],
      keyFeaturesUrdu: [
        'خیبر پختونخوا ڈومیسائل کی ڈیجیٹل ڈلیوری',
        'پشاور، سوات اور مردان کا اراضی ریکارڈ',
        'ٹریفک چالان اور ٹوکن ٹیکس'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Register with CNIC & Mobile Number',
          titleUrdu: 'شناختی کارڈ سے رجسٹر ہوں',
          description: 'Install KP Citizen Portal app and create account with your CNIC and active mobile number.',
          descriptionUrdu: 'ایپ ڈاؤن لوڈ کر کے شناختی کارڈ سے لاگ ان ہوں۔'
        },
        {
          stepNumber: 2,
          title: 'Select Service (Domicile / Fard / Tax)',
          titleUrdu: 'مطلوبہ سروس کا انتخاب کریں',
          description: 'Choose "KP Domicile" or "Zameen KP Land Record".',
          descriptionUrdu: 'ڈومیسائل یا اراضی ریکارڈ بٹن منتخب کریں۔'
        },
        {
          stepNumber: 3,
          title: 'Generate PSID & Pay Online',
          titleUrdu: 'PSID بنا کر فیس ادا کریں',
          description: 'Generate 17-digit PSID and pay online through mobile banking or EasyPaisa.',
          descriptionUrdu: '17 ہندسوں کا چالان کوڈ بنا کر آن لائن فیس ادا کریں۔'
        }
      ],
      prerequisites: ['KP Resident CNIC', 'Utility bill of KP address', 'Banking App'],
      prerequisitesUrdu: ['کے پی کے کا شناختی کارڈ', 'رہائشی بل کاپی', 'بینک ایپ'],
      commonMistakesToAvoid: ['Select exact Tehsil in Peshawar/Swat to prevent DC office application rejection.'],
      commonMistakesToAvoidUrdu: ['درخواست میں اپنی صحیح تحصیل کا انتخاب کریں۔'],
      officialHelpline: '1800-575757 (KP Citizen Call Center)',
      videoGuideTitle: 'KP Citizen Portal Domicile & Land Record Online Demonstration',
      videoGuideSummary: 'How to apply for Domicile certificate and download Land Fard in Khyber Pakhtunkhwa.'
    }
  },
  {
    id: 'sindh-police-khidmat',
    name: 'Sindh Police Identity & Verification',
    nameUrdu: 'سندھ پولیس آن لائن خدمات',
    provider: 'Government of Sindh',
    jurisdiction: 'Sindh',
    category: 'Police & Safety',
    description: 'Tenant verification, Driving License appointment, and Stolen Vehicle verification in Sindh.',
    descriptionUrdu: 'سندھ پولیس کرایہ دار تصدیق اور ڈرائیونگ لائسنس پورٹل۔',
    iconBg: 'bg-blue-900 text-white',
    playStoreUrl: 'https://sindhpolice.gov.pk/',
    appStoreUrl: 'https://sindhpolice.gov.pk/',
    packageName: 'Official web portal — no verified app listing',
    verificationBadge: 'Sindh Police Official',
    detailedGuide: {
      overview: 'Sindh Police app offers digital tenant verification, driving license appointment booking, and stolen vehicle checks across Karachi and Sindh districts.',
      overviewUrdu: 'سندھ پولیس ایپ کے ذریعے کرایہ داروں کی آن لائن تصدیق، ڈرائیونگ لائسنس اپائنٹمنٹ اور چوری شدہ گاڑیوں کی جانچ کی جاتی ہے۔',
      keyFeatures: [
        'Online Tenant Verification for Landlords in Karachi and Hyderabad',
        'Driving License Renewal and Appointment Booking',
        'Stolen & Tampered Vehicle Verification',
        'Emergency Police Helpline 15 Direct Dispatch'
      ],
      keyFeaturesUrdu: [
        'کراچی اور حیدرآباد کے کرایہ داروں کی آن لائن تصدیق',
        'ڈرائیونگ لائسنس اپائنٹمنٹ بکنگ',
        'چوری شدہ گاڑیوں کی تصدیق'
      ],
      stepByStepInstructions: [
        {
          stepNumber: 1,
          title: 'Register with CNIC',
          titleUrdu: 'شناختی کارڈ سے سائن اپ کریں',
          description: 'Install app and enter your CNIC and Sindh phone number.',
          descriptionUrdu: 'شناختی کارڈ نمبر درج کر کے سائن اپ کریں۔'
        },
        {
          stepNumber: 2,
          title: 'Select Tenant Verification',
          titleUrdu: 'کرایہ دار کی تصدیق منتخب کریں',
          description: 'Input tenant CNIC, photograph, and tenancy agreement details for police verification clearance.',
          descriptionUrdu: 'کرایہ دار کا شناختی کارڈ اور تصویر اپ لوڈ کریں۔'
        }
      ],
      prerequisites: ['CNIC of Landlord & Tenant', 'Tenancy agreement copy'],
      prerequisitesUrdu: ['مالک اور کرایہ دار کا شناختی کارڈ', 'کرایہ نامہ کاپی'],
      commonMistakesToAvoid: ['Verify tenant CNIC is active in NADRA record before handing keys.'],
      commonMistakesToAvoidUrdu: ['چابی دینے سے پہلے نادرا ریکارڈ سے کرایہ دار کا کارڈ چیک کریں۔'],
      officialHelpline: '15 (Sindh Police Emergency Help)',
      videoGuideTitle: 'Sindh Police App Tenant Registration & Driving License Guide',
      videoGuideSummary: 'Step by step procedure for landlord tenant verification and driving license appointments.'
    }
  }
];
