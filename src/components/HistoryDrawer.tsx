import React from 'react';
import { History, Trash2, ArrowUpRight, Film, Music, Clock } from 'lucide-react';
import { HistoryItem, Language } from '../types';
import { translations } from '../locales/translations';

interface HistoryDrawerProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
  currentLang: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onClearHistory,
  onSelectHistoryItem,
  currentLang
}) => {
  const t = translations[currentLang];

  if (history.length === 0) return null;

  return (
    <div className="w-full mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <History className="w-3.5 h-3.5" />
          <span>{t.history} ({history.length})</span>
        </h3>
        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1"
          aria-label={t.clearHistory}
        >
          <Trash2 className="w-3 h-3" />
          <span>{t.clearHistory}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {history.slice(0, 6).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectHistoryItem(item)}
            className="text-left rtl:text-right p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                {item.format === 'mp3' ? (
                  <Music className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Film className="w-3.5 h-3.5 text-cyan-500" />
                )}
              </div>
              <div className="min-w-0">
                <span className="text-xs font-medium text-slate-900 dark:text-white truncate block group-hover:text-cyan-500 transition-colors">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  {item.source} · {item.quality}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
