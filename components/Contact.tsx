import { gym } from "@/data/gym.config";
import { waLink } from "@/lib/whatsapp";
import Reveal from "./Reveal";
import OpenBadge from "./OpenBadge";
import { Phone, Pin, Chat, ArrowUpRight } from "./Icons";

export default function Contact() {
  const a = gym.address;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${gym.geo.lat},${gym.geo.lng}`;
  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Find us</p>
            <h2 className="h-section">Come <span className="text-accent">visit</span></h2>
          </div>
          <OpenBadge />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          <Reveal dir="left" className="lg:col-span-2">
            <div className="grid h-full gap-4">
              <div className="card p-6">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Pin /></span>
                  <div>
                    <h3 className="text-xl">Address</h3>
                    <address className="mt-1 not-italic text-muted">{a.street}, {a.area}<br />{a.city}, {a.state} {a.postalCode}</address>
                  </div>
                </div>
                <a href={directions} target="_blank" rel="noopener noreferrer" className="btn btn-accent mt-5 w-full">Get directions <ArrowUpRight className="h-4 w-4" /></a>
              </div>

              <div className="card p-6">
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"><Phone /></span>
                  <div>
                    <h3 className="text-xl">Call or message</h3>
                    <a href={`tel:+${gym.whatsapp}`} className="mt-1 block text-lg font-semibold hover:text-accent">{gym.phone}</a>
                    <a href={`mailto:${gym.email}`} className="text-sm text-muted hover:text-accent">{gym.email}</a>
                  </div>
                </div>
                <a href={waLink(`Hi ${gym.name}, I would like to know more about membership.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5 w-full"><Chat className="h-5 w-5" /> WhatsApp us</a>
              </div>

              <div className="card p-6">
                <h3 className="text-xl">Opening hours</h3>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-4"><dt className="text-muted">Mon – Sat</dt><dd className="font-semibold">{gym.hours.monSat}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Sunday</dt><dd className="font-semibold">{gym.hours.sunday}</dd></div>
                </dl>
              </div>
            </div>
          </Reveal>

          <Reveal dir="right" className="lg:col-span-3">
            <div className="card relative h-full min-h-[22rem] overflow-hidden p-0 lg:min-h-[34rem]">
              {/* Dark-mode map: the embed is inverted and desaturated with CSS */}
              <iframe title={`Map showing ${gym.name}`} src={gym.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:invert(.92)_hue-rotate(180deg)_saturate(.55)_contrast(.9)_brightness(.95)]" allowFullScreen />
              <a href={gym.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent absolute bottom-4 left-4 !min-h-[40px] !px-4 !text-xs">Open in Google Maps</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
