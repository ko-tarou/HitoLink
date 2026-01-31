"use client";

import { Clock, MapPin, Phone, Car } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const INFO: Array<{
  icon: typeof MapPin;
  label: string;
  value: string;
  href?: string;
}> = [
  {
    icon: MapPin,
    label: "住所",
    value: "〒939-8208 富山県富山市布瀬町南3丁目1-2",
  },
  {
    icon: Phone,
    label: "TEL",
    value: "076-493-1518",
    href: "tel:076-493-1518",
  },
  {
    icon: Clock,
    label: "営業時間",
    value: "11:00〜18:00（変動あり）",
  },
  {
    icon: Clock,
    label: "定休日",
    value: "火曜、第2・第4日曜",
  },
  {
    icon: Car,
    label: "駐車場",
    value: "約5台",
  },
];

export default function InfoAccess() {
  return (
    <section className="relative py-32 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p
            className="font-serif text-xs tracking-[0.3em] text-muted-green md:text-sm"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            INFO & ACCESS
          </p>
          <h2
            className="mt-2 font-serif text-2xl text-charcoal md:text-3xl"
            style={{ fontFamily: "var(--font-shippori-mincho)" }}
          >
            店舗情報
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-muted-green" />
                  <div>
                    <p className="text-xs tracking-wider text-warm-gray">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 text-charcoal underline-offset-4 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-charcoal">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            <div className="aspect-[4/3] overflow-hidden rounded-sm bg-sand/50">
              <iframe
                title="地図"
                src="https://www.google.com/maps?output=embed&q=%E5%AF%8C%E5%B1%B1%E7%9C%8C%E5%AF%8C%E5%B1%B1%E5%B8%82%E5%B8%83%E7%80%AC%E7%94%BA%E5%8D%973%E4%B8%81%E7%9B%AE1-2"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3} className="mt-12">
          <p className="text-sm text-warm-gray">
            ※ 地図は富山市布瀬町南付近の目安です。正確な位置はGoogleマップで「TANE.FLOWER 富山」などでお調べください。
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
