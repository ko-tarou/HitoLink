import Link from "next/link";
import { getInboundRecords } from "@/lib/actions/inbound";
import { formatDateTime } from "@/lib/utils";
import { Upload } from "lucide-react";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";

type InboundItem = {
  id: string;
  product_id: string;
  quantity: number;
  unit_price?: number | null;
  products?: { name: string } | null;
};

type InboundRecord = {
  id: string;
  created_at: string;
  status: string;
  inbound_items?: InboundItem[];
};

/** 販売者・仲介者: 入荷履歴（UIは生産者の出荷履歴と同じ形式） */
export default async function InboundPage() {
  const records = (await getInboundRecords()) as InboundRecord[];

  return (
    <div className={pageContainer}>
      <div className="flex justify-end mb-4">
        <Link
          href="/inbound/new"
          className={btn.primary}
          aria-label="入荷を新規登録"
        >
          <Upload className="w-6 h-6" aria-hidden /> 入荷登録
        </Link>
      </div>

      <section aria-labelledby="inbound-history-heading">
        <h2 id="inbound-history-heading" className="text-xl font-bold text-text mb-4">
          入荷履歴
        </h2>
        <div className="rounded-xl bg-base border-2 border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {records.map((r) => (
              <li key={r.id} className="px-6 py-4 text-text">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="font-medium">{formatDateTime(r.created_at)}</span>
                  <span className="text-text-muted text-sm">{r.status}</span>
                </div>
                <ul className="text-sm list-disc list-inside text-text-secondary">
                  {(r.inbound_items ?? []).map((i) => (
                    <li key={i.id}>
                      {i.products?.name ?? "商品"} × {Number(i.quantity)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {records.length === 0 && (
              <li className="px-6 py-8 text-text-muted text-center" role="status">
                入荷記録がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
