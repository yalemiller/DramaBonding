# Handoff: Drama Bonding — Podcast Website (Desktop + Mobile)

## Overview
Marketing and listening site for **Drama Bonding**, a D&D actual-play podcast. Episodes are organised into **Books** (seasons). Visual direction: restrained Mucha / art-nouveau. Greens and golds on light parchment, gold filigree saved for key moments (section headers, cast names, frames).

Sections, in page order: **Header → Hero → The Books (spine shelf → two-page spread) → The Cast → About → Listen → Footer**, plus a **persistent audio player bar** that appears once an episode is playing.

## About the Design Files
The files in this bundle are **design references built in HTML**. They're prototypes that show the intended look and behaviour, not production code to copy. Your job is to **recreate these designs in the target codebase's environment** (React/Next, Astro, Vue, etc.) using its own patterns. If no codebase exists yet, pick a suitable stack. A static-first framework (Astro or Next.js with SSG) plus a small client island for the shelf/player is a good fit. Episode data should eventually come from the podcast RSS feed.

The `.dc.html` files are self-contained "Design Component" prototypes. Open them in a browser with `support.js` next to them. Markup is inline-styled. All data and interaction logic is in the `<script data-dc-script>` block at the bottom of each file (`BOOKS`, `CAST`, `class Component`). `renderVals()` turns state into template values, so read it as the spec for derived state.

## Fidelity
**High-fidelity.** Colours, type, spacing, ornament and interactions are final. Recreate them pixel-accurately. The content is **placeholder**: episode titles, bios, cast names, dates, runtimes, and the photos for everyone except Alex Marlowe. Build it data-driven so real content drops in.

---

## Design Tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| parchment | `#f4efe2` | Page background, book pages, light text on green |
| parchment-deep | `#ece5d1` | Listen section bg |
| parchment-shade | `#e3dbc2` | Placeholder fills, row dividers, active play-button bg, hover on play buttons |
| rule-soft | `#d6cbb0` | Hairline after small section labels |
| ink | `#1b2e22` | Body text, footer bg, player bg, darkest spine |
| forest | `#24412f` | Cast section bg, primary buttons, outlines |
| forest-mid | `#335a41` | Cast photo placeholder bg |
| moss | `#3d5a48` | Book II spine |
| sage | `#4f7a57` | Eyebrow labels, link hover, Book III spine |
| sage-ink | `#4f6a56` | Secondary text (meta, pronouns on light) |
| body-ink | `#2a3d30` / `#33493a` | Blurb text / content-warning text |
| gold | `#b08a3e` | Rules, diamonds, frames on light bg |
| gold-ink | `#8a6a2c` | Roman numerals, "BOOK IV" labels, play-icon fill |
| gold-light | `#dcc289` | Gold on dark bg (spines, cast, player) |
| mint | `#cfe0c8` | Secondary text on green |
| sage-light | `#9cb99c` | Tertiary text in player |
| player-track | `#33493a` | Progress-bar track |
| upcoming dash | `#8a8a70` | Dashed circle for unreleased episodes |

Book spine colours: I `#24412f`, II `#3d5a48`, III `#4f7a57`, IV `#1b2e22`.

### Typography (Google Fonts)
- **Federo** 400 for display caps: wordmark, section headers ("THE BOOKS", "THE CAST", "BIOGRAPHY"), spine titles, book numerals. Always uppercase with letter-spacing `.1em–.2em`.
- **Cormorant Garamond** 400/500, roman + italic, for all reading text, titles (italic 500), blurbs, episode titles, bios.
- **Josefin Sans** 600 for small UI labels and buttons. Always uppercase, letter-spacing `.12em–.24em`.

