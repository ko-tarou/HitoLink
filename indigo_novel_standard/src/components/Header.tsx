'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#brands', label: 'Brands' },
  { href: '#new-arrival', label: 'Items' },
  { href: '#collection', label: 'Collection' },
  { href: '#access', label: 'Access' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(250, 250, 249, 0)', 'rgba(250, 250, 249, 0.95)']
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 1px 3px rgba(0,0,0,0.08)']
  );

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6"
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
    >
      <motion.nav
        className="mx-auto flex max-w-7xl items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#" className="font-serif text-lg font-medium tracking-wide text-[var(--indigo-deep)] md:text-xl">
          INDIGO Novel STANDARD
        </a>
        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--concrete)] transition-colors hover:text-[var(--indigo-deep)]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center text-[var(--indigo-deep)] md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-4 pt-4 pb-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-[var(--concrete)] transition-colors hover:text-[var(--indigo-deep)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
