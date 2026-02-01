import Link from "next/link";
import { getInboundRecords } from "@/lib/actions/inbound";
import { formatDateTime } from "@/lib/utils";
import { Upload } from "lucide-react";

export default async function InboundPage() {
  const records = await getInboundRecords();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">入荷（OCR取り込み）</h2>
        <Link
          href="/inbound/new"
          className="flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-3 text-base font-semibold text-white hover:bg-white/30 border-2 border-white/25"
        >
          <Upload className="w-6 h-6" /> 入荷登録
        </Link>
      </div>

      <p className="text-sm text-white/80 mb-4">
        仕入れ表を撮影/アップロードしてOCRで在庫登録。または手動で入荷を登録できます。
      </p>

      <section className="mb-6">
        <h3 className="text-sm font-semibold text-white/90 mb-2">入荷履歴</h3>
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 overflow-hidden">
          <ul className="divide-y divide-white/10">
            {(records as { id: string; created_at: string; status: string; inbound_items?: { quantity: number; products?: { name: string } }[] }[]).map((r) => (
              <li key={r.id} className="px-4 py-3 flex justify-between items-center">
                <div>
                  <span className="text-white font-medium">
                    {formatDateTime(r.created_at)}
                  </span>
                  <span className="ml-2 text-white/60 text-sm">{r.status}</span>
                </div>
                <span className="text-white/80 text-sm">
                  {r.inbound_items?.length ?? 0} 品目
                </span>
              </li>
            ))}
            {records.length === 0 && (
              <li className="px-4 py-6 text-white/60 text-center">
                入荷記録がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
