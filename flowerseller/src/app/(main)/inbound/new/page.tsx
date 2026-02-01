import { getProducts } from "@/lib/actions/products";
import { InboundNewForm } from "./InboundNewForm";

export default async function InboundNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-4">入荷登録</h2>
      <InboundNewForm
        products={products.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
