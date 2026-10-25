"use client";
import { useEffect, useState } from "react";

type Tier = "720" | "1080" | "1440" | "2160";

/**
 * Looping muted hero video layered over a poster (the poster is rendered by the server parent as children).
 * Poster only when: reduced-motion, Save-Data, or a slow (<=3G) connection.
 * Tier is chosen by physical screen width so phones get the light 720p file.
 * Files come from scripts/optimize-media.sh: /video/hero-{720,1080,1440,2160}.{av1.mp4,webm,mp4}
 */
export default function HeroVideo({ enabled, poster }: { enabled: boolean; poster: React.ReactNode }) {
  const [tier, setTier] = useState<Tier | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = !!c && (c.saveData || ["slow-2g", "2g", "3g"].includes(c.effectiveType ?? ""));
    if (reduced || slow) return;
    const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
    setTier(window.innerWidth < 768 ? "720" : px >= 3000 ? "2160" : px >= 2000 ? "1440" : "1080");
  }, [enabled]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {poster}
      {tier && (
        <video
          key={tier}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay muted loop playsInline preload="metadata"
          onCanPlay={() => setReady(true)}
        >
          <source src={`/video/hero-${tier}.av1.mp4`} type='video/mp4; codecs="av01.0.08M.08"' />
          <source src={`/video/hero-${tier}.webm`} type='video/webm; codecs="vp9"' />
          <source src={`/video/hero-${tier}.mp4`} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/20 to-transparent" />
    </div>
  );
}
