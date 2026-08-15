import { WORDS, BITS_PER_WORD } from './wordlist'

/**
 * Password and passphrase generation.
 *
 * Every random choice comes from `crypto.getRandomValues`. `Math.random` is
 * never used here: it is seeded predictably and is not safe for secrets.
 */

export const CHARSETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/',
} as const

export type CharsetKey = keyof typeof CHARSETS

/** Glyphs that are easy to confuse when read aloud or retyped from paper. */
const AMBIGUOUS = new Set('Il1|O0oB8S5Z2G6'.split(''))

/**
 * Uniform random integer in [0, maxExclusive).
 *
 * Uses rejection sampling rather than `% maxExclusive`. Plain modulo skews the
 * distribution toward low values whenever the range does not divide evenly
 * into 2^32, which measurably weakens generated secrets.
 */
export function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 0) throw new RangeError('maxExclusive must be positive')

  const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive
  const buffer = new Uint32Array(1)

  let value: number
  do {
    crypto.getRandomValues(buffer)
    value = buffer[0]
  } while (value >= limit)

  return value % maxExclusive
}

/** Fisher-Yates shuffle driven by the same unbiased source. */
function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export interface PasswordOptions {
  length: number
  lowercase: boolean
  uppercase: boolean
  digits: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

/** The alphabet a given set of options actually draws from. */
export function buildAlphabet(options: PasswordOptions): string {
  const enabled: CharsetKey[] = []
  if (options.lowercase) enabled.push('lowercase')
  if (options.uppercase) enabled.push('uppercase')
  if (options.digits) enabled.push('digits')
  if (options.symbols) enabled.push('symbols')

  let alphabet = enabled.map((key) => CHARSETS[key]).join('')

  if (options.excludeAmbiguous) {
    alphabet = [...alphabet].filter((char) => !AMBIGUOUS.has(char)).join('')
  }

  return alphabet
}

/**
 * Generates a password containing at least one character from every enabled
 * class. One character is drawn per class first, the remainder is filled from
 * the full alphabet, then the whole thing is shuffled so the guaranteed
 * characters do not always land in the same positions.
 */
export function generatePassword(options: PasswordOptions): string {
  const alphabet = buildAlphabet(options)
  if (alphabet.length === 0) return ''

  const pools: string[] = []
  const add = (enabled: boolean, set: string) => {
    if (!enabled) return
    const pool = options.excludeAmbiguous
      ? [...set].filter((c) => !AMBIGUOUS.has(c)).join('')
      : set
    if (pool.length > 0) pools.push(pool)
  }

  add(options.lowercase, CHARSETS.lowercase)
  add(options.uppercase, CHARSETS.uppercase)
  add(options.digits, CHARSETS.digits)
  add(options.symbols, CHARSETS.symbols)

  const chars: string[] = []

  // One guaranteed character per class, but never more than the total length.
  for (const pool of pools.slice(0, options.length)) {
    chars.push(pool[randomInt(pool.length)])
  }

  while (chars.length < options.length) {
    chars.push(alphabet[randomInt(alphabet.length)])
  }

  return shuffle(chars).join('')
}

export interface PassphraseOptions {
  wordCount: number
  separator: string
  capitalize: boolean
  includeNumber: boolean
}

/**
 * Generates a diceware-style passphrase. Words are drawn independently (with
 * replacement), which is what the entropy calculation assumes.
 */
export function generatePassphrase(options: PassphraseOptions): string {
  const words: string[] = []

  for (let i = 0; i < options.wordCount; i++) {
    const word = WORDS[randomInt(WORDS.length)]
    words.push(
      options.capitalize ? word[0].toUpperCase() + word.slice(1) : word
    )
  }

  // A digit appended to one random word, so its position is not predictable.
  if (options.includeNumber && words.length > 0) {
    const target = randomInt(words.length)
    words[target] = `${words[target]}${randomInt(10)}`
  }

  return words.join(options.separator)
}

/* ===================== Strength estimation ===================== */

export function passwordEntropy(options: PasswordOptions): number {
  const alphabet = buildAlphabet(options)
  if (alphabet.length <= 1) return 0
  return options.length * Math.log2(alphabet.length)
}

export function passphraseEntropy(options: PassphraseOptions): number {
  let bits = options.wordCount * BITS_PER_WORD
  // The digit adds log2(10) bits for the value and log2(wordCount) for which
  // word receives it — an attacker who knows the scheme still must guess both.
  if (options.includeNumber && options.wordCount > 0) {
    bits += Math.log2(10) + Math.log2(options.wordCount)
  }
  return bits
}

export interface Strength {
  label: string
  /** 0-4, used to fill the segmented meter. */
  score: 0 | 1 | 2 | 3 | 4
  tone: 'destructive' | 'warning' | 'success'
}

export function rateStrength(bits: number): Strength {
  if (bits < 40) return { label: 'Muy débil', score: 1, tone: 'destructive' }
  if (bits < 60) return { label: 'Débil', score: 2, tone: 'warning' }
  if (bits < 80) return { label: 'Fuerte', score: 3, tone: 'success' }
  return { label: 'Muy fuerte', score: 4, tone: 'success' }
}

/**
 * Human-readable time to exhaust the keyspace at a fixed guess rate.
 *
 * Assumes 1e12 guesses/second — an offline attack against a fast hash on
 * commodity GPUs. It is deliberately pessimistic: a password behind a properly
 * slow hash survives far longer than this suggests.
 */
const GUESSES_PER_SECOND = 1e12

export function crackTimeLabel(bits: number): string {
  if (bits <= 0) return '—'

  // Expected work is half the keyspace.
  const seconds = Math.pow(2, bits - 1) / GUESSES_PER_SECOND

  const UNITS: [number, string, string][] = [
    [1, 'segundo', 'segundos'],
    [60, 'minuto', 'minutos'],
    [3600, 'hora', 'horas'],
    [86400, 'día', 'días'],
    [2629800, 'mes', 'meses'],
    [31557600, 'año', 'años'],
  ]

  if (seconds < 1) return 'instantáneo'

  // Walk down from the largest unit that still yields a value >= 1.
  for (let i = UNITS.length - 1; i >= 0; i--) {
    const [size, singular, plural] = UNITS[i]
    const value = seconds / size

    if (value >= 1) {
      if (i === UNITS.length - 1 && value >= 1000) {
        return `${formatLargeNumber(value)} años`
      }
      const rounded = Math.round(value)
      return `${rounded} ${rounded === 1 ? singular : plural}`
    }
  }

  return 'instantáneo'
}

function formatLargeNumber(value: number): string {
  const SCALES: [number, string][] = [
    [1e15, 'mil billones de'],
    [1e12, 'billones de'],
    [1e9, 'mil millones de'],
    [1e6, 'millones de'],
    [1e3, 'mil'],
  ]

  for (const [size, label] of SCALES) {
    if (value >= size) {
      // Past a quadrillion the exact figure stops being meaningful.
      if (size === 1e15 && value / size >= 1000) return 'más de mil billones de'
      return `${Math.round(value / size)} ${label}`
    }
  }

  return `${Math.round(value)}`
}
