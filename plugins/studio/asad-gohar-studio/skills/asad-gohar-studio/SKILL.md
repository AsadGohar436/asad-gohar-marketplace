---
name: asad-gohar-studio
description: Render Asad Gohar's visuals — an emerald, circuit-board image still (insight / list / stat / quote / showcase) or a short video scored with music, via the local Remotion template. One brief, three canvases (square / portrait / story). Ultra-HD stills. Auto-triggers on "make an image", "render a still", "make a video", "video with music", "post graphic", "story", "showcase this".
invoke: asad-gohar-studio
---

# Asad Gohar — Studio

Two things get made here: an **image** and a **video with music**. Both are rendered
locally by the Remotion template in this plugin. Nothing is uploaded, nothing is
published, and no image or music model is called from this repo.

## Who this is for (real facts only)

**Asad Gohar** — full stack developer. React and TypeScript on the front,
Node.js behind it, PostgreSQL underneath; he builds the interface, the API and
the schema and keeps the three agreeing. Voice: first person, plain, practical,
written from work actually done.

That is the whole verified list. The profile carries no GitHub handle, no
employer, no experience length and no metrics, so a frame may not carry them
either. `src/brand.profile.json` holds the facts and a `doNotClaim` list; never
write a number of years, a seniority title, clients or audience counts into a
frame. `scripts/validate-props.mjs` fails a brief that does, which is the
cheapest place to catch it.

## The template

`plugins/studio/asad-gohar-studio/assets/remotion-template/` — run `npm install`
once. Never scaffold a new Remotion project.

| Composition | What it makes | Command |
|---|---|---|
| `Image` | one PNG still, 4x | `npm run image` |
| `Video` | one MP4 with music, 2x | `npm run video` |

The canvas comes from the `format` field, not from a separate composition:

- `square` 1080x1080 — the default, works in every feed
- `portrait` 1080x1350 — more height for a list or a long headline
- `story` 1080x1920 — full-screen vertical

## Theme

Emerald on near-black, from `src/brand.tokens.json` — the single source of truth.
bg `#070b09` · card `#111a15` · text `#eaf6ef` · accent `#10b981` · gradient
`#059669 → #34d399` · Inter. Background is a generated circuit board: traces,
soldered nodes, a slow pulse of light, a dot grid.

`src/theme.ts` reads that JSON instead of restating it, and
`npm run brand:check` fails when `shared/brand/` has drifted from it. Never edit
a color anywhere but the JSON.

## Making an image

Write the brief to `props.json` (fields documented in `props.schema.json`),
validate, render, verify:

```bash
cd plugins/studio/asad-gohar-studio/assets/remotion-template
node scripts/validate-props.mjs props.json
npx remotion still src/index.ts Image out/image.png --scale=4 --props=./props.json
node scripts/verify.mjs image
```

Variants:

- `insight` — headline, subhead, a short paragraph (default)
- `list` — 3 to 5 numbered cards
- `stat` — one real number, large
- `quote` — a line of Asad's, no body
- `showcase` — a picture from `public/art/` as the hero

`keyPhrase` must be a substring of `headline`; it gets the emerald gradient. When
it is missing the last word is highlighted instead, so a careless brief still
renders, but the validator warns.

Stills always render at `--scale=4`. `--scale=2` is the floor; there is no 1x path.
Square at 4x is 4320x4320, story at 4x is 4320x7680.

## Making a video with music

The music is the point, not a garnish.

1. Put a **cleared** track in `public/audio/` and name it in `src/audio.config.ts`,
   with its `credit`. Cleared means the YouTube Audio Library, Pixabay, Uppbeat,
   Chosic, or something rendered locally. Never a copyrighted song.
2. Write the scenes in `src/video.config.ts` (or a `video.props.json`): `intro` →
   one or two `beat`s → `outro`. 8 to 45 seconds. Cross-dissolves only, because a
   short piece with wipes reads as busy.
3. Render and verify:

```bash
node scripts/validate-props.mjs video.props.json --video
npm run video
node scripts/verify.mjs video
```

`verify video` **fails a silent MP4** unless `--allow-silent` is passed. That is
deliberate: a silent file is the normal failure mode, and it looks fine.

## Pictures in a frame

Drop the file in `public/art/`, then either set `variant: "showcase"` (the picture
is the hero) or set `art` on any other variant (it sits behind the copy as a wash
at `artWash`). A beat scene takes `art` the same way.

Generated art is welcome — generate it wherever you like and save the file here.
This repo holds no API key and sends nothing anywhere.

## Checks before delivering

```bash
node scripts/validate-props.mjs props.json   # before rendering — catches a bad brief
node scripts/verify.mjs image                # after — size, scale, not blank
node scripts/verify.mjs video                # after — size, and that music is in it
npm run brand:check                          # tokens and mirror still agree
```

Open the PNG or watch the MP4 only when a check fails, or when a variant is being
rendered for the first time. The auto-fit layout already guarantees the copy fits;
looking at a 4320px image costs far more than reading four lines of JSON.

Deliver into `<project-root>/output/`. Write the caption alongside it in Asad's
first person, and name the music and its credit in the hand-off note.

Never publish, never post, never upload. Files on disk, then stop.
