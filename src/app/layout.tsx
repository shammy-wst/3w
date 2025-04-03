import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3W Solutions - Développement Web & Mobile",
  description: "Expertise en développement web et mobile - 3W Solutions",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/3w_favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/3w_favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black flex flex-col overflow-x-hidden`}
      >
        <Navigation />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
