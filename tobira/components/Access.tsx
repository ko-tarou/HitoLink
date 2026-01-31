"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram, ExternalLink } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/tobira.toyama/";
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=富山県富山市新庄町9-2";

export default function Access() {
  return (
    <section
      id="access"
      className="relative py-24 md:py-32 px-6 bg-[var(--color-cream)] overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-[family-name:var(--font-serif)] text-3xl md:text-5xl text-[var(--color-forest)] text-center tracking-wide mb-16 md:mb-20"
      >
        Access & Info
      </motion.h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-[var(--color-brass)] shrink-0 mt-1" />
            <div>
              <p className="text-xs tracking-widest text-[var(--color-wood)]/70 mb-1">ADDRESS</p>
              <p className="text-[var(--color-wood)] leading-relaxed">
                富山県富山市新庄町9-2
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock className="w-6 h-6 text-[var(--color-brass)] shrink-0 mt-1" />
            <div>
              <p className="text-xs tracking-widest text-[var(--color-wood)]/70 mb-1">HOURS</p>
              <p className="text-[var(--color-wood)] leading-relaxed">
                10:00〜17:00（月〜土）
                <br />
                日・祝定休
              </p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--color-forest)]/10 border border-[var(--color-brass)]/40 text-[var(--color-wood)] text-sm"
              >
                <span className="font-medium">※ Instagramで最新の営業時間を必ずご確認ください</span>
              </motion.p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="w-6 h-6 text-[var(--color-brass)] shrink-0 mt-1" />
            <div>
              <p className="text-xs tracking-widest text-[var(--color-wood)]/70 mb-1">CONTACT</p>
              <a
                href="tel:076-460-3804"
                className="text-[var(--color-wood)] hover:text-[var(--color-brass)] transition-colors"
              >
                076-460-3804
              </a>
            </div>
          </div>

          <div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-forest)] text-[var(--color-offwhite)] hover:bg-[var(--color-wood)] transition-colors font-medium"
            >
              <Instagram size={22} />
              <span>@tobira.toyama</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-forest)]/20 border border-[var(--color-wood)]/20 hover:border-[var(--color-brass)]/50 transition-colors group"
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-forest)]/5">
              <div className="text-center p-6">
                <MapPin className="w-12 h-12 text-[var(--color-brass)] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-[family-name:var(--font-serif)] text-lg text-[var(--color-wood)] mb-2">
                  Google Maps で開く
                </p>
                <p className="text-sm text-[var(--color-wood)]/70">
                  富山市新庄町9-2
                </p>
              </div>
            </div>
          </a>
        </motion.div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 pt-12 border-t border-[var(--color-wood)]/20 text-center"
      >
        <p className="font-[family-name:var(--font-serif)] text-2xl text-[var(--color-forest)] tracking-widest mb-2">
          TOBIRA
        </p>
        <p className="text-sm text-[var(--color-wood)]/70">— トベラ —</p>
        <p className="mt-4 text-xs text-[var(--color-wood)]/50">
          © TOBIRA. All rights reserved.
        </p>
      </motion.footer>
    </section>
  );
}
