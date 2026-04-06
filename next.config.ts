import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hubspot-credentials-na1.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
