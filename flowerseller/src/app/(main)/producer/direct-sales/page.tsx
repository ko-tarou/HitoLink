import { getInventoryBatches } from "@/lib/actions/inventory";
import { pageContainer } from "@/lib/ui-classes";
import { QualityTodoList, type TodoBatch } from "@/app/(main)/freshness/QualityTodoList";

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

/** 生産者: 直接販売（販売者・仲介者の品質管理とはロジック分離） */
export default async function ProducerDirectSalesPage() {
  const batches = (await getInventoryBatches()) as Batch[];
  const todoBatches = getQualityTodoBatches(batches) as TodoBatch[];

  return (
    <div className={pageContainer}>
      <section aria-labelledby="direct-sales-heading">
        <h2 id="direct-sales-heading" className="text-xl font-bold text-text mb-1">
          直接販売
        </h2>
        <p className="text-sm text-text-muted mb-4">
          入荷から指定日数が経過した在庫が表示されます。直接販売の対象として確認してください。
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
