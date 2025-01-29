import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
    domains: ['randomuser.me'],
  },
};

export default nextConfig;
