import { getInventoryBatches } from "@/lib/actions/inventory";
import { getWateringRecords } from "@/lib/actions/watering";
import { formatDate, formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { WateringForm } from "./WateringForm";

export default async function FreshnessPage() {
  const [batches, wateringReminders] = await Promise.all([
    getInventoryBatches(),
    getWateringRecords({ nextWateringBefore: new Date().toISOString() }),
  ]);

  const soonDisposal = batches.filter((b) => {
    if (!b.disposal_date) return false;
    const d = new Date(b.disposal_date);
    const in3 = new Date();
    in3.setDate(in3.getDate() + 3);
    return d <= in3;
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-4">鮮度管理</h2>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-white/90 mb-2 flex items-center gap-2">
          <Droplets className="w-4 h-4" /> 水やりリマインド
        </h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {wateringReminders.length === 0 ? (
              <li className="px-4 py-6 text-white/60 text-center">
                リマインド対象はありません
              </li>
            ) : (
              (wateringReminders as { id: string; next_watering_at: string | null; inventory_batches: { products: { name: string } | null } | null }[]).map(
                (r) => (
                  <li key={r.id} className="px-4 py-3 flex justify-between items-center">
                    <span className="text-white">
                      {r.inventory_batches?.products?.name ?? "在庫"}
                    </span>
                    <span className="text-white/80 text-sm">
                      {r.next_watering_at
                        ? formatDateTime(r.next_watering_at)
                        : "-"}
                    </span>
                  </li>
                )
              )
            )}
          </ul>
        </div>
        <WateringForm batches={batches} />
      </section>

      <section>
        <h3 className="text-sm font-semibold text-white/90 mb-2">
          廃棄予定が近い在庫（3日以内）
        </h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {soonDisposal.length === 0 ? (
              <li className="px-4 py-6 text-white/60 text-center">
                該当なし
              </li>
            ) : (
              soonDisposal.map((b) => (
                <li
                  key={b.id}
                  className="px-4 py-3 flex justify-between items-center"
                >
                  <span className="text-white font-medium">
                    {(b as { products: { name: string } | null }).products?.name ?? "-"}
                  </span>
                  <span className="text-white/80 text-sm">
                    {b.disposal_date ? formatDate(b.disposal_date) : "-"}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
