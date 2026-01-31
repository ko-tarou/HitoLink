import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOBIRA - トベラ | 富山のアンティーク＆リユースセレクトショップ",
  description:
    "富山市にあるアンティークとリユースのセレクトショップ。植物とアンティークが共存する空間で、人と文化をつなぐ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-[var(--color-offwhite)] text-[var(--color-wood)] font-sans">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
