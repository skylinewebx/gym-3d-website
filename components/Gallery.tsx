import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import GalleryClient from "./GalleryClient";

export default function Gallery({ standalone = false }: { standalone?: boolean }) {
  // Photos that are not in /public yet are left out, so visitors never see empty tiles.
  const items = gym.gallery.map((g) => ({ ...g, exists: has(g.src) })).filter((g) => g.exists);
  if (!items.length) return null;
  const zones = Array.from(new Set(items.map((g) => g.zone)));
  return (
    <section id="facilities" className="section">
      <div className="container-x">
        <p className="eyebrow">Facilities</p>
        {standalone ? (
          <h1 className="h-section max-w-3xl">Take a look <span className="text-accent">inside</span></h1>
        ) : (
          <h2 className="h-section max-w-3xl">Take a look <span className="text-accent">inside</span></h2>
        )}
        <GalleryClient items={items} zones={zones} />
      </div>
    </section>
  );
}
