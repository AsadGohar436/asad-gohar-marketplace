#!/usr/bin/env node
/**
 * Renders the cut, and refuses to be quiet about a silent one.
 *
 * The music is the product here, not a garnish, so this wrapper reads
 * src/audio.config.ts first and tells you what will happen before it spends
 * minutes encoding.
 *
 *   node scripts/render-video.mjs                    defaults from video.config.ts
 *   node scripts/render-video.mjs --props=./video.props.json
 *   node scripts/render-video.mjs --out=out/story.mp4
 */
import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const templateRoot = resolve(here, '..');
const tokens = JSON.parse(readFileSync(join(templateRoot, 'src', 'brand.tokens.json'), 'utf8'));
const audioSrc = readFileSync(join(templateRoot, 'src', 'audio.config.ts'), 'utf8');

/** The config is TypeScript, so read the one field out of it rather than
 *  dragging a TS loader into a two-line script. */
const fileMatch = audioSrc.match(/file:\s*(?:null|'([^']*)'|"([^"]*)")/);
const track = fileMatch ? fileMatch[1] ?? fileMatch[2] ?? null : null;
const creditMatch = audioSrc.match(/credit:\s*'([^']*)'/);
const credit = creditMatch?.[1] ?? '';

const args = process.argv.slice(2);
const outArg = args.find((a) => a.startsWith('--out='));
const out = outArg ? outArg.slice('--out='.length) : 'out/video.mp4';
const passthrough = args.filter((a) => !a.startsWith('--out='));

if (!track) {
  console.warn('');
  console.warn('  No music set. src/audio.config.ts has `file: null`, so this cut renders silent.');
  console.warn('  Drop a cleared track into public/audio/ and name it there.');
  console.warn('  Then verify with: node scripts/verify.mjs video');
  console.warn('');
} else {
  const path = join(templateRoot, 'public', track);
  if (!existsSync(path)) {
    console.error(`error  audio.config.ts points at public/${track}, which does not exist.`);
    process.exit(1);
  }
  console.log(`music  public/${track}${credit ? ` — credit: ${credit}` : ' — no credit recorded yet'}`);
  if (!credit) {
    console.warn('warn   set `credit` in src/audio.config.ts while you still remember the source');
  }
}

const result = spawnSync(
  'npx',
  [
    'remotion',
    'render',
    'src/index.ts',
    'Video',
    out,
    `--scale=${tokens.render.videoScale}`,
    ...passthrough,
  ],
  { cwd: templateRoot, stdio: 'inherit', shell: process.platform === 'win32' }
);

process.exit(result.status ?? 1);
