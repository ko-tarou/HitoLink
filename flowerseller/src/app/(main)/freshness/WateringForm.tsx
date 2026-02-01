"use client";

import { useState } from "react";
import { createWateringRecord } from "@/lib/actions/watering";
import { useRouter } from "next/navigation";
import { FormActions } from "@/components/ui/FormActions";
import { btn } from "@/lib/ui-classes";

type Batch = {
  id: string;
  product_id: string;
  products: { name: string } | null;
};

export function WateringForm({ batches }: { batches: Batch[] }) {
  const router = useRouter();
  const [batchId, setBatchId] = useState("");
  const [nextDays, setNextDays] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) {
      setError("在庫バッチを選択してください");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const d = new Date();
      d.setDate(d.getDate() + Number(nextDays));
      await createWateringRecord({
        inventory_batch_id: batchId,
        next_watering_at: d.toISOString(),
      });
      router.refresh();
      setBatchId("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-text" noValidate aria-label="水やり記録フォーム">
      <div>
        <label htmlFor="watering-batch" className="block text-sm font-medium text-text mb-2">
          水やりした在庫
        </label>
        <select
          id="watering-batch"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="水やりした在庫バッチを選択"
        >
          <option value="">選択</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {(b as { products: { name: string } | null }).products?.name ?? "在庫"} (ID: {b.id.slice(0, 8)})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="watering-next-days" className="block text-sm font-medium text-text mb-2">
          次回水やり（日数）
        </label>
        <select
          id="watering-next-days"
          value={nextDays}
          onChange={(e) => setNextDays(e.target.value)}
          className="w-full rounded-lg border border-border bg-base px-4 py-3 text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          aria-label="次回水やりまでの日数"
        >
          <option value="1">1日後</option>
          <option value="2">2日後</option>
          <option value="3">3日後</option>
        </select>
      </div>
      {error && (
        <p className="text-sm text-error font-medium" role="alert">
          {error}
        </p>
      )}
      <FormActions
        primary={
          <button
            type="submit"
            disabled={loading}
            className={btn.primary}
            aria-busy={loading}
            aria-label={loading ? "登録中" : "水やりを記録"}
          >
            {loading ? "登録中…" : "水やりを記録"}
          </button>
        }
      />
    </form>
  );
}
