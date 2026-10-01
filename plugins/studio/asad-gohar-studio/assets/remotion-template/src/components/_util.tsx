import React from 'react';
import { spring, interpolate, Easing } from 'remotion';
import { SPRING } from '../theme';

/** Responsive unit: 1 unit is about 1/1000 of the smaller side of the frame, so
 *  a square, a portrait and a story canvas share one set of numbers. */
export const u = (width: number, height: number, n: number) =>
  (Math.min(width, height) / 1000) * n;

/** The brand entrance: crisp, no bounce, settled in about half a second. Not
 *  overdamped, because a heavy spring makes text creep for two seconds and read
 *  as sticking while a cross-dissolve is running. */
export const enter = (frame: number, fps: number, delay = 0) =>
  spring({ frame: frame - delay, fps, config: { ...SPRING } });

/** Fade and rise from a spring value. */
export const riseStyle = (s: number, rise = 24): React.CSSProperties => ({
  opacity: s,
  transform: `translateY(${(1 - s) * rise}px)`,
});

/** Scene entrance: stays low, then eases in across the first `fade` frames.
 *  The mirror of `exitFade`, so an incoming scene is still hidden through the
 *  first half of the dissolve and two headlines never stack. */
export const enterFade = (frame: number, fade: number): number =>
  interpolate(frame, [0, fade], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });

/** Scene exit: drops out fast across the last `fade` frames, which should equal
 *  the dissolve overlap. Both scenes dip to the background at the midpoint. */
export const exitFade = (frame: number, durationInFrames: number, fade: number): number =>
  interpolate(frame, [durationInFrames - fade, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

/** Deterministic noise, so a re-render draws the same circuit board. Math.random
 *  would give every frame of the video a different background. */
export const seeded = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Text with the first case-insensitive occurrence of `phrase` wrapped in
 *  `phraseStyle`. When the phrase is not in the text it highlights the last
 *  word instead, so a sloppy brief still renders a highlight. */
export const HighlightPhrase: React.FC<{
  text: string;
  phrase: string;
  style?: React.CSSProperties;
  phraseStyle: React.CSSProperties;
}> = ({ text, phrase, style, phraseStyle }) => {
  let before = text;
  let match = '';
  let after = '';
  const idx = phrase ? text.toLowerCase().indexOf(phrase.toLowerCase()) : -1;
  if (idx >= 0) {
    before = text.slice(0, idx);
    match = text.slice(idx, idx + phrase.length);
    after = text.slice(idx + phrase.length);
  } else {
    const words = text.trim().split(/\s+/);
    before = words.slice(0, -1).join(' ') + (words.length > 1 ? ' ' : '');
    match = words[words.length - 1] ?? '';
  }
  return (
    <div style={style}>
      {before}
      <span style={phraseStyle}>{match}</span>
      {after}
    </div>
  );
};
