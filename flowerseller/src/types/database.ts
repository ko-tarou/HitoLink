export type ProductType = "single" | "bundle" | "arrangement";
export type PaymentMethod = "cash" | "credit" | "paypay";
export type UserRole = "admin" | "member";
export type InboundStatus = "pending" | "processed" | "failed";

export interface Profile {
  id: string;
  role: UserRole;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  category_id: string | null;
  base_price: number;
  description: string | null;
  disposal_days: number | null;
  embedding: number[] | null;
  created_at: string;
  updated_at: string;
}

export interface ProductComponent {
  id: string;
  parent_product_id: string;
  child_product_id: string;
  quantity: number;
  created_at: string;
}

export interface InventoryBatch {
  id: string;
  product_id: string;
  quantity: number;
  received_at: string;
  disposal_date: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface WateringRecord {
  id: string;
  inventory_batch_id: string;
  watered_at: string;
  next_watering_at: string | null;
  created_by: string | null;
  created_at: string;
}

export interface InboundRecord {
  id: string;
  source_type: string;
  raw_text: string | null;
  image_url: string | null;
  status: InboundStatus;
  created_by: string | null;
  created_at: string;
  processed_at: string | null;
}

export interface InboundItem {
  id: string;
  inbound_record_id: string;
  product_id: string;
  quantity: number;
  unit_price: number | null;
  created_at: string;
}

export interface Sale {
  id: string;
  total_amount: number;
  payment_method: PaymentMethod;
  created_by: string | null;
  created_at: string;
}

export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
}

export interface PriceAdjustmentHistory {
  id: string;
  adjustment_type: string;
  value: number;
  category_id: string | null;
  created_by: string;
  created_at: string;
}

export interface ProductWithCategory extends Product {
  categories?: Category | null;
}

export interface InventoryBatchWithProduct extends InventoryBatch {
  products?: Product | null;
}
