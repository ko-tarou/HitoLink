import Link from "next/link";
import { getSales } from "@/lib/actions/sales";
import { formatYen, formatDateTime } from "@/lib/utils";
import { Receipt } from "lucide-react";

const paymentLabel: Record<string, string> = {
  cash: "現金",
  credit: "クレジット",
  paypay: "PayPay",
};

export default async function PosPage() {
  const sales = await getSales();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">売上</h2>
        <Link
          href="/pos/new"
          className="flex items-center gap-2 rounded-2xl bg-white/20 px-5 py-3 text-base font-semibold text-white hover:bg-white/30 border-2 border-white/25"
        >
          <Receipt className="w-6 h-6" /> 売上登録
        </Link>
      </div>

      <section className="mt-6">
        <h3 className="text-base font-semibold text-white/95 mb-3">売上履歴</h3>
        <div className="rounded-2xl bg-white/15 border-2 border-white/20 overflow-hidden">
          <ul className="divide-y divide-white/15">
            {(sales as { id: string; total_amount: number; payment_method: string; created_at: string }[]).map((s) => (
              <li
                key={s.id}
                className="px-5 py-4 flex justify-between items-center"
              >
                <div>
                  <span className="text-white font-medium text-base">
                    {formatDateTime(s.created_at)}
                  </span>
                  <span className="ml-2 text-white/70 text-sm">
                    {paymentLabel[s.payment_method] ?? s.payment_method}
                  </span>
                </div>
                <span className="text-white font-bold text-lg">
                  {formatYen(s.total_amount)}
                </span>
              </li>
            ))}
            {sales.length === 0 && (
              <li className="px-5 py-8 text-white/70 text-center text-base">
                売上履歴がありません
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}
