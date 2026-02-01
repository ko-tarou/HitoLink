import { render, screen } from "@testing-library/react";
import { HomeGrid } from "./HomeGrid";

describe("HomeGrid", () => {
  it("renders navigation with aria-label", () => {
    render(<HomeGrid />);
    expect(screen.getByRole("navigation", { name: "メインメニュー" })).toBeInTheDocument();
  });

  it("renders all menu tiles with correct labels and links", () => {
    render(<HomeGrid />);
    expect(screen.getByRole("link", { name: "在庫管理、商品・バッチ一覧" })).toHaveAttribute("href", "/inventory");
    expect(screen.getByRole("link", { name: "入荷、OCR取り込み" })).toHaveAttribute("href", "/inbound");
    expect(screen.getByRole("link", { name: "売上、売上計上・履歴" })).toHaveAttribute("href", "/pos");
    expect(screen.getByRole("link", { name: "価格管理、一括調整" })).toHaveAttribute("href", "/price");
    expect(screen.getByRole("link", { name: "鮮度管理、水やり・品質管理" })).toHaveAttribute("href", "/freshness");
  });

  it("renders date and time status", () => {
    render(<HomeGrid />);
    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute("aria-live", "polite");
  });

  it("has 5 tile links", () => {
    render(<HomeGrid />);
    const links = screen.getAllByRole("link");
    const tileLinks = links.filter((l) => l.getAttribute("href")?.startsWith("/"));
    expect(tileLinks).toHaveLength(5);
  });
});
