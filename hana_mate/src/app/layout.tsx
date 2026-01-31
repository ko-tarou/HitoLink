import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "花メイト | Hana Mate - 富山の花と緑",
  description:
    "花と緑で、心をつなぐ。富山テレビ事業株式会社のフラワー部門として、花と緑の総合サービスを提供。花束・アレンジメント、ブライダル、プリザーブドフラワー、胡蝶蘭、お庭づくり。",
  openGraph: {
    title: "花メイト | Hana Mate",
    description: "花と緑で、心をつなぐ。富山の花屋。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
