import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/ui/AppProviders";

// Critical — used on the entry gate, preloaded so it's ready for first paint.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Non-critical — only used inside rooms, entered after the gate.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

// Non-critical — only used inside rooms, entered after the gate.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

// Critical — used on the entry gate, preloaded so it's ready for first paint.
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Pawan Kumar | The Codex",
  description:
    "Full Stack & AI Engineer — building intelligent web products. Portfolio of Pawan Kumar.",
  openGraph: {
    title: "Pawan Kumar | The Codex",
    description:
      "Full Stack & AI Engineer — building intelligent web products. Portfolio of Pawan Kumar.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <div className="parchment-overlay" aria-hidden="true" />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
