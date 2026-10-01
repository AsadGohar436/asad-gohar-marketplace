/**
 * The image brief. These are DEFAULTS — Remotion merges anything passed with
 * `--props` over them, so any topic renders without touching source.
 */
import type { FormatName } from './theme';

export type ImageVariant = 'insight' | 'list' | 'stat' | 'quote' | 'showcase';

export type ImageProps = {
  /** square 1080x1080 · portrait 1080x1350 · story 1080x1920 */
  format: FormatName;
  variant: ImageVariant;
  /** Small uppercase kicker above the headline. Empty string hides it. */
  eyebrow: string;
  headline: string;
  /** A substring of the headline, painted in the emerald gradient. Falls back
   *  to the last word so the highlight never silently disappears. */
  keyPhrase: string;
  subhead: string;
  /** Optional substring of the subhead painted in solid emerald. */
  subheadAccent: string;
  /** `insight` body copy. */
  body: string;
  /** `list` body — 3 to 5 short lines. */
  points: string[];
  /** `stat` body — one real number. Never invent one. */
  stat: { value: string; label: string };
  /** `quote` body. */
  quote: string;
  /** `showcase` body — a generated or hand-made picture, path relative to
   *  public/ (e.g. 'art/hero.png'). This is where an AI-generated image goes:
   *  drop the file in public/art/ and name it here. */
  art: string | null;
  /** How strongly the art reads behind the copy, 0 to 1. `showcase` frames it
   *  as the hero instead and ignores this. */
  artWash: number;
  /** Footer topic tags, left side. Empty array falls back to the brand tags. */
  footerTags: string[];
};

export const IMAGE: ImageProps = {
  format: 'square',
  variant: 'insight',
  eyebrow: 'Full stack notes',
  headline: 'The schema decides how hard the frontend will be',
  keyPhrase: 'how hard the frontend will be',
  subhead: 'Most UI pain starts one layer down.',
  subheadAccent: 'one layer down',
  body:
    'When the tables model what the product actually does, the API stays boring and the React code stops inventing state to cover for it. When they do not, every screen grows its own patch for the same missing column.',
  points: [
    'Model the schema around the product, not the screen being built today',
    'One place writes a value, everything else reads it',
    'Return the shape the UI needs, so the client stops reshaping data',
  ],
  stat: { value: '3', label: 'layers that have to agree: UI, API, database' },
  quote: 'A wrong column costs three fixes: the table, the endpoint, and every screen that guessed around it.',
  art: null,
  artWash: 0.22,
  footerTags: [],
};
