"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseStalker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        style={{
          left: -12,
          top: -12,
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "2px solid #00f3ff",
          boxShadow: "0 0 20px rgba(0, 243, 255, 0.5)",
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
        }}
        style={{
          left: -4,
          top: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "radial-gradient(circle, #00f3ff, transparent)",
          boxShadow: "0 0 15px #00f3ff",
        }}
      />
    </>
  );
};

export default MouseStalker;
