/**
 * Resolves a file in `public/` against the app's base URL.
 *
 * A bare `/quiz-config.yaml` only resolves when the site is served from the
 * domain root. PR previews are published to a subdirectory
 * (`/<repo>/pr-42/`), so public assets have to be prefixed with Vite's
 * `BASE_URL` instead of assuming the root. In production `BASE_URL` is `/`
 * and this is a no-op.
 *
 * Vite rewrites asset URLs it finds in `index.html` and in imported modules
 * automatically — this helper is for the paths it cannot see, namely runtime
 * `fetch` calls and image `src` values built from data.
 */
export function asset(path: string): string {
  // import.meta.env.BASE_URL always ends with a slash.
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/**
 * The base path without its trailing slash, for React Router's `basename`.
 * Empty string when the app is served from the root.
 */
export const routerBasename = import.meta.env.BASE_URL.replace(/\/+$/, '')
