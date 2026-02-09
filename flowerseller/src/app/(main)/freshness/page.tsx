import Image from "next/image";
import Link from "next/link";
import { getMarketplaceListings } from "@/lib/actions/marketplace";
import { formatYen } from "@/lib/utils";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";
import { ShoppingCart, MessageCircle } from "lucide-react";

const DELIVERY_LABELS: Record<string, string> = {
  pickup_only: "現地のみ",
  delivery_only: "配送のみ",
  both: "現地・配送可",
};

/** 販売者・仲介者: 直接購入 — いろんな生産者が出した商品を一覧（メルカリ風）・購入・チャット */
export default async function DirectPurchasePage() {
  const listings = await getMarketplaceListings();

  return (
    <div className={pageContainer}>
      <h2 className="text-xl font-bold text-text mb-2">
        直接購入
      </h2>
      <p className="text-sm text-text-muted mb-6">
        生産者が出品した商品一覧です。気になる商品は購入または生産者にチャットで問い合わせできます。
      </p>

      <ul
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 list-none p-0 m-0"
        role="list"
      >
        {listings.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border-2 border-border bg-base overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition"
          >
            <div className="aspect-square relative bg-base-subtle">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-text-muted"
                  aria-hidden
                >
                  <ShoppingCart className="w-12 h-12 opacity-40" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="font-semibold text-text text-sm line-clamp-2 min-h-[2.5rem]">
                {item.product_name}
              </p>
              <p className="text-primary font-bold text-base mt-1">
                {formatYen(item.price)}
              </p>
              <p className="text-text-muted text-xs mt-1">
                {item.producer_name}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-base-subtle text-text-secondary">
                {DELIVERY_LABELS[item.delivery_option] ?? item.delivery_option}
              </span>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  className={`${btn.primary} flex-1 min-h-0 py-2 text-sm flex items-center justify-center gap-1`}
                  aria-label={`${item.product_name}を購入`}
                >
                  <ShoppingCart className="w-4 h-4" aria-hidden />
                  購入
                </button>
                <Link
                  href="#"
                  className={`${btn.secondary} flex-1 min-h-0 py-2 text-sm flex items-center justify-center gap-1`}
                  aria-label={`${item.producer_name}にチャット`}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden />
                  チャット
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {listings.length === 0 && (
        <p className="text-text-muted text-center py-12" role="status">
          出品がありません
        </p>
      )}
    </div>
  );
}
