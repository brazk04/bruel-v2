import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com", pathname: "/bruel-media/image/**", search: "" }],
  },
  experimental: {
    workerThreads: true,
  },
};

export default nextConfig;
