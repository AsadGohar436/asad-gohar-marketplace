/**
 * Inter, actually loaded rather than just named in CSS. @remotion/google-fonts
 * holds the render (delayRender) until the glyphs are applied, so the auto-fit
 * measurement in StudioImage measures real Inter metrics instead of whatever
 * font the machine happened to fall back to. Same output on every machine.
 */
import { loadFont } from '@remotion/google-fonts/Inter';

export const { fontFamily: INTER } = loadFont('normal', {
  weights: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
});
