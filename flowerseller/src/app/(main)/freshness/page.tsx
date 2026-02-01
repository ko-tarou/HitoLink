import { getInventoryBatches } from "@/lib/actions/inventory";
import { pageContainer } from "@/lib/ui-classes";
import { QualityTodoList, type TodoBatch } from "./QualityTodoList";

type Batch = {
  id: string;
  product_id: string;
  quantity: number;
  received_at: string;
  disposal_date: string | null;
  products: {
    id: string;
    name: string;
    disposal_days: number | null;
  } | null;
};

const DEFAULT_DISPOSAL_DAYS = 3;

/** 入荷から指定日数（品質管理日数）を経過したバッチを TODO として返す */
function getQualityTodoBatches(batches: Batch[]): Batch[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return batches.filter((b) => {
    const days = b.products?.disposal_days ?? DEFAULT_DISPOSAL_DAYS;
    const received = new Date(b.received_at);
    received.setHours(0, 0, 0, 0);
    const elapsedDays = Math.floor(
      (today.getTime() - received.getTime()) / (24 * 60 * 60 * 1000)
    );
    return elapsedDays >= days;
  });
}

export default async function FreshnessPage() {
  const batches = (await getInventoryBatches()) as Batch[];
  const todoBatches = getQualityTodoBatches(batches) as TodoBatch[];

  return (
    <div className={pageContainer}>
      <section aria-labelledby="quality-todo-heading">
        <h2
          id="quality-todo-heading"
          className="text-xl font-bold text-text mb-1"
        >
          品質管理
        </h2>
        <p className="text-sm text-text-muted mb-4">
          入荷から指定日数が経過した在庫が表示されます。
        </p>
        <div className="rounded-xl bg-base border-2 border-border overflow-hidden">
          <ul className="divide-y divide-border" role="list">
            <QualityTodoList batches={todoBatches} />
          </ul>
        </div>
      </section>
    </div>
  );
}
