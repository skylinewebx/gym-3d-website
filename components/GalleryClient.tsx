"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Pic from "./Pic";
import Reveal from "./Reveal";
import { Close, Arrow, Diamond } from "./Icons";
import { withBase } from "@/lib/base";
import { cn } from "@/lib/utils";

type Item = { src: string; alt: string; zone: string; title: string; desc: string; fact: string; exists: boolean };

const short = (z: string) => z.replace(" Zone", "").replace("Dumbbells / Free Weights", "Dumbbells").replace(" Area", "").replace("Locker/Changing", "Locker");

/**
 * Desktop grid is 4 columns: the featured tile takes 2x2 and 4 tiles sit beside it.
 * Tiles below that block are widened so the last row never ends with a gap.
 */
function tileSpan(i: number, total: number) {
  const tiles = total - 1;
  if (i === 0 || tiles <= 4) return "";
  const below = tiles - 4;
  const last = below % 4; // items on the final row (0 = full row)
  if (last === 0) return "";
  const lastRowStart = tiles - last; // tile index (1-based) before the final row
  if (i <= lastRowStart) return "";
  if (last === 1) return "lg:col-span-4";
  if (last === 2) return "lg:col-span-2";
  return i === tiles ? "lg:col-span-2" : ""; // last === 3
}

/** Featured + tiles gallery with filter tabs and a lightbox (arrows, keyboard, swipe). */
export default function GalleryClient({ items, zones }: { items: Item[]; zones: string[] }) {
  const [zone, setZone] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const shown = zone === "All" ? items : items.filter((i) => i.zone === zone);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        // keep keyboard focus inside the dialog
        const f = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!f?.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open === null, step]); // eslint-disable-line react-hooks/exhaustive-deps

  // Warm the cache for neighbouring photos so next/previous feels instant.
  useEffect(() => {
    if (open === null || shown.length < 2) return;
    [1, -1].forEach((d) => {
      const n = shown[(open + d + shown.length) % shown.length];
      if (n.exists) new window.Image().src = withBase(n.src);
    });
  }, [open, shown]);

  const current = open !== null ? shown[open] : null;
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <>
      <div role="tablist" aria-label="Facility zones" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {["All", ...zones].map((z) => (
          <button key={z} role="tab" aria-selected={zone === z} onClick={() => { setZone(z); setOpen(null); }}
            className={cn("min-h-[44px] shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors",
              zone === z ? "border-accent bg-accent text-accent-contrast" : "border-line text-muted hover:border-accent hover:text-accent")}>
            {z === "All" ? "All" : short(z)}
          </button>
        ))}
      </div>

      <ul key={zone} className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {shown.map((it, i) => {
          const feat = i === 0;
          return (
            <li key={it.src} className={cn(
              feat && "sm:col-span-2 lg:row-span-2",
              feat && (shown.length === 1 ? "lg:col-span-4" : "lg:col-span-2"),
              tileSpan(i, shown.length),
            )}>
              <Reveal dir={i % 2 === 0 ? "left" : "right"} delay={(i % 3) * 60} className="h-full">
                <button onClick={(e) => { lastFocus.current = e.currentTarget; setOpen(i); }}
                  className={cn("group card grade relative block w-full overflow-hidden text-left", feat ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[28rem]" : "aspect-[4/3]")}
                  aria-haspopup="dialog">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Pic src={it.src} alt={it.alt} exists={it.exists} sizes={feat ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"} quality={feat ? 90 : 85} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-bg/95 via-bg/60 to-transparent p-4 pt-14 sm:p-5 sm:pt-16">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-contrast"><Diamond className="!h-2.5 !w-2.5" />{it.fact}</span>
                    <h3 className={cn("mt-2", feat ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl")}>{it.title}</h3>
                    {(feat || shown.length < 4) && <p className="mt-1 max-w-md text-sm text-muted">{it.desc}</p>}
                  </div>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {current && (
        <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={current.title}
          className="fixed inset-0 z-[60] flex flex-col bg-bg/95 p-3 sm:p-8"
          onClick={() => setOpen(null)} onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }} onTouchEnd={onTouchEnd}>
          <div className="flex items-center justify-between pb-3 text-sm text-muted" onClick={(e) => e.stopPropagation()}>
            <span>{(open ?? 0) + 1} / {shown.length}</span>
            <button onClick={() => setOpen(null)} aria-label="Close" className="grid h-12 w-12 place-items-center rounded-full bg-surface text-fg hover:text-accent"><Close /></button>
          </div>
          <div className="relative min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
            <Pic src={current.src} alt={current.alt} exists={current.exists} sizes="100vw" quality={90} fit="contain" />
            {shown.length > 1 && (
              <>
                <button onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-1 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-bg/70 text-fg hover:text-accent sm:left-3"><Arrow /></button>
                <button onClick={() => step(1)} aria-label="Next photo" className="absolute right-1 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-bg/70 text-fg hover:text-accent sm:right-3"><Arrow /></button>
              </>
            )}
          </div>
          <div className="pt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl sm:text-3xl">{current.title}</h3>
            <p className="mx-auto mt-1 max-w-xl text-sm text-muted">{current.desc} <span className="text-accent">{current.fact}</span></p>
          </div>
        </div>
      )}
    </>
  );
}
