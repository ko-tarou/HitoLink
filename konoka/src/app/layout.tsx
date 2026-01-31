import type { Metadata } from "next";
import { Noto_Sans_JP, Playfair_Display } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "コノカ ファボーレ富山 | 好花・好香・好家",
  description:
    "花と緑のある快適な暮らしを。ファボーレ富山のフラワーショップ「コノカ」。ワンランク上の花の贈り物をお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
