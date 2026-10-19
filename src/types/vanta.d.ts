/** Minimal typings for the parts of Vanta.js we use (it ships none). */
declare module 'vanta/src/vanta.clouds.js' {
  export interface VantaEffect {
    setOptions(options: Record<string, unknown>): void
    resize(): void
    destroy(): void
    /** Id of the pending animation frame. */
    req?: number
    /** Called right before each frame renders. */
    onUpdate?: () => void
    renderer?: import('three').WebGLRenderer
    scene?: import('three').Scene
    camera?: import('three').Camera
    uniforms?: Record<string, { value: import('three').Vector2 }>
  }

  const CLOUDS: (options: Record<string, unknown>) => VantaEffect
  export default CLOUDS
}

declare module 'vanta/src/vanta.clouds2.js' {
  import type { VantaEffect } from 'vanta/src/vanta.clouds.js'
  const CLOUDS2: (options: Record<string, unknown>) => VantaEffect
  export default CLOUDS2
}
