import Link from "next/link";
import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import Reveal from "./Reveal";
import Pic from "./Pic";
import { ArrowUpRight } from "./Icons";

export default function Programs() {
  // Only programs with a photo are shown, so the grid never has empty placeholder cards.
  const items = gym.programs.filter((p) => has(p.image));
  const grid4 = items.length % 4 === 0;
  return (
    <section id="programs" className="section">
      <div className="container-x">
        <p className="eyebrow">Programs</p>
        <h2 className="h-section max-w-3xl">Find your <span className="text-accent">fire</span></h2>
        <ul className={grid4 ? "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" : "mt-10 flex flex-wrap justify-center gap-4 [&>li]:w-full sm:[&>li]:w-[calc(50%-0.5rem)] lg:[&>li]:w-[calc(33.333%-0.7rem)]"}>
          {items.map((p, i) => (
            <li key={p.title}>
              <Reveal dir={i % 2 === 0 ? "left" : "right"} delay={(i % 4) * 70} className="h-full">
              <Link href="/#join" className="group card card-hover grade relative block aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <Pic src={p.image} alt={p.title} exists sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                <span className="absolute left-5 top-5 z-10 font-display text-lg font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-contrast transition-transform group-hover:translate-x-1"><ArrowUpRight /></span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </div>
              </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
