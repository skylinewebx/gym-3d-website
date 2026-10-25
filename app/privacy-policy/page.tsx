import type { Metadata } from "next";
import { gym } from "@/data/gym.config";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" } };

// TEMPLATE: have a lawyer review before launch.
export default function Page() {
  return (
    <article className="container-x section max-w-3xl [&_h2]:mt-10 [&_h2]:text-2xl [&_p]:mt-3 [&_p]:text-muted">
      <h1 className="h-section">Privacy <span className="text-accent">Policy</span></h1>
      <p>Last updated: {new Date().getFullYear()}. This policy explains how {gym.name} {gym.nameAccent} handles information you share on this website.</p>
      <h2>What we collect</h2>
      <p>When you submit the admission or free trial form we collect your name, phone number, optional email, age, gender, plan, batch, goal, preferred date and any message you write.</p>
      <h2>How we use it</h2>
      <p>We use your details only to contact you about your enquiry, schedule visits and manage your membership. We do not sell your data.</p>
      <h2>Storage and sharing</h2>
      <p>Enquiries are stored with our database provider (Supabase) and notified to us by email (Resend). These providers process data on our behalf.</p>
      <h2>Your choices</h2>
      <p>You can ask us to correct or delete your data at any time by emailing <a className="text-accent" href={`mailto:${gym.email}`}>{gym.email}</a>.</p>
    </article>
  );
}
