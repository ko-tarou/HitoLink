"use client";

import { useState } from "react";
import { createWateringRecord } from "@/lib/actions/watering";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <label className="block text-sm text-white/80 mb-1">水やりした在庫</label>
        <select
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
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
        <label className="block text-sm text-white/80 mb-1">次回水やり（日数）</label>
        <select
          value={nextDays}
          onChange={(e) => setNextDays(e.target.value)}
          className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white"
        >
          <option value="1">1日後</option>
          <option value="2">2日後</option>
          <option value="3">3日後</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-300">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-white/25 px-6 py-4 text-lg font-semibold text-white hover:bg-white/35 disabled:opacity-50 border-2 border-white/25"
      >
        {loading ? "登録中…" : "水やりを記録"}
      </button>
    </form>
  );
}
