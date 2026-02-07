import { render, screen } from "@testing-library/react";
import { HomeGrid } from "./HomeGrid";

describe("HomeGrid", () => {
  it("renders navigation with aria-label", () => {
    render(<HomeGrid />);
    expect(screen.getByRole("navigation", { name: "メインメニュー" })).toBeInTheDocument();
  });

  it("renders 3 tiles for seller (直接購入・入荷履歴・入荷出費、在庫管理なし)", () => {
    render(<HomeGrid />);
    expect(screen.getByRole("link", { name: "直接購入、生産者出品一覧・購入・チャット" })).toHaveAttribute("href", "/freshness");
    expect(screen.getByRole("link", { name: "入荷履歴、入荷記録一覧" })).toHaveAttribute("href", "/inbound");
    expect(screen.getByRole("link", { name: "入荷出費、売上・入荷にまつわる出費" })).toHaveAttribute("href", "/inbound-expenses");
  });

  it("renders 4 tiles for producer (栽培管理・直接販売・出荷履歴・売れ行き)", () => {
    render(<HomeGrid businessType="producer" />);
    expect(screen.getByRole("link", { name: "栽培管理、品目・バッチ一覧" })).toHaveAttribute("href", "/producer/cultivation");
    expect(screen.getByRole("link", { name: "直接販売、品質管理すべき在庫" })).toHaveAttribute("href", "/producer/direct-sales");
    expect(screen.getByRole("link", { name: "出荷履歴、出荷記録一覧" })).toHaveAttribute("href", "/producer/shipments");
    expect(screen.getByRole("link", { name: "売れ行き、販売実績・履歴" })).toHaveAttribute("href", "/producer/sell-through");
  });

  it("renders date and time status", () => {
    render(<HomeGrid />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("has 3 tile links for seller", () => {
    render(<HomeGrid />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
