"use client";

import { motion } from "framer-motion";

// Deterministic values for SSR consistency (no Math.random = no hydration mismatch)
const seeded = (i: number, max: number, min = 0) =>
  (((i * 7 + 13) * 31) % (max * 100)) / 100 + min;

const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: seeded(i, 100),
    y: seeded(i + 50, 100),
    size: seeded(i, 3, 1),
    duration: seeded(i, 20, 10),
    delay: seeded(i, 5),
    color: i % 3 === 0 ? "#00f3ff" : i % 3 === 1 ? "#ff00ff" : "#ffd700",
    opacity: seeded(i, 0.5, 0.2),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      {/* Smoke/Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050510]/80"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(0, 243, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255, 0, 255, 0.05) 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
};

export default ParticleBackground;
