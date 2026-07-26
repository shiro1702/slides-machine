import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: [
    "@remotion/renderer",
    "@remotion/bundler",
    "@sparticuz/chromium",
    "sharp",
  ],
};

export default nextConfig;
