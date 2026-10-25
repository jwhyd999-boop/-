import React from 'react';
import { Download, Moon, Sun, Globe, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { Language, Theme } from '../types';
import { translations } from '../locales/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageToggle: () => void;
  currentTheme: Theme;
  onThemeToggle: () => void;
  activeTab: 'downloader' | 'sampleMedia' | 'inspector' | 'about';
  onTabChange: (tab: 'downloader' | 'sampleMedia' | 'inspector' | 'about') => void;
  onOpenSettings: () => void;
  isBackendConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageToggle,
  currentTheme,
  onThemeToggle,
  activeTab,
  onTabChange,
  onOpenSettings,
  isBackendConnected
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors bg-white/85 dark:bg-slate-950/85 border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark (Single line, display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onTabChange('downloader')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
            aria-label="AuraDL Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Download className="w-5 h-5 stroke-[2.2]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              {t.appName}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line links with subtle hover/active states) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <button
            onClick={() => onTabChange('downloader')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'downloader'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {t.navDownloader}
          </button>
          <button
            onClick={() => onTabChange('sampleMedia')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'sampleMedia'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {t.navSampleMedia}
          </button>
          <button
            onClick={() => onTabChange('inspector')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'inspector'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {t.navInspector}
          </button>
          <button
            onClick={() => onTabChange('about')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'about'
                ? 'text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {t.navAbout}
          </button>
        </nav>

        {/* Zone 3: Primary Utility Controls (Language, Theme, Settings) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onLanguageToggle}
            className="min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
            aria-label={currentLang === 'en' ? 'Switch language to Arabic' : 'Switch language to English'}
            title={currentLang === 'en' ? 'Switch to Arabic (العربية)' : 'Switch to English'}
          >
            <Globe className="w-4 h-4 text-cyan-500" />
            <span className="font-mono tracking-wider font-bold">
              {currentLang === 'en' ? 'AR' : 'EN'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="min-h-[40px] min-w-[40px] p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-center border border-slate-200 dark:border-slate-800"
            aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={currentTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Settings / Backend Config Trigger */}
          <button
            onClick={onOpenSettings}
            className="min-h-[40px] min-w-[40px] p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-center border border-slate-200 dark:border-slate-800 relative"
            aria-label={t.settings}
            title={t.settings}
          >
            <SlidersHorizontal className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            {isBackendConnected && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" title="Self-hosted backend connected" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-200/70 dark:border-slate-800/70 px-4 py-2 gap-1 overflow-x-auto">
        <button
          onClick={() => onTabChange('downloader')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'downloader'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.navDownloader}
        </button>
        <button
          onClick={() => onTabChange('sampleMedia')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'sampleMedia'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.navSampleMedia}
        </button>
        <button
          onClick={() => onTabChange('inspector')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'inspector'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.navInspector}
        </button>
        <button
          onClick={() => onTabChange('about')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'about'
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t.navAbout}
        </button>
      </div>
    </header>
  );
};
