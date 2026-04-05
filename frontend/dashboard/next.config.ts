import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the production image in `docker/nextjs.Dockerfile` (standalone server bundle).
  output: "standalone",
};

export default nextConfig;
