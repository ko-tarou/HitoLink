import { getProducts } from "@/lib/actions/products";
import { InboundNewForm } from "./InboundNewForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function InboundNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="入荷登録" />
      <InboundNewForm
        products={products.map((p) => ({ id: p.id, name: p.name }))}
      />
    </div>
  );
}
