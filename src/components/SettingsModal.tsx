import React, { useState } from 'react';
import { X, Server, CheckCircle2, AlertCircle, Loader2, VolumeX, Shield, Sliders } from 'lucide-react';
import { AppSettings, VideoCodec, Language } from '../types';
import { translations } from '../locales/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSave: (newSettings: AppSettings) => void;
  currentLang: Language;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  currentLang
}) => {
  const t = translations[currentLang];
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [pingStatus, setPingStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!formData.selfHostedBackendUrl) {
      setPingStatus('failed');
      return;
    }
    setPingStatus('testing');
    try {
      const trimmed = formData.selfHostedBackendUrl.trim().replace(/\/$/, '');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Probe backend endpoint
      const response = await fetch(`${trimmed}/api/serverInfo`, {
        method: 'GET',
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      }).catch(() => null);

      clearTimeout(timeoutId);

      if (response && (response.ok || response.status === 200 || response.status === 404)) {
        setPingStatus('success');
      } else {
        // Fallback probe root
        const rootResponse = await fetch(`${trimmed}/`, {
          method: 'GET',
          mode: 'no-cors'
        }).catch(() => null);

        if (rootResponse) {
          setPingStatus('success');
        } else {
          setPingStatus('failed');
        }
      }
    } catch {
      setPingStatus('failed');
    }
  };

  const handleSaveAndClose = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-500" />
            <h2 id="settings-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {t.settings}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-5 space-y-6">
          
          {/* Section 1: Self-Hosted Backend Connector */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-cyan-500" />
                  {t.selfHostedTitle}
                </span>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {t.selfHostedDesc}
                </p>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.selfHostedBackendEnabled}
                  onChange={(e) =>
                    setFormData({ ...formData, selfHostedBackendEnabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
              </label>
            </div>

            {formData.selfHostedBackendEnabled && (
              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t.selfHostedUrlLabel}
                  </label>
                  <input
                    type="url"
                    value={formData.selfHostedBackendUrl}
                    onChange={(e) => {
                      setFormData({ ...formData, selfHostedBackendUrl: e.target.value });
                      setPingStatus('idle');
                    }}
                    placeholder="https://api.cobalt.tools or http://localhost:9000"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={pingStatus === 'testing' || !formData.selfHostedBackendUrl}
                    className="min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {pingStatus === 'testing' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{t.testingConnection}</span>
                      </>
                    ) : (
                      <span>{t.testConnection}</span>
                    )}
                  </button>

                  {/* Status Indicator */}
                  {pingStatus === 'success' && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.connectionSuccessful}</span>
                    </span>
                  )}
                  {pingStatus === 'failed' && (
                    <span className="text-xs text-rose-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{t.connectionFailed}</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Codec & Audio Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.codec}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['h264', 'av1', 'vp9'] as VideoCodec[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, videoCodec: c })}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-medium uppercase border transition-all ${
                      formData.videoCodec === c
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Mute Audio Option */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-slate-400" />
                {t.audioMuted}
              </span>
              <input
                type="checkbox"
                checked={formData.muteAudio}
                onChange={(e) => setFormData({ ...formData, muteAudio: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 cursor-pointer"
              />
            </div>

            {/* Filename pattern */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.filenameStyle}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'title', label: '{title}.mp4' },
                  { id: 'title_author', label: '{title} - {author}.mp4' },
                  { id: 'title_quality', label: '{title} [{quality}].mp4' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, filenamePattern: p.id as any })
                    }
                    className={`min-h-[38px] px-2.5 py-1.5 rounded-xl border font-mono text-[11px] truncate transition-all ${
                      formData.filenamePattern === p.id
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-semibold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {t.close}
          </button>
          <button
            type="button"
            onClick={handleSaveAndClose}
            className="min-h-[44px] px-6 rounded-xl text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/20 active:scale-[0.98] transition-all"
          >
            {t.save}
          </button>
        </div>

      </div>
    </div>
  );
};
