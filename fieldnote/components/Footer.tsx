'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-charcoal-900 py-16 text-sand-200">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="font-display text-lg font-medium text-white">
              フィールドノート立山店
            </p>
            <p className="mt-1 text-sm text-sand-300">
              FIELD NOTE TATEYAMA
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://maps.google.com/?q=富山県中新川郡立山町五郎丸335"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 transition-colors hover:text-white md:justify-start"
            >
              <MapPin className="h-4 w-4 shrink-0" />
              富山県中新川郡立山町五郎丸335
            </a>
            <a
              href="tel:076-463-6201"
              className="flex items-center justify-center gap-2 transition-colors hover:text-white md:justify-start"
            >
              <Phone className="h-4 w-4 shrink-0" />
              076-463-6201
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-charcoal-700 pt-8 text-center text-xs text-sand-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p>© {new Date().getFullYear()} フィールドノート立山店. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
