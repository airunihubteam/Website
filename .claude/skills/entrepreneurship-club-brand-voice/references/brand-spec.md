# מועדון היזמות — Full Brand Spec

Contents: 1 Color · 2 Logo · 3 Typography · 4 Motifs · 5 Layout · 6 Formats & sizes · 7 Video · 8 Checklist

## 1. Color

| Token | Name (HE) | HEX | RGB | Role |
|---|---|---|---|---|
| `--night` | כחול לילה | #0E1452 | 14 20 82 | Primary background, top of gradient, navy logo |
| `--midnight` | חצות | #1A1E65 | 26 30 101 | Surfaces, middle of gradient |
| `--dusk` | כחול שחר | #272D79 | 39 45 121 | Bottom of gradient, secondary surfaces |
| `--star` | לבן כוכב | #FFFFFF | 255 255 255 | Logo, headlines, primary button |
| `--haze` | ערפל | #B9BEEA | 185 190 234 | Secondary text, labels, captions on navy |
| `--paper` | נייר | #F4F5FC | 244 245 252 | Light background for inverse logo only |

- Gradient (`--sky`): 180°, `#0A0F45 0% → #0E1452 30% → #1A1E65 70% → #272D79 100%`. Always dark at top.
- Approximate usage: 60% Night, 20% Dusk/Midnight, 12% White, 8% Haze.
- Hairlines/borders: white at 16% opacity.
- Body text on navy: white or `#DADDF6`; secondary: Haze. Never navy on Dusk (too low contrast).
- Print (CMYK approximations): Night 83 76 0 68 · Dusk 68 63 0 53 · Haze 21 19 0 8.

## 2. Logo

Parts: the **symbol** (a tree whose crown is 15 five-point stars of three sizes), the **wordmark** ("מועדון היזמות" over "אוניברסיטת רייכמן"), and the separate **Reichman / Adelson School** mark.

| Version | File | Use |
|---|---|---|
| Primary | `lockup-white.png` on the sky gradient | Covers, posters, first slide |
| Symbol | `symbol-white.png` | Avatars, favicons, watermark, small spaces |
| Horizontal | symbol + `wordmark-white.png` side by side (symbol on the right in RTL) | Wide headers, banners |
| Inverse | `*-navy.png` on Paper or white | Light printed media only |
| Institution (HE) | `reichman-he-white.png` / `-navy` / `-color` | Hebrew assets: top corner (left in RTL), always the whole mark |
| Institution (EN) | `reichman-en-white.png` / `-navy` / `-color` | English assets: top corner (right in LTR) |

- Clear space: at least the height of the top star of the symbol on every side.
- Minimum size: symbol 24 px / 8 mm tall; wordmark 120 px / 30 mm wide.
- The symbol may be used large and cropped at an edge as a decorative watermark at 6–12% opacity — the only allowed crop.
- Reichman / Adelson mark: never crop it or split the stars from the text. Keep it whole. `-color` is the university's blue (#2F49A4); use it only on white or Paper. Max size about 60 mm / 500 px wide (the source is raster).
- Never: recolor (other than white/navy), stretch, rotate, outline, shadow, glow, gradient-fill, put on photos or busy/light-colored backgrounds, rebuild with a font.

## 3. Typography

| Role | Font | Weight | Tracking | Line height |
|---|---|---|---|---|
| H1 / display | Assistant | 800 | +0.08em | 1.05 |
| H2 | Assistant | 700 | +0.06em | 1.15 |
| H3 | Assistant | 700 | +0.04em | 1.25 |
| Label / eyebrow | Assistant | 600 | +0.20em | 1.3, Haze, small |
| Button | Assistant | 800 | +0.10em | 1 |
| Body | Heebo | 300–400 | 0 | 1.6 |
| Data (dates, times, numbers, codes) | IBM Plex Mono | 400–500 | 0 | 1.4, LTR isolated |

