import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
    // remotePatterns: [new URL('avatars.githubusercontent.com')],
  // },
  images: { domains: ['avatars.githubusercontent.com'], formats: ['image/avif', 'image/webp'], }, 
};

export default nextConfig;
