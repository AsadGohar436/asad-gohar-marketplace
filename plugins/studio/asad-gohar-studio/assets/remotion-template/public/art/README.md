# public/art/

Pictures that go into a frame: a generated image, a screenshot, a photo of the
work. Drop the file here and name it in the brief.

    { "variant": "showcase", "art": "art/hero.png" }

Two ways a picture is used:

- `variant: "showcase"` — the picture is the hero, framed under the headline.
- any other variant with `art` set — the picture sits behind the copy as a wash
  at `artWash` opacity (0.22 by default). Keep it dark, or the text stops reading.

This is also the hand-off point for AI-generated art. Nothing here calls an image
model: no API key lives in this repo and nothing is sent anywhere. Generate the
picture wherever you like, save the file here, and the studio composes it.

Use 2160px or wider for a `showcase` at 4x, or it goes soft.

Nothing in this folder is committed.
