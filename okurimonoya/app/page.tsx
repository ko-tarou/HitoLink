'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Gift, Heart, Sparkles, MapPin, Phone, Instagram, CreditCard, Baby, GraduationCap, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredItems = [
    {
      title: 'おむつケーキ',
      description: '今治タオル使用、人気キャラクター付き。出産祝いNo.1の人気商品。',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80',
      icon: Baby,
    },
    {
      title: '富山産コシヒカリ',
      description: 'メッセージ付きのお米ギフト。感謝の気持ちを届けます。',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
      icon: Heart,
    },
    {
      title: 'セレモニーギフト',
      description: '卒業・入学式用コサージュ、ブローチ。特別な日を彩ります。',
      image: 'https://images.unsplash.com/photo-1513696971289-0c3ff6fc6b90?w=800&q=80',
      icon: GraduationCap,
    },
    {
      title: '名入れギフト',
      description: '特別な記念日に。世界でひとつだけのオリジナルギフト。',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
      icon: Star,
    },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'カスタマイズ可能',
      description: 'ご要望に合わせて、オーダーメイドのギフトをお作りします。',
    },
    {
      icon: Gift,
      title: '県外発送OK',
      description: '全国どこでもお届け。大切な方へ想いを届けます。',
    },
    {
      icon: Heart,
      title: '実用的で優しい',
      description: '肌に優しい素材、使えるギフトにこだわっています。',
    },
  ];

  return (
    <div className="min-h-screen bg-ivory font-noto">
      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-[#f4e4d7]/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="text-2xl font-playfair font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
              OKURIMONOYA
            </span>
          </motion.div>
          <div className="hidden md:flex space-x-8 text-sm tracking-wide">
            {['Home', 'About', 'Items', 'Access', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-gold-light transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-light transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />
          <Image
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&q=80"
            alt="Gift background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        
        <motion.div
          className="relative z-10 text-center px-6 space-y-8"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-4 drop-shadow-2xl">
              富山から、
              <br />
              心をつなぐ贈り物を。
            </h1>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-white/90 font-light drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            出産祝い・記念日のための特別なギフトショップ
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <motion.a
              href="#items"
              className="inline-block bg-gradient-to-r from-gold-light to-gold text-white px-12 py-4 rounded-full text-lg font-medium shadow-2xl"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(212, 165, 116, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              商品を見る
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
              About Our Shop
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto mb-8" />
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              肌に優しい素材や「使えるギフト」にこだわり、富山県富山市で地元に愛されるお店です。
              <br />
              出産祝いのおむつケーキから、卒業・入学のコサージュまで、
              <br />
              あなたの想いを形にします。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-3xl p-8 text-center shadow-lg border border-cream"
              >
                <motion.div
                  className="inline-block p-4 bg-gradient-to-br from-cream-light to-cream rounded-2xl mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-8 h-8 text-gold-light" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section id="items" className="py-32 px-6 bg-gradient-to-b from-ivory to-peach">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
              Featured Items
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl"
                whileHover={{ y: -15 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.div
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5 text-gold-light" />
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access Section */}
      <section id="access" className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-6">
              Shop Info & Access
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-light to-gold mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-cream-light to-cream rounded-xl">
                  <MapPin className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">住所</h3>
                  <p className="text-gray-600">
                    富山県富山市千歳町1丁目6-18 河口ビル1F
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-to-br from-cream-light to-cream rounded-xl">
                  <Phone className="w-6 h-6 text-gold-light" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">電話番号</h3>
                  <p className="text-gray-600">076-442-0801</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cream-light to-cream rounded-2xl p-6">
                <h3 className="font-bold text-gray-800 mb-3">アクセス</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• 富山地鉄「地鉄ビル前」徒歩3分</li>
                  <li>• JR富山駅 徒歩10分</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-gold-light/20">
                  <p className="text-sm text-gray-600">営業時間：不定休（要事前連絡）</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-200 rounded-3xl overflow-hidden shadow-2xl h-[500px] relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gold-light" />
                  <p className="text-lg">Google Maps</p>
                  <p className="text-sm">富山県富山市千歳町1-6-18</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4 bg-gradient-to-r from-gold-light to-gold bg-clip-text text-transparent">
                OKURIMONOYA
              </h3>
              <p className="text-gray-400 leading-relaxed">
                富山から、心をつなぐ贈り物をお届けします。
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">お問い合わせ</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>076-442-0801</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Instagram className="w-4 h-4" />
                  <a
                    href="https://instagram.com/okurimono_ya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-light transition-colors"
                  >
                    @okurimono_ya
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">お支払い方法</h4>
              <div className="flex space-x-3">
                <div className="p-2 bg-white rounded">
                  <CreditCard className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  VISA / Master / JCB<br />その他各種対応
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 OKURIMONOYA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
