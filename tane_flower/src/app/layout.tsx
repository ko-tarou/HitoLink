import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Shippori_Mincho,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TANE.FLOWER&LIFE LABORATORY | 花と生活雑貨のセレクトショップ",
  description:
    "富山県富山市。主張しすぎず、気持ちに寄り添える花。暮らしの中に気軽に花を置くことで、幸せな気持ちになってほしい。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${notoSansJP.variable} ${shipporiMincho.variable} ${playfairDisplay.variable} font-sans antialiased bg-cream text-charcoal`}
      >
        {children}
      </body>
    </html>
  );
}