Key desktop sizes:
- Hero H1: Cormorant italic 500, `clamp(44px,5vw,64px)/1`
- Book title in spread: italic 500 `clamp(26px,2.6vw,34px)`
- Episode title: 500 `clamp(19px,1.7vw,24px)/1.12`; Roman numeral italic 500 same size in gold-ink, 40px column, followed by a "."
- Blurb: 400 `clamp(16px,1.45vw,20px)/1.4`
- Bio paragraphs: 400 `18px/1.5`
- Cast name (bio panel): italic 500 `clamp(34px,3.6vw,46px)`
- Section header: Federo `22px` (Books/Listen), `30px` (Cast), letter-spacing `.14–.16em`
- Eyebrow: Josefin 600 `12px`, `.24em`, sage
- Small label in spread ("The tale", "Themes", "Contents", "Content warnings"): Josefin 600 `10px`, `.24em`, sage, followed by a flex-1 1px `#d6cbb0` rule
- Nav and buttons: Josefin 600 `12px`, `.2–.22em`

Mobile is about 2–4px smaller across the board (see file). Mobile tap targets are ≥44px.

### Spacing / layout
- Horizontal page padding: `clamp(20px,4vw,56px)` desktop, `18–22px` mobile
- Section vertical padding: 72–88px desktop, 32–44px mobile
- `text-wrap: balance` on headings, `pretty` on paragraphs

### Radius
- Pills (buttons): `999px`
- Arch frames (hero art, cast portrait): `999px 999px 8px 8px` outer / `999px 999px 4px 4px` inner
- Book-spread cast mini-portraits: `999px 999px 2px 2px`
- Mobile player: `16px`
- Everything else is square

### Ornament vocabulary (keep it sparse)
- **Double rule**: 5–6px-tall box with 1px top and bottom borders in gold. Used under the header, at the top and bottom of spines, and in the mobile menu.
- **Diamond**: 9×9 square rotated 45°, solid gold, beside section titles.
- **Section header**: `[1px rule flex-1] ◆ TITLE ◆ [1px rule flex-1]`
- **Filigree bar** (Cast header, under cast name, mobile CONTENTS): dot → rounded double rule → outlined diamond → ring with a solid diamond inside, mirrored with `scaleX(-1)`.
- **Triple frame** (via `box-shadow`): `0 0 0 1px gold, 0 0 0 8px parchment, 0 0 0 9px forest`. Used on the hero arch, cast bio panel, and mobile book panel.
- **Hero sunburst** (optional, `ornate` flag): repeating-conic gradient of gold rays at 16% opacity, masked radially, plus concentric 1px rings. In the prototype, `ornate` falls back to `true` when the prop is unset (`this.props.ornate ?? true`), while its Tweaks default is `false`. Treat it as a feature flag and confirm the default with design.

---

## Screens

### 1. Header (desktop, sticky)
- `position: sticky; top:0; z-index:20`, bg `rgba(244,239,226,.96)` + `backdrop-filter: blur(6px)`, padding `18px x 0`.
- Grid `1fr auto 1fr`, gap 20.
  - Left: nav links Episodes / Cast / About (anchor scroll).
  - Centre: wordmark "DRAMA BONDING" (Federo `clamp(20px,2.8vw,32px)`, `.14em`) over the tagline *"a tale told at the table, in books"* (Cormorant italic 14px, sage).
  - Right: "Listen" pill (1px forest border, padding 11×20; hover fills forest with parchment text).
- A gold double rule sits beneath.
- Anchor scroll offset is about 100–120px (`scroll-margin-top:110px`) to clear the sticky header.

### 2. Hero
- Grid `repeat(auto-fit,minmax(280px,1fr))`, gap 48, padding `72px x 88px`.
- **Left column**: eyebrow "Now unfolding · Book IV"; H1 *Thorns of the Gilded Court*; 20px blurb (max 340px); text link *"New here? Begin with Book I"* with a 1px gold underline. Clicking it opens Book I on the shelf and scrolls there.
- **Centre**: arch-framed key-art slot (aspect `3/4.2`, max 420px).
- **Right**: eyebrow "Latest · Episode N"; title (Federo 30px); meta "2 h 37 m · March 25, 2026" (italic 17px); "Play episode" pill (forest bg, gold-light CSS triangle). Clicking starts the player.

