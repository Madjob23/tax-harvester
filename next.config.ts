import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'coin-images.coingecko.com',
      'koinx-statics.s3.ap-south-1.amazonaws.com'
    ],
  },
};

export default nextConfig;
