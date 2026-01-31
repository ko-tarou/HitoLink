"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function MouseStalker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-stalker-hover]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        className="rounded-full bg-accent/30 border border-accent/50"
        animate={{
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{
          width: isHovering ? 32 : 20,
          height: isHovering ? 32 : 20,
        }}
      />
    </motion.div>
  );
}
