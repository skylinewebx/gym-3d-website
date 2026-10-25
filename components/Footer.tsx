import Link from "next/link";
import { gym } from "@/data/gym.config";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted">{gym.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <h3 className="text-lg text-fg">Explore</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {[["Pricing", "/pricing"], ["Trainers", "/trainers"], ["Gallery", "/gallery"], ["Privacy Policy", "/privacy-policy"], ["Terms", "/terms"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-accent">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-lg text-fg">Follow</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {Object.entries(gym.social).map(([k, h]) => (
              <li key={k}><a href={h} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-accent">{k}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="container-x mt-10 text-xs text-muted">&copy; {new Date().getFullYear()} {gym.name} {gym.nameAccent}. All rights reserved.</p>
    </footer>
  );
}
