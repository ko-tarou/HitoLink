'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '#concept', label: 'コンセプト' },
  { href: '#products', label: '商品' },
  { href: '#location', label: '店舗情報' },
  { href: '#facilities', label: '周辺施設' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-4 transition-all duration-300 ${
            isScrolled ? 'bg-white/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <a
            href="#"
            className={`font-display text-lg font-medium transition-colors ${
              isScrolled ? 'text-charcoal-800' : 'text-white drop-shadow-md'
            }`}
          >
            フィールドノート立山店
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? 'text-charcoal-600' : 'text-white/90 drop-shadow'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${isScrolled ? 'text-charcoal-800' : 'text-white'}`}
            aria-label="メニュー"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-charcoal-900/95 backdrop-blur-md md:hidden"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.2 }}
      >
        <nav className="flex flex-col items-center justify-center gap-8 pt-24">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-xl font-medium text-white"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 16 }}
              transition={{ delay: i * 0.05 }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </>
  );
}
