"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Slide/fade in once when scrolled into view. CSS in globals.css disables it for reduced-motion. */
export default function Reveal({ dir = "up", delay = 0, className, children }: {
  dir?: "left" | "right" | "up";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.disconnect(); } }),
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-dir={dir} style={{ transitionDelay: `${delay}ms` }} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
