// Two deploy targets from one codebase:
//  - Vercel (default, `npm run build`): full server, /api/lead route, image optimizer (AVIF/WebP), region iad1 in vercel.json.
//  - GitHub Pages (`npm run build:pages`): static export, no API route, pre-sized images.
const isStatic = process.env.STATIC_EXPORT === "1";
// Empty for a custom domain / Vercel. Set BASE_PATH=/gym-3d-website for a plain github.io project site.
const basePath = process.env.BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_STATIC_EXPORT: isStatic ? "1" : "" },
  ...(isStatic
    ? { output: "export", trailingSlash: true, assetPrefix: basePath || undefined, images: {
          // No image server on static hosting: a custom loader points at the pre-generated WebP sizes (scripts/import-assets.mjs).
          loader: "custom", loaderFile: "./lib/image-loader.ts",
          deviceSizes: [480, 768, 1080, 1440, 1920, 2560], imageSizes: [96, 256, 384],
        } }
    : {
        images: {
          formats: ["image/avif", "image/webp"],
          deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
          imageSizes: [96, 160, 256, 384, 512],
          qualities: [75, 85, 90],
          minimumCacheTTL: 31536000,
        },
        async headers() {
          return [{ source: "/video/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }];
        },
      }),
};
export default nextConfig;
