import type { Metadata } from "next";
import { Orbitron, Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "COSMIC BLUES | 富山のアメリカン雑貨店",
  description: "2012年創業。富山県富山市下大久保にある、深夜25時まで営業するアメリカンスタイルの輸入雑貨店。オーナーセレクトのユニークなインポートグッズが所狭しと並ぶ、大人の遊び場。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${bebasNeue.variable} ${inter.variable} antialiased bg-[#050510] text-[#e0e0e0]`}
      >
        {children}
      </body>
    </html>
  );
}
