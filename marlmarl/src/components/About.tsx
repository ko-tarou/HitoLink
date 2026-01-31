"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Heart, Users } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background - warm cream with organic shapes */}
      <div className="absolute inset-0 bg-cream-100" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-200/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-300/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 paper-overlay" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-100 text-forest-700 text-sm font-medium mb-8">
            2025年10月27日 OPEN
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-forest-900 mb-6">
            小さなお家のような
            <span className="block text-forest-600">あたたかい雑貨やさん</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-earth-500 text-lg sm:text-xl leading-loose max-w-2xl mx-auto"
          >
            お店でありながら、まるでお家に遊びに来たような
            <br className="hidden sm:block" />
            ゆったりとした空気感。心ときめく雑貨たちが、
            <br className="hidden sm:block" />
            あたたかいインテリアに囲まれてあなたをお迎えします。
          </motion.p>
        </motion.div>

        {/* Concept cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-16 sm:mt-24 grid sm:grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative p-8 sm:p-10 rounded-2xl bg-cream-200/60 border border-earth-200/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-forest-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-forest-200/30 flex items-center justify-center mb-6 group-hover:bg-forest-300/40 transition-colors">
                <Home className="w-6 h-6 text-forest-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-forest-800 mb-3">
                お店 × お家
              </h3>
              <p className="text-earth-500 leading-relaxed">
                コーヒーを飲みながら、のんびりと雑貨を眺める。そんなあたたかい空間を、ご夫婦でつくっています。
              </p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative p-8 sm:p-10 rounded-2xl bg-cream-200/60 border border-earth-200/50 backdrop-blur-sm"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gold-300/20 flex items-center justify-center mb-6 group-hover:bg-gold-300/30 transition-colors">
                <Users className="w-6 h-6 text-gold-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-forest-800 mb-3">
                ご夫婦で営むお店
              </h3>
              <p className="text-earth-500 leading-relaxed">
                夫は電気工事士、妻はデザイン・広告制作。それぞれの経験を活かし、居心地のよい空間づくりをしています。
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-forest-600">
            <Heart className="w-5 h-5 text-forest-400" fill="currentColor" />
            <span className="font-serif text-lg">心をこめて、お待ちしています</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
