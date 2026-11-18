import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["10.10.3.32", "10.10.3.57", "localhost", "127.0.0.1"],
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
