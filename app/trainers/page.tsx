import type { Metadata } from "next";
import Trainers from "@/components/Trainers";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Our Trainers", description: "Meet the certified coaches who will guide your training.", alternates: { canonical: "/trainers" } };

export default function Page() {
  return (<><Trainers standalone /><CtaBand /></>);
}
