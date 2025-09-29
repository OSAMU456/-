import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  serverExternalPackages: ['@prisma/client']
};

export default nextConfig;
