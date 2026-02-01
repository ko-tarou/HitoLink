import Link from "next/link";
import { getSales } from "@/lib/actions/sales";
import { formatYen, formatDateTime } from "@/lib/utils";
import { Receipt } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageContainer } from "@/lib/ui-classes";
import { btn } from "@/lib/ui-classes";

const paymentLabel: Record<string, string> = {
  cash: "現金",
  credit: "クレジット",
  paypay: "PayPay",
};

export default async function PosPage() {
  const sales = await getSales();

  return (
    <div className={pageContainer}>
      <PageHeader
        title="売上"
        action={
          <Link
            href="/pos/new"
            className={btn.primary}
            aria-label="売上を新規登録"
          >
            <Receipt className="w-6 h-6" aria-hidden /> 売上登録
          </Link>
        }
      />

      <section aria-labelledby="sales-history-heading">
        <h3 id="sales-history-heading" className="text-base font-semibold text-text mb-3">
          売上履歴
        </h3>
        <div className="rounded-xl bg-base border border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            {(sales as { id: string; total_amount: number; payment_method: string; created_at: string }[]).map((s) => (
              <li
                key={s.id}
                className="px-6 py-4 flex justify-between items-center text-text"
              >
                <div>
                  <span className="font-medium text-base">
                    {formatDateTime(s.created_at)}
                  </span>
                  <span className="ml-2 text-text-muted text-sm">
                    {paymentLabel[s.payment_method] ?? s.payment_method}
                  </span>
                </div>
                <span className="font-bold text-lg text-text">
                  {formatYen(s.total_amount)}
                </span>
              </li>
            ))}
            {sales.length === 0 && (
              <li className="px-6 py-8 text-text-muted text-center text-base" role="status">
                売上履歴がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
