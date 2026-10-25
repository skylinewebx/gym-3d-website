import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/schema";
import { rateLimit } from "@/lib/ratelimit";
import { gym } from "@/data/gym.config";

export const runtime = "nodejs";

const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (!rateLimit(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof body === "object" && body && (body as { website?: string }).website) return NextResponse.json({ ok: true });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  const d = parsed.data;
  const phone = String(d.phone).replace(/[\s\-()]/g, "");

  const row = {
    mode: d.mode, name: d.name, phone, email: d.email || null, age: d.age, gender: d.gender,
    plan: d.plan, billing: d.billing ?? null, batch: d.batch, goal: d.goal,
    personal_training: !!d.personalTraining, joining_date: d.joiningDate, message: d.message || null,
  };

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL } = process.env;
  const configured = !!(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) || !!(RESEND_API_KEY && LEAD_NOTIFY_EMAIL);
  if (!configured) {
    console.warn("[lead] Supabase/Resend not configured. Lead logged only:", row);
    return NextResponse.json({ ok: true });
  }

  let saved = false;
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, Prefer: "return=minimal" },
        body: JSON.stringify(row),
      });
      saved = r.ok;
      if (!r.ok) console.error("[lead] Supabase error", r.status, await r.text());
    } catch (e) { console.error("[lead] Supabase failed", e); }
  }

  let emailed = false;
  if (RESEND_API_KEY && LEAD_NOTIFY_EMAIL) {
    const rows = Object.entries(row).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td><b>${esc(v)}</b></td></tr>`).join("");
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: LEAD_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [LEAD_NOTIFY_EMAIL],
          reply_to: d.email || undefined,
          subject: `New ${d.mode === "trial" ? "free trial" : "admission"} lead: ${d.name} (${gym.name})`,
          html: `<table>${rows}</table><p><a href="https://wa.me/91${phone.slice(-10)}">Reply on WhatsApp</a></p>`,
        }),
      });
      emailed = r.ok;
      if (!r.ok) console.error("[lead] Resend error", r.status, await r.text());
    } catch (e) { console.error("[lead] Resend failed", e); }
  }

  // Succeed if at least one channel captured the lead, so the owner never loses it silently.
  if (!saved && !emailed) return NextResponse.json({ error: "We couldn't submit right now. Please call or WhatsApp us." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
