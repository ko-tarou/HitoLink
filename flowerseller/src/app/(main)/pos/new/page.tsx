import { getProducts } from "@/lib/actions/products";
import { PosNewForm } from "./PosNewForm";

export default async function PosNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-4">売上登録</h2>
      <PosNewForm products={products} />
    </div>
  );
}
