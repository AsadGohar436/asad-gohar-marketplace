# Asad Gohar — Studio Marketplace

A Claude Code plugin that renders exactly two things locally with Remotion: an
**image still** and a **short video with music**. Emerald on near-black. Nothing
is published, posted or uploaded from here.

## Who this is (real facts, verbatim, never invented)

- **Asad Gohar** — full stack developer
- React and TypeScript on the front, Node.js behind it, PostgreSQL underneath
- Builds the interface, the API and the schema, and keeps the three agreeing
- **Voice:** first person, plain, practical — written from work actually done

There is no GitHub handle, no employer, no experience length and no metrics in
the profile, so none of those may appear in a frame. **Never claim** a number of
years, a seniority title, clients, revenue, or follower and project counts. The
full list is `doNotClaim` in `src/brand.profile.json`;
`scripts/validate-props.mjs` fails a brief that breaks it, and warns on the
softer ones. If a fact is not in that file, it does not go in a frame. When Asad
supplies a new fact, it goes into the profile first and into the copy second.

## Theme — emerald, dark only

`src/brand.tokens.json` is the ONE source of truth. `src/theme.ts` imports it;
nothing restates a color. bg `#070b09` · surface `#0e1512` · card `#111a15` ·
border `#1d2b23` · text `#eaf6ef` · dim `#8fa79a` · accent `#10b981` · accent2
`#34d399` · gradient `linear-gradient(135deg, #059669, #34d399)` · Inter.

Background is a generated circuit board — traces, soldered nodes, a slow pulse,
a dot grid — under a scrim that keeps it behind the copy. Never add a light
theme, and never introduce an off-palette color.

`shared/brand/` is a MIRROR. Write it with `npm run brand:sync`, check it with
`npm run brand:check`. Never edit it by hand: two hand-maintained copies of a
palette is exactly how the previous marketplace drifted.

## The two outputs

| Composition | What | Command | Scale |
|---|---|---|---|
| `Image` | one PNG still | `npm run image` | 4x (2x floor, no 1x) |
| `Video` | one MP4 with music | `npm run video` | 2x |

The canvas is the `format` prop, resolved in `calculateMetadata`: `square`
1080x1080 · `portrait` 1080x1350 · `story` 1080x1920. One composition per output,
never one per aspect ratio.

Image variants: `insight` · `list` (3 to 5) · `stat` (real numbers only) ·
`quote` · `showcase` (a picture from `public/art/`).

Video scenes: `intro` → one or two `beat`s → `outro`. 8 to 45 seconds, 30fps,
**cross-dissolves only**.

Deliver finals to `<project-root>/output/`. The template's `out/` is scratch.

## Music is not optional

This studio makes video WITH music. `verify.mjs video` fails a silent MP4 unless
`--allow-silent` is passed explicitly.

Only a cleared track: YouTube Audio Library, Pixabay, Uppbeat, Chosic, or
something rendered locally. Never a copyrighted song. Record where it came from in
`credit` in `src/audio.config.ts` at the moment you add it, and carry that credit
into the hand-off note. `public/audio/` is not committed, because a licence
belongs to a person, not to a repository.

## Spacing (already solved — leave it working)

- Video scenes read `LAYOUT` (`padX` / `padY` / `gap`) from the tokens, so every
  scene has the same margins and rhythm.
- `StudioImage` measures its column after `document.fonts.ready` plus a double
  rAF, then spreads ONE uniform gap. Too-tall copy scales down and counter-
  stretches its width, so margins stay identical and nothing ever clips. Keep
  that machinery intact when editing.
- Stills never animate. An entrance spring is at zero on frame 0, which renders
  an empty frame.

## Checks before delivering

```bash
node scripts/validate-props.mjs props.json        # before rendering
node scripts/verify.mjs image                     # size, scale, not blank
node scripts/verify.mjs video                     # size, duration, music present
npm run brand:check                               # mirror still matches
npm run typecheck
```

Open the PNG or watch the MP4 only when a check fails, or the first time a
variant is rendered. Reading four lines of JSON beats loading a 4320px image.

## Do not

Publish, post, upload, or deploy anything. Call an image or music API from this
repo. Add an API key. Invent a fact about Asad. Edit `shared/brand/` by hand.
Render an aspect ratio that is not one of the three formats.
