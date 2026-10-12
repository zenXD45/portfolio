# DESIGN.md — Hybrid: soft-touch + glass + minimal + liquid glass

Design read: near-white air, oversized Sora type, monochrome ink accent (no chroma), frosted glass punctuation, refined soft-touch (neumorphic) tiles and pressed grooves — with a liquid-glaze page transition. Built against the surface brief at `.impeccable/surfaces/src-app-jsx.md` and `PRODUCT.md`. Inspiration: Auraz (glaze sweep), glassFolio (frosted panels, social rail).

## Tokens (`src/index.css`, Tailwind v4 `@theme`)

| Token | Value | Role |
|---|---|---|
| `bg` | `#f5f6f8` | Page ground — near-white, cool |
| `ink` | `#17191e` | Headings + primary text |
| `muted` | `#5c6370` | Body copy |
| `faint` | `#626a78` | Labels, chips, metadata (≥4.9:1 on bg and chip tint) |
| `line` | `rgba(23,25,30,0.08)` | Hairline borders |
| `accent` | `#17191e` | Ink accent — buttons, progress fills, dots, ping (monochrome) |
| `accent-deep` | `#000000` | Accent as text (org names, asterisks, hover states) |
| `shadow-soft/-soft-sm/-soft-in` | dual low-contrast shadows (`#aec0cd` / white) | Soft-touch raised / pressed |

## Surfaces

- **Glass** (`.glass`): white 135° gradient 72%→42%, `backdrop-blur(22px) saturate(1.6)`, inset specular highlights, soft dual shadow. Punctuation only: nav pill, hero Now card + secondary button, mobile menu, social rail circles, contact card. `.glass-soft` is the lighter button variant.
- **Slab** (`.slab`): frosted glass sitting on the page with soft-touch shadow; hover lifts 2px with deeper shadow (pointer-fine gated). Project cards, skills cards.
- **Neu-raise** (`.neu-raise`): refined soft-touch tile (145° `#f8f9fb→#eef1f5` + `shadow-soft`). About stat tiles, journey dots.
- **Chip** (`.chip`): pressed inset-soft pill, mono; hover tints a neutral gray with soft inset. Skill chips.
- **Track-press** (`.track-press`): pressed groove; scroll progress tracks (nav bar, projects, journey, Now card).
- **Card** (`.card`): flat white/75 + 1px hairline + micro shadow; hover lifts 2px. Minimal fallback surface.
- **No aurora, no decorative color gradients** — light and material carry the page. Only material-neutral gradients remain (white glass fills, black button, neutral glaze).
- **Liquid sheen**: `.btn-primary` / `.glass-btn` carry a skewed white gradient sweep (`::after`) that crosses on hover.

## Buttons

- Primary: black 180° gradient, white text, inner top highlight, dark drop shadow; hover lifts + sheen; active scale(0.97).
- Secondary: glass pill (`.glass-btn .glass-soft`) with hairline white ring.
- No bordered buttons anywhere.

## Type

- **Sora** (self-hosted variable 300–800) for everything human; hero H1 `clamp(3.6rem, 11vw, 7.8rem)` weight 800, two-line masked reveal, tracking tight.
- **JetBrains Mono** 400/500 for `.label` (11px / 0.22em / uppercase), dates, stats, chips, footer meta.

## Sections

- **Nav**: floating glass pill (max-w 1080), monogram PM all-ink, track-press progress line at pill bottom; active-section white pill (IntersectionObserver); hides on scroll-down, returns on scroll-up; mobile menu is a glass panel; links use the glaze transition.
- **SocialRail**: fixed right (xl+), three glass circles (GitHub, LinkedIn, Mail).
- **Hero**: meta row (ping dot + "Open to internships", mono location + coordinates), two-line masked Sora H1, 16px accent rule (scaleX draw), text-balanced sub, primary + glass CTAs, glass **Now card** (Building / Focus / Based rows + track-press progress; GSAP float yoyo 2.8s + quickTo pointer tilt, perspective 1000px, `pointer:fine` gated), mono SCROLL cue with animated gradient tick. **No 3D, no aurora.**
- **Marquee**: hairline-bordered band, mono faint items, ink asterisks; timeScale pause on hover.
- **About**: neu-raise stat tiles under hairline.
- **Projects**: pinned horizontal scroll (scrubbed track-press progress); slab cards, ink-dot highlights; vertical stack under reduced motion.
- **Journey**: 5px track-press groove + scrubbed ink fill; neu-raise dots with ink centers; org = accent-deep.
- **Skills**: 4 slab cards, mono group labels with ink dot, pressed chips.
- **Contact**: glass card on clean ground (no aurora); black primary + glass socials; hairline footer ("React · GSAP · Tailwind").

## Motion

GSAP: hero line-mask stagger (0.12s), nav drop-in on load (header y −40 → 0), SplitText section reveals, projects pin+scrub, journey line scrub, marquee loop, nav hide/show, Now card float + tilt, glaze page transition (`src/lib/glaze.js`: sweep-in 0.45s power3.inOut → instant scroll under cover → sweep-out 0.55s).

Interactions (pointer-fine + reduced-motion gated):
- **Cursor**: single custom SVG arrow (ink `#17191e` fill, white hairline stroke so it reads on the black buttons) on `html`/`body` and interactive elements with native fallbacks; no JS cursor layer (removed), touch unaffected.
- **Magnetic buttons** (`useMagnetic`): View work / Get in touch / View GitHub / Email me pull toward the pointer (0.34–0.38 factor, scale 1.03), elastic snap-back on leave, press scale 0.96 — press feedback handled in GSAP since inline transforms own the element.
- **Tilt + spotlight** (`data-tilt`, `src/lib/tilt.js`): project/skills/contact cards and About stat tiles rotate ≤6° toward the pointer (CSS vars + 0.3s ease-out-quint) with a pointer-following white specular `radial-gradient` (`mix-blend-mode: overlay`); GSAP reveals on those cards end with `clearProps` so the CSS transform isn't shadowed by leftover inline styles.
- **Velocity marquee**: scroll delta feeds the loop's `timeScale` (clamped −2…5, smoothed per frame, decays to 1) — fling down to sprint, scroll up to reverse; hover still pauses.

CSS: ping pulse, sheen sweeps, button press, slab hover lift, scroll-cue tick — all `prefers-reduced-motion` guarded (glaze sheet display:none, cue/ping frozen, tilt transform/spotlight disabled, cursor unmounts).

## Accessibility

Every text pairing ≥4.5:1 (faint re-tuned after Lighthouse caught 4.38); focus ring 2px accent-deep offset 3px; keyboard nav; Lighthouse snapshot mobile 100/100/100/100 (a11y/BP/SEO/agentic).
