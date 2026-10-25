import type { Metadata } from "next";
import { gym } from "@/data/gym.config";

export const metadata: Metadata = { title: "Terms & Conditions", alternates: { canonical: "/terms" } };

// TEMPLATE: have a lawyer review before launch.
export default function Page() {
  return (
    <article className="container-x section max-w-3xl [&_h2]:mt-10 [&_h2]:text-2xl [&_p]:mt-3 [&_p]:text-muted">
      <h1 className="h-section">Terms &amp; <span className="text-accent">Conditions</span></h1>
      <p>By using this website or joining {gym.name} {gym.nameAccent} you agree to the terms below.</p>
      <h2>Membership</h2>
      <p>Memberships are personal and non-transferable unless stated by management. Prices exclude GST and may change without notice for new purchases.</p>
      <h2>Health and safety</h2>
      <p>You confirm you are fit to exercise and will follow trainer and staff instructions. Consult a doctor before starting if you have any medical condition.</p>
      <h2>Refunds</h2>
      <p>Fees are non-refundable unless required by law or agreed in writing by management.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a className="text-accent" href={`mailto:${gym.email}`}>{gym.email}</a>.</p>
    </article>
  );
}
