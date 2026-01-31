"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Flower2,
  Leaf,
  Gift,
  ShoppingBag,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useRef } from "react";

const navLinks = [
  { href: "#hero", label: "トップ" },
  { href: "#about", label: "コンセプト" },
  { href: "#products", label: "商品" },
  { href: "#occasions", label: "シーン" },
  { href: "#access", label: "アクセス" },
];

const products = [
  {
    title: "フレッシュフラワー",
    description: "季節の切り花、ブーケ、アレンジメント。誕生日や記念日など、さまざまなシーンにお届けします。",
    icon: Flower2,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
  {
    title: "観葉植物",
    description: "小〜中サイズの観葉植物。お部屋のインテリアやギフトにぴったりです。",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
  },
  {
    title: "プリザーブド・ソープフラワー",
    description: "長く美しさを楽しめる、枯れないお花のギフト。特別な贈り物に。",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1518896010350-2e9f021e5d4c?w=800&q=80",
  },
  {
    title: "グッズ",
    description: "花器やライフスタイルグッズ。お気に入りの空間づくりにお役立てください。",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
  },
  {
    title: "季節の贈り物",
    description: "卒業祝い、春の贈り物など、季節に合わせた特別なアレンジメント。",
    icon: Gift,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
  },
];

const occasions = [
  "お買い物・立ち寄り（1F）",
  "お見送り・転勤祝い",
  "誕生日・記念日",
  "開業祝い",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sage-300/20"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <Flower2 size={24 + i * 8} strokeWidth={0.5} />
        </motion.div>
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`leaf-${i}`}
          className="absolute text-sage-400/15"
          style={{
            right: `${10 + i * 20}%`,
            bottom: `${15 + (i % 2) * 20}%`,
          }}
          animate={{
            y: [0, 20, 0],
            rotate: [0, -20, 20, 0],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        >
          <Leaf size={20 + i * 6} strokeWidth={0.5} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const parallaxY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -80, -40]);

  return (
    <>
      <FloatingPetals />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream-100/90 backdrop-blur-md border-b border-sage-200/50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#hero" className="font-display text-xl sm:text-2xl text-charcoal-500 font-medium">
              コノカ ファボーレ
            </a>
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-charcoal-400 hover:text-sage-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="md:hidden flex gap-4">
              {navLinks.slice(0, 3).map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-charcoal-400">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex flex-col justify-center relative overflow-hidden"
        >
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=85"
                alt="鮮やかな花々"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-charcoal-500/30" />
            </div>
          </motion.div>
          <motion.div
            style={{ y: parallaxY }}
            className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-5xl sm:text-7xl lg:text-8xl text-cream-50 font-medium tracking-tight"
            >
              コノカ ファボーレ
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-2xl sm:text-3xl text-cream-200 mt-2"
            >
              富山店
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8 text-lg sm:text-xl text-cream-100 max-w-2xl mx-auto"
            >
              好花・好香・好家
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-2 text-cream-200/90 text-sm sm:text-base"
            >
              花と緑のある快適な暮らしを。
            </motion.p>
            <motion.a
              href="#about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="inline-block mt-12 sm:mt-16 px-8 py-4 border-2 border-cream-200 text-cream-100 hover:bg-cream-200/10 transition-colors rounded-sm font-medium"
            >
              詳しく見る
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cream-300/50 rounded-full flex justify-center pt-2"
            >
              <motion.div className="w-1.5 h-3 bg-cream-300/70 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* About / Concept */}
        <section id="about" className="py-20 sm:py-28 lg:py-36 bg-cream-100 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <motion.div variants={itemVariants} className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80"
                  alt="店舗の様子"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <p className="text-sage-600 text-sm font-medium tracking-widest mb-4">クリエイティブフラワー</p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal-500 font-medium mb-6">
                  コンセプト
                </h2>
                <p className="text-charcoal-400 text-base sm:text-lg leading-relaxed">
                  「コノカ」は、花と緑であふれる快適な暮らしを提案するブランドです。
                  ファボーレ富山に位置する当店では、日常使いから特別な日にいたるまで、
                  「ワンランク上の花の贈り物」で、笑顔を届ける温かなサービスをお届けしています。
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Products & Services */}
        <section id="products" className="py-20 sm:py-28 lg:py-36 bg-cream-200/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sage-600 text-sm font-medium tracking-widest mb-4">商品・サービス</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal-500 font-medium">
                取り扱い商品
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {products.map((product, i) => (
                <motion.article
                  key={product.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group bg-cream-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-sage-200/30"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-500/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <product.icon className="text-cream-100 w-8 h-8 mb-2" />
                      <h3 className="font-display text-xl text-cream-50 font-medium">{product.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-charcoal-400 text-sm leading-relaxed">{product.description}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Occasions */}
        <section id="occasions" className="py-20 sm:py-28 lg:py-36 bg-cream-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sage-600 text-sm font-medium tracking-widest mb-4">こんなシーンに</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal-500 font-medium">
                ギフトシーン
              </h2>
            </motion.div>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
            >
              {occasions.map((occasion) => (
                <motion.li
                  key={occasion}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-6 bg-cream-200/50 rounded-lg border border-sage-200/30 hover:border-sage-300/50 transition-colors"
                >
                  <Gift className="text-sage-600 w-6 h-6 flex-shrink-0" />
                  <span className="text-charcoal-500 font-medium">{occasion}</span>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-600 text-cream-50 rounded-lg hover:bg-sage-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                LINE公式アカウントで最新情報をチェック
              </a>
            </motion.div>
          </div>
        </section>

        {/* Shop Info & Access */}
        <section id="access" className="py-20 sm:py-28 lg:py-36 bg-cream-200/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-sage-600 text-sm font-medium tracking-widest mb-4">店舗情報</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-charcoal-500 font-medium">
                アクセス
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid lg:grid-cols-2 gap-12"
            >
              <motion.div variants={itemVariants} className="relative h-80 lg:h-96 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80"
                  alt="店舗の場所"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-sage-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal-500 mb-1">所在地</h3>
                    <p className="text-charcoal-400 leading-relaxed">
                      〒930-0856<br />
                      富山県富山市婦中町下轡田165-1<br />
                      ファボーレ富山 1F（フードホール付近）
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-sage-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal-500 mb-1">Hours</h3>
                    <p className="text-charcoal-400">10:00 - 21:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-sage-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-lg font-medium text-charcoal-500 mb-1">電話番号</h3>
                    <a href="tel:076-461-5187" className="text-sage-700 hover:text-sage-800 transition-colors">
                      076-461-5187
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-charcoal-500 text-cream-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-2xl text-cream-50 mb-4">コノカ ファボーレ富山</p>
            <p className="text-sm">© クリエイティブフラワー株式会社</p>
          </div>
        </footer>
      </main>
    </>
  );
}
