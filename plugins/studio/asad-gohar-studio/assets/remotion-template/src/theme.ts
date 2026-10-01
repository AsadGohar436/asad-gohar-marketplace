/**
 * Asad Gohar Studio — Remotion theme.
 *
 * Every value here is READ FROM `brand.tokens.json`, which is the one source of
 * truth for the emerald theme. Nothing is retyped: that is exactly how the older
 * marketplace drifted (tokens.json, theme.ts and the prose docs each held their
 * own copy of the palette and slowly disagreed). Edit the JSON, never this file.
 */
import tokens from './brand.tokens.json';
import { INTER } from './fonts';

export const FPS = 30;

/** Output sizes. `format` on the image/video props picks one — one composition,
 *  three canvases, resolved in calculateMetadata (no duplicate <Composition>s). */
export const FORMAT = tokens.formats;
export type FormatName = keyof typeof FORMAT;

/** Emerald theme, dark only. The ONLY palette. */
export const COLORS = tokens.colors;

export const GRADIENT = tokens.gradient;

export const FONTS = {
  family: `${INTER}, ${tokens.font.family.split(',').slice(1).join(',').trim()}`,
  heading: tokens.font.weights.heading,
  semibold: tokens.font.weights.semibold,
  medium: tokens.font.weights.medium,
  body: tokens.font.weights.body,
  letterSpacingHeading: tokens.font.letterSpacingHeading,
} as const;

export const RADIUS = tokens.radius;

/** Side margins and vertical rhythm for the VIDEO scenes. Values are `u()`
 *  units (about 1/1000 of the smaller side), so a square, a portrait and a
 *  story frame all breathe the same. The image still does NOT read these —
 *  it measures its own content and spreads one uniform gap. */
export const LAYOUT = tokens.layout;

/** Render floors, mirrored from the JSON so the scripts and the docs agree. */
export const RENDER = tokens.render;

/** Frames at 30fps. */
export const TIMING = {
  transitionOverlap: 28, // the only transition: a 0.93s eased cross-dissolve
  introFrames: 30,
  outroFrames: 90,
  ctaMinHold: 45,
} as const;

/** Crisp entrance, zero bounce (settles in about half a second). */
export const SPRING = { damping: 24, mass: 1, stiffness: 130 } as const;
