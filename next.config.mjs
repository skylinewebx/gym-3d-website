/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Wide sizes so 4K masters stay sharp on retina / large monitors.
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
    imageSizes: [96, 160, 256, 384, 512],
    qualities: [75, 85, 90],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};
export default nextConfig;
