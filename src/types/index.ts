export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export type MediaFormat = 'mp4' | 'mp3' | 'webm' | 'wav';
export type VideoQuality = 'auto' | '2160' | '1440' | '1080' | '720' | '480' | '360';
export type AudioBitrate = '320' | '256' | '192' | '128';
export type VideoCodec = 'h264' | 'av1' | 'vp9';

export interface StreamOption {
  format: string;
  quality: string;
  sizeLabel: string;
  hasAudio: boolean;
  hasVideo: boolean;
  downloadUrl?: string;
}

export interface MediaMetadata {
  id: string;
  url: string;
  title: string;
  author: string;
  authorUrl?: string;
  duration: number; // in seconds
  thumbnail: string;
  sourceDomain: string;
  sourceName: string;
  isDirectMedia: boolean;
  isPermittedDirectSource: boolean;
  isDemoMode: boolean;
  sizeEstimateBytes?: number;
  selectedFormat: MediaFormat;
  selectedQuality: string;
  audioTrackMuted?: boolean;
  directDownloadUrl?: string;
  streamOptions: StreamOption[];
}

export interface AppSettings {
  language: Language;
  theme: Theme;
  format: MediaFormat;
  videoQuality: VideoQuality;
  audioBitrate: AudioBitrate;
  videoCodec: VideoCodec;
  muteAudio: boolean;
  filenamePattern: 'title' | 'title_author' | 'title_quality';
  selfHostedBackendEnabled: boolean;
  selfHostedBackendUrl: string;
}

export interface SampleMediaItem {
  id: string;
  title: string;
  author: string;
  sourceName: string;
  url: string;
  thumbnail: string;
  duration: number;
  format: 'mp4' | 'mp3';
  description: string;
  license: string;
}

export interface HistoryItem {
  id: string;
  title: string;
  url: string;
  format: MediaFormat;
  quality: string;
  source: string;
  timestamp: number;
  fileSizeLabel?: string;
  isDemo: boolean;
}