Scale (print, pt): H1 32 · H2 20 · H3 13 · body 9–11 · label 8–9 · footnote 6.5.
Scale (screen 1080 px wide, px): H1 90–110 · H2 56 · H3 36 · body 34–38 · label 24–28.
Rules: one H1 per page; headlines 2–6 words, max two lines; never all-caps Latin inside Hebrew headlines except the English club name if used; no italic; no underline except links.

## 4. Motifs

- **Star**: five-point, one point straight up, solid white (`.star`, clip-path in `brand.css`). Sizes in a set follow ~ 1 : 0.6 : 0.35, like the tree. Used as bullets, section ornaments, rating marks.
- **Star field**: tiny white dots, 15–60% opacity, random but seeded (`starfield.js`). Always behind content, never on top of text.
- **Panels**: Night fill, 1 px white-16% border, radius 6 px (1.5 mm print). Use for grouped items; don't box everything.
- **Buttons**: radius 2 px. Primary = white fill, navy text. Secondary = 1 px white outline.
- **Dividers**: section label followed by a hairline running to the edge.
- No photos as backgrounds. If a photo is needed (speaker headshot), put it in a panel, desaturate slightly, and add a Night overlay at ~20%.

## 5. Layout

- RTL, right-aligned. Generous margins: 12–14 mm on A4, 7% of width on social.
- Headers: club title right, Reichman mark left, hairline below.
- Footer: "מועדון היזמות · אוניברסיטת רייכמן" right, date/version left, Haze, small labels.
- Leave at least 30–40% of a poster or post as empty sky.
- Grids of 3 or 4 equal items; align edges and baselines.

## 6. Formats & sizes

| Format | Size | Render |
|---|---|---|
| A4 document / flyer | 210×297 mm | `render.py x.html x.pdf` with `@page{size:A4;margin:0}` |
| Instagram post | 1080×1350 | `--size 1080x1350` |
| Square post | 1080×1080 | `--size 1080x1080` |
| Story / Reel cover | 1080×1920 (keep text inside the middle 1080×1420) | `--size 1080x1920` |
| LinkedIn post | 1200×627 | `--size 1200x627` |
| LinkedIn / event cover | 1584×396 | `--size 1584x396` |
| WhatsApp group image / avatar | 640×640, symbol only centered at 55% | `--size 640x640` |
| Slide 16:9 | 1920×1080 | `--size 1920x1080`, or PDF with `@page{size:1920px 1080px}` for multi-slide decks |
| Certificate | A4 landscape | `@page{size:A4 landscape}` |

Use `--scale 2` (default) for crisp PNGs; `--scale 1` when exact pixel size matters (uploads that recompress).

## 7. Video

Mood: slow and calm. Stars twinkle, nothing bounces.
- Build each scene as an HTML page at 1920×1080 or 1080×1920 using `brand.css`.
- For motion, animate with CSS/JS driven by a `?t=` query param or a global time variable, render frames with `render.py` (PNG, `--scale 1`) in a loop, then assemble: `ffmpeg -framerate 30 -i f%04d.png -c:v libx264 -pix_fmt yuv420p out.mp4`.
- Moves allowed: fades (400–800 ms ease-out), slow upward drift of text (≤ 40 px), star opacity twinkle, symbol reveal star-by-star from the trunk upward.
- Moves not allowed: spins, bounces, glitch, flashes, color shifts.
- End card: primary lockup centered on the sky, 2–3 s hold.
- Music/sound is the user's choice; don't add any by default.

## 8. Checklist before delivering

- [ ] Only palette colors; sky gradient dark at the top.
- [ ] Real logo file, correct version, clear space kept, not distorted.
- [ ] Assistant headlines with wide tracking; Heebo body; mono only for data.
- [ ] Hebrew RTL, right-aligned; no clipped or overflowing text.
- [ ] Star field behind, not over, content; ample empty space.
- [ ] Correct size/format for where it will be posted or printed.
- [ ] Facts (dates, places, names) came from the user, none invented.
