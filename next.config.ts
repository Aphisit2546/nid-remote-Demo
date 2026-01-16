import type { NextConfig } from "next";

// Dynamic config for multi-platform deployment:
// - Vercel: No env var needed (uses default Next.js SSR)
// - Render: Set STATIC_EXPORT=true in Render Dashboard → Environment
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = isStaticExport
  ? {
    output: 'export',
    images: {
      unoptimized: true,
    },
  }
  : {};

export default nextConfig;
