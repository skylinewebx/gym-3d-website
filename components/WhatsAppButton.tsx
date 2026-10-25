import { gym } from "@/data/gym.config";
import { Chat } from "./Icons";

export default function WhatsAppButton() {
  const href = `https://wa.me/${gym.whatsapp}?text=${encodeURIComponent(`Hi ${gym.name}, I would like to know more about membership.`)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-contrast shadow-lg shadow-black/40 transition-transform hover:scale-105">
      <Chat />
    </a>
  );
}
