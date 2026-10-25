"use client";
import Link from "next/link";
import { sendPrefill, type Prefill } from "@/lib/prefill";

/** Link to the admission form that also pre-selects mode / plan / billing. */
export default function JoinLink({ prefill, className, children }: { prefill?: Prefill; className?: string; children: React.ReactNode }) {
  return (
    <Link href="/#join" className={className} onClick={() => prefill && sendPrefill(prefill)}>
      {children}
    </Link>
  );
}
