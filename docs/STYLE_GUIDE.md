# Nubitlan style guide

How nubitlan.com looks and how to build a page that matches it. The home page
(`src/pages/LandingPage.tsx`) is the reference: when in doubt, copy what it
does. Design tokens live in `src/index.css`; change them there, never inline.

> The older specs in `.kiro/specs/` and parts of `docs/accessibility-*.md`
> describe a Bootstrap 5 design. The site no longer uses Bootstrap; this
> document replaces them for anything visual.

## Look and feel: "clouds & light blue"

A pale daytime sky with 8-bit accents. Soft, rounded surfaces for content;
hard-edged "pixel" details (buttons, badges, icons) for brand character. Dark
mode is the same sky at night.

## Color

All colors are oklch tokens in `src/index.css` (`:root` and `.dark`).

| Token | Light | Use |
| --- | --- | --- |
| `--sky-50` … `--sky-950` | `#f1fbff` … `#052542` | Brand ramp (Tailwind `sky-*`) |
| `--primary` | sky-700 `#0069b6` | Buttons, links, icons, eyebrows |
| `--background` | `#fafdff` | Page |
| `--foreground` | `#102030` | Headings and body |
| `--muted-foreground` | `#586979` | Secondary text, descriptions |
| `--destructive` | red | Risk and warning accents only |
| `--sky-wash` | sky-400 → background gradient | Behind heroes (`.sky-wash`) |

Rules:

- **Contrast: WCAG AA (4.5:1) for all text.** That is why `--primary` is
  sky-700, not sky-600: sky-600 against white is only 3.8:1, both as text and
  as a button with white text. Don't use sky-500 or lighter for text.
- Highlight one key phrase in a hero headline with `.text-sky-gradient`
  (sky-800 → sky-600; lighter in dark mode). Use it once per heading at most.
- Tinted bands: `bg-sky-50 dark:bg-sky-950/60` with `border-y border-border`.
- Risk cards: `border-destructive/15`, icon chip `bg-destructive/10 text-destructive`.

## Typography

| Font | Token | Use |
| --- | --- | --- |
| Inter Variable | `font-sans` (default) | Everything |
| JetBrains Mono Variable | `font-mono`, `.eyebrow` | Eyebrows, small labels, step numbers |
| Silkscreen | `font-pixel` | Rare pixel display text (404, stats) |

All fonts are self-hosted with Fontsource. Do not load Google Fonts.

- Hero H1: `text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-balance`
- Section H2: `text-3xl sm:text-4xl font-extrabold tracking-tight text-balance`
- Card H3: `font-semibold` (`text-lg` in larger cards)
- Lead text: `text-lg sm:text-xl text-foreground/80` (hero), `text-lg text-muted-foreground` (sections)
- Body in cards: `text-sm leading-relaxed text-muted-foreground`
- Eyebrow: `<p className="eyebrow text-primary">`, mono, uppercase, tracked

## Page anatomy

Build marketing pages from these blocks, in this order where they apply.

1. **Hero:** `PixelSky` (sky wash + WebGL clouds), centered,
   `min-h-[calc(100vh-4rem)]` on the home page. Inside: a `Badge variant="pixel" size="lg"`
   with a `PixelIcon`, the H1 with one gradient phrase, lead text, two `size="xl"`
   buttons (`pixel` primary, `pixelOutline` secondary), a muted one-line note,
   and a bobbing `ChevronDownIcon` scroll cue. Interior pages use the compact
   `PageHeader` instead.
2. **Section intro:** `SectionHeading` (`src/components/SectionHeading.tsx`):
   optional pixel icon, eyebrow, H2, description. Centered, `max-w-2xl`.
3. **Sections:** `py-20 sm:py-24`, content in `mx-auto max-w-6xl px-4 sm:px-6`,
   grids with `mt-12 gap-4…6` and the `stagger` class for the entrance.
4. **Cards:**
   - Standard: `Card` + `CardContent className="p-6"` / `p-7`, `rounded-xl`,
     hover `hover:-translate-y-1 hover:shadow-lg`.
   - Feature tile on a tinted band: `bg-card rounded-xl border p-6` with a
     `bg-primary text-primary-foreground size-10 rounded-lg` icon square.
   - Link card (services, next steps): whole card is the link, pixel icon
     `size-11 text-primary`, title, description, then a
     `text-primary font-semibold` "… →" line; hover lifts and shows `border-sky-300`.
   - Emphasis card (forms, key offer, used on service pages):
     `border-2 border-foreground shadow-[8px_8px_0_0_var(--sky-400)]`.
5. **Contact band:** a second `PixelSky` with `border-y`, `Badge` "Contacto",
   H2, lead, `xl` buttons for email (`mailto:`) and LinkedIn, the address below.
6. Footer and navbar come from `SiteLayout`; never re-implement them.

## Buttons

`Button` from `src/components/ui/button.tsx` (variants in `button-variants.ts`).

- `pixel`: the primary call to action. Square, 2px border, offset shadow that
  collapses on press.
- `pixelOutline`: secondary action next to a `pixel` button.
- `default` / `outline` / `ghost`: small UI controls, not marketing CTAs.
- Sizes: `xl` in heroes and contact bands, `lg` in page headers, `default` in cards.

## Icons

- **Brand and feature icons:** pixelarticons through `<PixelIcon name="…" />`
  (see the README for adding one). Color follows `currentColor`, usually `text-primary`.
- **Small UI affordances:** `lucide-react` (arrows, chevrons, menu, external
  link, LinkedIn). Never use lucide for feature icons on marketing pages.

## Motion

- `stagger` on grids: children rise in sequence.
- `animate-bob` / inline `bob` for the scroll cue.
- Hover: small lift (`-translate-y-1`) plus shadow.
- `prefers-reduced-motion` disables all of it (handled in `index.css`).
- Don't animate the hero headline on mobile-first pages: it delays the
  largest contentful paint.

## Mobile-first pages (QR codes)

Pages opened from printed QR codes (`/escuelas`, `/isp`, `/empresas`) follow
the same anatomy with three changes, so they load fast on a mid-range Android
over mobile data:

- `PixelSky mobileLite`: phones get static pixel clouds; the WebGL sky (three.js)
  only starts on screens ≥ 768px.
- No `stagger` in the hero.
- Their HTML is prerendered at build time (`routePreloads` in `src/lib/seo.ts`).

## Voice

Spanish (El Salvador). The home page and most of the site use "tú"; the flyer
landing pages use formal "usted" for schools, ISPs and businesses. Keep one
register per page.

## Dark mode

Every token has a `.dark` value; use tokens and `dark:` variants, never fixed
hex colors. Check every new page in both themes.
