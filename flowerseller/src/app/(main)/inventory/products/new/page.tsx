import { getCategories } from "@/lib/actions/categories";
import { ProductNewForm } from "./ProductNewForm";
import { PageHeader } from "@/components/ui/PageHeader";

export default async function ProductNewPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto px-6 py-6 max-w-2xl">
      <PageHeader title="商品登録" />
      <ProductNewForm categories={categories} />
    </div>
  );
}
