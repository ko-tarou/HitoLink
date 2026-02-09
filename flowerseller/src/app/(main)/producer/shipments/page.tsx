import { getShipments } from "@/lib/actions/shipments";
import { formatDateTime } from "@/lib/utils";
import { pageContainer } from "@/lib/ui-classes";

/** 生産者: 出荷履歴（DBから取得したデータを表示するのみ。生産者から変更はしない） */
export default async function ProducerShipmentsPage() {
  const shipments = await getShipments();

  return (
    <div className={pageContainer}>
      <section aria-labelledby="shipments-history-heading">
        <h2 id="shipments-history-heading" className="text-xl font-bold text-text mb-4">
          出荷履歴
        </h2>
        <div className="rounded-xl bg-base border-2 border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {shipments.map((s) => (
              <li key={s.id} className="px-6 py-4 text-text">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="font-medium">{formatDateTime(s.shipped_at)}</span>
                  {s.destination != null && s.destination !== "" && (
                    <span className="text-text-muted text-sm">届け先: {s.destination}</span>
                  )}
                </div>
                {s.notes != null && s.notes !== "" && (
                  <p className="text-sm text-text-muted mb-2">{s.notes}</p>
                )}
                <ul className="text-sm list-disc list-inside text-text-secondary">
                  {s.items.map((i) => (
                    <li key={i.id}>
                      {i.product_name} × {Number(i.quantity)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {shipments.length === 0 && (
              <li className="px-6 py-8 text-text-muted text-center" role="status">
                出荷記録がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
