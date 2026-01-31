'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, ShoppingBag, MessageCircle } from 'lucide-react';

const links = [
  {
    name: 'Amazon',
    href: 'https://www.amazon.co.jp/',
    description: 'オンラインショップ',
  },
  {
    name: 'Yahoo! 花育通販',
    href: 'https://www.yahoo.co.jp/',
    description: '花育通販',
  },
  {
    name: 'アーバンジャングル',
    href: 'https://urban-jungle.jp/',
    description: '希少植物・アロイド',
  },
];

export function OnlineStore() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="online" ref={ref} className="bg-base py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-serif text-3xl font-medium text-primary md:text-4xl"
        >
          オンライン・デジタル
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="mt-4 font-sans text-primary/80"
        >
          全国からご購入いただける通販・LINE公式アカウント
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-4 rounded-xl border border-primary/15 bg-white p-6 shadow-sm transition hover:border-accent/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition group-hover:bg-accent/20 group-hover:text-accent">
                <ShoppingBag size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-serif text-lg font-medium text-primary">{link.name}</span>
                <p className="mt-0.5 font-sans text-sm text-primary/70">{link.description}</p>
              </div>
              <ExternalLink size={18} className="shrink-0 text-primary/50 group-hover:text-accent" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-2xl border-2 border-primary/10 bg-primary/5 p-8 md:p-10"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-primary">LINE公式アカウント</h3>
                <p className="mt-1 font-sans text-sm text-primary/80">
                  クーポン・8のつく日ポイント2倍などお得な情報を配信
                </p>
              </div>
            </div>
            <motion.a
              href="https://line.me/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-8 py-3 font-sans font-medium text-white shadow-md transition hover:bg-[#05b34b]"
            >
              <MessageCircle size={20} />
              LINEで友だち追加
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
