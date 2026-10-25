import widths from "../data/image-widths.json";

/** next/image loader for the static (GitHub Pages) build: picks the smallest pre-generated WebP that is wide enough. */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const key = base && src.startsWith(base) ? src.slice(base.length) : src;
  const list = (widths as Record<string, number[]>)[key];
  if (!list) return src; // e.g. SVG or an image not run through import-assets
  const w = list.find((x) => x >= width) ?? list[list.length - 1];
  return `${base}${key.replace(/\.jpe?g$/i, `-${w}.webp`)}`;
}
