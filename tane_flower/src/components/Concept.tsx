"use client";

import Image from "next/image";
import { ScrollReveal, StaggerChildren, StaggerItem } from "./ScrollReveal";

const LINES = [
  "元々は2004年にオープンし、",
  "2018年に現在の中華料理店跡地をリノベーションして移転。",
  "販売スペースに加え広い作業場を併設。",
  "「人が集える場所」としても機能しています。",
];

export default function Concept() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p
            className="font-serif text-xs tracking-[0.3em] text-muted-green md:text-sm"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            CONCEPT
          </p>
          <h2
            className="mt-2 font-serif text-2xl text-charcoal md:text-3xl"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            日常に溶け込む花
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <ScrollReveal delay={0.1} direction="left">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80"
                alt="店内の花"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          <div className="flex flex-col justify-center">
            <StaggerChildren staggerDelay={0.12}>
              {LINES.map((line, i) => (
                <StaggerItem key={i} className="mb-4">
                  <p
                    className="font-sans text-base leading-loose text-charcoal-light md:text-lg"
                    style={{ fontFamily: "var(--font-noto-sans-jp)" }}
                  >
                    {line}
                  </p>
                </StaggerItem>
              ))}
            </StaggerChildren>
            <ScrollReveal delay={0.3}>
              <p
                className="mt-8 font-serif text-sm text-muted-green"
                style={{ fontFamily: "var(--font-shippori-mincho)" }}
              >
                2004 — 創業 / 2018 — 移転
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
