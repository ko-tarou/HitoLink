"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSale } from "@/lib/actions/sales";
import { formatYen } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import type { Product } from "@/types/database";
import type { PaymentMethod } from "@/types/database";

type CartRow = { product: Product; quantity: number };

const paymentMethods: { value: PaymentMethod; label: string }[] = [
  { value: "cash", label: "現金" },
  { value: "credit", label: "クレジット" },
  { value: "paypay", label: "PayPay" },
];

export function PosNewForm({ products }: { products: Product[] }) {
  const router = useRouter();
  const [cart, setCart] = useState<CartRow[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const i = prev.findIndex((r) => r.product.id === product.id);
      if (i >= 0) {
        const next = [...prev];
        next[i].quantity += qty;
        return next;
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const updateQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((r) => r.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((r) =>
        r.product.id === productId ? { ...r, quantity } : r
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((r) => r.product.id !== productId));
  };

  const total = cart.reduce(
    (sum, r) => sum + Number(r.product.base_price) * r.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("商品を1件以上追加してください");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createSale({
        total_amount: total,
        payment_method: paymentMethod,
        items: cart.map((r) => ({
          product_id: r.product.id,
          quantity: r.quantity,
          unit_price: Number(r.product.base_price),
        })),
      });
      router.push("/pos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl bg-maroon-light/80 border border-white/15 p-4">
        <h3 className="text-sm font-semibold text-white/90 mb-2">商品を追加</h3>
        <div className="flex flex-wrap gap-2">
          {products.slice(0, 20).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addToCart(p)}
              className="rounded-lg bg-white/15 px-3 py-2 text-sm text-white hover:bg-white/25"
            >
              {p.name} ({formatYen(p.base_price)})
            </button>
          ))}
        </div>
      </div>

      {cart.length > 0 && (
        <div className="rounded-xl bg-maroon-light/80 border border-white/15 p-4">
          <h3 className="text-sm font-semibold text-white/90 mb-2">カート</h3>
          <ul className="space-y-2">
            {cart.map((r) => (
              <li
                key={r.product.id}
                className="flex justify-between items-center gap-2"
              >
                <span className="text-white truncate">{r.product.name}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={r.quantity}
                    onChange={(e) =>
                      updateQty(r.product.id, Number(e.target.value) || 0)
                    }
                    className="w-16 rounded bg-white/10 border border-white/20 px-2 py-1 text-white text-sm text-right"
                  />
                  <span className="text-white/90 text-sm w-20 text-right">
                    {formatYen(Number(r.product.base_price) * r.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(r.product.id)}
                    className="p-1 text-white/70 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-right font-semibold text-white">
            合計: {formatYen(total)}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm text-white/80 mb-2">決済方法</label>
        <div className="flex gap-2">
          {paymentMethods.map((pm) => (
            <label key={pm.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={pm.value}
                checked={paymentMethod === pm.value}
                onChange={() => setPaymentMethod(pm.value)}
                className="rounded-full border-white/30 text-maroon"
              />
              <span className="text-white text-sm">{pm.label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="rounded-lg bg-white/25 px-4 py-2 text-white font-medium hover:bg-white/35 disabled:opacity-50"
        >
          {loading ? "登録中…" : "売上を計上"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg bg-white/10 px-4 py-2 text-white font-medium hover:bg-white/20"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
