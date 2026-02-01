import { getCategories } from "@/lib/actions/categories";
import { ProductNewForm } from "./ProductNewForm";

export default async function ProductNewPage() {
  const categories = await getCategories();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-white mb-4">商品登録</h2>
      <ProductNewForm categories={categories} />
    </div>
  );
}
