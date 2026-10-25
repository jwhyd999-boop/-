import React, { useRef, useState } from 'react';
import { Clipboard, X, ArrowRight, Loader2, Sparkles, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales/translations';

interface UrlInputBarProps {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
  errorMessage?: string | null;
  currentLang: Language;
}

export const UrlInputBar: React.FC<UrlInputBarProps> = ({
  url,
  onChange,
  onSubmit,
  onClear,
  isLoading,
  errorMessage,
  currentLang
}) => {
  const t = translations[currentLang];
  const inputRef = useRef<HTMLInputElement>(null);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChange(text);
          setPasteSuccess(true);
          setTimeout(() => setPasteSuccess(false), 1500);
          inputRef.current?.focus();
        }
      } else {
        inputRef.current?.focus();
      }
    } catch {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else if (e.key === 'Escape' && url) {
      e.preventDefault();
      onClear();
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-white dark:bg-slate-900/90 rounded-2xl p-1.5 sm:p-2 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-950/5 dark:shadow-black/20 focus-within:ring-2 focus-within:ring-cyan-500/50 transition-all">
        
        {/* Input Wrapper */}
        <div className="relative flex-1 flex items-center min-h-[48px] px-3">
          <input
            ref={inputRef}
            type="url"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.urlPlaceholder}
            disabled={isLoading}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none pr-16 rtl:pr-0 rtl:pl-16 truncate"
            aria-label={t.urlPlaceholder}
          />

          {/* Inline Action Buttons (Paste and Clear) */}
          <div className="absolute right-2 rtl:right-auto rtl:left-2 flex items-center gap-1">
            {url ? (
              <button
                type="button"
                onClick={onClear}
                disabled={isLoading}
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t.clear}
                title={t.clear}
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePaste}
                disabled={isLoading}
                className="min-h-[40px] px-2.5 flex items-center gap-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label={t.paste}
                title={t.paste}
              >
                {pasteSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 text-[11px]">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.paste}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !url.trim()}
          className="min-h-[48px] px-6 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0"
          aria-label={t.fetchMedia}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.analyzing}</span>
            </>
          ) : (
            <>
              <span>{t.fetchMedia}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </>
          )}
        </button>

      </div>

      {/* Validation / Error Message */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-2.5 px-3 py-2 text-xs sm:text-sm text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-start gap-2"
        >
          <span className="shrink-0 font-bold">!</span>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
