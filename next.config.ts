import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/producten/:slug",
        destination: "/products/:slug",
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["radix-ui"],
  },
};

export default nextConfig;
