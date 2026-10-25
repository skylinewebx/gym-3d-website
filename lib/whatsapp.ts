import { gym } from "@/data/gym.config";

export const waLink = (text: string) => `https://wa.me/${gym.whatsapp}?text=${encodeURIComponent(text)}`;
