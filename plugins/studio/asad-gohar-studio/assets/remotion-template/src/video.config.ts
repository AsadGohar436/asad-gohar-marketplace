/**
 * The video brief: a short, musical cut. Intro, one or two beats, outro,
 * cross-dissolves only. Durations are frames at 30fps; the transition overlap
 * is subtracted automatically, so these read as real on-screen time.
 */
import type { FormatName } from './theme';
import { FPS, TIMING } from './theme';

export type IntroScene = {
  kind: 'intro';
  durationInFrames: number;
  title: string;
  keyPhrase: string;
  sub: string;
};

export type BeatScene = {
  kind: 'beat';
  durationInFrames: number;
  /** Small uppercase kicker. */
  label: string;
  title: string;
  keyPhrase: string;
  sub?: string;
  /** Up to 3. Use `sub` or `bullets`, not both. */
  bullets?: string[];
  /** Optional picture behind the beat, path relative to public/. */
  art?: string | null;
};

export type OutroScene = {
  kind: 'outro';
  durationInFrames: number;
  cta: string;
};

export type VideoScene = IntroScene | BeatScene | OutroScene;

export type VideoProps = {
  format: FormatName;
  scenes: VideoScene[];
};

export const VIDEO: VideoProps = {
  format: 'square',
  scenes: [
    {
      kind: 'intro',
      durationInFrames: 3 * FPS,
      title: 'Full stack means the bug is always mine',
      keyPhrase: 'always mine',
      sub: 'React in front, Node and Postgres behind it.',
    },
    {
      kind: 'beat',
      durationInFrames: 5 * FPS,
      label: 'Where it starts',
      title: 'Most frontend pain starts in the schema',
      keyPhrase: 'in the schema',
      bullets: [
        'Model the product, not this week’s screen',
        'One writer per value, everyone else reads',
        'Send the shape the UI already needs',
      ],
    },
    {
      kind: 'beat',
      durationInFrames: 5 * FPS,
      label: 'What it buys',
      title: 'A boring API is the whole point',
      keyPhrase: 'boring API',
      sub: 'Nothing clever in the middle, so the interface stays simple.',
    },
    {
      kind: 'outro',
      durationInFrames: TIMING.outroFrames,
      cta: 'Building end to end',
    },
  ],
};

/** Total timeline length once the cross-dissolve overlaps are subtracted. */
export const totalDuration = (scenes: VideoScene[] = VIDEO.scenes): number => {
  const sum = scenes.reduce((n, s) => n + s.durationInFrames, 0);
  const overlaps = Math.max(0, scenes.length - 1) * TIMING.transitionOverlap;
  return Math.max(FPS, sum - overlaps);
};
