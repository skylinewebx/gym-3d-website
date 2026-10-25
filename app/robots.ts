import type { MetadataRoute } from "next";
import { withBase } from "@/lib/base";
import { gym } from "@/data/gym.config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${gym.siteUrl}${withBase("/sitemap.xml")}` };
}
