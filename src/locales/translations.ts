import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  appDescription: string;
  navDownloader: string;
  navSampleMedia: string;
  navInspector: string;
  navAbout: string;
  urlPlaceholder: string;
  paste: string;
  clear: string;
  fetchMedia: string;
  download: string;
  downloading: string;
  analyzing: string;
  format: string;
  quality: string;
  video: string;
  audio: string;
  auto: string;
  settings: string;
  history: string;
  clearHistory: string;
  noHistory: string;
  demoModeBadge: string;
  demoModeNotice: string;
  openMediaBadge: string;
  openMediaNotice: string;
  directDownloadReady: string;
  errorInvalidUrl: string;
  errorEmptyUrl: string;
  errorUnsupportedProtocol: string;
  errorFetchFailed: string;
  errorDemoRestricted: string;
  connectSelfHosted: string;
  selfHostedTitle: string;
  selfHostedDesc: string;
  selfHostedUrlLabel: string;
  testConnection: string;
  testingConnection: string;
  connectionSuccessful: string;
  connectionFailed: string;
  audioMuted: string;
  codec: string;
  filenameStyle: string;
  close: string;
  save: string;
  source: string;
  author: string;
  duration: string;
  size: string;
  license: string;
  trySampleLinks: string;
  userOwnedFilesTitle: string;
  userOwnedFilesDesc: string;
  dropFileHere: string;
  orSelectFile: string;
  fileDetails: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  saveLocalCopy: string;
  ethicsNoticeTitle: string;
  ethicsNoticeDesc: string;
  howToDeploy: string;
  copyUrl: string;
  copied: string;
  openOriginal: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'AuraDL',
    tagline: 'Clean, modern media downloader & stream inspector',
    appDescription: 'Fast, minimalist media processing supporting open media, direct files, and self-hosted backend connections.',
    navDownloader: 'Downloader',
    navSampleMedia: 'Open Media',
    navInspector: 'File Inspector',
    navAbout: 'Guide & Deploy',
    urlPlaceholder: 'Paste any media or video URL here...',
    paste: 'Paste',
    clear: 'Clear',
    fetchMedia: 'Inspect & Fetch',
    download: 'Download',
    downloading: 'Downloading...',
    analyzing: 'Analyzing media streams...',
    format: 'Format',
    quality: 'Quality',
    video: 'Video (MP4)',
    audio: 'Audio (MP3)',
    auto: 'Auto',
    settings: 'Settings',
    history: 'History',
    clearHistory: 'Clear History',
    noHistory: 'No recent downloads yet',
    demoModeBadge: 'Demo Mode',
    demoModeNotice: 'Restricted platform URL detected. Displaying preview and simulated stream inspector. To enable live downloads for this service, connect your authorized self-hosted instance in Settings.',
    openMediaBadge: 'Public Domain / Open Access',
    openMediaNotice: 'This media source permits direct downloads. Real download will be initiated in your browser.',
    directDownloadReady: 'Real direct download is ready for your browser',
    errorInvalidUrl: 'Please enter a valid web URL starting with http:// or https://',
    errorEmptyUrl: 'URL input cannot be empty',
    errorUnsupportedProtocol: 'Unsupported protocol. Only http:// and https:// are supported.',
    errorFetchFailed: 'Unable to resolve media from this link. Please verify the URL or try an open media link.',
    errorDemoRestricted: 'Direct platform extraction is restricted in default mode to protect user copyright and abide by platform terms. Connect your self-hosted backend or test with open media below.',
    connectSelfHosted: 'Connect Self-Hosted Backend',
    selfHostedTitle: 'Self-Hosted API Configuration',
    selfHostedDesc: 'Connect to your private Cobalt API instance or yt-dlp microservice for full unrestricted downloads on your own infrastructure.',
    selfHostedUrlLabel: 'Backend API Endpoint URL',
    testConnection: 'Test Connection',
    testingConnection: 'Testing...',
    connectionSuccessful: 'Connection successful! Instance is active.',
    connectionFailed: 'Could not connect to instance. Check URL and CORS settings.',
    audioMuted: 'Mute Audio Track',
    codec: 'Video Codec',
    filenameStyle: 'Filename Format',
    close: 'Close',
    save: 'Save Changes',
    source: 'Source',
    author: 'Author',
    duration: 'Duration',
    size: 'Size Estimate',
    license: 'License',
    trySampleLinks: 'Try sample permitted media:',
    userOwnedFilesTitle: 'User-Owned File Inspector',
    userOwnedFilesDesc: 'Inspect, play, and extract media from your local video or audio files securely in your browser.',
    dropFileHere: 'Drag & drop your local video or audio file here',
    orSelectFile: 'or browse files from your device',
    fileDetails: 'File Metadata',
    fileName: 'Filename',
    fileType: 'MIME Type',
    fileSize: 'File Size',
    saveLocalCopy: 'Save Processed File',
    ethicsNoticeTitle: 'Compliance & Copyright Notice',
    ethicsNoticeDesc: 'AuraDL respects content creator rights and platform terms. Downloads are natively enabled for open access, CC0, public domain media, and user-owned local files. For external video platforms, run your own self-hosted backend instance.',
    howToDeploy: 'How to Deploy',
    copyUrl: 'Copy Link',
    copied: 'Copied!',
    openOriginal: 'Open Source URL'
  },
  ar: {
    appName: 'أورا دي إل',
    tagline: 'منصة حديثة وأنيقة لتنزيل وفحص وسائط الفيديو والصوت',
    appDescription: 'معالجة وتنزيل سريع للوسائط يدعم المصادر المفتوحة، الملفات المباشرة، والربط بالخوادم المخصصة.',
    navDownloader: 'المُنزّل',
    navSampleMedia: 'وسائط مفتوحة',
    navInspector: 'فاحص الملفات',
    navAbout: 'الدليل والنشر',
    urlPlaceholder: 'ألصق رابط الفيديو أو الوسائط هنا...',
    paste: 'لصق',
    clear: 'مسح',
    fetchMedia: 'فحص وجلب',
    download: 'تنزيل',
    downloading: 'جاري التنزيل...',
    analyzing: 'جاري تحليل مسارات الوسائط...',
    format: 'الصيغة',
    quality: 'الجودة',
    video: 'فيديو (MP4)',
    audio: 'صوت (MP3)',
    auto: 'تلقائي',
    settings: 'الإعدادات',
    history: 'السجل',
    clearHistory: 'مسح السجل',
    noHistory: 'لا يوجد تنزيلات حديثة بعد',
    demoModeBadge: 'الوضع التجريبي',
    demoModeNotice: 'تم اكتشاف رابط لمنصة مقيدة. يتم عرض معاينة تجريبية وفحص المسارات. لتفعيل التنزيل الحي من هذه الخدمة، اربط خادمك الخاص في الإعدادات.',
    openMediaBadge: 'ملكية عامة / ترخيص مفتوح',
    openMediaNotice: 'هذا المصدر يسمح بالتنزيل المباشر. سيبدأ التنزيل الفعلي فوراً في متصفحك.',
    directDownloadReady: 'التنزيل المباشر الفعلي جاهز لمتصفحك',
    errorInvalidUrl: 'يرجى إدخال رابط ويب صالح يبدأ بـ http:// أو https://',
    errorEmptyUrl: 'حقل الرابط لا يمكن أن يكون فارغاً',
    errorUnsupportedProtocol: 'بروتوكول غير مدعوم. يدعم فقط http:// و https://',
    errorFetchFailed: 'تعذر جلب الوسائط من هذا الرابط. يرجى التأكد من الرابط أو تجربة وسائط مفتوحة.',
    errorDemoRestricted: 'التنزيل المباشر من المنصات الخارجية مقيد في الوضع الافتراضي لاحترام حقوق الملكية وشروط المنصات. يمكنك ربط خادمك الخاص أو تجربة الوسائط المفتوحة.',
    connectSelfHosted: 'ربط خادم شخصي',
    selfHostedTitle: 'إعداد واجهة برمجة التطبيقات الذاتية',
    selfHostedDesc: 'اربط الواجهة بنسخة Cobalt أو yt-dlp الخاصة بك لتنزيل الوسائط بلا قيود عبر بنيتك التحتية المستقلة.',
    selfHostedUrlLabel: 'عنوان نقطة نهاية الخادم (API Endpoint)',
    testConnection: 'اختبار الاتصال',
    testingConnection: 'جاري الاختبار...',
    connectionSuccessful: 'تم الاتصال بنجاح! الخادم نشط.',
    connectionFailed: 'فشل الاتصال بالخادم. تحقق من الرابط وإعدادات CORS.',
    audioMuted: 'كتم المسار الصوتي',
    codec: 'ترميز الفيديو (Codec)',
    filenameStyle: 'تنسيق اسم الملف',
    close: 'إغلاق',
    save: 'حفظ التغييرات',
    source: 'المصدر',
    author: 'الناشر / المنشئ',
    duration: 'المدة',
    size: 'الحجم التقريبي',
    license: 'الترخيص',
    trySampleLinks: 'جرب روابط وسائط مفتوحة ومصرح بها:',
    userOwnedFilesTitle: 'فاحص ملفات المستخدم المحلية',
    userOwnedFilesDesc: 'افحص، شغل، واستخرج الصوت من ملفات الفيديو والصوت المحلية الخاصة بك بأمان داخل متصفحك.',
    dropFileHere: 'اسحب وأفلت ملف الفيديو أو الصوت المحلي هنا',
    orSelectFile: 'أو اختر ملفاً من جهازك',
    fileDetails: 'بيانات الملف',
    fileName: 'اسم الملف',
    fileType: 'نوع الملف (MIME)',
    fileSize: 'حجم الملف',
    saveLocalCopy: 'حفظ نسخة معالجة',
    ethicsNoticeTitle: 'إشعار الامتثال وحقوق الملكية',
    ethicsNoticeDesc: 'يحترم أورا دي إل حقوق المبدعين وشروط المنصات. التنزيلات مفعلة للمصادر المفتوحة، والملكية العامة، والملفات المحلية. للمنصات المقيدة، يمكنك ربط نسختك البرمجية المستقلة.',
    howToDeploy: 'طريقة النشر والتشغيل',
    copyUrl: 'نسخ الرابط',
    copied: 'تم النسخ!',
    openOriginal: 'فتح المصدر الأصلي'
  }
};
