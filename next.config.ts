import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',

  // Image optimization (must be unoptimized for static export unless using a custom loader)
  images: {
    unoptimized: true,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
