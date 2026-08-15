import type { PixelPalette } from './pixel-art'

/* ======================================================================
   Sprites

   Characters:
     o  outline   ·  1  body   ·  2  shade   ·  3  accent   ·  .  transparent

   Everything is outlined. Without an edge, a pale cloud on a pale sky has
   nothing to read against — which is exactly why the first pass looked fine
   in dark mode and washed out in light mode.

   Cloud silhouettes are generated from unions of circles rather than drawn
   by hand, so they curve properly instead of reading as stacked rectangles.
   ====================================================================== */

export const CLOUD_BIG = [
  '...................oooooooo.................',
  '.................oo11111111oo...............',
  '................o111111111111o..............',
  '...............o11111111111111o.............',
  '..........ooooo1111111111111111o............',
  '........oo1111111111111111111111ooo.........',
  '.......o111111111111111111111111111oo.......',
  '......o111111111111111111111111111111o......',
  '......o111111111111111111111111111111o......',
  '.....o11111111111111111111111111111111o.....',
  '...oo1111111111111111111111111111111111oo...',
  '..o11111111111111111111111111111111111111oo.',
  '.o1111111111111111111111111111111111111111o.',
  '.o1111111111111111111111111111111111111111o.',
  '.o1111111111111111111111111111111111111111o.',
  '.o1111111111111111111111111111111111111111o.',
  '.o1111111111111111111111111111111111111111o.',
  '.o2222222222222222222222222222222222222222o.',
  '.o2222222222222222222222222222222222222222o.',
  '.oooooooooooooooooooooooooooooooooooooooooo.',
] as const

export const CLOUD_MID = [
  '.............oooooooo...........',
  '............o11111111o..........',
  '...........o1111111111o.........',
  '......ooooo111111111111o........',
  '.....o111111111111111111ooo.....',
  '....o1111111111111111111111o....',
  '....o11111111111111111111111o...',
  '...o1111111111111111111111111o..',
  '...o11111111111111111111111111o.',
  '...o111111111111111111111111111o',
  '...o111111111111111111111111111o',
  '...o111111111111111111111111111o',
  '...o222222222222222222222222222o',
  '...o222222222222222222222222222o',
  '...ooooooooooooooooooooooooooooo',
] as const

export const CLOUD_SMALL = [
  '...........ooooo........',
  '.........oo11111oo......',
  '........o111111111o.....',
  '....oooo1111111111o.....',
  '...o111111111111111oo...',
  '...o11111111111111111o..',
  '...o11111111111111111o..',
  '...o11111111111111111o..',
  '...o11111111111111111o..',
  '...o22222222222222222o..',
  '...o22222222222222222o..',
  '...ooooooooooooooooooo..',
] as const

export const CLOUD_WISP = [
  '........oooo....',
  '.....ooo1111o...',
  '...oo11111111o..',
  '..o1111111111o..',
  '..o1111111111o..',
  '..o2222222222o..',
  '..o2222222222o..',
  '..oooooooooooo..',
] as const

/** The Nubitlan mark: a single crisp cloud, legible down to ~24px. */
export const LOGO_MARK = [
  '........oo......',
  '......oo11oo....',
  '.....o111111o...',
  '...oo11111111o..',
  '..o11111111111o.',
  '.o1111111111111o',
  '.o1111111111111o',
  '.o1111111111111o',
  '.o1111111111111o',
  '.o2222222222222o',
  '.ooooooooooooooo',
] as const

/* ------------------------------ Icons ------------------------------
   Drawn at 16x16 rather than the original 10x10: below about 14px a
   recognisable silhouette plus an outline simply does not fit.
   ------------------------------------------------------------------- */

/** Key — the tools section and the password generator. */
export const ICON_KEY = [
  '.....oooooo.....',
  '...ooo1111ooo...',
  '..oo11oooo11oo..',
  '..o11o....o11o..',
  '..o11o....o11o..',
  '..oo11oooo11oo..',
  '...ooo1111ooo...',
  '.....o1111o.....',
  '......o11o......',
  '......o11o......',
  '......o11o......',
  '......o11ooo....',
  '......o1111o....',
  '......o11ooo....',
  '......o111o.....',
  '.......ooo......',
] as const

