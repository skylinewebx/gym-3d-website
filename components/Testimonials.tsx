import { gym } from "@/data/gym.config";
import Reveal from "./Reveal";
import { Star } from "./Icons";

function Stars({ n }: { n: number }) {
  return <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>{Array.from({ length: n }, (_, i) => <Star key={i} />)}</span>;
}

export default function Testimonials() {
  const [lead, ...rest] = gym.testimonials;
  return (
    <section className="section">
      <div className="container-x">
        <p className="eyebrow">Member stories</p>
        <h2 className="h-section max-w-3xl">Results that <span className="text-accent">speak</span></h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <Reveal dir="left" className="lg:col-span-3"><figure className="card flex h-full flex-col justify-between bg-accent p-8 text-accent-contrast lg:p-12">
            <Stars n={lead.rating} />
            <blockquote className="mt-6 font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">&ldquo;{lead.quote}&rdquo;</blockquote>
            <figcaption className="mt-8"><strong>{lead.name}</strong><span className="opacity-80"> · {lead.result}</span></figcaption>
          </figure></Reveal>
          <div className="grid gap-5 lg:col-span-2">
            {rest.map((t, i) => (
              <Reveal key={i} dir="right" delay={i * 100}><figure className="card p-6 text-accent">
                <Stars n={t.rating} />
                <blockquote className="mt-4 text-fg">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm text-muted"><strong className="text-fg">{t.name}</strong> · {t.result}</figcaption>
              </figure></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
