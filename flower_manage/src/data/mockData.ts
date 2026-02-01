export type FlowerCategory = "rose" | "tulip" | "lily" | "sunflower" | "orchid" | "carnation" | "hydrangea" | "peony" | "other";

export type FreshnessStatus = "fresh" | "warning" | "danger";

export interface Flower {
  id: string;
  nameEn: string;
  nameJa: string;
  category: FlowerCategory;
  imageUrl: string;
  stock: number;
  unit: string;
  purchaseDate: string; // ISO date string
  pricePerUnit: number;
  notes?: string;
}

export const FLOWER_IMAGES: Record<string, string> = {
  rose: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
  tulip: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop",
  lily: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
  sunflower: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop",
  orchid: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=400&fit=crop",
  carnation: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
  hydrangea: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop",
  peony: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&h=400&fit=crop",
  default: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
};

export const MOCK_FLOWERS: Flower[] = [
  {
    id: "1",
    nameEn: "Rosa 'Peace'",
    nameJa: "ピース・ローズ",
    category: "rose",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    stock: 48,
    unit: "本",
    purchaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 350,
    notes: "定番人気",
  },
  {
    id: "2",
    nameEn: "Tulip 'Queen of Night'",
    nameJa: "クイーン・オブ・ナイト チューリップ",
    category: "tulip",
    imageUrl: "https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400&h=400&fit=crop",
    stock: 120,
    unit: "本",
    purchaseDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 180,
  },
  {
    id: "3",
    nameEn: "Oriental Lily 'Casa Blanca'",
    nameJa: "カーサ・ブランカ オリエンタルリリー",
    category: "lily",
    imageUrl: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop",
    stock: 36,
    unit: "本",
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 420,
  },
  {
    id: "4",
    nameEn: "Sunflower 'Giant'",
    nameJa: "ジャイアント ヒマワリ",
    category: "sunflower",
    imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&h=400&fit=crop",
    stock: 24,
    unit: "本",
    purchaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 280,
  },
  {
    id: "5",
    nameEn: "Phalaenopsis",
    nameJa: "胡蝶蘭",
    category: "orchid",
    imageUrl: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=400&fit=crop",
    stock: 12,
    unit: "鉢",
    purchaseDate: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 3500,
    notes: "祝い用",
  },
  {
    id: "6",
    nameEn: "Carnation 'Improved White'",
    nameJa: "改良白 カーネーション",
    category: "carnation",
    imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&h=400&fit=crop",
    stock: 96,
    unit: "本",
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 120,
  },
  {
    id: "7",
    nameEn: "Hydrangea 'Endless Summer'",
    nameJa: "エンドレスサマー アジサイ",
    category: "hydrangea",
    imageUrl: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&h=400&fit=crop",
    stock: 8,
    unit: "束",
    purchaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 1800,
  },
  {
    id: "8",
    nameEn: "Peony 'Sarah Bernhardt'",
    nameJa: "サラ・ベルナール 牡丹",
    category: "peony",
    imageUrl: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&h=400&fit=crop",
    stock: 20,
    unit: "本",
    purchaseDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 650,
  },
  {
    id: "9",
    nameEn: "Eustoma 'Double Blue'",
    nameJa: "ダブルブルー トルコキキョウ",
    category: "other",
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    stock: 60,
    unit: "本",
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pricePerUnit: 200,
  },
];

export const CATEGORY_LABELS: Record<FlowerCategory, string> = {
  rose: "バラ",
  tulip: "チューリップ",
  lily: "ユリ",
  sunflower: "ヒマワリ",
  orchid: "ラン",
  carnation: "カーネーション",
  hydrangea: "アジサイ",
  peony: "牡丹",
  other: "その他",
};

export function getDaysSincePurchase(purchaseDate: string): number {
  const purchase = new Date(purchaseDate);
  const now = new Date();
  const diffTime = now.getTime() - purchase.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getFreshnessStatus(daysSincePurchase: number): FreshnessStatus {
  if (daysSincePurchase <= 3) return "fresh";
  if (daysSincePurchase <= 6) return "warning";
  return "danger";
}

export function getFreshnessProgress(daysSincePurchase: number): number {
  const maxDays = 10;
  return Math.min(100, (daysSincePurchase / maxDays) * 100);
}
