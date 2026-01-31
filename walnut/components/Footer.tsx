'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail } from 'lucide-react';

const socialLinks = [
  { href: '#', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Mail, label: 'お問い合わせ' },
];

export function Footer() {
  return (
    <footer className="bg-sage-900 py-12 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl font-medium">
              花屋ウォルナット・グローブ
            </p>
            <p className="mt-1 text-sm text-sage-200">
              素朴で優しい、癒しの時間。
            </p>
          </div>

          <nav className="flex gap-6" aria-label="ソーシャルリンク">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-sage-200 transition-colors hover:text-cream"
                aria-label={link.label}
              >
                <link.icon size={20} />
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-sage-700 pt-8 text-center">
          <p className="text-sm text-sage-400">
            © {new Date().getFullYear()} 花屋ウォルナット・グローブ. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
