'use client';

import { motion } from 'framer-motion';
import { Phone, Instagram } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl mb-8 leading-relaxed">
            ご注文・ご予約はお電話にて承ります。
          </p>
          <motion.a
            href="tel:076-422-6811"
            className="relative inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal font-sans font-medium rounded-sm overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-dusty-pink-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-sm" />
            <Phone className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Call 076-422-6811</span>
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 pt-10 border-t border-cream/20 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <span className="font-serif text-lg text-cream/90">
            FLOWERWORKS nico
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/80 hover:text-cream transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
