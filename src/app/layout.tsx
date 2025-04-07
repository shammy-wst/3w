import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const interMono = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3wsolution.fr"),
  title: {
    default: "3W Solutions - Développement Web & Mobile",
    template: "%s | 3W Solutions",
  },
  description:
    "Expertise en développement web et mobile - Solutions innovantes et sur mesure par 3W Solutions",
  keywords: [
    "développement web",
    "développement mobile",
    "applications",
    "site web",
    "design",
    "3W Solutions",
  ],
  authors: [
    { name: "Icham M'MADI" },
    { name: "Samy Hamlat" },
    { name: "Wissem Karboub" },
  ],
  creator: "3W Solutions",
  publisher: "3W Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/3w_favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://3wsolution.fr",
    siteName: "3W Solutions",
    title: "3W Solutions - Développement Web & Mobile",
    description:
      "Expertise en développement web et mobile - Solutions innovantes et sur mesure",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "3W Solutions - Développement Web & Mobile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3W Solutions - Développement Web & Mobile",
    description:
      "Expertise en développement web et mobile - Solutions innovantes et sur mesure",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${inter.variable} ${interMono.variable} antialiased min-h-screen bg-black flex flex-col overflow-x-hidden`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-black focus:text-white"
        >
          Aller au contenu principal
        </a>
        <Navigation />
        <main id="main-content" className="flex-1 flex flex-col w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
