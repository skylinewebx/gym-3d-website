"use client";
import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Loads the admission form (and its validation library) only when the visitor scrolls near it,
 * or when a link/hash points at #join. Keeps the first load light.
 */
export default function LazyForm() {
  const ref = useRef<HTMLElement>(null);
  const [Form, setForm] = useState<ComponentType | null>(null);

  useEffect(() => {
    let done = false;
    const load = () => { if (done) return; done = true; import("./AdmissionForm").then((m) => setForm(() => m.default)); };
    const io = new IntersectionObserver((e) => e[0].isIntersecting && load(), { rootMargin: "900px 0px" });
    if (ref.current) io.observe(ref.current);
    const onHash = () => location.hash === "#join" && load();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", (ev) => (ev.target as Element).closest("[data-prefill]") && load(), { once: true, capture: true });
    onHash();
    return () => { io.disconnect(); window.removeEventListener("hashchange", onHash); };
  }, []);

  if (Form) return <Form />;
  // Placeholder keeps the page height stable (no layout shift) and the #join anchor valid.
  return <section ref={ref} id="join" aria-label="Admission form loading" className="section min-h-[60rem] border-t border-line lg:min-h-[48rem]" />;
}
