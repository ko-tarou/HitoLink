import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: '花屋ウォルナット・グローブ | Walnut Grove',
  description:
    '富山県富山市にある、ゆっくりと時間が流れる小さなお店。素朴で優しい花やグリーン、ハーブを取り揃えています。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;500;600;700&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body min-h-screen bg-cream text-beige-900 antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
