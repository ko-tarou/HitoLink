import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GrainOverlay } from "@/components/GrainOverlay";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EASE ANTIQUES | 富山で出会うアメリカン・ヴィンテージ",
  description:
    "1800年代後半〜1900年代のアメリカを中心としたヴィンテージ品の修繕・販売。EASE ANTIQUES & EASE LIFE — 富山県富山市。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-cream text-wood-dark`}
        style={{ "--font-playfair": "'Playfair Display', Georgia, serif" } as React.CSSProperties}
      >
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