### 3. The Books — shelf + two-page spread (core interaction)
- Header: "THE BOOKS" section header.
- Shelf container: `display:flex; align-items:flex-end; gap:12px; height: clamp(740px, calc(100vh - 170px), 840px); padding-top:28px`.
- **Each book** is a flex item with `min-width:64px; overflow:hidden; background: spine colour`.
  - **Closed** (spine): `flex: 0 0 64px`. Heights are staggered for a hand-shelved look: I 88%, II 96%, III 82%, IV 92%.
    - Contents, top to bottom: gold double rule; 36px gold ring with the Roman numeral (Federo 14); vertical title (`writing-mode: vertical-rl`, Federo 16 uppercase, ellipsis); start year (Josefin 10, mint); gold double rule.
  - **Open**: `flex: 1 0 64px; height: 100%`. Only one book is open at a time. Default open is Book IV, the current one.
- **Transition**:
  - `flex-grow` and `height`: `.7s cubic-bezier(.65,0,.25,1)`.
  - Spine content opacity: `.3s ease`. It fades out immediately on open and fades back in with a `.35s` delay on close.
  - Spread content opacity: `.35s ease` with a `.4s` delay on open (so it appears after the book has widened) and 0s on close.
  - Pointer events are disabled on the hidden layer.
  - Clicking the already-open book does nothing.
- **Spread** (absolutely positioned, `min-width:520px`, padding 14 inside the spine colour, so the spine colour reads as the cover edge):
  - Grid `minmax(0,1fr) 28px minmax(0,1fr)`, parchment bg, `box-shadow:0 0 0 1px #dcc289`.
  - **Gutter (28px)**: horizontal gradient `rgba(27,46,34,.06) → rgba(176,138,62,.14) → rgba(27,46,34,.06)`. Centred in it is a 5px double vertical gold rule with a 10px gold diamond at its midpoint.
  - Each page gets an inner shadow toward the gutter: `inset ∓14px 0 16px -14px rgba(27,46,34,.3)`.
  - **Left page** (column, gap `clamp(10px,1.2vw,16px)`, padding `clamp(16px,2vw,30px) clamp(14px,2.2vw,30px)`):
    1. Centred block: "BOOK IV" (Federo 13, gold-ink, `.2em`); title; a 140px divider (rule, 10px gold ring, rule).
    2. **The tale**: blurb paragraph.
    3. **Themes**: wrapped list. Each theme is a 5px gold diamond plus italic 17px text, gap `6px 16px`.
    4. **Book cast**, vertically centred with `margin:auto 0`: a 4-column grid, gap 12. Each item has:
       - an arch portrait, max 84px wide, aspect `3/4`, 1px gold border plus 1px forest outline offset 2px;
       - the character name in italic 15px. The lead's character name is "Lead Storyteller";
       - the player name in Josefin 8.5px uppercase, followed by pronouns in Cormorant 12px.
       - The lead storyteller appears in every book. Cast count per book is 4 (1 lead + 3 players).
    5. **Content warnings**: italic 15px.
  - **Right page — Contents**: an episode row for every chapter in the book. Each row is flex with gap 12, padding `7px 0`, and a 1px `#e3dbc2` bottom border:
    - Roman numeral plus "."
    - Title (flex 1)
    - 36px round play button: 1px forest border. Hover bg `#e3dbc2`. When it's the current episode, bg `#e3dbc2` and a gold-ink pause icon (two 3×10 bars); otherwise a play triangle.
    - **Unreleased** episodes (Book IV has 9 planned, 6 out) get row opacity .5 and a 36px dashed-border circle instead of a button.
- The spread must fit fully in view without scrolling the page. That's the reason for the fixed shelf height and the absence of internal scroll.

