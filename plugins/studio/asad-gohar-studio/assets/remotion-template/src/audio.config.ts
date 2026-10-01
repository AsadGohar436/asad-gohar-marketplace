/**
 * The music. This studio renders video WITH music by default, so this is not an
 * afterthought: `npm run video` warns loudly when `file` is null, and
 * scripts/verify.mjs fails a silent MP4 unless you pass --allow-silent.
 *
 * LICENSING, non-negotiable: only a track you are allowed to use. Free and
 * clearable sources: the YouTube Audio Library (studio.youtube.com), Pixabay
 * Music, Uppbeat, Chosic, or something rendered locally with FluidSynth. Never
 * a copyrighted song: platforms mute or pull the video, and the credit goes to
 * whoever wrote it, not to you.
 *
 * To enable: drop the file into public/audio/ and name it here.
 */
export const AUDIO = {
  /** Path relative to public/, e.g. 'audio/track.mp3'. Null renders silent. */
  file: 'audio/studio-bed.mp3' as string | null,
  /** 0 to 1. Drop to about 0.25 under a voiceover. */
  volume: 0.55,
  /** Skip an intro that takes too long to arrive. */
  startFromSec: 0,
  fadeInSec: 1.0,
  fadeOutSec: 1.5,
  /** Loop when the track is shorter than the cut. */
  loop: true,
  /** Who wrote it and where it came from. Written into the delivery note so the
   *  attribution is never reconstructed from memory later. */
  credit: 'Written and rendered locally with FluidSynth using the MuseScore_General SoundFont (MIT): FluidR3 by Frank Wen, FluidR3Mono by Michael Cowgill, MuseScore_General adaptation by S. Christian Collins.' as string,
} as const;
