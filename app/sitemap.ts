import type { MetadataRoute } from "next";
import { gym } from "@/data/gym.config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/pricing", "/trainers", "/gallery", "/privacy-policy", "/terms"].map((p) => ({
    url: `${gym.siteUrl}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.6,
  }));
}
