import { gym } from "@/data/gym.config";
import { Phone, Pin } from "./Icons";

export default function Contact() {
  const a = gym.address;
  return (
    <section id="contact" className="section">
      <div className="container-x grid gap-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Contact</p>
          <h2 className="h-section">Come <span className="text-accent">visit</span></h2>
          <ul className="mt-8 space-y-5 text-lg">
            <li className="flex gap-4"><Pin className="mt-1 shrink-0 text-accent" /><address className="not-italic">{a.street}, {a.area}<br />{a.city}, {a.state} {a.postalCode}</address></li>
            <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-accent" /><a href={`tel:+${gym.whatsapp}`} className="hover:text-accent">{gym.phone}</a></li>
            <li className="pl-10"><a href={`mailto:${gym.email}`} className="text-muted hover:text-accent">{gym.email}</a></li>
          </ul>
          <a href={gym.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">Get directions</a>
        </div>
        <div className="card aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
          <iframe title={`Map showing ${gym.name}`} src={gym.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 [filter:invert(.9)_hue-rotate(180deg)_grayscale(.4)]" allowFullScreen />
        </div>
      </div>
    </section>
  );
}
