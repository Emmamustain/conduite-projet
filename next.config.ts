import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/conduite-projet',
};

export default nextConfig;
