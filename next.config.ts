import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly tell Vercel to include the docs folder in the serverless deployment
  outputFileTracingIncludes: {
    '/docs/*': ['./docs/**/*'],
  },
};

export default nextConfig;
