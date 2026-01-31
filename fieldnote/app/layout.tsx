import type { Metadata } from 'next';
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-zen-kaku',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'フィールドノート立山店 | 日常で自然を感じる、立山のライフスタイル雑貨店',
  description:
    'モンベルヴィレッジ立山のコンセプトショップ。植物、食品、オーガニックコーヒー、アロマ、おもちゃ、文房具など、自然と暮らしを結ぶ雑貨をお届けします。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${zenKaku.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
