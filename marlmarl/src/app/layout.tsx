import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "森の雑貨やさん＊MARL MARL＊ | 富山の小さなお家で出会う雑貨",
  description:
    "富山の小さなお家で出会う、心ときめく雑貨たち。2025年10月27日 OPEN。かわいい雑貨とMARL MARLブランドのベビー・キッズアイテムをお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSerif.variable} ${notoSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
