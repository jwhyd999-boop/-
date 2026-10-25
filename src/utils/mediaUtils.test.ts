import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateUrl,
  detectPlatform,
  formatDuration,
  formatBytes,
  generateCobaltPayload,
  SAMPLE_MEDIA_LIST
} from './mediaUtils';

test('validateUrl detects empty strings', () => {
  const result = validateUrl('   ');
  assert.equal(result.isValid, false);
  assert.equal(result.errorKey, 'errorEmptyUrl');
});

test('validateUrl rejects unsupported protocols', () => {
  const result = validateUrl('ftp://example.com/movie.mp4');
  assert.equal(result.isValid, false);
  assert.equal(result.errorKey, 'errorUnsupportedProtocol');
});

test('validateUrl accepts valid HTTPS URLs', () => {
  const result = validateUrl('https://example.com/video.mp4');
  assert.equal(result.isValid, true);
  assert.equal(result.domain, 'example.com');
  assert.equal(result.isDirectMedia, true);
});

test('validateUrl fixes bare domains', () => {
  const result = validateUrl('youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(result.isValid, true);
  assert.equal(result.domain, 'youtube.com');
});

test('detectPlatform correctly categorizes services', () => {
  const yt = detectPlatform('https://www.youtube.com/watch?v=123');
  assert.equal(yt.name, 'YouTube');
  assert.equal(yt.isRestricted, true);

  const direct = detectPlatform('https://files.test/video.mp4');
  assert.equal(direct.isDirectMedia, true);
  assert.equal(direct.isRestricted, false);

  const openSource = detectPlatform('https://commons.wikimedia.org/wiki/File:Bird.ogg');
  assert.equal(openSource.isOpenSource, true);
});

test('formatDuration outputs proper clock format', () => {
  assert.equal(formatDuration(0), '00:00');
  assert.equal(formatDuration(65), '01:05');
  assert.equal(formatDuration(3665), '1:01:05');
});

test('formatBytes formats file sizes with units', () => {
  assert.equal(formatBytes(1024), '1.0 KB');
  assert.equal(formatBytes(1024 * 1024 * 5.5), '5.5 MB');
  assert.equal(formatBytes(0), 'Unknown size');
});

test('generateCobaltPayload generates correct schema', () => {
  const payload = generateCobaltPayload({
    url: 'https://example.com/test',
    videoQuality: '1080',
    audioBitrate: '320',
    format: 'mp4',
    muteAudio: false,
    codec: 'h264',
    filenamePattern: 'title'
  });
  assert.equal(payload.videoQuality, '1080');
  assert.equal(payload.isAudioOnly, false);
  assert.equal(payload.vCodec, 'h264');
});

test('SAMPLE_MEDIA_LIST contains accessible open media items', () => {
  assert.ok(SAMPLE_MEDIA_LIST.length >= 3);
  const bunny = SAMPLE_MEDIA_LIST.find((s) => s.id === 'big-buck-bunny');
  assert.ok(bunny);
  assert.ok(bunny.url.endsWith('.mp4'));
});
