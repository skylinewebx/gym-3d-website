import { withBase } from "@/lib/base";
import type { Prefill } from "@/lib/prefill";

/** Link to the admission form that also pre-selects mode / plan / billing (handled by <Behaviors />). */
export default function JoinLink({ prefill, className, children }: { prefill?: Prefill; className?: string; children: React.ReactNode }) {
  return (
    <a href={withBase("/") + "#join"} className={className} data-prefill={prefill ? JSON.stringify(prefill) : undefined}>
      {children}
    </a>
  );
}
