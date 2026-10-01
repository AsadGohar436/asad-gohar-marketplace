#!/usr/bin/env node
/**
 * Looks at the file that was actually produced, so nothing ships on the word
 * "rendered". Headless on purpose: opening a 4320px PNG to eyeball it is the
 * expensive way to learn something these three checks already know.
 *
 *   node scripts/verify.mjs image [path]
 *   node scripts/verify.mjs video [path] [--allow-silent]
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const templateRoot = resolve(here, '..');
const tokens = JSON.parse(readFileSync(resolve(templateRoot, 'src', 'brand.tokens.json'), 'utf8'));

const kind = process.argv[2];
const allowSilent = process.argv.includes('--allow-silent');
const given = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : null;

if (!['image', 'video'].includes(kind)) {
  console.error('usage: node scripts/verify.mjs <image|video> [path] [--allow-silent]');
  process.exit(2);
}

const file = resolve(given ?? resolve(templateRoot, 'out', kind === 'image' ? 'image.png' : 'video.mp4'));
if (!existsSync(file)) {
  console.error(`error  nothing at ${file} — the render did not finish`);
  process.exit(1);
}

const bytes = statSync(file).size;
const fail = (msg) => {
  console.error(`error  ${msg}`);
  process.exit(1);
};

/** Any of the three canvases, at any allowed scale. */
const allowedSizes = () => {
  const out = [];
  for (const [name, f] of Object.entries(tokens.formats)) {
    for (let s = tokens.render.stillScaleMin; s <= tokens.render.stillScaleMax; s++) {
      out.push({ name, scale: s, width: f.width * s, height: f.height * s });
    }
  }
  return out;
};

const ffprobe = (args) => {
  try {
    return execFileSync('ffprobe', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null;
  }
};

if (kind === 'image') {
  const head = readFileSync(file).subarray(0, 33);
  if (head.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') fail('not a PNG');
  const width = head.readUInt32BE(16);
  const height = head.readUInt32BE(20);

  const match = allowedSizes().find((s) => s.width === width && s.height === height);
  if (!match) {
    fail(
      `${width}x${height} is not a studio size. Expected one of: ` +
        allowedSizes().map((s) => `${s.name}@${s.scale}x ${s.width}x${s.height}`).join(', ')
    );
  }
  if (match.scale < tokens.render.stillScaleDefault) {
    console.warn(`warn   rendered at ${match.scale}x — the default is ${tokens.render.stillScaleDefault}x`);
  }

  // A flat frame compresses to almost nothing, so bytes per pixel catches a
  // blank render without decoding the image.
  const bpp = bytes / (width * height);
  if (bpp < 0.02) fail(`looks blank — ${bpp.toFixed(4)} bytes per pixel (${(bytes / 1024).toFixed(0)} KB)`);

  console.log(JSON.stringify({ ok: true, kind, width, height, format: match.name, scale: match.scale, kb: Math.round(bytes / 1024) }));
} else {
  const scale = tokens.render.videoScale;
  const probe = ffprobe(['-v', 'error', '-show_entries', 'stream=codec_type,width,height,duration', '-of', 'json', file]);

  if (!probe) {
    if (bytes < 200 * 1024) fail(`only ${(bytes / 1024).toFixed(0)} KB and no ffprobe to check further`);
    console.warn('warn   ffprobe not on PATH — checked file size only, audio not verified');
    console.log(JSON.stringify({ ok: true, kind, kb: Math.round(bytes / 1024), probed: false }));
    process.exit(0);
  }

  const streams = JSON.parse(probe).streams ?? [];
  const video = streams.find((s) => s.codec_type === 'video');
  const audio = streams.find((s) => s.codec_type === 'audio');

  if (!video) fail('no video stream');
  const expected = Object.entries(tokens.formats).map(([name, f]) => ({
    name,
    width: f.width * scale,
    height: f.height * scale,
  }));
  const match = expected.find((e) => e.width === video.width && e.height === video.height);
  if (!match) {
    fail(
      `${video.width}x${video.height} is not a studio size at ${scale}x. Expected one of: ` +
        expected.map((e) => `${e.name} ${e.width}x${e.height}`).join(', ')
    );
  }

  if (!audio) {
    if (!allowSilent) {
      fail(
        'no audio stream. This studio makes video WITH music: set `file` in ' +
          'src/audio.config.ts, or pass --allow-silent if silence is the point.'
      );
    }
    console.warn('warn   silent video, allowed explicitly');
  }

  const seconds = Number(video.duration ?? 0);
  if (seconds && seconds > 60) console.warn(`warn   ${seconds.toFixed(1)}s is long for a social cut`);

  console.log(
    JSON.stringify({
      ok: true,
      kind,
      width: video.width,
      height: video.height,
      format: match.name,
      audio: Boolean(audio),
      seconds: seconds ? Number(seconds.toFixed(2)) : null,
      mb: Number((bytes / 1024 / 1024).toFixed(2)),
    })
  );
}
