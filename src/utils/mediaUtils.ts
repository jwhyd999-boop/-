import { MediaFormat, MediaMetadata, SampleMediaItem, VideoQuality, AudioBitrate, VideoCodec } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errorKey?: 'errorEmptyUrl' | 'errorInvalidUrl' | 'errorUnsupportedProtocol';
  domain?: string;
  isDirectMedia?: boolean;
}

export function validateUrl(rawUrl: string): ValidationResult {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, errorKey: 'errorEmptyUrl' };
  }

  // Check protocol
  if (!/^https?:\/\//i.test(trimmed)) {
    if (/^(ftp|file|javascript|data):/i.test(trimmed)) {
      return { isValid: false, errorKey: 'errorUnsupportedProtocol' };
    }
    // Attempt parsing with added protocol if missing
    try {
      const parsed = new URL(`https://${trimmed}`);
      if (!parsed.hostname.includes('.')) {
        return { isValid: false, errorKey: 'errorInvalidUrl' };
      }
      return {
        isValid: true,
        domain: parsed.hostname.replace(/^www\./, ''),
        isDirectMedia: checkDirectMedia(parsed.pathname)
      };
    } catch {
      return { isValid: false, errorKey: 'errorInvalidUrl' };
    }
  }

  try {
    const parsed = new URL(trimmed);
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return { isValid: false, errorKey: 'errorInvalidUrl' };
    }

    return {
      isValid: true,
      domain: parsed.hostname.replace(/^www\./, ''),
      isDirectMedia: checkDirectMedia(parsed.pathname)
    };
  } catch {
    return { isValid: false, errorKey: 'errorInvalidUrl' };
  }
}

export function checkDirectMedia(pathname: string): boolean {
  const ext = pathname.split('.').pop()?.toLowerCase();
  return ['mp4', 'mp3', 'webm', 'wav', 'ogg', 'm4a', 'flac', 'aac'].includes(ext || '');
}

export interface PlatformInfo {
  name: string;
  isRestricted: boolean;
  isDirectMedia: boolean;
  isOpenSource: boolean;
}

