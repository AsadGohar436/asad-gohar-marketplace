# Asad Gohar — Studio Marketplace

A Claude Code plugin marketplace that makes two things for **Asad Gohar**
(full stack developer — React, Node.js, TypeScript, PostgreSQL): an **image
still** and a **short video scored with music**, both sized for LinkedIn.
Emerald on near-black, a circuit-board background, Inter.

Everything renders locally with Remotion. The files are built for a LinkedIn feed,
but nothing is uploaded and nothing is posted from here: the studio writes a PNG,
an MP4 and a caption to disk, and stops. No image or music model is called from
this repo either.

## Quick start

```bash
cd plugins/studio/asad-gohar-studio/assets/remotion-template
npm install

npm run image     # → out/image.png   (square, 4x = 4320x4320)
npm run video     # → out/video.mp4   (square, 2x = 2160x2160)
npm run studio    # live preview
```

Any topic, without editing source — write the brief to `props.json` and pass it:

```bash
node scripts/validate-props.mjs props.json
npx remotion still src/index.ts Image out/image.png --scale=4 --props=./props.json
node scripts/verify.mjs image
```

## One brief, three canvases

The canvas comes from the `format` field, not from a separate composition:

| format | size | for |
|---|---|---|
| `square` | 1080x1080 | the default, works in any feed |
| `portrait` | 1080x1350 | a long list or a long headline |
| `story` | 1080x1920 | full-screen vertical |

Stills always render at `--scale=4`; `2x` is the floor and there is no `1x` path.
Video renders at `2x`.

## The image

Header (initials or photo, name, role) → optional eyebrow → headline with the key
phrase in the emerald gradient → subhead → body → footer. Five bodies:

- `insight` — a short paragraph
- `list` — 3 to 5 numbered cards
- `stat` — one real number
- `quote` — a single line
- `showcase` — a picture from `public/art/` as the hero

Spacing is measured rather than guessed. After the fonts land, the column is
measured and the leftover height becomes ONE uniform gap; copy that is too tall
scales down instead of clipping, and the side margins never change, so a heavy
brief gets slightly smaller type rather than a narrower frame.

## The video

`intro` → one or two `beat`s → `outro`, cross-dissolves only, 8 to 45 seconds.

The music is the product, not a garnish:

1. Put a **cleared** track in `public/audio/` (YouTube Audio Library, Pixabay,
   Uppbeat, Chosic, or rendered locally).
2. Name it in `src/audio.config.ts`, with its `credit`.
3. `npm run video` prints which track is going in before it spends the minutes.
4. `node scripts/verify.mjs video` **fails a silent MP4** unless you pass
   `--allow-silent`. A silent file is the normal failure here, and it looks fine
   until someone plays it.

## Pictures, including generated ones

Drop the file in `public/art/`, then either `variant: "showcase"` (the picture is
the hero) or set `art` on any other variant (it sits behind the copy as a wash).
Generate the art wherever you like — this repo holds no API key and sends nothing
anywhere. `public/audio/` and `public/art/` are not committed.

## Brand facts and tokens

`src/brand.tokens.json` and `src/brand.profile.json` are what the renderer reads.
`shared/brand/` is a mirror for humans, written by `npm run brand:sync` and
checked by `npm run brand:check`. Never edit the mirror, and never restate a color
in a component.

Asad's facts include a `doNotClaim` list — a number of years, seniority titles,
clients, audience and project counts. `scripts/validate-props.mjs` rejects a brief
that contains them, which is much cheaper than catching it after the post is up.

## Layout

```
.claude-plugin/marketplace.json           # the registry Claude Code reads
plugins/studio/asad-gohar-studio/       # the plugin (skill + commands + template)
  skills/asad-gohar-studio/SKILL.md
  commands/image.md · commands/video.md
  assets/remotion-template/               # the renderer
shared/brand/                             # mirrored tokens + profile facts
```