### 4. The Cast (desktop)
- Section bg forest, padding `44px x`; filigree header "THE CAST" (Federo 30).
- Flex-wrap row, gap 40:
  - **Roster grid** (`flex:1 1 260px`): 3 columns, gap `12px 8px`, 11 members. Each tile has:
    - a square photo: 1px gold-light border, plus a 1px outline offset 3px that is gold-light when selected and transparent otherwise;
    - the name (Josefin 11 uppercase; gold-light when selected, parchment otherwise) and pronouns (Cormorant 14, mint).
    - Tile hover bg `rgba(220,194,137,.12)`; selected bg `rgba(220,194,137,.18)`. Clicking selects the member. Default selection is index 0 (Alex Marlowe).
  - **Bio panel** (`flex:2.4 1 520px`): parchment card with the triple frame `0 0 0 1px #dcc289, 0 0 0 8px #24412f, 0 0 0 9px #dcc289`, padding `28px clamp(20px,3vw,36px)`. Inner grid `repeat(auto-fit,minmax(min(320px,100%),1fr))`:
    - **Left**: large arch portrait (max 460px, aspect `3/4.2`, triple frame); name (italic 46px); filigree bar (max 280px); pronouns (Josefin 13).
    - **Right**: "BIOGRAPHY" header (Federo 22) + diamond + rule; then 3–4 bio paragraphs (18px/1.5, max 620px).
- **Dual-image photo system** (important):
  - Every cast member has two photos: **standard** and **fun**.
  - Both are stacked absolutely. The fun shot sits on top at `opacity:0` and switches to `opacity:1` on hover of the photo container. The switch is **instant, with no transition**.
  - In the roster, the **selected** member's tile shows the fun shot permanently.
  - All photos render with `filter: grayscale(1)`; the large portrait adds `contrast(1.05)`. Background position is `50% 20%`, cover.
  - Only Alex has real photos (`assets/cast/alex-default.png`, `alex-hover.png`). The prototype temporarily uses Alex's photos for everyone. Wire a per-member `{ photoStd, photoFun }` field instead.

### 5. About
- Max-width 1200, centred, 2-column auto-fit grid (min 300), gap 56, padding 88.
- **Left**: eyebrow "About the show"; H2 italic `clamp(36px,4vw,52px)`.
- **Right**: two 20px paragraphs, then a 48px gold rule + "EST. 2024" (Federo 14, gold-ink).

### 6. Listen
- Bg `#ece5d1`, gold top and bottom borders, centred.
- Section header "LISTEN"; tagline italic `clamp(30px,3.4vw,42px)`.
- Pill links: Spotify, Apple Podcasts, YouTube, Pocket Casts, RSS. Outline style, hover filled forest.

### 7. Footer
- Bg ink, flex space-between, wrap.
- Wordmark (Federo 20, parchment); *"Every tale ends. Ours just hasn't yet."* (italic 17, mint); "Back to top" (Josefin 11, gold-light).

### 8. Player bar (global)
- Hidden until something plays. When visible: `position:fixed; bottom:0`, bg ink, 1px gold top border. The page gains `padding-bottom:76px`.
- 3px progress bar: track `#33493a`, fill gold-light.
- Row contents:
  - 44px round play/pause button (gold-light border)
  - Eyebrow "Book IV · Episode 6" (Josefin 10, sage-light)
  - Title (italic 20, ellipsis)
  - Time "0:12:04 / 2:37:00" (Josefin 11)
  - Close "×" (44px), which stops playback and hides the bar
- Clicking play on the current episode toggles pause; on a different episode it switches and resets the position.
- The prototype fakes a 1s ticker. Use a real `<audio>` element with the RSS enclosure URL.

---

