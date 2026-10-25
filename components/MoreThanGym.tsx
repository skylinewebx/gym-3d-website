import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import Reveal from "./Reveal";
import Pic from "./Pic";
import { Check } from "./Icons";

export default function MoreThanGym() {
  const m = gym.moreThanGym;
  return (
    <section className="section border-y border-line bg-surface/40">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal dir="left"><div className="card grade relative aspect-[4/3] overflow-hidden">
          <Pic src={m.image} alt={`Inside ${gym.name}`} exists={has(m.image)} sizes="(min-width:1024px) 50vw, 100vw" />
        </div></Reveal>
        <Reveal dir="right"><div>
          <p className="eyebrow">Why {gym.name}</p>
          <h2 className="h-section">More than a gym. <span className="text-accent">A higher standard.</span></h2>
          <ul className="mt-8 space-y-6">
            {m.points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-contrast"><Check className="h-4 w-4" /></span>
                <div>
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-1 text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div></Reveal>
      </div>
    </section>
  );
}
