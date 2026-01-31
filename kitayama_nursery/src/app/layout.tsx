import type { Metadata } from 'next';
import { Noto_Serif_JP, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import { MouseStalker } from '@/components/MouseStalker';

const notoSerif = Noto_Serif_JP({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
});

const notoSans = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '北山ナーセリー | 北陸最大級の園芸・造園',
  description:
    '創業1987年、富山県富山市。北陸最大級の園芸店・造園企業。植物と暮らす豊かさを、富山から。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        <MouseStalker />
        {children}
      </body>
    </html>
  );
}
