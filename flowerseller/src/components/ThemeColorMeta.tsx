"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const THEME_COLOR = "#ffffff";

/**
 * クライアント遷移時もブラウザのツールバー色を白に保つ。
 * Dia など、SPA 遷移で head を更新しないブラウザ向け。
 */
export function ThemeColorMeta() {
  const pathname = usePathname();

  useEffect(() => {
    const name = "theme-color";
    let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", THEME_COLOR);
  }, [pathname]);

  return null;
}
