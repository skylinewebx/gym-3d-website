import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import Reveal from "./Reveal";
import Pic from "./Pic";

export default function Trainers({ standalone = false }: { standalone?: boolean }) {
  const H = standalone ? "h1" : "h2";
  const list = gym.trainers.filter((t) => has(t.image));
  if (!list.length) {
    // Hidden on the home page until real portraits exist; the /trainers page shows a short note instead of a blank screen.
    return standalone ? (
      <section className="container-x section">
        <p className="eyebrow">Trainers</p>
        <h1 className="h-section max-w-3xl">Meet the <span className="text-accent">team</span></h1>
        <p className="mt-6 max-w-xl text-muted">Trainer profiles are coming soon. Book a free trial and we will introduce you to a coach.</p>
      </section>
    ) : null;
  }
  return (
    <section id="trainers" className="section">
      <div className="container-x">
        <p className="eyebrow">Trainers</p>
        <H className="h-section max-w-3xl">In your <span className="text-accent">corner</span></H>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((t, i) => (
            <li key={t.name}>
              <Reveal dir={i % 2 === 0 ? "left" : "right"} delay={(i % 4) * 70} className="h-full">
              <div className="group card card-hover h-full overflow-hidden">
              <div className="grade relative aspect-[3/4] overflow-hidden">
                {/* Black-and-white by default, colour on hover */}
                <div className="absolute inset-0 grayscale transition duration-500 group-hover:grayscale-0">
                  <Pic src={t.image} alt={`${t.name}, ${t.role}`} exists focal="object-top" sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-2xl">{t.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">{t.role}</p>
                <p className="mt-3 text-sm text-muted">{t.bio}</p>
                <dl className="mt-4 space-y-1 border-t border-line pt-4 text-xs text-muted">
                  <div className="flex justify-between gap-2"><dt>Experience</dt><dd className="text-fg">{t.experience}</dd></div>
                  <div className="flex justify-between gap-2"><dt>Certification</dt><dd className="text-right text-fg">{t.certs}</dd></div>
                </dl>
              </div>
            </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
