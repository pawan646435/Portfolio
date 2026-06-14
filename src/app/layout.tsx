import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pawan Kumar | AI Engineer & Full-Stack Developer",
  description:
    "Building AI Systems, Full-Stack Products, and Intelligent Automations. Portfolio of Pawan Kumar — AI Engineer, Full-Stack Developer, and Automation Builder.",
  keywords: [
    "Pawan Kumar",
    "AI Engineer",
    "Full Stack Developer",
    "Automation",
    "Portfolio",
    "Next.js",
    "TypeScript",
    "Machine Learning",
    "LangChain",
  ],
  authors: [{ name: "Pawan Kumar" }],
  creator: "Pawan Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Pawan Kumar | AI Engineer & Full-Stack Developer",
    description:
      "Building AI Systems, Full-Stack Products, and Intelligent Automations.",
    siteName: "Pawan Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawan Kumar | AI Engineer & Full-Stack Developer",
    description:
      "Building AI Systems, Full-Stack Products, and Intelligent Automations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="noise-overlay">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
