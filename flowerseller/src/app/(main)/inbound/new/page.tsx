import { getProducts } from "@/lib/actions/products";
import { InboundNewForm } from "./InboundNewForm";

export default async function InboundNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <InboundNewForm
        products={products.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
