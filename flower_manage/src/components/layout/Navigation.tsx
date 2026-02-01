"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/inventory", label: "在庫一覧", icon: Package },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:static md:bottom-auto md:z-auto">
      <div className="glass border-t border-border/50 md:border-t-0 md:rounded-2xl md:p-2 md:shadow-[0_4px_24px_-4px_rgba(74,93,79,0.08)]">
        <ul className="flex justify-around gap-1 p-3 md:flex-col md:gap-2 md:p-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-sm font-medium transition-colors md:flex-row md:gap-3 md:px-4 md:py-3",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
