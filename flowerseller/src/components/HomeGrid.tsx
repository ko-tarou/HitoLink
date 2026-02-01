"use client";

import Link from "next/link";
import {
  Package,
  Truck,
  CreditCard,
  Tag,
  Droplets,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    sublabel: "水やり・廃棄予定",
    icon: Droplets,
    large: false,
  },
];

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
    <div className="grid grid-cols-2 gap-4 p-4 max-w-lg mx-auto">
      {/* Row 1: 在庫管理(大) | 入荷・売上(縦2分割) - ボタン2回り大きく */}
      <Link
        href={tiles[0].href}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl bg-white/15 border-2 border-white/30 p-8 text-white shadow-xl active:scale-[0.98] transition",
          "row-span-2 min-h-[200px]"
        )}
      >
        <Icon0 className="w-16 h-16 mb-3" strokeWidth={1.5} />
        <span className="font-bold text-xl">{tiles[0].label}</span>
        <span className="text-base text-white/90 mt-1">{tiles[0].sublabel}</span>
      </Link>
      <Link
        href={tiles[1].href}
        className="flex flex-col items-center justify-center rounded-2xl bg-white/15 border-2 border-white/30 p-6 text-white shadow-xl active:scale-[0.98] transition min-h-[96px]"
      >
        <Icon1 className="w-12 h-12 mb-2" strokeWidth={1.5} />
        <span className="font-semibold text-lg">{tiles[1].label}</span>
      </Link>
      <Link
        href={tiles[2].href}
        className="flex flex-col items-center justify-center rounded-2xl bg-white/15 border-2 border-white/30 p-6 text-white shadow-xl active:scale-[0.98] transition min-h-[96px]"
      >
        <Icon2 className="w-12 h-12 mb-2" strokeWidth={1.5} />
        <span className="font-semibold text-lg">{tiles[2].label}</span>
      </Link>

      {/* Row 2: 価格管理 | 鮮度管理 */}
      <Link
        href={tiles[3].href}
        className="flex flex-col items-center justify-center rounded-2xl bg-white/15 border-2 border-white/30 p-7 text-white shadow-xl active:scale-[0.98] transition min-h-[140px]"
      >
        <Icon3 className="w-14 h-14 mb-3" strokeWidth={1.5} />
        <span className="font-bold text-lg">{tiles[3].label}</span>
        <span className="text-sm text-white/90 mt-0.5">{tiles[3].sublabel}</span>
      </Link>
      <Link
        href={tiles[4].href}
        className="flex flex-col items-center justify-center rounded-2xl bg-white/15 border-2 border-white/30 p-7 text-white shadow-xl active:scale-[0.98] transition min-h-[140px]"
      >
        <Icon4 className="w-14 h-14 mb-3" strokeWidth={1.5} />
        <span className="font-bold text-lg">{tiles[4].label}</span>
        <span className="text-sm text-white/90 mt-0.5">{tiles[4].sublabel}</span>
      </Link>

      {/* ページ番号の代わり: 日付・時刻 */}
      <div className="col-span-2 flex justify-center items-center gap-4 py-4 text-white/95 text-lg">
        <time dateTime={now.toISOString()} className="font-medium">
          {dateStr}
        </time>
        <span className="tabular-nums font-semibold">{timeStr}</span>
      </div>
    </div>
  );
}
