import { getProducts } from "@/lib/actions/products";
import { PosNewForm } from "./PosNewForm";

export default async function PosNewPage() {
  const products = await getProducts({ sortBy: "name", order: "asc" });

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PosNewForm products={products} />
    </div>
  );
}
