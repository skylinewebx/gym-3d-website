"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gym } from "@/data/gym.config";
import { leadSchema, planOptions, genders } from "@/lib/schema";
import { PREFILL_EVENT, takePrefill, type Prefill } from "@/lib/prefill";
import { cn } from "@/lib/utils";
import { Check } from "./Icons";

type Mode = "join" | "trial";
type Errors = Record<string, string>;

const steps = [
  ["Choose your plan", "Pick a membership that fits your goal and budget."],
  ["Schedule a visit", "We call you to confirm a time that works."],
  ["Start training", "Meet your coach and begin your first session."],
];

const field = "block text-sm font-semibold";
const err = "mt-1 text-sm text-[#ff8a80]";

export default function AdmissionForm() {
  const [mode, setMode] = useState<Mode>("join");
  const [plan, setPlan] = useState("");
  const [billing, setBilling] = useState("quarterly");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [sent, setSent] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [leadText, setLeadText] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
    const apply = (p: Prefill | null) => {
      if (!p) return;
      if (p.mode) setMode(p.mode);
      if (p.plan) setPlan(p.plan);
      if (p.billing) setBilling(p.billing);
    };
    apply(takePrefill());
    const onEvt = (e: Event) => apply((e as CustomEvent<Prefill>).detail);
    window.addEventListener(PREFILL_EVENT, onEvt);
    return () => window.removeEventListener(PREFILL_EVENT, onEvt);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      mode,
      name: fd.get("name"), phone: fd.get("phone"), email: fd.get("email") ?? "",
      age: fd.get("age"), gender: fd.get("gender"), plan,
      billing: mode === "join" && plan !== "Not sure yet" && plan !== "Personal Training" ? billing : undefined,
      batch: fd.get("batch"), goal: fd.get("goal"),
      personalTraining: fd.get("personalTraining") === "on",
      joiningDate: fd.get("joiningDate"), message: fd.get("message") ?? "",
      consent: fd.get("consent") === "on", website: fd.get("website") ?? "",
    };
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
      setErrors(next);
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const first = Object.keys(next)[0];
      (document.getElementById(`f-${first}`) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    setStatus("loading");
    const d = parsed.data;
    const summary = [
      `${d.mode === "trial" ? "FREE TRIAL" : "ADMISSION"} request`, `Name: ${d.name}`, `Phone: ${String(d.phone)}`, d.email ? `Email: ${d.email}` : "",
      `Age: ${d.age}, ${d.gender}`, `Plan: ${d.plan}${d.billing ? ` (${gym.billingLabels[d.billing]})` : ""}`, `Batch: ${d.batch}`, `Goal: ${d.goal}`,
      d.personalTraining ? "Interested in personal training" : "", `Date: ${d.joiningDate}`, d.message ? `Message: ${d.message}` : "",
    ].filter(Boolean).join("\n");
    setLeadText(summary);

    // GitHub Pages build (no server): Formspree if configured, else the WhatsApp / email fallback screen.
    if (process.env.NEXT_PUBLIC_STATIC_EXPORT) {
      if (!gym.formspreeId) { setSent(false); setStatus("done"); return; }
      try {
        const res = await fetch(`https://formspree.io/f/${gym.formspreeId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...d, _subject: `New ${d.mode === "trial" ? "free trial" : "admission"} lead: ${d.name}`, _gotcha: d.website ?? "" }),
        });
        if (!res.ok) throw new Error("Formspree");
        setSent(true);
      } catch {
        setSent(false); // fall back so the lead is never lost
      }
      setStatus("done");
      return;
    }

    // Server build (Vercel): /api/lead validates again, rate-limits, saves to Supabase and emails the owner.
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong. Please try again.");
      setSent(true);
      setStatus("done");
    } catch (ex) {
      setServerMsg(ex instanceof Error ? ex.message : "Network error. Please try again.");
      setStatus("error");
    }
  }

  const wa = `https://wa.me/${gym.whatsapp}?text=${encodeURIComponent(`Hi ${gym.name}, I would like to book.\n\n${leadText}`)}`;
  const mail = `mailto:${gym.email}?subject=${encodeURIComponent(`${mode === "trial" ? "Free trial" : "Admission"} request`)}&body=${encodeURIComponent(leadText)}`;

  return (
    <section id="join" className="section border-t border-line">
      <div className="container-x grid gap-8 lg:grid-cols-[1fr_1.6fr]">
        <aside className="card flex flex-col p-7 lg:p-9">
          <p className="eyebrow">Free consultation</p>
          <h2 className="h-section">Start your <span className="text-accent">journey</span></h2>
          <ol className="mt-8 space-y-6">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent font-display text-lg font-bold text-accent">{i + 1}</span>
                <div><h3 className="text-xl">{t}</h3><p className="mt-1 text-sm text-muted">{d}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-auto pt-8 text-sm text-muted">Prefer to talk? Call <a className="text-accent" href={`tel:+${gym.whatsapp}`}>{gym.phone}</a>.</p>
        </aside>

        <div className="card p-6 sm:p-9">
          {status === "done" ? (
            <div role="status" className="py-10 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-contrast"><Check className="h-8 w-8" /></span>
              <h3 className="mt-6 text-4xl">{sent ? "You’re in" : "One last step"}</h3>
              <p className="mx-auto mt-3 max-w-md text-muted">
                {sent
                  ? <>Thanks. We&rsquo;ll call you shortly to confirm your {mode === "trial" ? "free trial" : "admission"}.</>
                  : <>Send your details to us on WhatsApp (or email) so we can confirm your {mode === "trial" ? "free trial" : "admission"}.</>}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-accent">{sent ? "Continue on WhatsApp" : "Send on WhatsApp"}</a>
                {!sent && <a href={mail} className="btn btn-ghost">Send by email</a>}
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5" aria-busy={status === "loading"}>
              <div role="radiogroup" aria-label="Request type" className="grid grid-cols-2 gap-1 rounded-full border border-line bg-bg p-1">
                {([["join", "Join the gym"], ["trial", "Book a free trial"]] as const).map(([m, l]) => (
                  <button type="button" key={m} role="radio" aria-checked={mode === m} onClick={() => setMode(m)}
                    className={cn("min-h-[48px] rounded-full px-3 text-sm font-bold transition-colors", mode === m ? "bg-accent text-accent-contrast" : "text-muted hover:text-fg")}>{l}</button>
                ))}
              </div>

              {/* Honeypot: hidden from people, bots fill it in */}
              <div className="absolute -left-[9999px]" aria-hidden>
                <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="f-name" className={field}>Full name</label>
                  <input id="f-name" name="name" autoComplete="name" className="input mt-1" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
                  {errors.name && <p id="e-name" className={err}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="f-phone" className={field}>Phone</label>
                  <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="input mt-1" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
                  {errors.phone && <p id="e-phone" className={err}>{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="f-email" className={field}>Email <span className="font-normal text-muted">(optional)</span></label>
                  <input id="f-email" name="email" type="email" inputMode="email" autoComplete="email" className="input mt-1" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
                  {errors.email && <p id="e-email" className={err}>{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-age" className={field}>Age</label>
                    <input id="f-age" name="age" type="number" inputMode="numeric" min={12} max={90} className="input mt-1" aria-invalid={!!errors.age} aria-describedby={errors.age ? "e-age" : undefined} />
                    {errors.age && <p id="e-age" className={err}>{errors.age}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-gender" className={field}>Gender</label>
                    <select id="f-gender" name="gender" defaultValue="" className="input mt-1" aria-invalid={!!errors.gender} aria-describedby={errors.gender ? "e-gender" : undefined}>
                      <option value="" disabled>Select</option>
                      {genders.map((g) => <option key={g}>{g}</option>)}
                    </select>
                    {errors.gender && <p id="e-gender" className={err}>{errors.gender}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="f-plan" className={field}>Plan</label>
                  <select id="f-plan" value={plan} onChange={(e) => setPlan(e.target.value)} className="input mt-1" aria-invalid={!!errors.plan} aria-describedby={errors.plan ? "e-plan" : undefined}>
                    <option value="" disabled>Select a plan</option>
                    {planOptions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  {errors.plan && <p id="e-plan" className={err}>{errors.plan}</p>}
                </div>
                {mode === "join" && (
                  <div>
                    <label htmlFor="f-billing" className={field}>Duration</label>
                    <select id="f-billing" value={billing} onChange={(e) => setBilling(e.target.value)} className="input mt-1">
                      {Object.entries(gym.billingLabels).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor="f-batch" className={field}>Preferred batch</label>
                  <select id="f-batch" name="batch" defaultValue="" className="input mt-1" aria-invalid={!!errors.batch} aria-describedby={errors.batch ? "e-batch" : undefined}>
                    <option value="" disabled>Select</option>
                    {gym.batchOptions.map((b) => <option key={b}>{b}</option>)}
                  </select>
                  {errors.batch && <p id="e-batch" className={err}>{errors.batch}</p>}
                </div>
                <div>
                  <label htmlFor="f-goal" className={field}>Goal</label>
                  <select id="f-goal" name="goal" defaultValue="" className="input mt-1" aria-invalid={!!errors.goal} aria-describedby={errors.goal ? "e-goal" : undefined}>
                    <option value="" disabled>Select</option>
                    {gym.goals.map((g) => <option key={g}>{g}</option>)}
                  </select>
                  {errors.goal && <p id="e-goal" className={err}>{errors.goal}</p>}
                </div>
                <div>
                  <label htmlFor="f-joiningDate" className={field}>{mode === "trial" ? "Preferred trial date" : "Preferred joining date"}</label>
                  <input id="f-joiningDate" name="joiningDate" type="date" min={minDate} className="input mt-1" aria-invalid={!!errors.joiningDate} aria-describedby={errors.joiningDate ? "e-joiningDate" : undefined} />
                  {errors.joiningDate && <p id="e-joiningDate" className={err}>{errors.joiningDate}</p>}
                </div>
              </div>

              <label className="flex min-h-[44px] items-center gap-3 text-sm">
                <input type="checkbox" name="personalTraining" className="h-5 w-5 accent-[rgb(var(--accent))]" />
                I&rsquo;m interested in personal training
              </label>

              <div>
                <label htmlFor="f-message" className={field}>Message <span className="font-normal text-muted">(optional)</span></label>
                <textarea id="f-message" name="message" rows={3} maxLength={500} className="input mt-1 py-3" />
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm">
                  <input id="f-consent" type="checkbox" name="consent" className="mt-0.5 h-5 w-5 shrink-0 accent-[rgb(var(--accent))]" aria-invalid={!!errors.consent} />
                  <span>I agree to be contacted about my enquiry and accept the <Link href="/privacy-policy" className="text-accent underline">privacy policy</Link>.</span>
                </label>
                {errors.consent && <p className={err}>{errors.consent}</p>}
              </div>

              {status === "error" && (
                <p role="alert" className={err}>{serverMsg} <a href={wa} target="_blank" rel="noopener noreferrer" className="underline">Send on WhatsApp instead</a></p>
              )}

              <button type="submit" disabled={status === "loading"} className="btn btn-accent w-full disabled:opacity-60">
                {status === "loading" ? "Sending…" : mode === "trial" ? "Book my free trial" : "Submit admission request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
