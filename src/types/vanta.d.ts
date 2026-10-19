/** Minimal typings for the parts of Vanta.js we use (it ships none). */
declare module 'vanta/src/vanta.clouds.js' {
  export interface VantaEffect {
    setOptions(options: Record<string, unknown>): void
    resize(): void
    destroy(): void
    /** Id of the pending animation frame. */
    req?: number
  }

  const CLOUDS: (options: Record<string, unknown>) => VantaEffect
  export default CLOUDS
}
