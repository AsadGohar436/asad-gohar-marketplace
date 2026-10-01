---
description: Render a short emerald video with music for Asad Gohar on a given topic — square, portrait or story, 2x — plus a first-person caption and the music credit.
argument-hint: "<topic>"
---

# /video

Make a short video for the topic in `$ARGUMENTS` (ask for one if it is missing).
Follow the `asad-gohar-studio` skill.

## Steps

1. **Sort the music first.** A cleared track in `public/audio/`, named in
   `src/audio.config.ts` with its `credit`. YouTube Audio Library, Pixabay,
   Uppbeat, Chosic, or something rendered locally. Never a copyrighted song. If no
   track exists yet, say so and ask for one before rendering — a silent cut is the
   failure this studio exists to avoid.
2. **Script the scenes** in `src/video.config.ts`: `intro` → one or two `beat`s →
   `outro`. 8 to 45 seconds total, 30fps, cross-dissolves only. A beat takes either
   a `sub` line or up to 3 `bullets`, never both. Preview with `npm run studio` when
   unsure.
3. **Validate and render** from
   `plugins/studio/asad-gohar-studio/assets/remotion-template/`:
   ```bash
   node scripts/validate-props.mjs video.props.json --video   # if using a props file
   npm run video
   ```
   The wrapper prints which track is in the cut before it spends minutes encoding.
4. **Verify.** `node scripts/verify.mjs video` — size, duration, and that there is
   actually an audio stream. It fails a silent file on purpose. Then watch it once:
   no clipped text, the rhythm steady from scene to scene, emerald only.
5. **Deliver.** Copy to `<project-root>/output/`, write a first-person caption, and
   name the track and its credit in the hand-off note.

## Rules

Real facts only. Attribution travels with the file. Never publish, post or upload.
