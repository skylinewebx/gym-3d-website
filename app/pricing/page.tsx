import type { Metadata } from "next";
import Pricing from "@/components/Pricing";
import AdmissionForm from "@/components/AdmissionForm";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = { title: "Membership Pricing", description: "Gym membership plans with monthly, quarterly, half-yearly and yearly options.", alternates: { canonical: "/pricing" } };

export default function Page() {
  return (<><Pricing standalone /><AdmissionForm /><FAQ /></>);
}
