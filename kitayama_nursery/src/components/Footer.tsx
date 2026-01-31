'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube } from 'lucide-react';

const companyInfo = {
  name: '北山ナーセリー',
  establishment: '1987年設立',
  capital: '資本金 800万円',
  representative: '代表取締役社長 北山直人',
  address: '富山県富山市',
  shops: [
    '富山店：富山市有沢189-1',
    '高岡店：高岡市六家堂田744-1',
    '東店：魚津市木下新234',
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary py-16 text-base/90 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="font-serif text-2xl font-medium text-white">{companyInfo.name}</h3>
            <ul className="mt-6 space-y-1 font-sans text-sm text-base/80">
              <li>{companyInfo.establishment}</li>
              <li>{companyInfo.capital}</li>
              <li>{companyInfo.representative}</li>
              <li>{companyInfo.address}</li>
              {companyInfo.shops.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-serif text-lg font-medium text-white">SNS</h4>
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base/10 text-base transition hover:bg-base/20"
                aria-label="Instagram @nursery_ktym_tymten"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-base/10 text-base transition hover:bg-base/20"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            <p className="mt-2 font-sans text-xs text-base/60">Instagram @nursery_ktym_tymten</p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-base/20 pt-8 text-center font-sans text-sm text-base/60"
        >
          © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
