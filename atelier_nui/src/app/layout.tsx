import type { Metadata } from 'next';
import { Cinzel, Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atelier NUI | アンティーク・ヴィンテージショップ',
  description:
    '富山県富山市のアンティークとヴィンテージ専門セレクトショップ。一点ものとの出会いを大切に。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${cinzel.variable} ${playfair.variable} ${sourceSans.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
