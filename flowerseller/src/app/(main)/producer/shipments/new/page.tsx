import { getProducts } from "@/lib/actions/products";
import { InboundNewForm } from "@/app/(main)/inbound/new/InboundNewForm";

/** 生産者: 出荷登録（同一UI・ロジックは出荷として分離） */
export default async function ProducerShipmentNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <InboundNewForm
        products={products.map((p) => ({ id: p.id, name: p.name }))}
        successRedirect="/producer/shipments"
      />
    </div>
  );
}
