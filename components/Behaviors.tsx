"use client";
import { useEffect } from "react";
import { sendPrefill, type Prefill } from "@/lib/prefill";

/**
 * One tiny client component for the whole site:
 *  - reveals `.reveal` elements once when they scroll into view (also those added later, e.g. gallery filters)
 *  - handles `data-prefill` clicks so "Choose Plan" / "Book Free Trial" can pre-fill the form
 */
export default function Behaviors() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io!.unobserve(e.target); }
        }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
      : null;
    const watch = (root: ParentNode) => root.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      io ? io.observe(el) : el.classList.add("is-in");
    });
    watch(document);
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
      if (n instanceof Element) { if (n.matches(".reveal")) watch(n.parentElement ?? document); watch(n); }
    })));
    mo.observe(document.body, { childList: true, subtree: true });

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-prefill]");
      if (el?.dataset.prefill) sendPrefill(JSON.parse(el.dataset.prefill) as Prefill);
    };
    document.addEventListener("click", onClick);
    return () => { io?.disconnect(); mo.disconnect(); document.removeEventListener("click", onClick); };
  }, []);
  return null;
}
