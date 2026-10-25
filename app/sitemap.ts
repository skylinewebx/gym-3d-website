import type { MetadataRoute } from "next";
import { withBase } from "@/lib/base";
import { gym } from "@/data/gym.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/pricing", "/trainers", "/gallery", "/privacy-policy", "/terms"].map((p) => ({
    url: `${gym.siteUrl}${withBase(p || "/")}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.6,
  }));
}
