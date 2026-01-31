'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const magnetStrength = 0.25;
      const newX = distanceX * magnetStrength;
      const newY = distanceY * magnetStrength;

      x.set(newX);
      y.set(newY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => setIsHovered(true);

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [x, y]);

  return (
    <footer
      id="access"
      className="relative bg-[var(--indigo-darker)] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Address & Info */}
          <div>
            <h3 className="font-serif text-2xl font-light tracking-wide md:text-3xl">
              Access
            </h3>
            <div className="mt-8 flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--wood-light)]" />
              <div>
                <p className="font-sans text-base text-white/90">
                  608 Kakeo-machi, Toyama City
                </p>
                <p className="mt-1 text-sm text-white/70">
                  Roadside, Route 359
                </p>
                <p className="mt-2 text-sm text-white/60">
                  〒939-8212 富山県富山市掛尾町608
                </p>
                <p className="mt-2 text-sm text-white/60">
                  TEL / FAX: 076-495-8560
                </p>
              </div>
            </div>
          </div>

          {/* CTA - Magnetic button */}
          <div className="flex items-end justify-start md:justify-end">
            <motion.div
              ref={buttonRef}
              className="inline-block"
              style={{
                x: xSpring,
                y: ySpring,
              }}
            >
              <a
                href="https://indigo1998.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 font-sans text-sm font-medium tracking-widest text-[var(--indigo-deep)] transition-colors hover:bg-white/95"
              >
                <span>Online Store</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="font-serif text-sm tracking-wide text-white/50">
            INDIGO Novel STANDARD — New value become the STANDARD
          </p>
          <p className="mt-2 text-xs text-white/40">
            © {new Date().getFullYear()} INDIGO Novel STANDARD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
