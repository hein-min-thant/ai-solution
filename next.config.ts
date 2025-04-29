import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["unsplash.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
