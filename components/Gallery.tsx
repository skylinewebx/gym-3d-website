import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import GalleryClient from "./GalleryClient";

export default function Gallery({ standalone = false }: { standalone?: boolean }) {
  // Photos that are not in /public yet are left out, so visitors never see empty tiles.
  const items = gym.gallery.map((g) => ({ ...g, exists: has(g.src) })).filter((g) => g.exists);
  if (!items.length) return null;
  const zones = Array.from(new Set(items.map((g) => g.zone)));
  const H = standalone ? "h1" : "h2";
  return (
    <section id="facilities" className="section">
      <div className="container-x">
        <p className="eyebrow">Facilities</p>
        <H className="h-section max-w-3xl">Take a look <span className="text-accent">inside</span></H>
        <p className="mt-4 max-w-xl text-muted">Every zone is built to be clean, well lit and uncrowded. Tap a photo to see it full size.</p>
        <GalleryClient items={items} zones={zones} />
      </div>
    </section>
  );
}
