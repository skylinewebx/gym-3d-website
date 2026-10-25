import JoinLink from "./JoinLink";
import { gym } from "@/data/gym.config";
import { has } from "@/lib/assets";
import Pic from "./Pic";
import HeroVideo from "./HeroVideo";
import { Star } from "./Icons";

export default function Hero() {
  const hasVideo = has("/video/hero-1080.mp4");
  const poster = gym.assets.heroPoster;
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden border-b border-line">
      <HeroVideo
        enabled={hasVideo}
        poster={<Pic src={poster} alt="" exists={has(poster)} sizes="100vw" priority quality={90} />}
      />
      <div className="container-x hero-in relative pb-14 pt-32 sm:pb-20">
        <p className="eyebrow">{gym.address.area}, {gym.address.city}</p>
        <h1 className="max-w-4xl text-[clamp(3rem,10vw,7.5rem)] font-extrabold italic">
          Train harder.<br />Become <span className="text-accent">unstoppable.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{gym.description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <JoinLink prefill={{ mode: "join" }} className="btn btn-accent">Start Training</JoinLink>
          <JoinLink prefill={{ mode: "trial" }} className="btn btn-ghost">Book Free Trial</JoinLink>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
          <span><strong className="font-display text-2xl text-fg">{gym.stats[0].value}{gym.stats[0].suffix}</strong> {gym.stats[0].label.toLowerCase()}</span>
          {gym.googleRating && (
            <span className="inline-flex items-center gap-1.5 text-accent"><Star /><strong className="text-fg">{gym.googleRating}</strong> <span className="text-muted">Google rating</span></span>
          )}
          <span>Mon–Sat {gym.hours.monSat}</span>
        </div>
      </div>
    </section>
  );
}
