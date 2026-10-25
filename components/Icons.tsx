type P = { className?: string };
const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export const Arrow = ({ className }: P) => (<svg {...base} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowUpRight = ({ className }: P) => (<svg {...base} className={className}><path d="M7 17 17 7M8 7h9v9" /></svg>);
export const Check = ({ className }: P) => (<svg {...base} className={className}><path d="m5 12 5 5 9-10" /></svg>);
export const Menu = ({ className }: P) => (<svg {...base} className={className}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = ({ className }: P) => (<svg {...base} className={className}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Plus = ({ className }: P) => (<svg {...base} className={className}><path d="M12 5v14M5 12h14" /></svg>);
export const Phone = ({ className }: P) => (<svg {...base} className={className}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>);
export const Pin = ({ className }: P) => (<svg {...base} className={className}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const Star = ({ className }: P) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5Z" /></svg>);
export const Diamond = ({ className }: P) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M12 1 23 12 12 23 1 12 12 1Z" /></svg>);
/** Simple chat-bubble glyph used for the WhatsApp button. */
export const Chat = ({ className }: P) => (<svg {...base} width={28} height={28} className={className}><path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.5-5.4A8.5 8.5 0 1 1 21 12Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a3.500 3.500 0 0 1-1.800-1.800l.8-1-1-2L9 9.500Z" /></svg>);
