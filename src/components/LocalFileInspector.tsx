import React, { useState, useRef } from 'react';
import { Upload, FileAudio, FileVideo, Play, Download, HardDrive, Check, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales/translations';
import { formatBytes, formatDuration } from '../utils/mediaUtils';

interface LocalFileInspectorProps {
  currentLang: Language;
}

export const LocalFileInspector: React.FC<LocalFileInspectorProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [mediaDuration, setMediaDuration] = useState<number | null>(null);
  const [isVideo, setIsVideo] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setIsSaved(false);
    const url = URL.createObjectURL(file);
    setFileUrl(url);

    const isVid = file.type.startsWith('video/');
    setIsVideo(isVid);

    // Load duration
    const element = document.createElement(isVid ? 'video' : 'audio');
    element.src = url;
    element.onloadedmetadata = () => {
      setMediaDuration(Math.round(element.duration));
    };
  };

  const handleSaveLocalCopy = () => {
    if (!selectedFile || !fileUrl) return;
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = `AuraDL_${selectedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-lg shadow-slate-950/5">
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {t.userOwnedFilesTitle}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {t.userOwnedFilesDesc}
        </p>
      </div>

      {!selectedFile ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-950/40 flex flex-col items-center justify-center gap-3"
          role="button"
          tabIndex={0}
          aria-label={t.dropFileHere}
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {t.dropFileHere}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.orSelectFile} (MP4, MP3, WAV, WebM, MOV, M4A)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-5">
          {/* File Player & Preview */}
          <div className="rounded-xl overflow-hidden bg-black/90 flex items-center justify-center max-h-[360px]">
            {isVideo ? (
              <video
                src={fileUrl || undefined}
                controls
                className="max-h-[360px] w-full object-contain"
              />
            ) : (
              <div className="p-8 w-full flex flex-col items-center justify-center gap-4">
                <FileAudio className="w-14 h-14 text-emerald-400" />
                <audio src={fileUrl || undefined} controls className="w-full max-w-md" />
              </div>
            )}
          </div>

          {/* File Metadata Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-1">{t.fileName}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                {selectedFile.name}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-1">{t.fileSize}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                {formatBytes(selectedFile.size)}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block mb-1">{t.duration}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                {mediaDuration ? formatDuration(mediaDuration) : 'Calculating...'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setFileUrl(null);
              }}
              className="min-h-[40px] px-4 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Choose Another File
            </button>

            <button
              type="button"
              onClick={handleSaveLocalCopy}
              className="min-h-[44px] px-6 rounded-xl font-medium text-sm flex items-center gap-2 text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/20 active:scale-[0.98] transition-all"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved to Downloads</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{t.saveLocalCopy}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
