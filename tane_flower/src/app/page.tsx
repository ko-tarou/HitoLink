"use client";

import { useState, useEffect } from "react";
import OpeningAnimation from "@/components/OpeningAnimation";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import Services from "@/components/Services";
import InfoAccess from "@/components/InfoAccess";
import Footer from "@/components/Footer";

const OPENING_DURATION_MS = 2800;

export default function Home() {
  const [isExiting, setIsExiting] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsExiting(true), OPENING_DURATION_MS);
    return () => clearTimeout(t);
  }, []);

  const handleOpeningComplete = () => setContentVisible(true);

  return (
    <>
      {!contentVisible && (
        <OpeningAnimation
          isExiting={isExiting}
          onComplete={handleOpeningComplete}
        />
      )}
      {contentVisible && (
        <main className="min-h-screen">
          <Hero />
          <Concept />
          <Services />
          <InfoAccess />
          <Footer />
        </main>
      )}
    </>
  );
}
