"use client";

import Link from "next/link";
import {
  Package,
  CreditCard,
  ShoppingCart,
  History,
  Sprout,
  Truck,
  TrendingUp,
} from "lucide-react";

type Tile = {
  href: string;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

/** 販売者・仲介者向け4タイル（2×2） */
const tilesSeller: Tile[] = [
  { href: "/inventory", label: "在庫管理", sublabel: "商品・バッチ一覧", icon: Package },
  { href: "/freshness", label: "直接購入", sublabel: "品質管理すべき在庫", icon: ShoppingCart },
  { href: "/inbound", label: "入荷履歴", sublabel: "入荷記録一覧", icon: History },
  { href: "/pos", label: "売上", sublabel: "売上計上・履歴", icon: CreditCard },
];

/** 生産者向け4タイル（2×2）・ロジックは /producer/* で完全分離 */
const tilesProducer: Tile[] = [
  { href: "/producer/cultivation", label: "栽培管理", sublabel: "品目・バッチ一覧", icon: Sprout },
  { href: "/producer/direct-sales", label: "直接販売", sublabel: "品質管理すべき在庫", icon: ShoppingCart },
  { href: "/producer/shipments", label: "出荷履歴", sublabel: "出荷記録一覧", icon: Truck },
  { href: "/producer/sell-through", label: "売れ行き", sublabel: "販売実績・履歴", icon: TrendingUp },
];

const tilesByBusinessType: Record<string, Tile[]> = {
  producer: tilesProducer,
  seller: tilesSeller,
  intermediary: tilesSeller,
};

const tileBase =
  "flex flex-col items-center justify-center rounded-xl bg-base border-2 border-border text-foreground shadow-sm hover:bg-base-muted hover:border-primary/30 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

type HomeGridProps = {
  /** 業態: producer=生産者（/producer/*）, それ以外=販売者・仲介者（/inventory 等） */
  businessType?: string;
};

export function HomeGrid({ businessType = "" }: HomeGridProps) {
  const tiles = tilesByBusinessType[businessType] ?? tilesSeller;
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

  return (
    <div
      className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto"
      role="navigation"
      aria-label="メインメニュー"
    >
      {tiles.map((tile) => {
        const Icon = tile.icon;
        return (
          <Link
            key={tile.href + tile.label}
            href={tile.href}
            className={`${tileBase} min-h-[140px] md:min-h-[160px] p-6`}
            aria-label={`${tile.label}、${tile.sublabel}`}
          >
            <Icon className="w-12 h-12 md:w-14 md:h-14 mb-3 text-primary shrink-0" strokeWidth={1.5} aria-hidden />
            <span className="font-bold text-lg text-center text-foreground">{tile.label}</span>
            <span className="text-sm text-foreground-secondary mt-1 text-center">{tile.sublabel}</span>
          </Link>
        );
      })}
      <div
        className="col-span-2 flex justify-center items-center gap-4 py-6 text-foreground-secondary text-base"
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
