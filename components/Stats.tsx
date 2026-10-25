import { gym } from "@/data/gym.config";
import Reveal from "./Reveal";
import { Diamond } from "./Icons";

export default function Stats() {
  return (
    <section className="py-12 sm:py-16" aria-label="Gym at a glance">
      <ul className="container-x grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {gym.stats.map((s, i) => (
          <li key={s.label}>
            <Reveal dir={i % 2 === 0 ? "left" : "right"} delay={(i % 4) * 70} className="h-full">
            <div className="card card-hover h-full p-5 sm:p-7">
            <Diamond className="mb-4 text-accent" />
            <p className="font-display text-5xl font-extrabold leading-none sm:text-6xl">{s.value}<span className="text-accent">{s.suffix}</span></p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
