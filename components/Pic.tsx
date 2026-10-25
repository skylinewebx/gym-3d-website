import Image from "next/image";
import { cn } from "@/lib/utils";
import blurMap from "@/data/blur.json";

// Tiny dark blur placeholder shown while the real image decodes.
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PSc5Jz48cmVjdCB3aWR0aD0nMTYnIGhlaWdodD0nOScgZmlsbD0nIzEyMTQxYicvPjwvc3ZnPg==";

type Props = {
  src: string;
  alt: string;
  /** Pass has(src) from a server component. False renders a labelled placeholder. */
  exists: boolean;
  sizes: string;
  priority?: boolean;
  quality?: 75 | 85 | 90;
  className?: string;
  /** Tailwind object-position class for the focal point, e.g. "object-top". */
  focal?: string;
  fit?: "cover" | "contain";
};

/** Fills its (relative, sized) parent. Never upscales or stretches: object-fit cover. */
export default function Pic({ src, alt, exists, sizes, priority, quality = 90, className, focal = "object-center", fit = "cover" }: Props) {
  if (!exists) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("absolute inset-0 flex items-center justify-center bg-surface p-4 text-center", className)}
        style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(var(--border) / .35) 0 1px, transparent 1px 14px)" }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
          Placeholder
          <br />
          <span className="font-mono normal-case tracking-normal text-muted/80">{src}</span>
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder="blur"
      blurDataURL={(blurMap as Record<string, string>)[src] ?? BLUR}
      className={cn(fit === "cover" ? "object-cover" : "object-contain", focal, className)}
    />
  );
}