## Mobile (`Drama Bonding Mobile.dc.html`, 402×874 iOS frame)
Same tokens. The structural differences:
- **Header**: sticky, `padding:56px 18px 0` (clears the status bar). Wordmark plus tagline on the left, 44px hamburger (three 24×2 bars) on the right, gold double rule below.
- **Menu**: full-screen ink overlay. Wordmark plus gold "×". Numbered items (I The Books, II The Cast, III About, IV Listen) in italic 34px, each with a gold Federo numeral and a 1px `rgba(220,194,137,.3)` divider. Tagline pinned to the bottom. Tapping an item closes the menu, then smooth-scrolls (header offset about 112px).
- **Hero**: stacked layout. The arch art is 72% wide. The latest-episode card has a 52px play button inside a double frame (1px gold border, 1px forest outline offset 3).
- **Books**:
  - Four spines side by side (flex 1, max 82px, 250px tall, heights 88/100/82/94%) on a 3px gold shelf line, with the hint *"Tap a book to read inside"*.
  - Unselected spines sit at opacity .45. The selected one lifts with `translateY(-8px)`. Transitions are .35s.
  - **Below** the shelf, a single panel shows the selected book in the triple frame (outer ring in that book's spine colour). It's one column: title block → The tale → Themes → CONTENTS (filigree header) → episode rows (44px buttons) → Content warnings.
  - **No book-specific cast on mobile.**
  - **Switching books**: the panel fades to opacity 0 and shifts `translateY(8px)` over .3s. After 280ms the content swaps and it fades back in.
- **Cast**: 3-column grid. Tapping a member inserts an **inline bio panel spanning the full row directly after that member's row** (done with CSS `order`). Other tiles dim to .5 and the selected tile gets a gold ring. Tap again or "×" to close. The panel has the name, pronouns, BIOGRAPHY header and paragraphs. Photos aren't wired on mobile yet; apply the same dual-image system (with tap or long-press in place of hover).
- **Listen**: full-width stacked pills, 48px min-height.
- **Player**: a floating card 10px from the edges and 28px from the bottom, 16px radius, 1px gold border, shadow `0 10px 24px rgba(0,0,0,.25)`. Eyebrow format is "Book IV · 0:12 / 2:37".
- Breakpoint: switch to the mobile layout below about 720px. The desktop shelf needs 4×64px spines plus a 520px minimum spread.

---

## State
- `openBook` (index, default 3; desktop also keeps `spreadBook` for delayed content swap). Mobile: `pick` (spine highlight, immediate) and `open` (panel content, swaps after the fade).
- `selectedCast` (desktop default 0; mobile `null` = no panel open)
- `player`: `{ bookIdx, epIdx } | null`, `paused`, `position` (s)
- `menuOpen` (mobile)
- Cross-links: in the desktop code, cast items expose `openBook` / `appearances[].open`. These set the open book and scroll to #episodes but **aren't currently rendered** in the UI. They're optional for v1.

## Data model (suggested)
```ts
Book    { num: 'I'|'II'…, title, blurb, themes: string[], warnings: string, spineColor, startYear, status: 'complete'|'ongoing', totalPlanned?: number, episodes: Episode[] }
Episode { n, title, durationSec, releaseDate, audioUrl, released: boolean }
Cast    { name, pronouns, isLead, photoStd, photoFun, bio: string[], roles: { bookIdx, characterName }[] }
```
Cast can play different characters across books (e.g. Riley is Thistle in I and Kestrel in III). The lead storyteller has the role "Lead Storyteller" in every book. All placeholder content lives in the `BOOKS` and `CAST` constants of the desktop file.

## Assets
- `assets/cast/alex-default.png`, `alex-hover.png`: real photos (standard/fun) for Alex Marlowe.
- Everything else is a placeholder: hero / Book IV key art, the other 10 cast photo pairs, book cover or spine art, and the wordmark (currently Federo text). Commissioned Mucha-style flourishes are planned to replace the geometric CSS ornaments (diamonds, rings, filigree bars).
- No icon library is used. Play and pause icons are CSS shapes; swap in SVG if you prefer.

## Files
- `Drama Bonding Website v2.dc.html`: desktop reference (primary)
- `Drama Bonding Mobile.dc.html`: mobile reference (inside an iOS frame)
- `support.js`, `image-slot.js`, `ios-frame.jsx`: prototype runtime only, so you can open the files locally. Don't port them.
- `assets/cast/`: real photography
