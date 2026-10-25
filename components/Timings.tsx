import { gym } from "@/data/gym.config";
import Reveal from "./Reveal";
import OpenBadge from "./OpenBadge";

export default function Timings() {
  return (
    <section id="timings" className="section border-y border-line bg-surface/40">
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <p className="eyebrow">Timings</p>
            <h2 className="h-section">Open when <span className="text-accent">you are</span></h2>
          </div>
          <div className="sm:ml-auto"><OpenBadge /></div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <Reveal dir="left"><div className="card h-full p-7">
            <h3 className="text-2xl">Opening hours</h3>
            <dl className="mt-5 space-y-4">
              <div className="flex justify-between gap-4 border-b border-line pb-4"><dt className="text-muted">Mon – Sat</dt><dd className="font-semibold">{gym.hours.monSat}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-muted">Sunday</dt><dd className="font-semibold">{gym.hours.sunday}</dd></div>
            </dl>
          </div></Reveal>

          <Reveal dir="up"><div className="card h-full p-7">
            <h3 className="text-2xl">Batches</h3>
            <ul className="mt-5 space-y-4">
              {gym.batches.map((b) => (
                <li key={b.name} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between gap-4"><span className="font-semibold">{b.name}</span><span className="text-right text-sm">{b.time}</span></div>
                  <p className="mt-1 text-sm text-muted">{b.note}</p>
                </li>
              ))}
            </ul>
          </div></Reveal>

          <Reveal dir="right"><div className="card h-full p-7">
            <h3 className="text-2xl">Weekly classes</h3>
            <ul className="mt-5 space-y-4">
              {gym.classes.map((c) => (
                <li key={c.name} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <p className="font-semibold text-accent">{c.name}</p>
                  <p className="text-sm">{c.time}</p>
                  <p className="text-sm text-muted">{c.day}</p>
                </li>
              ))}
            </ul>
          </div></Reveal>
        </div>
      </div>
    </section>
  );
}
