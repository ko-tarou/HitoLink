import type { Metadata } from "next";
import { Playfair_Display, Noto_Serif_JP, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ease Life | イーズライフ — 富山のアンティーク・ヴィンテージ雑貨",
  description:
    "富山県富山市のアンティーク・ヴィンテージ雑貨専門店。アメリカ輸入家具、雑貨、古着を丁寧に修復してご提供。Timeless Value, Crafted for Life.",
  openGraph: {
    title: "Ease Life | イーズライフ",
    description: "富山のアンティーク・ヴィンテージ雑貨専門店",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${notoSerifJP.variable} ${dmSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
