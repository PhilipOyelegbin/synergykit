import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "another-example.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.example.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "api.example.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "static.example.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
