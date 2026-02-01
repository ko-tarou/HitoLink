"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  delay?: number;
  variant?: "default" | "warning" | "danger";
}

export function StatusCard({
  title,
  value,
  icon: Icon,
  delay = 0,
  variant = "default",
}: StatusCardProps) {
  const variantStyles = {
    default: "text-primary",
    warning: "text-[#D4A373]",
    danger: "text-destructive",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-0 bg-card/80 shadow-[0_4px_24px_-4px_rgba(74,93,79,0.08)] backdrop-blur-sm transition-shadow hover:shadow-[0_8px_32px_-4px_rgba(74,93,79,0.12)]">
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <motion.div
              className={cn("rounded-xl p-2", variantStyles[variant])}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 200 }}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          </div>
          <motion.span
            className="font-serif text-3xl font-semibold tracking-tight md:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {value}
          </motion.span>
        </CardContent>
      </Card>
    </motion.div>
  );
}

