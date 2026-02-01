"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSale } from "@/lib/actions/sales";
import { formatYen } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import type { Product } from "@/types/database";
import type { PaymentMethod } from "@/types/database";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

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
    <form onSubmit={handleSubmit} className="space-y-6 text-text" noValidate aria-label="売上登録フォーム">
      <section className="rounded-xl bg-base border border-border p-6" aria-labelledby="add-products-heading">
        <h3 id="add-products-heading" className="text-base font-semibold text-text mb-3">
          商品を追加
        </h3>
        <div className="flex flex-wrap gap-2">
          {products.slice(0, 20).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addToCart(p)}
              className="rounded-lg border-2 border-border bg-base-subtle px-4 py-2 text-sm text-text hover:bg-base-muted hover:border-primary/30 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`${p.name}（${formatYen(p.base_price)}）をカートに追加`}
            >
              {p.name} ({formatYen(p.base_price)})
            </button>
          ))}
        </div>
      </section>

      {cart.length > 0 && (
        <section className="rounded-xl bg-base border border-border p-6" aria-labelledby="cart-heading">
          <h3 id="cart-heading" className="text-base font-semibold text-text mb-3">
            カート
          </h3>
          <ul className="space-y-3" role="list">
            {cart.map((r) => (
              <li
                key={r.product.id}
                className="flex justify-between items-center gap-4 text-text"
              >
                <span className="truncate font-medium">{r.product.name}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <label htmlFor={`qty-${r.product.id}`} className="sr-only">
                    {r.product.name}の数量
                  </label>
                  <input
                    id={`qty-${r.product.id}`}
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={r.quantity}
                    onChange={(e) =>
                      updateQty(r.product.id, Number(e.target.value) || 0)
                    }
                    className="w-16 rounded-lg border border-border bg-base px-2 py-2 text-text text-sm text-right focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                    aria-label={`${r.product.name}の数量`}
                  />
                  <span className="text-text-muted text-sm w-20 text-right">
                    {formatYen(Number(r.product.base_price) * r.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(r.product.id)}
                    className="p-2 text-text-muted hover:text-error transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
                    aria-label={`${r.product.name}をカートから削除`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right font-semibold text-text text-lg">
            合計: {formatYen(total)}
          </p>
        </section>
      )}

      <fieldset>
        <legend className="block text-sm font-medium text-text mb-3">
          決済方法
        </legend>
        <div className="flex flex-wrap gap-4">
          {paymentMethods.map((pm) => (
            <label
              key={pm.value}
              className="flex items-center gap-2 cursor-pointer text-text"
            >
              <input
                type="radio"
                name="payment"
                value={pm.value}
                checked={paymentMethod === pm.value}
                onChange={() => setPaymentMethod(pm.value)}
                className="rounded-full border-border text-primary focus:ring-2 focus:ring-primary"
                aria-label={pm.label}
              />
              <span className="text-sm">{pm.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p className="text-sm text-error font-medium" role="alert">
          {error}
        </p>
      )}
      <FormActions
        secondary={
          <button
            type="button"
            onClick={() => router.back()}
            className={btn.secondary}
            aria-label="キャンセルして戻る"
          >
            キャンセル
          </button>
        }
        primary={
          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className={btn.primary}
            aria-busy={loading}
            aria-label={loading ? "登録中" : "売上を計上"}
          >
            {loading ? "登録中…" : "売上を計上"}
          </button>
        }
      />
    </form>
  );
}
