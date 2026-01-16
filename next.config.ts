import type { NextConfig } from "next";

// Use STATIC_EXPORT env var to switch between platforms
// Render: Set STATIC_EXPORT=true in environment variables
// Vercel: Don't set anything (default)
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: 'export',
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
