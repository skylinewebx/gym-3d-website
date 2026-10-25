"use client";
import { useEffect, useState } from "react";
import { gym } from "@/data/gym.config";

function isOpenNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: gym.timezone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const mins = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  const [o, c] = gym.hours.open[day];
  const toM = (s: string) => Number(s.slice(0, 2)) * 60 + Number(s.slice(3));
  return mins >= toM(o) && mins < toM(c);
}

/** Live Open/Closed badge, computed in the gym's timezone after mount (avoids hydration mismatch). */
export default function OpenBadge() {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return <span className="inline-block h-7 w-24" aria-hidden />;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wider" role="status">
      <span className={`h-2 w-2 rounded-full ${open ? "bg-accent" : "bg-muted"}`} />
      {open ? "Open now" : "Closed"}
    </span>
  );
}
