import { getDirectSaleListings } from "@/lib/actions/directSaleListings";
import { pageContainer } from "@/lib/ui-classes";
import { DirectSalesGrid } from "./DirectSalesGrid";

/** 生産者: 直接販売（自分の出品一覧・メルカリ風UI・クリックで編集ダイアログ） */
export default async function ProducerDirectSalesPage() {
  const listings = await getDirectSaleListings();

  return (
    <div className={pageContainer}>
      <h2 className="text-xl font-bold text-text mb-6">
        直接販売 — 出品一覧
      </h2>

      <DirectSalesGrid listings={listings} />

      {listings.length === 0 && (
        <p className="text-text-muted text-center py-12" role="status">
          出品がありません
        </p>
      )}
    </div>
  );
}
