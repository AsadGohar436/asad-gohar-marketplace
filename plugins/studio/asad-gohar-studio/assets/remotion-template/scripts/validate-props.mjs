#!/usr/bin/env node
/**
 * Checks a brief before it costs a render, and checks it against the one rule
 * this studio cannot bend: only real facts about Asad.
 *
 *   node scripts/validate-props.mjs props.json          an image brief
 *   node scripts/validate-props.mjs video.props.json --video   a video brief
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const templateRoot = resolve(here, '..');
const profile = JSON.parse(readFileSync(join(templateRoot, 'src', 'brand.profile.json'), 'utf8'));

const file = process.argv[2];
const isVideo = process.argv.includes('--video');
if (!file) {
  console.error('usage: node scripts/validate-props.mjs <props.json> [--video]');
  process.exit(2);
}

const props = JSON.parse(readFileSync(resolve(file), 'utf8'));
const errors = [];
const warnings = [];

const FORMATS = ['square', 'portrait', 'story'];
const VARIANTS = ['insight', 'list', 'stat', 'quote', 'showcase'];

/** Claims the profile does not back. Catching them here is cheaper than
 *  catching them after the post is live. Anything in src/brand.profile.json is
 *  fair game; a number that is not in there is not. */
const FORBIDDEN = [
  [/\b(\d+)\+?\s*(years?|yrs?)\b/i, 'a span of years — no experience length is recorded in the profile'],
  [/\b(expert|senior|lead)\b/i, 'a seniority claim'],
  [
    /\b(\d[\d,.]*)\s*(k|m)?\s*(followers?|views?|downloads?|users?|clients?|projects?|repos(itories)?)\b/i,
    'a count the profile does not record',
  ],
];

/** Plausible for a working developer, but unverified here. A warning, not an
 *  error, so the line still renders once it has been read and meant. */
const DISCOURAGED = [
  [/\b(clients\b|client work|agenc(y|ies)|freelanc)/i, 'client or agency work — the profile names none'],
  [/\b(guarantee|revolutionary|game.chang|10x)\b/i, 'marketing language'],
];

const scanText = (label, text) => {
  if (typeof text !== 'string') return;
  for (const [re, why] of FORBIDDEN) {
    if (re.test(text)) errors.push(`${label}: ${why} — "${text.trim()}"`);
  }
  for (const [re, why] of DISCOURAGED) {
    if (re.test(text)) warnings.push(`${label}: ${why} — "${text.trim()}"`);
  }
};

const artExists = (p) => existsSync(join(templateRoot, 'public', p));

if (!isVideo) {
  const {
    format = 'square',
    variant = 'insight',
    headline = '',
    keyPhrase = '',
    subhead = '',
    body = '',
    points = [],
    stat = {},
    quote = '',
    art = null,
    footerTags = [],
  } = props;

  if (!FORMATS.includes(format)) errors.push(`format must be one of ${FORMATS.join(', ')}`);
  if (!VARIANTS.includes(variant)) errors.push(`variant must be one of ${VARIANTS.join(', ')}`);
  if (!headline.trim()) errors.push('headline is empty');
  if (headline.length > 120) errors.push(`headline is ${headline.length} chars — keep it under 120`);
  if (keyPhrase && !headline.toLowerCase().includes(keyPhrase.toLowerCase())) {
    warnings.push('keyPhrase is not inside headline — the last word will be highlighted instead');
  }
  if (variant === 'list') {
    if (points.length < 3 || points.length > 5) errors.push(`list needs 3 to 5 points, got ${points.length}`);
    points.forEach((p, i) => {
      if (String(p).length > 90) warnings.push(`point ${i + 1} is long (${String(p).length} chars)`);
    });
  }
  if (variant === 'stat' && !String(stat.value ?? '').trim()) errors.push('stat.value is empty');
  if (variant === 'quote' && !quote.trim()) errors.push('quote is empty');
  if (variant === 'showcase' && !art) errors.push('showcase needs `art` — a file in public/art/');
  if (art && !artExists(art)) errors.push(`art file not found: public/${art}`);
  if (!Array.isArray(footerTags)) errors.push('footerTags must be an array');

  [['headline', headline], ['subhead', subhead], ['body', body], ['quote', quote], ['stat.label', stat.label]]
    .forEach(([k, v]) => scanText(k, v));
  points.forEach((p, i) => scanText(`points[${i}]`, p));
} else {
  const { format = 'square', scenes = [] } = props;
  if (!FORMATS.includes(format)) errors.push(`format must be one of ${FORMATS.join(', ')}`);
  if (!Array.isArray(scenes) || scenes.length < 2) errors.push('a cut needs at least an intro and an outro');

  let frames = 0;
  scenes.forEach((s, i) => {
    const at = `scenes[${i}]`;
    if (!['intro', 'beat', 'outro'].includes(s.kind)) errors.push(`${at}.kind must be intro, beat or outro`);
    if (!Number.isFinite(s.durationInFrames) || s.durationInFrames < 30) {
      errors.push(`${at}.durationInFrames must be at least 30 (one second)`);
    } else {
      frames += s.durationInFrames;
    }
    if (s.kind === 'beat' && s.sub && Array.isArray(s.bullets) && s.bullets.length) {
      warnings.push(`${at}: sub and bullets together crowd the frame — pick one`);
    }
    if (Array.isArray(s.bullets) && s.bullets.length > 3) errors.push(`${at}: at most 3 bullets`);
    if (s.art && !artExists(s.art)) errors.push(`${at}: art file not found: public/${s.art}`);
    ['title', 'sub', 'label', 'cta'].forEach((k) => scanText(`${at}.${k}`, s[k]));
    (s.bullets ?? []).forEach((b, j) => scanText(`${at}.bullets[${j}]`, b));
  });

  const seconds = Math.round((frames - Math.max(0, scenes.length - 1) * 28) / 30);
  if (seconds > 45) warnings.push(`the cut runs about ${seconds}s — short social video lands best under 45s`);
  if (seconds < 8) warnings.push(`the cut runs about ${seconds}s — under 8s reads as an accident`);
}

for (const w of warnings) console.warn(`warn   ${w}`);
for (const e of errors) console.error(`error  ${e}`);

if (errors.length) {
  console.error(`\n${errors.length} problem(s). Nothing rendered.`);
  console.error(`Facts that are safe to use live in src/brand.profile.json (${profile.name}).`);
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, warnings: warnings.length }));
