import { getInventoryBatches } from "@/lib/actions/inventory";
import { getWateringRecords } from "@/lib/actions/watering";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Droplets } from "lucide-react";
import { WateringForm } from "./WateringForm";
import { PageHeader } from "@/components/ui/PageHeader";

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
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="鮮度管理" />

      <section className="mb-8" aria-labelledby="watering-heading">
        <h3 id="watering-heading" className="text-base font-semibold text-text mb-3 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-primary" aria-hidden /> 水やりリマインド
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {wateringReminders.length === 0 ? (
              <li className="px-6 py-8 text-text-muted text-center" role="status">
                リマインド対象はありません
              </li>
            ) : (
              (wateringReminders as { id: string; next_watering_at: string | null; inventory_batches: { products: { name: string } | null } | null }[]).map(
                (r) => (
                  <li key={r.id} className="px-6 py-4 flex justify-between items-center text-text">
                    <span>{r.inventory_batches?.products?.name ?? "在庫"}</span>
                    <span className="text-text-muted text-sm">
                      {r.next_watering_at
                        ? formatDateTime(r.next_watering_at)
                        : "—"}
                    </span>
                  </li>
                )
              )
            )}
          </ul>
        </div>
        <WateringForm batches={batches} />
      </section>

      <section aria-labelledby="disposal-heading">
        <h3 id="disposal-heading" className="text-base font-semibold text-text mb-3">
          品質管理：要確認の在庫（3日以内）
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {soonDisposal.length === 0 ? (
              <li className="px-6 py-8 text-text-muted text-center" role="status">
                該当なし
              </li>
            ) : (
              soonDisposal.map((b) => (
                <li
                  key={b.id}
                  className="px-6 py-4 flex justify-between items-center text-text"
                >
                  <span className="font-medium">
                    {(b as { products: { name: string } | null }).products?.name ?? "—"}
                  </span>
                  <span className="text-text-muted text-sm">
                    {b.disposal_date ? formatDate(b.disposal_date) : "—"}
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
