import { getProducts } from "@/lib/actions/products";
import { PosNewForm } from "./PosNewForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function PosNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="売上登録" />
      <PosNewForm products={products} />
    </div>
  );
}
