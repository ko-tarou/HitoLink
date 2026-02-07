"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatYen } from "@/lib/utils";
import { updateDirectSaleListing } from "@/lib/actions/directSaleListings";
import type { DirectSaleListing } from "@/lib/actions/directSaleListings";
import { btn, inputBase, labelBase, selectBase } from "@/lib/ui-classes";

const DELIVERY_LABELS: Record<string, string> = {
  pickup_only: "現地受け取りのみ",
  delivery_only: "配送のみ",
  both: "現地・配送可",
};

const DELIVERY_OPTIONS = [
  { value: "both", label: "現地・配送可" },
  { value: "pickup_only", label: "現地受け取りのみ" },
  { value: "delivery_only", label: "配送のみ" },
] as const;

function getDeliveryLabel(option: string): string {
  return DELIVERY_LABELS[option] ?? option;
}

type Props = {
  listings: DirectSaleListing[];
};

export function DirectSalesGrid({ listings }: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState<DirectSaleListing | null>(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<string>("both");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setProductName(editing.product_name);
      setPrice(String(editing.price));
      setQuantity(String(editing.quantity));
      setDeliveryOption(editing.delivery_option);
      setImageUrl(editing.image_url ?? "");
      setDescription(editing.description ?? "");
      setError("");
    }
  }, [editing]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setEditing(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const name = productName.trim();
    if (!name) {
      setError("商品名を入力してください");
      return;
    }
    const p = Number(price);
    const q = Number(quantity);
    if (Number.isNaN(p) || p < 0) {
      setError("価格を0以上の数で入力してください");
      return;
    }
    if (Number.isNaN(q) || q < 0) {
      setError("在庫数を0以上の数で入力してください");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await updateDirectSaleListing(editing.id, {
        product_name: name,
        price: p,
        quantity: q,
        delivery_option: deliveryOption as "pickup_only" | "delivery_only" | "both",
        image_url: imageUrl.trim() || null,
        description: description.trim() || null,
      });
      setEditing(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 list-none p-0 m-0"
        role="list"
      >
        {listings.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setEditing(item)}
              className="w-full text-left rounded-xl border-2 border-border bg-base overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="aspect-square relative bg-base-subtle">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-text-muted"
                    aria-hidden
                  >
                    <svg
                      className="w-16 h-16 opacity-40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-text text-sm line-clamp-2 min-h-[2.5rem]">
                  {item.product_name}
                </p>
                <p className="text-primary font-bold text-base mt-1">
                  {formatYen(item.price)}
                </p>
                <p className="text-text-muted text-xs mt-1">
                  在庫 {Number(item.quantity)}
                </p>
                <span
                  className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-base-subtle text-text-secondary"
                  title={getDeliveryLabel(item.delivery_option)}
                >
                  {getDeliveryLabel(item.delivery_option)}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-listing-title"
          onClick={(e) => e.target === e.currentTarget && setEditing(null)}
        >
          <div
            className="bg-base rounded-xl border-2 border-border shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto text-text"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <h2 id="edit-listing-title" className="text-xl font-bold text-text m-0 mb-4">
                出品を編集
              </h2>
              <div>
                <label htmlFor="edit-product-name" className={labelBase}>商品名</label>
                <input
                  id="edit-product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className={inputBase}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-price" className={labelBase}>価格（円）</label>
                <input
                  id="edit-price"
                  type="number"
                  min={0}
                  step={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={inputBase}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-quantity" className={labelBase}>在庫数</label>
                <input
                  id="edit-quantity"
                  type="number"
                  min={0}
                  step={0.01}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={inputBase}
                  required
                />
              </div>
              <div>
                <label htmlFor="edit-delivery" className={labelBase}>受け取り方法</label>
                <select
                  id="edit-delivery"
                  value={deliveryOption}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className={selectBase}
                >
                  {DELIVERY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edit-image-url" className={labelBase}>画像URL（任意）</label>
                <input
                  id="edit-image-url"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputBase}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label htmlFor="edit-description" className={labelBase}>説明（任意）</label>
                <textarea
                  id="edit-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputBase} min-h-[80px]`}
                  rows={3}
                />
              </div>
              {error && (
                <p className="text-error text-sm" role="alert">{error}</p>
              )}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className={btn.secondary}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={btn.primary}
                >
                  {loading ? "保存中..." : "保存"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
