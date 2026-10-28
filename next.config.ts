import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: '/veterans-tribute',
  async rewrites() { return [{ source: '/veterans-tribute/:path*', destination: '/:path*' }]; },
};

export default nextConfig;
