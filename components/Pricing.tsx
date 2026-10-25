"use client";
import { useState } from "react";
import { gym, inr, type Billing } from "@/data/gym.config";
import Reveal from "./Reveal";
import JoinLink from "./JoinLink";
import { Check } from "./Icons";
import { cn } from "@/lib/utils";

// All amounts come from data/gym.config.ts and are PLACEHOLDERS (INR, excl. GST).
const months: Record<Billing, number> = { monthly: 1, quarterly: 3, halfYearly: 6, yearly: 12 };
const periods = Object.keys(months) as Billing[];

export default function Pricing({ standalone = false }: { standalone?: boolean }) {
  const [b, setB] = useState<Billing>("quarterly");
  const H = standalone ? "h1" : "h2";
  const last = gym.plans.length - 1;
  const regWaived = gym.registrationFee.waivedOn === b;

  return (
    <section id="pricing" className="section">
      <div className="container-x">
        <p className="eyebrow">Pricing</p>
        <H className="h-section max-w-3xl">Simple plans. <span className="text-accent">No surprises.</span></H>

        <div role="radiogroup" aria-label="Billing period" className="mt-8 inline-flex max-w-full overflow-x-auto rounded-full border border-line bg-surface p-1">
          {periods.map((p) => (
            <button key={p} role="radio" aria-checked={b === p} onClick={() => setB(p)}
              className={cn("min-h-[44px] whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors sm:px-6",
                b === p ? "bg-accent text-accent-contrast" : "text-muted hover:text-fg")}>
              {gym.billingLabels[p]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-3">
          {gym.plans.map((p, i) => {
            const price = p.price[b];
            const base = p.price.monthly * months[b];
            const save = b === "monthly" ? 0 : Math.round((1 - price / base) * 100);
            // First card from the left, last from the right, middle fades up.
            const dir = i === 0 ? "left" : i === last ? "right" : "up";
            return (
              <Reveal key={p.id} dir={dir} className="h-full">
                <div className={cn("card relative flex h-full flex-col p-7", p.highlight && "border-accent bg-accent text-accent-contrast")}>
                  {"badge" in p && p.badge && (
                    <span className="absolute -top-3 left-7 rounded-full bg-bg px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent ring-1 ring-accent">{p.badge}</span>
                  )}
                  <h3 className="text-3xl">{p.name}</h3>
                  <p className={cn("mt-2 text-sm", p.highlight ? "opacity-80" : "text-muted")}>{p.blurb}</p>
                  <p className="mt-6 font-display text-6xl font-extrabold leading-none">{inr(price)}</p>
                  <p className={cn("mt-2 text-sm", p.highlight ? "opacity-80" : "text-muted")}>
                    per {gym.billingLabels[b].toLowerCase()}
                    {save > 0 && <> · <strong>save {save}%</strong></>}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <JoinLink prefill={{ mode: "join", plan: p.name, billing: b }}
                    className={cn("btn mt-8 w-full", p.highlight ? "bg-bg text-fg hover:bg-surface" : "btn-ghost")}>
                    Choose Plan
                  </JoinLink>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted">
          Registration fee: {inr(gym.registrationFee.amount)} one-time{regWaived ? " (waived on this plan)" : `, waived on ${gym.billingLabels[gym.registrationFee.waivedOn].toLowerCase()} plans`}. {gym.gstNote}
        </p>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="card p-7">
            <h3 className="text-2xl">Personal training</h3>
            <ul className="mt-5 divide-y divide-line">
              {gym.personalTraining.map((pt) => (
                <li key={pt.name} className="flex items-center justify-between gap-4 py-4">
                  <div><p className="font-semibold">{pt.name}</p><p className="text-sm text-muted">{pt.note}</p></div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold">{inr(pt.price)}</span>
                    <JoinLink prefill={{ mode: "join", plan: "Personal Training" }} className="btn btn-ghost !min-h-[44px] !px-4">Book</JoinLink>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h3 className="text-2xl">Special offers</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {gym.offers.map((o) => (
                <li key={o.name}><p className="font-semibold text-accent">{o.name}</p><p className="mt-1 text-sm text-muted">{o.text}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
