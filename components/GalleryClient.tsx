"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Pic from "./Pic";
import { Close, Arrow } from "./Icons";
import { cn } from "@/lib/utils";

type Item = { src: string; alt: string; zone: string; exists: boolean };

/** Filter tabs + lightbox. Thumbnails use small `sizes`; the lightbox requests a full-width, quality-90 rendition. */
export default function GalleryClient({ items, zones }: { items: Item[]; zones: string[] }) {
  const [zone, setZone] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const shown = zone === "All" ? items : items.filter((i) => i.zone === zone);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open, step]);

  const current = open !== null ? shown[open] : null;

  return (
    <>
      <div role="tablist" aria-label="Facility zones" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {["All", ...zones].map((z) => (
          <button key={z} role="tab" aria-selected={zone === z} onClick={() => { setZone(z); setOpen(null); }}
            className={cn("min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors",
              zone === z ? "border-accent bg-accent text-accent-contrast" : "border-line text-muted hover:border-accent hover:text-accent")}>
            {z}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((it, i) => (
          <li key={it.src}>
            <Reveal dir={i % 2 === 0 ? "left" : "right"} delay={(i % 3) * 70}>
            <button onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}
              className="group card relative block aspect-[4/3] w-full overflow-hidden text-left" aria-label={`Open photo: ${it.alt}`}>
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                <Pic src={it.src} alt={it.alt} exists={it.exists} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" quality={85} />
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-bg/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">{it.zone}</span>
            </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 p-3 sm:p-8" onClick={() => setOpen(null)}>
          <div className="relative h-[80svh] w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
            <Pic src={current.src} alt={current.alt} exists={current.exists} sizes="100vw" quality={90} fit="contain" />
          </div>
          <button ref={closeRef} onClick={() => setOpen(null)} aria-label="Close" className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-surface text-fg hover:text-accent sm:right-6 sm:top-6"><Close /></button>
          {shown.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-surface hover:text-accent"><Arrow /></button>
              <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-surface hover:text-accent"><Arrow /></button>
            </>
          )}
        </div>
      )}
    </>
  );
}
