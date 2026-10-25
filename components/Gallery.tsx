import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import GalleryClient from "./GalleryClient";

export default function Gallery({ standalone = false }: { standalone?: boolean }) {
  const items = gym.gallery.map((g) => ({ ...g, exists: has(g.src) }));
  const zones = Array.from(new Set(gym.gallery.map((g) => g.zone)));
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
