import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  display: "swap",
  weight: ["200", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "小屋のじかん | 楽しむ暮らし、丁寧に暮らす。",
  description:
    "雑貨・家具・小屋の専門店。木の小屋『Core Cabin』を基点に、趣味部屋や仕事スペースとしての活用を提案。富山・長野でお待ちしています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSans.variable} ${notoSerif.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
