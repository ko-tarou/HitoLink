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
  "/freshness": "鮮度管理",
};

export function HeaderTitle() {
  const pathname = usePathname();
  const title = pathToTitle[pathname ?? ""] ?? "Flower Seller";
  return <span className="font-bold text-lg">{title}</span>;
}
