/** Lets any "Choose Plan" / "Book Free Trial" button pre-fill the form, even from another page. */
export type Prefill = { mode?: "join" | "trial"; plan?: string; billing?: string };
const KEY = "gym:prefill";
export const PREFILL_EVENT = "gym:prefill";

export function sendPrefill(p: Prefill) {
  try { sessionStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: p }));
}

export function takePrefill(): Prefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as Prefill;
  } catch { return null; }
}