/** Padlock — data protection. */
export const ICON_LOCK = [
  '......oooo......',
  '....oo1111oo....',
  '...o11oooo11o...',
  '...o1o....o1o...',
  '...o1o....o1o...',
  '..oooooooooooo..',
  '..o1111111111o..',
  '..o1111oo1111o..',
  '..o111oooo111o..',
  '..o111oooo111o..',
  '..o1111oo1111o..',
  '..o1111oo1111o..',
  '..o1111111111o..',
  '..o2222222222o..',
  '..oooooooooooo..',
] as const

/** Shield with a check — security. */
export const ICON_SHIELD = [
  '..oooooooooooo..',
  '..o1111111111o..',
  '..o1111111111o..',
  '..o1111111113o..',
  '..o1111111133o..',
  '..o1311111331o..',
  '..o1331113311o..',
  '..o1133133111o..',
  '..o1113331111o..',
  '..o1111311111o..',
  '..o1111111111o..',
  '..o1111111111o..',
  '..oo11111111oo..',
  '...oo111111oo...',
  '.....oo11oo.....',
  '.......oo.......',
] as const

/** Robot head — the AI security evaluation. */
export const ICON_ROBOT = [
  '.......oo.......',
  '.......oo.......',
  '..oooooooooooo..',
  '..o1111111111o..',
  '..o1oooooooo1o..',
  '..o1o33oo33o1o..',
  '..o1o33oo33o1o..',
  '..o1oooooooo1o..',
  '..o1111111111o..',
  '..o11oooooo11o..',
  '..o11o2222o11o..',
  '..o11oooooo11o..',
  '..o1111111111o..',
  '..oooooooooooo..',
  '...oo......oo...',
  '...oo......oo...',
] as const

/** Book — security training. Reads better than a mortarboard at this size. */
export const ICON_BOOK = [
  '..oooooooooooo..',
  '..o1111oo1111o..',
  '..o1221oo1221o..',
  '..o1111oo1111o..',
  '..o1221oo1221o..',
  '..o1111oo1111o..',
  '..o1221oo1221o..',
  '..o1111oo1111o..',
  '..o1221oo1221o..',
  '..o1111oo1111o..',
  '..o1221oo1221o..',
  '..o1111oo1111o..',
  '..o2222oo2222o..',
  '..oooooooooooo..',
] as const

/** Document with text lines — the blog. */
export const ICON_POST = [
  '..oooooooooooo..',
  '..o1111111111o..',
  '..o1222222221o..',
  '..o1111111111o..',
  '..o1222222221o..',
  '..o1111111111o..',
  '..o1222222221o..',
  '..o1111111111o..',
  '..o1222221111o..',
  '..o1111111111o..',
  '..o1222222221o..',
  '..o1111111111o..',
  '..oooooooooooo..',
] as const

/** Warning triangle — the risk section. */
export const ICON_WARN = [
  '.......oo.......',
  '......o11o......',
  '......o11o......',
  '.....o1111o.....',
  '.....o1oo1o.....',
  '....o11oo11o....',
  '....o11oo11o....',
  '...o111oo111o...',
  '...o111oo111o...',
  '..o1111111111o..',
  '..o1111oo1111o..',
  '.o11111oo11111o.',
  '.o111111111111o.',
  'oo111111111111oo',
  'oooooooooooooooo',
] as const

/* ============================ Palettes ============================
   Driven by CSS custom properties so a sprite recolours with the theme
   instead of needing a separate light and dark copy.
   ================================================================== */

export const cloudPalette: PixelPalette = {
  o: 'var(--cloud-outline)',
  '1': 'var(--cloud-body)',
  '2': 'var(--cloud-shade)',
}

export const iconPalette: PixelPalette = {
  o: 'var(--icon-outline)',
  '1': 'var(--icon-body)',
  '2': 'var(--icon-shade)',
  '3': 'var(--icon-accent)',
}

/** Brand-blue variant of the cloud palette, for the logo mark. */
export const logoPalette: PixelPalette = {
  o: 'var(--logo-outline)',
  '1': 'var(--logo-body)',
  '2': 'var(--logo-shade)',
}
