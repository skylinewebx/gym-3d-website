import Link from "next/link";
import { gym } from "@/data/gym.config";
import { Diamond } from "./Icons";

/** Text logo. Swap for <Image src={gym.assets.logo}> once a real logo exists. */
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold uppercase tracking-tight" aria-label={`${gym.name} home`}>
      <Diamond className="text-accent" />
      <span>{gym.name} <span className="text-accent">{gym.nameAccent}</span></span>
    </Link>
  );
}
