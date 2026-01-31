'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function MouseStalker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        x: position.x,
        y: position.y,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      style={{
        width: 120,
        height: 120,
        marginLeft: -60,
        marginTop: -60,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(26,77,46,0.08) 0%, transparent 70%)',
        filter: 'blur(20px)',
      }}
      aria-hidden
    />
  );
}
