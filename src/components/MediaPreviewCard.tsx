import React, { useState } from 'react';
import { Download, ExternalLink, ShieldAlert, CheckCircle2, Clock, HardDrive, User, Film, Music, AlertCircle, Copy, Check } from 'lucide-react';
import { MediaMetadata, Language } from '../types';
import { translations } from '../locales/translations';
import { formatDuration, formatBytes } from '../utils/mediaUtils';

interface MediaPreviewCardProps {
  media: MediaMetadata;
  currentLang: Language;
  onDownload: () => void;
  isDownloading: boolean;
  onOpenBackendSettings: () => void;
}

export const MediaPreviewCard: React.FC<MediaPreviewCardProps> = ({
  media,
  currentLang,
  onDownload,
  isDownloading,
  onOpenBackendSettings
}) => {
  const t = translations[currentLang];
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(media.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-xl shadow-slate-950/5 dark:shadow-black/25 transition-all">
      
      {/* Platform & Permission Status Notice */}
      {media.isDemoMode ? (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <span className="font-semibold">{t.demoModeBadge}: </span>
              <span>{t.demoModeNotice}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenBackendSettings}
            className="min-h-[36px] px-3 py-1 text-xs font-semibold rounded-lg bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 self-end sm:self-center"
          >
            {t.connectSelfHosted}
          </button>
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <span className="font-semibold">{t.openMediaBadge}: </span>
            <span>{t.openMediaNotice}</span>
          </div>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        
        {/* Media Thumbnail / Preview Visual */}
        <div className="md:col-span-5 relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
          {!imgError && media.thumbnail ? (
            <img
              src={media.thumbnail}
              alt={media.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-4 text-center">
              {media.selectedFormat === 'mp3' ? (
                <Music className="w-10 h-10 text-emerald-500/70" />
              ) : (
                <Film className="w-10 h-10 text-cyan-500/70" />
              )}
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate max-w-full">
                {media.sourceName}
              </span>
            </div>
          )}

          {/* Duration overlay */}
          <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[11px] font-mono text-white flex items-center gap-1 tabular-nums">
            <Clock className="w-3 h-3 text-slate-300" />
            <span>{formatDuration(media.duration)}</span>
          </div>
        </div>

        {/* Media Info & Stream Breakdown */}
        <div className="md:col-span-7 flex flex-col justify-between h-full gap-4">
          <div>
            {/* Title */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
              {media.title}
            </h2>

            {/* Unboxed Metadata with · separator (Zero-pill discipline) */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <User className="w-3 h-3" />
                {media.author}
              </span>
              <span aria-hidden="true">·</span>
              <span>{media.sourceName}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono">{formatDuration(media.duration)}</span>
              {media.sizeEstimateBytes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums font-mono">{formatBytes(media.sizeEstimateBytes)}</span>
                </>
              )}
            </div>

            {/* Stream Capabilities */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-2">
                Available Streams:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {media.streamOptions.slice(0, 4).map((st, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono tabular-nums"
                  >
                    {st.format.toUpperCase()} · {st.quality} ({st.sizeLabel})
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
                aria-label={t.copyUrl}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyUrl}</span>
                  </>
                )}
              </button>

              <a
                href={media.url}
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
                aria-label={t.openOriginal}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.openOriginal}</span>
              </a>
            </div>

            {/* Primary Download Button */}
            <button
              type="button"
              onClick={onDownload}
              disabled={isDownloading}
              className={`min-h-[44px] px-6 rounded-xl font-medium text-sm flex items-center justify-center gap-2 text-white shadow-md transition-all active:scale-[0.98] ${
                media.isDemoMode
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
              }`}
              aria-label={media.isDemoMode ? `${t.download} (${t.demoModeBadge})` : t.download}
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
              <span>{isDownloading ? t.downloading : `${t.download} ${media.selectedFormat.toUpperCase()}`}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
