import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jma.go.jp",
        pathname: "/bosai/forecast/img/**",
      },
    ],
  },
};

export default nextConfig;
