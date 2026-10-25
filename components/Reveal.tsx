import { cn } from "@/lib/utils";

/**
 * Slide/fade in once when scrolled into view (transform + opacity only).
 * Plain markup with no hooks: the single <Behaviors /> observer in the layout adds `is-in`,
 * so dozens of reveals cost no extra hydration. CSS in globals.css disables it for reduced-motion.
 */
export default function Reveal({ dir = "up", delay = 0, className, children }: {
  dir?: "left" | "right" | "up";
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-dir={dir} style={delay ? { transitionDelay: `${delay}ms` } : undefined} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
