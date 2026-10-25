"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { Menu, Close } from "./Icons";

const allLinks = [
  ["Programs", "/#programs"], ["Facilities", "/#facilities"], ["Trainers", "/#trainers"],
  ["Pricing", "/#pricing"], ["Timings", "/#timings"], ["Contact", "/#contact"],
] as const;

export default function Navbar({ showTrainers = true }: { showTrainers?: boolean }) {
  const links = allLinks.filter(([l]) => showTrainers || l !== "Trainers");
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {links.map(([l, h]) => (
            <Link key={l} href={h} className="text-sm font-medium text-muted transition-colors hover:text-accent">{l}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#join" className="btn btn-accent hidden sm:inline-flex">Join Now</Link>
          <button className="grid h-12 w-12 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-bg lg:hidden">
          <ul className="container-x flex flex-col py-3">
            {links.map(([l, h]) => (
              <li key={l}><Link href={h} onClick={() => setOpen(false)} className="block border-b border-line/60 py-4 font-display text-xl font-bold uppercase">{l}</Link></li>
            ))}
            <li className="pt-4"><Link href="/#join" onClick={() => setOpen(false)} className="btn btn-accent w-full">Join Now</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
