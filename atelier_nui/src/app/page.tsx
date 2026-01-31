'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Menu,
  X,
  Instagram,
  MapPin,
  Clock,
  ExternalLink,
  Scissors,
} from 'lucide-react';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#collections', label: 'Collections' },
  { href: '#access', label: 'Access' },
  { href: 'https://ateliernui.fashionstore.jp', label: 'Online Shop', external: true },
];

const COLLECTION_ITEMS = [
  {
    category: 'Vintage & Antique',
    items: ['Snoopy Trash Box', 'Cotton Blanket Multi Cover'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    tag: '一点もの',
  },
  {
    category: 'Handmade & Remake',
    items: ['Antique Patchwork Dress', 'Vintage France Linen Remake Dress'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    tag: 'SOLD OUT多数',
  },
  {
    category: 'Others',
    items: ['Kitchenware', 'Accessories', 'Books'],
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80',
    tag: '一点もの中心',
  },
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setHeaderScrolled(v > 60));
    return () => unsub();
  }, [scrollY]);

  return (
    <>
      <Header
        scrolled={headerScrolled}
        mobileOpen={mobileMenuOpen}
        onMobileToggle={() => setMobileMenuOpen((o) => !o)}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <CollectionsSection />
        <ServicesSection />
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}

function Header({
  scrolled,
  mobileOpen,
  onMobileToggle,
}: {
  scrolled: boolean;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ecru/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8">
        <a href="#" className="font-display text-xl tracking-[0.2em] text-ink md:text-2xl">
          Atelier NUI
        </a>
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-widest text-muted transition hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest text-muted transition hover:text-ink"
              >
                {link.label}
              </a>
            )
          )}
        </nav>
        <button
          type="button"
          aria-label="メニュー"
          className="p-2 text-ink md:hidden"
          onClick={onMobileToggle}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 top-16 flex flex-col gap-6 bg-ecru/95 backdrop-blur-md px-6 py-8 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="font-display text-lg tracking-widest text-ink"
              onClick={() => onMobileToggle()}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

  const copy = 'たった一つのアイテムとの出会いを大切に';

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-greige">
      <motion.div
        style={{ scale, y }}
        className="absolute inset-0 -inset-y-[10%]"
      >
        <Image
          src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1920&q=85"
          alt="Atelier NUI 店内の雰囲気"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/20" />
      </motion.div>
      <div className="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-20 md:px-12 lg:px-16">
        <motion.div
          style={{ opacity }}
          className="max-w-4xl space-y-6 md:space-y-8"
        >
          <div className="overflow-hidden">
            <h1 className="font-display text-4xl leading-tight tracking-[0.15em] text-white drop-shadow-lg md:text-5xl lg:text-6xl xl:text-7xl">
              {copy.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="font-serif text-lg tracking-[0.2em] text-white/95 md:text-xl"
          >
            Cherish the encounter with a single item.
          </motion.p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 h-8 w-px bg-white/50"
      />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative bg-ecru py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[3/4]">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80"
                alt="アンティークのある暮らし"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
          <div className="space-y-8">
            <h2 className="font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
              About
            </h2>
            <div className="space-y-6 font-sans text-muted leading-relaxed md:text-lg">
              <p>
                富山県富山市にある、アンティークとヴィンテージ専門のセレクトショップです。
              </p>
              <p>
                アメリカなど海外から直接仕入れた一点ものを中心に、厳選したアイテムをお届けしています。
              </p>
              <p className="font-serif text-ink">
                「アンティークのある暮らし」を、私たちは提案します。
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CollectionsSection() {
  return (
    <section id="collections" className="bg-greige py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="mb-16">
          <h2 className="font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
            Collections
          </h2>
          <p className="mt-4 text-muted">
            一点もの中心のため、SOLD OUT になる商品も多数ございます。
          </p>
        </Reveal>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {COLLECTION_ITEMS.map((block, i) => (
            <Reveal key={block.category} className="group">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-sm bg-ecru shadow-md transition-shadow duration-300 group-hover:shadow-xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={block.image}
                      alt={block.category}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                  <span className="absolute top-4 right-4 rounded bg-ink/80 px-3 py-1 text-xs tracking-widest text-white">
                    {block.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg tracking-[0.15em] text-ink">
                    {block.category}
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted">
                    {block.items.map((item) => (
                      <li key={item}>・{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-ecru py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-16 md:text-left">
          <motion.div
            whileHover={{ rotate: -3 }}
            className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-greige md:mb-0"
          >
            <Scissors className="h-8 w-8 text-ink" strokeWidth={1.2} />
          </motion.div>
          <div className="max-w-2xl space-y-4">
            <h2 className="font-display text-2xl tracking-[0.2em] text-ink md:text-3xl">
              Repair & Remake
            </h2>
            <p className="text-muted leading-relaxed">
              古い物を愛する方へ。リペア・リメイクサービスも承っております。お気に入りの一品を、長く大切に使っていただくお手伝いをいたします。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section id="access" className="bg-greige py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <Reveal className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="font-display text-3xl tracking-[0.2em] text-ink md:text-4xl">
              Access
            </h2>
            <div className="space-y-6 text-muted">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <p>
                  〒930-0856<br />
                  富山県富山市旭町8-15<br />
                  <span className="text-sm">住宅街の隠れ家的店舗</span>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <p>
                  営業時間：12:00 〜 18:00<br />
                  定休日：木曜日
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/atelier_nui_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-ink/30 px-5 py-3 text-sm tracking-widest text-ink transition hover:bg-ink hover:text-ecru"
              >
                <Instagram className="h-4 w-4" />
                @atelier_nui_
              </a>
              <a
                href="https://ateliernui.fashionstore.jp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-ink px-6 py-3 text-sm tracking-widest text-ecru transition hover:bg-ink/90"
              >
                Online Shop
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
              alt="店舗周辺"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-warm/50 bg-ecru py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-8">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} Atelier NUI. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/atelier_nui_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-muted transition hover:text-ink"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
