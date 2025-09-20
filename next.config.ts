import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/**')],
    unoptimized: true,
  },
};

export default nextConfig;
