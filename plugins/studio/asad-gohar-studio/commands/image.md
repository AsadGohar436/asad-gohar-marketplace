---
description: Render an emerald image still for Asad Gohar on a given topic — square, portrait or story, ultra-HD 4x — plus a first-person caption.
argument-hint: "<topic>"
---

# /image

Make an image for the topic in `$ARGUMENTS` (ask for one if it is missing).
Follow the `asad-gohar-studio` skill.

## Steps

1. **Pick the variant.** `insight` for a point of view, `list` for 3 to 5
   takeaways, `stat` for one real number that the profile or the work actually
   supports, `quote` for a single line, `showcase` when a picture is the point.
2. **Pick the canvas.** `square` unless there is a reason: `portrait` for a long
   list, `story` for full-screen vertical.
3. **Write the copy** in Asad's first person — plain, practical, from work done.
   A `headline` with a `keyPhrase` inside it, a `subhead`, and the body the variant
   needs. Keep the claims to what `src/brand.profile.json` supports.
4. **Validate, then render** from
   `plugins/studio/asad-gohar-studio/assets/remotion-template/`
   (`npm install` once if `node_modules` is missing):
   ```bash
   node scripts/validate-props.mjs props.json
   npx remotion still src/index.ts Image out/image.png --scale=4 --props=./props.json
   ```
   Always 4x. 2x is the floor.
5. **Verify headlessly.** `node scripts/verify.mjs image` — checks the size, the
   scale and that the frame is not blank. Open the PNG only if that fails, or if
   this is the first render of a variant.
6. **Deliver.** Copy to `<project-root>/output/`, and write a first-person caption:
   hook line, short paragraphs, 3 to 5 hashtags, no engagement bait.

## Rules

Real facts only — the validator enforces the `doNotClaim` list. Never publish or
post anything. Files on disk, then stop.
