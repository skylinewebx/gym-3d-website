import { gym } from "@/data/gym.config";
import { Plus } from "./Icons";

/** Native <details> accordion: accessible and works without JS. */
export default function FAQ() {
  return (
    <section id="faq" className="section">
      <div className="container-x grid gap-10 lg:grid-cols-3">
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 className="h-section">Got <span className="text-accent">questions?</span></h2>
        </div>
        <div className="lg:col-span-2">
          {gym.faqs.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold uppercase sm:text-2xl">
                {f.q}
                <Plus className="shrink-0 text-accent transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
