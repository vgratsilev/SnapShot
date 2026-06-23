/**
 * Environment configuration.
 *
 * Vite exposes `import.meta.env` for env vars prefixed with `VITE_`. The shape
 * is augmented in `src/vite-env.d.ts`.
 */
export const FLICKR_API_KEY: string = import.meta.env.VITE_FLICKR_API_KEY ?? "";
