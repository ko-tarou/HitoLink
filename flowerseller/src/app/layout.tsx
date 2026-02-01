import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flower Seller - 花屋業務効率化",
  description: "在庫・入荷・レジ・価格・鮮度を一元管理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-maroon text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
