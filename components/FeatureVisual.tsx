import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import Pic from "./Pic";

/** Cinematic / 3D-render still. Static image only, no WebGL. */
export default function FeatureVisual() {
  const f = gym.featureVisual;
  return (
    <section className="section">
      <div className="container-x">
        <div className="card grade relative isolate flex aspect-[4/5] items-end overflow-hidden sm:aspect-[21/9]">
          <Pic src={f.image} alt={f.title} exists={has(f.image)} sizes="(min-width:1280px) 1280px, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
          <div className="relative z-10 max-w-2xl p-6 sm:p-12">
            <h2 className="h-section">{f.title.replace(" results", "")} <span className="text-accent">results</span></h2>
            <p className="mt-4 max-w-md text-muted">{f.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
