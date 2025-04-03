import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ui-avatars.com"],
  },
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
  },
  // Configuration pour l'API Route
  serverRuntimeConfig: {
    // Sera disponible uniquement côté serveur
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
  },
  publicRuntimeConfig: {
    // Sera disponible côté client et serveur
    contactEmail: "contact@3wsolution.fr",
  },
};

export default nextConfig;
