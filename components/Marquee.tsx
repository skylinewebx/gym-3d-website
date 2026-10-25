import { gym } from "@/data/gym.config";
import { Diamond } from "./Icons";

/** Accent-colour slogan band. Pauses on hover, static under reduced motion. */
export default function Marquee() {
  const items = [...gym.marquee, ...gym.marquee];
  return (
    <div className="marquee overflow-hidden bg-accent py-4 text-accent-contrast" aria-label={gym.marquee.join(", ")} role="group">
      <div className="marquee-track flex">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((t, i) => (
              <li key={i} className="flex items-center gap-6 px-6 font-display text-2xl font-extrabold uppercase tracking-wide sm:text-3xl">
                {t} <Diamond />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
