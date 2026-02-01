"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInventoryStore } from "@/store/inventoryStore";
import { CATEGORY_LABELS, FLOWER_IMAGES } from "@/data/mockData";
import type { Flower, FlowerCategory } from "@/data/mockData";
import { cn } from "@/lib/utils";

function fireConfetti() {
  const count = 80;
  const defaults: confetti.Options = {
    origin: { y: 0.7 },
    colors: ["#4A5D4F", "#A3B18A", "#D4A373", "#F9F9F7"],
    spread: 55,
    startVelocity: 35,
    gravity: 1,
    scalar: 0.9,
    drift: 0,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

const initialFormState = {
  nameEn: "",
  nameJa: "",
  category: "rose" as FlowerCategory,
  stock: 0,
  unit: "本",
  purchaseDate: new Date().toISOString().split("T")[0],
  pricePerUnit: 0,
  notes: "",
};

export function StockInModal() {
  const isOpen = useInventoryStore((state) => state.isStockInModalOpen);
  const closeModal = useInventoryStore((state) => state.closeStockInModal);
  const addFlower = useInventoryStore((state) => state.addFlower);

  const [form, setForm] = useState(initialFormState);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newFlower: Flower = {
      id: `flower-${Date.now()}`,
      nameEn: form.nameEn,
      nameJa: form.nameJa,
      category: form.category,
      imageUrl: FLOWER_IMAGES[form.category] || FLOWER_IMAGES.default,
      stock: form.stock,
      unit: form.unit,
      purchaseDate: date?.toISOString().split("T")[0] ?? form.purchaseDate,
      pricePerUnit: form.pricePerUnit,
      notes: form.notes || undefined,
    };

    addFlower(newFlower);
    fireConfetti();

    setTimeout(() => {
      setForm(initialFormState);
      setDate(new Date());
      setIsSubmitting(false);
      closeModal();
    }, 1200);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setForm(initialFormState);
      setDate(new Date());
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 bg-card/95 shadow-[0_24px_80px_-12px_rgba(74,93,79,0.2)] backdrop-blur-xl sm:max-w-[480px] sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-semibold">
            新規入荷
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            新しい花の入荷情報を入力してください
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nameJa">花の名前（日本語）</Label>
              <Input
                id="nameJa"
                value={form.nameJa}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nameJa: e.target.value }))
                }
                placeholder="例: ピース・ローズ"
                required
                className="rounded-xl border-0 bg-background/80 shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameEn">花の名前（英語）</Label>
              <Input
                id="nameEn"
                value={form.nameEn}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, nameEn: e.target.value }))
                }
                placeholder="例: Rosa 'Peace'"
                className="rounded-xl border-0 bg-background/80 shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>カテゴリ</Label>
            <Select
              value={form.category}
              onValueChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  category: value as FlowerCategory,
                }))
              }
            >
              <SelectTrigger className="rounded-xl border-0 bg-background/80 shadow-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {(Object.keys(CATEGORY_LABELS) as FlowerCategory[]).map(
                  (category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="rounded-lg"
                    >
                      {CATEGORY_LABELS[category]}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stock">在庫数</Label>
              <Input
                id="stock"
                type="number"
                min={0}
                value={form.stock || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    stock: parseInt(e.target.value) || 0,
                  }))
                }
                placeholder="0"
                required
                className="rounded-xl border-0 bg-background/80 shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>単位</Label>
              <Select
                value={form.unit}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, unit: value }))
                }
              >
                <SelectTrigger className="rounded-xl border-0 bg-background/80 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="本" className="rounded-lg">
                    本
                  </SelectItem>
                  <SelectItem value="束" className="rounded-lg">
                    束
                  </SelectItem>
                  <SelectItem value="鉢" className="rounded-lg">
                    鉢
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>仕入れ日</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start rounded-xl border-0 bg-background/80 text-left font-normal shadow-sm",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "yyyy年M月d日", { locale: ja })
                  ) : (
                    <span>日付を選択</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-xl p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={ja}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricePerUnit">単価（円）</Label>
            <Input
              id="pricePerUnit"
              type="number"
              min={0}
              value={form.pricePerUnit || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  pricePerUnit: parseInt(e.target.value) || 0,
                }))
              }
              placeholder="0"
              className="rounded-xl border-0 bg-background/80 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">備考（任意）</Label>
            <Input
              id="notes"
              value={form.notes}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="メモや特記事項"
              className="rounded-xl border-0 bg-background/80 shadow-sm"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border-0"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl shadow-[0_4px_14px_-2px_rgba(74,93,79,0.25)]"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                    />
                    登録中...
                  </motion.span>
                ) : (
                  <motion.span
                    key="submit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    入荷登録
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