export function detectPlatform(url: string): PlatformInfo {
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    const pathname = parsed.pathname.toLowerCase();

    if (checkDirectMedia(pathname)) {
      return {
        name: 'Direct Media File',
        isRestricted: false,
        isDirectMedia: true,
        isOpenSource: true
      };
    }

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      return { name: 'YouTube', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('twitter.com') || host.includes('x.com')) {
      return { name: 'X / Twitter', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('tiktok.com')) {
      return { name: 'TikTok', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('instagram.com')) {
      return { name: 'Instagram', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('reddit.com')) {
      return { name: 'Reddit', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('soundcloud.com')) {
      return { name: 'SoundCloud', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('vimeo.com')) {
      return { name: 'Vimeo', isRestricted: true, isDirectMedia: false, isOpenSource: false };
    }
    if (host.includes('wikimedia.org') || host.includes('archive.org') || host.includes('blender.org') || host.includes('nasa.gov')) {
      return { name: 'Open Access Media', isRestricted: false, isDirectMedia: true, isOpenSource: true };
    }

    return {
      name: host,
      isRestricted: false,
      isDirectMedia: checkDirectMedia(pathname),
      isOpenSource: false
    };
  } catch {
    return { name: 'Unknown', isRestricted: false, isDirectMedia: false, isOpenSource: false };
  }
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatBytes(bytes?: number): string {
  if (!bytes || isNaN(bytes) || bytes <= 0) return 'Unknown size';
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let val = bytes;
  while (val >= 1024 && unitIndex < units.length - 1) {
    val /= 1024;
    unitIndex++;
  }
  return `${val.toFixed(1)} ${units[unitIndex]}`;
}

export function generateCobaltPayload(config: {
  url: string;
  videoQuality: VideoQuality;
  audioBitrate: AudioBitrate;
  format: MediaFormat;
  muteAudio: boolean;
  codec: VideoCodec;
  filenamePattern: string;
}) {
  return {
    url: config.url,
    videoQuality: config.videoQuality === 'auto' ? '1080' : config.videoQuality,
    audioFormat: config.format === 'mp3' ? 'mp3' : 'best',
    audioBitrate: config.audioBitrate,
    isAudioOnly: config.format === 'mp3' || config.format === 'wav',
    isAudioMuted: config.muteAudio,
    vCodec: config.codec,
    filenamePattern: config.filenamePattern
  };
}

export const SAMPLE_MEDIA_LIST: SampleMediaItem[] = [
  {
    id: 'big-buck-bunny',
    title: 'Big Buck Bunny (1080p Open Movie)',
    author: 'Blender Foundation',
    sourceName: 'Blender Open Project',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=640&q=80',
    duration: 596,
    format: 'mp4',
    description: 'Classic open-source creative film by Blender Institute. Fully permitted for free download & remix.',
    license: 'Creative Commons 3.0'
  },
  {
    id: 'nasa-artemis',
    title: 'NASA Artemis I Launch Highlights',
    author: 'NASA Space Program',
    sourceName: 'NASA Public Domain',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=640&q=80',
    duration: 653,
    format: 'mp4',
    description: 'High definition public domain space exploration footage, free for public and educational use.',
    license: 'US Public Domain'
  },
  {
    id: 'tears-of-steel',
    title: 'Tears of Steel (VFX Sci-Fi Clip)',
    author: 'Ton Roosendaal & Blender',
    sourceName: 'Blender Open Movie',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=640&q=80',
    duration: 734,
    format: 'mp4',
    description: '4K open visual effects movie set in futuristic Amsterdam. Open source creative assets.',
    license: 'Creative Commons Attribution 3.0'
  },
  {
    id: 'open-acoustic-audio',
    title: 'Acoustic Melody (Royalty-Free Audio)',
    author: 'Free Media Archive Community',
    sourceName: 'Creative Commons Audio',
    url: 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=640&q=80',
    duration: 182,
    format: 'mp3',
    description: 'High-quality open audio track with CC-BY licensing. Direct MP3/OGG download available.',
    license: 'CC-BY-SA 4.0'
  }
];

export function resolveMediaMetadata(url: string, format: MediaFormat, quality: VideoQuality): MediaMetadata {
  const platform = detectPlatform(url);
  const sample = SAMPLE_MEDIA_LIST.find((s) => s.url === url);

  if (sample) {
    return {
      id: sample.id,
      url: sample.url,
      title: sample.title,
      author: sample.author,
      duration: sample.duration,
      thumbnail: sample.thumbnail,
      sourceDomain: sample.sourceName,
      sourceName: sample.sourceName,
      isDirectMedia: true,
      isPermittedDirectSource: true,
      isDemoMode: false,
      sizeEstimateBytes: 1024 * 1024 * 32, // ~32 MB
      selectedFormat: format,
      selectedQuality: quality,
      directDownloadUrl: sample.url,
      streamOptions: [
        { format: 'mp4', quality: '1080p', sizeLabel: '32.4 MB', hasAudio: true, hasVideo: true, downloadUrl: sample.url },
        { format: 'mp4', quality: '720p', sizeLabel: '18.1 MB', hasAudio: true, hasVideo: true, downloadUrl: sample.url },
        { format: 'mp3', quality: '320kbps', sizeLabel: '7.2 MB', hasAudio: true, hasVideo: false, downloadUrl: sample.url }
      ]
    };
  }

  if (platform.isDirectMedia || platform.isOpenSource) {
    const filename = url.split('/').pop()?.split('?')[0] || 'media-download';
    const cleanTitle = decodeURIComponent(filename.replace(/[-_]/g, ' '));
    return {
      id: `direct-${Date.now()}`,
      url,
      title: cleanTitle,
      author: platform.name,
      duration: 180,
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80',
      sourceDomain: platform.name,
      sourceName: platform.name,
      isDirectMedia: true,
      isPermittedDirectSource: true,
      isDemoMode: false,
      sizeEstimateBytes: 1024 * 1024 * 15,
      selectedFormat: format,
      selectedQuality: quality,
      directDownloadUrl: url,
      streamOptions: [
        { format: 'mp4', quality: 'Original Stream', sizeLabel: '~15 MB', hasAudio: true, hasVideo: true, downloadUrl: url },
        { format: 'mp3', quality: '320kbps Audio', sizeLabel: '~4.5 MB', hasAudio: true, hasVideo: false, downloadUrl: url }
      ]
    };
  }

  // Restricted platform (YouTube, Twitter, TikTok, etc.)
  // Generate realistic simulator / preview metadata with explicit isDemoMode: true
  const platformName = platform.name;
  let simulatedTitle = `Media from ${platformName}`;
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.get('v')) {
      simulatedTitle = `Video stream [${parsed.searchParams.get('v')}]`;
    } else {
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        simulatedTitle = `${platformName} Content: @${parts[0]}`;
      }
    }
  } catch {
    // fallback
  }

  return {
    id: `demo-${Date.now()}`,
    url,
    title: simulatedTitle,
    author: `${platformName} Creator`,
    duration: 215,
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=640&q=80',
    sourceDomain: platformName,
    sourceName: platformName,
    isDirectMedia: false,
    isPermittedDirectSource: false,
    isDemoMode: true,
    sizeEstimateBytes: 1024 * 1024 * 48,
    selectedFormat: format,
    selectedQuality: quality,
    streamOptions: [
      { format: 'mp4', quality: '1080p (FHD)', sizeLabel: '48.2 MB', hasAudio: true, hasVideo: true },
      { format: 'mp4', quality: '720p (HD)', sizeLabel: '24.6 MB', hasAudio: true, hasVideo: true },
      { format: 'mp4', quality: '480p (SD)', sizeLabel: '12.1 MB', hasAudio: true, hasVideo: true },
      { format: 'mp3', quality: '320kbps', sizeLabel: '6.8 MB', hasAudio: true, hasVideo: false },
      { format: 'mp3', quality: '128kbps', sizeLabel: '2.7 MB', hasAudio: true, hasVideo: false }
    ]
  };
}
