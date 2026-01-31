import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New, Playfair_Display } from "next/font/google";
import "./globals.css";
import { DuckLoader } from "@/components/DuckLoader";
import { MouseStalker } from "@/components/MouseStalker";
import { Header } from "@/components/Header";

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cafe & Zakka moohno（モーノ）| 白に包まれた、癒やしの時間",
  description:
    "富山県富山市のカフェ＆雑貨 moohno。白基調の空間で、アヒルと雑貨と甘い午後を。2011年オープン、10周年を迎えた癒やしのカフェ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${zenKaku.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-offwhite text-darkgray min-h-screen">
        <DuckLoader />
        <MouseStalker />
        <Header />
        {children}
      </body>
    </html>
  );
}
