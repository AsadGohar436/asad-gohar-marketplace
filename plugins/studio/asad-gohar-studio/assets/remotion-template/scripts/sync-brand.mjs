#!/usr/bin/env node
/**
 * Keeps shared/brand/ honest.
 *
 * src/brand.tokens.json and src/brand.profile.json are what the renderer
 * actually reads. shared/brand/ is a mirror for humans and other tools. In the
 * older marketplace those two copies drifted, because nothing checked them.
 *
 *   node scripts/sync-brand.mjs           write the mirror
 *   node scripts/sync-brand.mjs --check   fail when the mirror is stale
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const templateSrc = resolve(here, '..', 'src');
const repoRoot = resolve(here, '..', '..', '..', '..', '..', '..');
const mirrorDir = join(repoRoot, 'shared', 'brand');

const pairs = [
  ['brand.tokens.json', 'tokens.json'],
  ['brand.profile.json', 'profile.json'],
];

const check = process.argv.includes('--check');
let stale = 0;

mkdirSync(mirrorDir, { recursive: true });

for (const [from, to] of pairs) {
  const source = readFileSync(join(templateSrc, from), 'utf8');
  const target = join(mirrorDir, to);
  const current = existsSync(target) ? readFileSync(target, 'utf8') : null;

  if (current === source) {
    console.log(`ok       shared/brand/${to}`);
    continue;
  }
  if (check) {
    stale++;
    console.error(
      `stale    shared/brand/${to} does not match src/${from} — run: npm run brand:sync`
    );
    continue;
  }
  writeFileSync(target, source);
  console.log(`written  shared/brand/${to}`);
}

if (stale > 0) {
  console.error(`\n${stale} mirrored file(s) out of date.`);
  process.exit(1);
}
