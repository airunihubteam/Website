---
name: entrepreneurship-club-brand-voice
description: ENTREPRENEURSHIP CLUB BRAND VOICE — the visual identity of the Entrepreneurship Club at Reichman University (מועדון היזמות באוניברסיטת רייכמן, "EU CLUB", Adelson School of Entrepreneurship). Holds the exact colors, logo files, fonts, type scale, star motifs and layout rules, plus templates and a renderer for PDF and PNG. Use this skill whenever designing ANY asset for the club or its events — PDF, one-pager, flyer, poster, Instagram/LinkedIn post, story, cover, slide deck, certificate, banner, newsletter header, video or animation, signage — in Hebrew or English. Trigger when the user mentions EU CLUB, מועדון היזמות, מועדון היזמות של רייכמן, the Entrepreneurship Club, Reichman Entrepreneurship Club, Reichman University entrepreneurship club, the club's events (ערב פיצ'ים, pitch night, מפגש, meetup, סדנה, workshop), or says things like "במיתוג של המועדון", "לפי הדף מותג", "in the club's branding", "I'm making something for the entrepreneurship club at Reichman", even if they don't name the skill.
---

# ENTREPRENEURSHIP CLUB BRAND VOICE — מועדון היזמות

מועדון היזמות באוניברסיטת רייכמן = the Entrepreneurship Club at Reichman University (also called "EU CLUB"). All these names refer to the same brand.

Everything made for the club must look like it came from the same hand as the brand guide (`references/brand-guide-onepager.pdf`). Open that PDF first when you need to see the look; read `references/brand-spec.md` for every value and rule. This file is the short version.

## The look in one paragraph

A night sky. Deep navy gradient that lightens downward, faint white star dots, one white five-point-star tree as the symbol. White, wide-tracked, heavy Hebrew headlines. Calm, sparse, a lot of empty sky. No other hues. The feeling is "ideas starting to grow at night" — quiet confidence, not startup neon.

## Non-negotiables

These keep assets recognisable as the club's. Break one only if the user explicitly asks.

1. **Colors only from the palette.** Night `#0E1452`, Midnight `#1A1E65`, Dusk `#272D79`, Star `#FFFFFF`, Haze `#B9BEEA`, Paper `#F4F5FC`. No accent colors, no purple-to-pink gradients, no black. The one exception is the Reichman mark's own blue (`-color` files), used only on white.
2. **Background = the sky gradient** (`--sky` in `brand.css`, 180°, dark at top → Dusk at bottom) with the star field. Paper is only for the inverse (navy) logo on light media like printed forms.
3. **Logo = the real files** in `assets/logo/`. Never redraw, recolor beyond white/navy, stretch, rotate, add shadows/glows, or place on busy photos. Keep clear space around it equal to the height of the top star.
4. **Reichman mark is used whole.** All the stars, both name lines and the Adelson School lines stay together. Use the Hebrew version on Hebrew assets and the English one on English assets. On navy use `-white`; on white or Paper use `-color` (the university's own blue) or `-navy`. The source files are small (about 800 px wide), so keep the mark at 60 mm / 500 px wide or less.
5. **Fonts:** Assistant (headlines, labels, buttons — weights 600–800, wide letter-spacing) and Heebo (body — 300/400). IBM Plex Mono only for standalone data lines: dates, times, prices and hex codes. A number inside a headline or sentence stays in that text's font. The `.ttf` files are bundled in `assets/fonts/`.
6. **Hebrew, RTL**, right-aligned by default. Headlines short (2–6 words). Labels are small, tracked-out Assistant in Haze.
7. **The star** (five-point, point up, never rotated) is the only graphic motif: bullets, dividers, decoration in up to three sizes. No emoji, no stock icons.

## Assets

```
assets/
  brand.css          tokens (+ @font-face), type classes .h1 .h2 .h3 .label .body .data, .star .btn .panel .rule
  starfield.js       starfield(el,{seed,density}) — seeded star dots, same result every render
  fonts/             Assistant 400/600/700/800, Heebo 300/400/500, IBM Plex Mono 400/500
  logo/
    lockup-white.png / lockup-navy.png       symbol + wordmark stacked (primary)
    symbol-white.png / symbol-navy.png       tree only (avatars, small sizes, watermark)
    wordmark-white.png / wordmark-navy.png   "מועדון היזמות / אוניברסיטת רייכמן"
    reichman-he-{white,navy,color}.png       Reichman University · Adelson School of Entrepreneurship, Hebrew (header corner on Hebrew assets)
    reichman-en-{white,navy,color}.png       same mark in English (English assets)
templates/
  a4-document.html   one-page A4 (flyer, summary, one-pager)
  social-post.html   feed post 1080×1350 / 1080×1080 / 1200×627 (scales with vw units)
  story.html         story / reel cover 1080×1920, text kept inside Instagram's safe area
scripts/render.py    HTML → PDF or PNG via headless Chromium
references/
  brand-spec.md              full spec: scale, spacing, sizes per format, video, checklists
  brand-guide-onepager.pdf   the approved brand guide page
```

## Workflow

1. **Pick the format** and its size from the table in `references/brand-spec.md` (A4, post 1080×1350, story 1080×1920, LinkedIn 1200×627, slide 1920×1080, etc.).
2. **Start from a template** when one fits; otherwise write a new HTML page that links `brand/brand.css`, uses `brand/logo/...`, and calls `starfield(...)`. The `brand/` prefix is resolved by the renderer to this skill's `assets/` folder — keep it.
3. **Write the copy in Hebrew** unless told otherwise. Use real content from the user; ask for missing facts (date, time, place, link) instead of inventing them. Check that facts agree with each other (a date and its weekday, for example). If they conflict, ask. If you can't ask, leave the conflicting detail off the asset and flag it in your reply. Templates mark sample text as `[[...]]`. Replace every marker before rendering: `grep -n '\[\[' page.html` should print nothing.
4. **Render:**
   ```bash
   python3 <skill>/scripts/render.py page.html out.pdf
   python3 <skill>/scripts/render.py page.html out.png --size 1080x1350
   ```
5. **Look at the result** (convert a PDF page to PNG with `pdftoppm -r 80 -png` if needed) and run the checklist in `brand-spec.md` before delivering. Fix and re-render once if something is off.

For non-HTML outputs:
- **Images with PIL / other tools:** load fonts from `assets/fonts/`, colors from the palette, and paste the logo PNGs. Hebrew in PIL needs `features=["-kern"]` + bidi handling (`python-bidi`), or render through HTML instead — HTML is simpler and preferred.
- **Video / animation:** see the "Video" section of `brand-spec.md` (render frames from HTML, slow fades, stars twinkling, symbol reveal; assemble with ffmpeg).
- **PowerPoint / Canva / Figma:** apply the same tokens manually; embed the logo PNGs; set fonts to Assistant/Heebo.

## When the request conflicts with the brand

If the user asks for something off-brand (e.g. a red accent, a photo background), do it if they insist, but say once in one line which rule it breaks. Don't silently "fix" their request, and don't silently break the brand either.
