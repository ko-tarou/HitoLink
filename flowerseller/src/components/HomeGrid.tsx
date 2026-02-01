"use client";

import Link from "next/link";
import {
  Package,
  Truck,
  CreditCard,
  Tag,
  Droplets,
} from "lucide-react";

const tiles = [
  {
    href: "/inventory",
    label: "在庫管理",
    sublabel: "商品・バッチ一覧",
    icon: Package,
    large: true,
  },
  {
    href: "/inbound",
    label: "入荷",
    sublabel: "OCR取り込み",
    icon: Truck,
    large: false,
  },
  {
    href: "/pos",
    label: "売上",
    sublabel: "売上計上・履歴",
    icon: CreditCard,
    large: false,
  },
  {
    href: "/price",
    label: "価格管理",
    sublabel: "一括調整",
    icon: Tag,
    large: false,
  },
  {
    href: "/freshness",
    label: "鮮度管理",
    sublabel: "水やり・品質管理",
    icon: Droplets,
    large: false,
  },
];

const tileBase =
  "flex flex-col items-center justify-center rounded-xl bg-base border-2 border-border text-foreground shadow-sm hover:bg-base-muted hover:border-primary/30 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function HomeGrid() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  });
  const timeStr = now.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const Icon0 = tiles[0].icon;
  const Icon1 = tiles[1].icon;
  const Icon2 = tiles[2].icon;
  const Icon3 = tiles[3].icon;
  const Icon4 = tiles[4].icon;

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mx-auto"
      role="navigation"
      aria-label="メインメニュー"
    >
      {/* 在庫管理（大タイル・左2列2行） */}
      <Link
        href={tiles[0].href}
        className={`${tileBase} col-span-1 md:col-span-2 row-span-2 min-h-[160px] md:min-h-[220px] p-6`}
        aria-label={`${tiles[0].label}、${tiles[0].sublabel}`}
      >
        <Icon0 className="w-12 h-12 md:w-16 md:h-16 mb-3 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="font-bold text-lg md:text-xl text-center text-foreground">{tiles[0].label}</span>
        <span className="text-base text-foreground-secondary mt-1 text-center">{tiles[0].sublabel}</span>
      </Link>

      {/* 入荷・売上（1行目） */}
      <Link
        href={tiles[1].href}
        className={`${tileBase} min-h-[120px] md:min-h-[100px] p-4`}
        aria-label={`${tiles[1].label}、${tiles[1].sublabel}`}
      >
        <Icon1 className="w-10 h-10 md:w-11 md:h-11 mb-2 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="font-semibold text-base text-center text-foreground">{tiles[1].label}</span>
      </Link>
      <Link
        href={tiles[2].href}
        className={`${tileBase} min-h-[120px] md:min-h-[100px] p-4`}
        aria-label={`${tiles[2].label}、${tiles[2].sublabel}`}
      >
        <Icon2 className="w-10 h-10 md:w-11 md:h-11 mb-2 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="font-semibold text-base text-center text-foreground">{tiles[2].label}</span>
      </Link>

      {/* 価格・鮮度（2行目） */}
      <Link
        href={tiles[3].href}
        className={`${tileBase} min-h-[120px] md:min-h-[100px] p-4`}
        aria-label={`${tiles[3].label}、${tiles[3].sublabel}`}
      >
        <Icon3 className="w-10 h-10 md:w-11 md:h-11 mb-2 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="font-semibold text-base text-center text-foreground">{tiles[3].label}</span>
        <span className="text-sm text-foreground-secondary mt-0.5 text-center block">{tiles[3].sublabel}</span>
      </Link>
      <Link
        href={tiles[4].href}
        className={`${tileBase} min-h-[120px] md:min-h-[100px] p-4`}
        aria-label={`${tiles[4].label}、${tiles[4].sublabel}`}
      >
        <Icon4 className="w-10 h-10 md:w-11 md:h-11 mb-2 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
        <span className="font-semibold text-base text-center text-foreground">{tiles[4].label}</span>
        <span className="text-sm text-foreground-secondary mt-0.5 text-center block">{tiles[4].sublabel}</span>
      </Link>

      {/* 日付・時刻（3行目・全幅） */}
      <div
        className="col-span-2 md:col-span-4 flex justify-center items-center gap-4 py-6 text-foreground-secondary text-base"
        role="status"
        aria-live="polite"
      >
        <time dateTime={now.toISOString()} className="font-medium">
          {dateStr}
        </time>
        <span className="tabular-nums font-semibold">{timeStr}</span>
      </div>
    </div>
  );
}
