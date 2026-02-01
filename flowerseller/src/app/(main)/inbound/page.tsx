import Link from "next/link";
import { getInboundRecords } from "@/lib/actions/inbound";
import { formatDateTime } from "@/lib/utils";
import { Upload } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";

export default async function InboundPage() {
  const records = await getInboundRecords();

  return (
    <div className={pageContainer}>
      <PageHeader
        title="入荷（OCR取り込み）"
        action={
          <Link
            href="/inbound/new"
            className={btn.primary}
            aria-label="入荷を新規登録"
          >
            <Upload className="w-6 h-6" aria-hidden /> 入荷登録
          </Link>
        }
      />

      <p className="text-sm text-text-secondary mb-6">
        仕入れ表を撮影/アップロードしてOCRで在庫登録。または手動で入荷を登録できます。
      </p>

      <section aria-labelledby="inbound-history-heading">
        <h3 id="inbound-history-heading" className="text-base font-semibold text-text mb-3">
          入荷履歴
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {(records as { id: string; created_at: string; status: string; inbound_items?: { quantity: number; products?: { name: string } }[] }[]).map((r) => (
              <li key={r.id} className="px-6 py-4 flex justify-between items-center text-text">
                <div>
                  <span className="font-medium">
                    {formatDateTime(r.created_at)}
                  </span>
                  <span className="ml-2 text-text-muted text-sm">{r.status}</span>
                </div>
                <span className="text-text-muted text-sm">
                  {r.inbound_items?.length ?? 0} 品目
                </span>
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
