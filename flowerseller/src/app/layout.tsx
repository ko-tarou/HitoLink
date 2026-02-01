import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeColorMeta } from "@/components/ThemeColorMeta";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flower Seller - 花屋業務効率化",
  description: "在庫・入荷・レジ・価格・鮮度を一元管理",
  manifest: "/manifest.json",
};

/** アドレスバー・タブバーなどのブラウザ UI の色（白ベースのデザインに合わせる） */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className={`${notoSansJP.className} antialiased min-h-screen bg-base text-text leading-relaxed`}>
        <ThemeColorMeta />
        {children}
      </body>
    </html>
  );
}
