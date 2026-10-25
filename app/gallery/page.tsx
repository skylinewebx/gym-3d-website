import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = { title: "Facility Gallery", description: "Photos of our cardio, strength, functional and recovery areas.", alternates: { canonical: "/gallery" } };

export default function Page() {
  return (<><Gallery standalone /><CtaBand /></>);
}
