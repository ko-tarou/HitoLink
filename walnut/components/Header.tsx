'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#hero', label: 'トップ' },
  { href: '#about', label: '私たちについて' },
  { href: '#features', label: '取り扱い' },
  { href: '#access', label: 'アクセス' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(253, 251, 247, 0)', 'rgba(253, 251, 247, 0.95)']
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(45, 58, 43, 0.08)']
  );

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20" />
    );
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-colors"
      style={{
        backgroundColor: headerBg,
        boxShadow: headerShadow,
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="#hero"
          className="font-heading text-lg font-medium text-sage-800 md:text-xl"
        >
          花屋ウォルナット・グローブ
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-beige-800 transition-colors hover:text-terracotta-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
          className="md:hidden p-2 text-beige-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="absolute top-full left-0 right-0 bg-cream/98 shadow-lg md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-beige-800 hover:text-terracotta-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
}
