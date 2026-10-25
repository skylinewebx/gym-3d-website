/** Prefix for GitHub Pages project sites (set in next.config.mjs). Empty in dev. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path (/images/x.jpg) with the base path. Absolute URLs pass through. */
export const withBase = (p: string) => (p.startsWith("/") ? `${BASE_PATH}${p}` : p);
