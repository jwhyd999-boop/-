import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UrlInputBar } from './components/UrlInputBar';
import { FormatQualitySelector } from './components/FormatQualitySelector';
import { MediaPreviewCard } from './components/MediaPreviewCard';
import { DemoMediaPicker } from './components/DemoMediaPicker';
import { LocalFileInspector } from './components/LocalFileInspector';
import { SettingsModal } from './components/SettingsModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Language, Theme, MediaFormat, VideoQuality, AudioBitrate, MediaMetadata, AppSettings, HistoryItem, SampleMediaItem } from './types';
import { translations } from './locales/translations';
import { validateUrl, resolveMediaMetadata, detectPlatform, SAMPLE_MEDIA_LIST } from './utils/mediaUtils';
import { ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, X, Heart } from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('auradl_theme');
    return (saved as Theme) || 'dark';
  });

  // Language state
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('auradl_lang');
    return (saved as Language) || 'en';
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'downloader' | 'sampleMedia' | 'inspector' | 'about'>('downloader');

  // Input & validation
  const [url, setUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Format & Quality settings
  const [format, setFormat] = useState<MediaFormat>('mp4');
  const [videoQuality, setVideoQuality] = useState<VideoQuality>('auto');
  const [audioBitrate, setAudioBitrate] = useState<AudioBitrate>('320');

  // Media preview state
  const [media, setMedia] = useState<MediaMetadata | null>(null);

  // Settings & History
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('auradl_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      language: 'en',
      theme: 'dark',
      format: 'mp4',
      videoQuality: 'auto',
      audioBitrate: '320',
      videoCodec: 'h264',
      muteAudio: false,
      filenamePattern: 'title',
      selfHostedBackendEnabled: false,
      selfHostedBackendUrl: ''
    };
  });

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('auradl_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [];
  });

  // Notification Toast state
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

  // Apply Theme & Direction to DOM
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('auradl_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('auradl_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('auradl_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('auradl_history', JSON.stringify(history));
  }, [history]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  const handleLanguageToggle = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Inspect & Fetch Media
  const handleInspectUrl = (overrideUrl?: string) => {
    const targetUrl = (overrideUrl || url).trim();
    setErrorMessage(null);

    const validation = validateUrl(targetUrl);
    if (!validation.isValid) {
      const errKey = validation.errorKey || 'errorInvalidUrl';
      setErrorMessage(translations[lang][errKey]);
      return;
    }

    setIsLoading(true);

    // Simulate smooth stream resolve
    setTimeout(() => {
      const resolved = resolveMediaMetadata(targetUrl, format, videoQuality);
      setMedia(resolved);
      setIsLoading(false);

      // Add to session history
      const newHistoryItem: HistoryItem = {
        id: `${Date.now()}`,
        title: resolved.title,
        url: targetUrl,
        format,
        quality: format === 'mp4' ? videoQuality : audioBitrate,
        source: resolved.sourceName,
        timestamp: Date.now(),
        isDemo: resolved.isDemoMode
      };
      setHistory((prev) => [newHistoryItem, ...prev.filter((h) => h.url !== targetUrl)].slice(0, 15));
    }, 450);
  };

  const handleSelectSample = (sample: SampleMediaItem) => {
    setUrl(sample.url);
    setFormat(sample.format);
    setActiveTab('downloader');
    handleInspectUrl(sample.url);
  };

  const handleClear = () => {
    setUrl('');
    setMedia(null);
    setErrorMessage(null);
  };

  // Honest Real Download Handler
  const handleDownload = async () => {
    if (!media) return;

    // Case 1: Self-hosted backend is configured and enabled
    if (settings.selfHostedBackendEnabled && settings.selfHostedBackendUrl) {
      setIsDownloading(true);
      showToast('Dispatching request to your self-hosted backend...', 'info');

      try {
        const endpoint = `${settings.selfHostedBackendUrl.trim().replace(/\/$/, '')}/api/json`;
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            url: media.url,
            vQuality: format === 'mp4' ? (videoQuality === 'auto' ? '1080' : videoQuality) : undefined,
            isAudioOnly: format === 'mp3',
            aFormat: 'mp3',
            vCodec: settings.videoCodec
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.url) {
            const a = document.createElement('a');
            a.href = data.url;
            a.download = `${media.title}.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('Download started via your self-hosted backend!', 'success');
          } else {
            showToast('Backend resolved stream without direct URL. Check your instance logs.', 'warning');
          }
        } else {
          showToast('Self-hosted backend responded with an error. Please verify endpoint.', 'warning');
        }
      } catch {
        showToast('Could not reach your self-hosted backend. Verify CORS and network status.', 'warning');
      } finally {
        setIsDownloading(false);
      }
      return;
    }

    // Case 2: Permitted Open Access or Direct Media URL (Real browser download!)
    if (media.isPermittedDirectSource || media.isDirectMedia) {
      setIsDownloading(true);
      showToast(translations[lang].directDownloadReady, 'success');

      try {
        // Trigger real browser download
        const targetDownloadUrl = media.directDownloadUrl || media.url;
        const a = document.createElement('a');
        a.href = targetDownloadUrl;
        a.download = `AuraDL_${media.title.replace(/\s+/g, '_')}.${format}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch {
        // Direct link fallback
        window.open(media.url, '_blank');
      } finally {
        setIsDownloading(false);
      }
      return;
    }

    // Case 3: Restricted platform in Demo Mode
    // HONEST REQUIREMENT: "Do not pretend a download succeeded if no real download service is connected."
    showToast(
      translations[lang].errorDemoRestricted,
      'warning'
    );
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Bar Header */}
      <Header
        currentLang={lang}
        onLanguageToggle={handleLanguageToggle}
        currentTheme={theme}
        onThemeToggle={handleThemeToggle}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isBackendConnected={settings.selfHostedBackendEnabled && Boolean(settings.selfHostedBackendUrl)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col">
        
        {/* TAB 1: Downloader (Default view) */}
        {activeTab === 'downloader' && (
          <div className="flex flex-col items-center w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
            
            {/* Hero Title & Subtitle */}
            <div className="text-center max-w-2xl px-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
                {t.tagline}
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {t.appDescription}
              </p>
            </div>

            {/* Downloader Interactive Panel */}
            <div className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-950/5 dark:shadow-black/20 space-y-4">
              
              {/* URL Input Bar */}
              <UrlInputBar
                url={url}
                onChange={setUrl}
                onSubmit={() => handleInspectUrl()}
                onClear={handleClear}
                isLoading={isLoading}
                errorMessage={errorMessage}
                currentLang={lang}
              />

              {/* Format & Quality Selector */}
              <FormatQualitySelector
                format={format}
                onFormatChange={setFormat}
                videoQuality={videoQuality}
                onVideoQualityChange={setVideoQuality}
                audioBitrate={audioBitrate}
                onAudioBitrateChange={setAudioBitrate}
                currentLang={lang}
              />

            </div>

            {/* Media Preview Card */}
            {media && (
              <div className="w-full animate-in slide-in-from-bottom-2 duration-300">
                <MediaPreviewCard
                  media={media}
                  currentLang={lang}
                  onDownload={handleDownload}
                  isDownloading={isDownloading}
                  onOpenBackendSettings={() => setIsSettingsOpen(true)}
                />
              </div>
            )}

            {/* 1-Click Open Media Samples */}
            <DemoMediaPicker
              onSelectMedia={handleSelectSample}
              currentLang={lang}
            />

            {/* Session Download History */}
            <HistoryDrawer
              history={history}
              onClearHistory={() => setHistory([])}
              onSelectHistoryItem={(item) => {
                setUrl(item.url);
                setFormat(item.format);
                handleInspectUrl(item.url);
              }}
              currentLang={lang}
            />

          </div>
        )}

        {/* TAB 2: Sample Open Media */}
        {activeTab === 'sampleMedia' && (
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.navSampleMedia}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Test genuine real browser downloads right now with permitted public domain and Creative Commons media.
              </p>
            </div>

            <DemoMediaPicker
              onSelectMedia={handleSelectSample}
              currentLang={lang}
            />
          </div>
        )}

        {/* TAB 3: Local File Inspector */}
        {activeTab === 'inspector' && (
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            <LocalFileInspector currentLang={lang} />
          </div>
        )}

        {/* TAB 4: About & Deployment Guide */}
        {activeTab === 'about' && (
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            <DeployGuideModal currentLang={lang} />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 px-4 bg-white/50 dark:bg-slate-950/50 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">AuraDL</span>
            <span aria-hidden="true">·</span>
            <span>Cobalt-inspired Media Suite</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab('about')}
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {t.howToDeploy}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {t.settings}
            </button>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          showToast('Settings saved successfully', 'success');
        }}
        currentLang={lang}
      />

      {/* Toast Notification Alert */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-4 py-3 rounded-2xl shadow-xl flex items-start gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-900 text-emerald-100 border border-emerald-700'
              : toast.type === 'warning'
              ? 'bg-amber-900 text-amber-100 border border-amber-700'
              : 'bg-slate-900 text-slate-100 border border-slate-700'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          ) : (
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          )}
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-slate-400 hover:text-white p-1"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
