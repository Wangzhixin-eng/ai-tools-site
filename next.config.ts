import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ai-tools-site', // GitHub Pages 子目录
  images: {
    unoptimized: true,
  },
};


export default nextConfig;
