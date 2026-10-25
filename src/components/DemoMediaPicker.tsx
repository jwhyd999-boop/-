import React from 'react';
import { Film, Music, CheckCircle2, ArrowUpRight, Play } from 'lucide-react';
import { SAMPLE_MEDIA_LIST } from '../utils/mediaUtils';
import { SampleMediaItem, Language } from '../types';
import { translations } from '../locales/translations';
import { formatDuration } from '../utils/mediaUtils';

interface DemoMediaPickerProps {
  onSelectMedia: (sample: SampleMediaItem) => void;
  currentLang: Language;
}

export const DemoMediaPicker: React.FC<DemoMediaPickerProps> = ({
  onSelectMedia,
  currentLang
}) => {
  const t = translations[currentLang];

  return (
    <div className="w-full mt-6">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{t.trySampleLinks}</span>
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          CC0 & Public Domain
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SAMPLE_MEDIA_LIST.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectMedia(item)}
            className="group text-left rtl:text-right p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 hover:shadow-md transition-all flex flex-col justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <div className="w-full">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-800 border border-slate-700/50 mb-2.5 flex items-center justify-center">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Hide failed image and display styled fallback
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-slate-800 to-slate-900 pointer-events-none -z-0">
                  {item.format === 'mp4' ? (
                    <Film className="w-8 h-8 text-cyan-500/50 mb-1" />
                  ) : (
                    <Music className="w-8 h-8 text-emerald-500/50 mb-1" />
                  )}
                  <span className="text-[10px] font-medium text-slate-400 line-clamp-1">{item.sourceName}</span>
                </div>
                <div className="absolute top-2 left-2 rtl:left-auto rtl:right-2 p-1 rounded-md bg-black/60 backdrop-blur-sm text-white z-10">
                  {item.format === 'mp4' ? (
                    <Film className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <Music className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white tabular-nums z-10">
                  {formatDuration(item.duration)}
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover:text-cyan-500 transition-colors">
                {item.title}
              </h4>

              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="truncate">{item.author}</span>
                <span aria-hidden="true">·</span>
                <span className="shrink-0">{item.license}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-cyan-600 dark:text-cyan-400 font-medium">
              <span>{t.fetchMedia}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
