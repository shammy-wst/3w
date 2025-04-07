// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  distDir: ".next",
};

module.exports = nextConfig;
