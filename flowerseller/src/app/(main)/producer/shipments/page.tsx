import Link from "next/link";
import { getInboundRecords } from "@/lib/actions/inbound";
import { formatDateTime } from "@/lib/utils";
import { Upload } from "lucide-react";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";

/** 生産者: 出荷履歴（販売者・仲介者の入荷履歴とはロジック分離） */
export default async function ProducerShipmentsPage() {
  const records = await getInboundRecords();

  return (
    <div className={pageContainer}>
      <div className="flex justify-end mb-4">
        <Link
          href="/producer/shipments/new"
          className={btn.primary}
          aria-label="出荷を新規登録"
        >
          <Upload className="w-6 h-6" aria-hidden /> 出荷登録
        </Link>
      </div>

      <p className="text-sm text-text-secondary mb-6">
        出荷記録の一覧です。出荷登録で品目と数量を記録できます。
      </p>

      <section aria-labelledby="shipments-history-heading">
        <h3 id="shipments-history-heading" className="text-base font-semibold text-text mb-3">
          出荷履歴
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {(records as { id: string; created_at: string; status: string; inbound_items?: unknown[] }[]).map((r) => (
              <li key={r.id} className="px-6 py-4 flex justify-between items-center text-text">
                <div>
                  <span className="font-medium">{formatDateTime(r.created_at)}</span>
                  <span className="ml-2 text-text-muted text-sm">{r.status}</span>
                </div>
                <span className="text-text-muted text-sm">
                  {r.inbound_items?.length ?? 0} 品目
                </span>
              </li>
            ))}
            {records.length === 0 && (
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
