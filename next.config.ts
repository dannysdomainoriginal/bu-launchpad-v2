import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-27617d892f9b4192bb419368c9cff975.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-2c5b3ab3ab684400bc3b56ce7e6e1cbb.r2.dev",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
