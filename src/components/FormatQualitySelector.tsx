import React from 'react';
import { Film, Music, Sparkles } from 'lucide-react';
import { MediaFormat, VideoQuality, AudioBitrate, Language } from '../types';
import { translations } from '../locales/translations';

interface FormatQualitySelectorProps {
  format: MediaFormat;
  onFormatChange: (format: MediaFormat) => void;
  videoQuality: VideoQuality;
  onVideoQualityChange: (quality: VideoQuality) => void;
  audioBitrate: AudioBitrate;
  onAudioBitrateChange: (bitrate: AudioBitrate) => void;
  currentLang: Language;
}

export const FormatQualitySelector: React.FC<FormatQualitySelectorProps> = ({
  format,
  onFormatChange,
  videoQuality,
  onVideoQualityChange,
  audioBitrate,
  onAudioBitrateChange,
  currentLang
}) => {
  const t = translations[currentLang];

  const videoQualities: { label: string; value: VideoQuality; sub?: string }[] = [
    { label: t.auto, value: 'auto' },
    { label: '1080p', value: '1080', sub: 'FHD' },
    { label: '720p', value: '720', sub: 'HD' },
    { label: '480p', value: '480', sub: 'SD' },
    { label: '4K', value: '2160', sub: 'UHD' },
  ];

  const audioBitrates: { label: string; value: AudioBitrate; sub?: string }[] = [
    { label: '320k', value: '320', sub: 'HQ' },
    { label: '256k', value: '256', sub: 'High' },
    { label: '192k', value: '192', sub: 'Med' },
    { label: '128k', value: '128', sub: 'Standard' },
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
      
      {/* Format Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onFormatChange('mp4')}
          className={`flex-1 sm:flex-initial min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            format === 'mp4'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-pressed={format === 'mp4'}
        >
          <Film className="w-3.5 h-3.5 text-cyan-500" />
          <span>{t.video}</span>
        </button>

        <button
          type="button"
          onClick={() => onFormatChange('mp3')}
          className={`flex-1 sm:flex-initial min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
            format === 'mp3'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          aria-pressed={format === 'mp3'}
        >
          <Music className="w-3.5 h-3.5 text-emerald-500" />
          <span>{t.audio}</span>
        </button>
      </div>

      {/* Quality Segmented Selector */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-x-auto">
        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 px-2 shrink-0">
          {t.quality}:
        </span>

        {format === 'mp4' ? (
          videoQualities.map((q) => (
            <button
              key={q.value}
              type="button"
              onClick={() => onVideoQualityChange(q.value)}
              className={`min-h-[36px] px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                videoQuality === q.value
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={videoQuality === q.value}
            >
              {q.label}
            </button>
          ))
        ) : (
          audioBitrates.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => onAudioBitrateChange(b.value)}
              className={`min-h-[36px] px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                audioBitrate === b.value
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              aria-pressed={audioBitrate === b.value}
            >
              {b.label}
            </button>
          ))
        )}
      </div>

    </div>
  );
};
