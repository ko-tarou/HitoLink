"use client";

import { usePathname } from "next/navigation";

const pathToTitle: Record<string, string> = {
  "/inventory": "在庫管理",
  "/inventory/products/new": "商品登録",
  "/search": "検索結果",
  "/pos": "売上",
  "/pos/new": "売上登録",
  "/inbound": "入荷（OCR取り込み）",
  "/inbound/new": "入荷登録",
  "/price": "価格管理",
  "/freshness": "品質管理",
  "/settings": "アカウント管理",
  // 生産者（販売者・仲介者とロジック分離）
  "/producer/cultivation": "栽培管理",
  "/producer/cultivation/products/new": "品目登録",
  "/producer/cultivation/new": "栽培を追加",
  "/producer/direct-sales": "直接販売",
  "/producer/shipments": "出荷履歴",
  "/producer/shipments/new": "出荷登録",
  "/producer/sell-through": "売れ行き",
};

export function HeaderTitle() {
  const pathname = usePathname();
  const title = pathToTitle[pathname ?? ""] ?? "Flower Seller";
  return <span className="font-bold text-lg">{title}</span>;
}
