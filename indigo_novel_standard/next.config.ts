import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img13.shop-pro.jp",
        pathname: "/PA01278/378/product/**",
      },
    ],
  },
};

export default nextConfig;
