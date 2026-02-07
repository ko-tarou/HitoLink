"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCultivationBatch } from "@/lib/actions/cultivation";
import { FormActions } from "@/components/ui/FormActions";
import { btn, inputBase, labelBase } from "@/lib/ui-classes";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function oneYearLaterISO(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
}

export function CultivationNewForm() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [quantityPlanted, setQuantityPlanted] = useState("100");
  const [startedAt, setStartedAt] = useState(todayISO());
  const [expectedHarvestAt, setExpectedHarvestAt] = useState(oneYearLaterISO());
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = Number(quantityPlanted);
    const name = productName.trim();
    if (!name) {
      setError("品目を入力してください");
      return;
    }
    if (Number.isNaN(qty) || qty <= 0) {
      setError("植付数を0より大きい数で入力してください");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createCultivationBatch({
        product_name: name,
        quantity_planted: qty,
        started_at: startedAt || undefined,
        expected_harvest_at: expectedHarvestAt || null,
        notes: notes.trim() || null,
      });
      // 1つ前（栽培一覧）に戻るだけにし、履歴を [ホーム, 栽培一覧] に保つ。戻る1回でホームへ
      router.refresh();
      window.history.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-text" noValidate aria-label="栽培を追加">
      <div>
        <label htmlFor="cultivation-product" className={labelBase}>
          品目（花）
        </label>
        <input
          id="cultivation-product"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={inputBase}
          placeholder="例: バラ、トルコキキョウ"
          required
          autoFocus
        />
      </div>

      <div>
        <label htmlFor="cultivation-quantity" className={labelBase}>
          植付数
        </label>
        <input
          id="cultivation-quantity"
          type="number"
          min={0.01}
          step={0.01}
          value={quantityPlanted}
          onChange={(e) => setQuantityPlanted(e.target.value)}
          className={inputBase}
          placeholder="例: 100"
          required
        />
      </div>

      <div>
        <label htmlFor="cultivation-started" className={labelBase}>
          栽培開始日
        </label>
        <input
          id="cultivation-started"
          type="date"
          value={startedAt}
          onChange={(e) => setStartedAt(e.target.value)}
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="cultivation-expected" className={labelBase}>
          予定収穫日（任意）
        </label>
        <input
          id="cultivation-expected"
          type="date"
          value={expectedHarvestAt}
          onChange={(e) => setExpectedHarvestAt(e.target.value)}
          className={inputBase}
        />
      </div>

      <div>
        <label htmlFor="cultivation-notes" className={labelBase}>
          メモ（任意）
        </label>
        <textarea
          id="cultivation-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputBase} min-h-[80px]`}
          rows={3}
        />
      </div>

      {error && (
        <p className="text-error text-sm" role="alert">
          {error}
        </p>
      )}

      <FormActions
        secondary={
          <button
            type="button"
            onClick={() => router.back()}
            className={btn.secondary}
          >
            キャンセル
          </button>
        }
        primary={
          <button type="submit" disabled={loading} className={btn.primary}>
            {loading ? "登録中..." : "栽培を追加"}
          </button>
        }
      />
    </form>
  );
}
