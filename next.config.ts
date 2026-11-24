import type { NextConfig } from "next";

// Static export: the whole site is pre-rendered HTML + JS, deployable on Vercel or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
