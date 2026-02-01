import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { ThemeColorMeta } from "./ThemeColorMeta";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("ThemeColorMeta", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
    document.head.innerHTML = "";
  });

  it("renders nothing (null)", () => {
    const { container } = render(<ThemeColorMeta />);
    expect(container.firstChild).toBeNull();
  });

  it("sets theme-color meta to #ffffff on mount", () => {
    render(<ThemeColorMeta />);
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    expect(meta).not.toBeNull();
    expect(meta?.getAttribute("content")).toBe("#ffffff");
  });

  it("updates theme-color when pathname changes", () => {
    const { rerender } = render(<ThemeColorMeta />);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute("content")).toBe("#ffffff");

    mockUsePathname.mockReturnValue("/inventory");
    rerender(<ThemeColorMeta />);
    expect(document.querySelector('meta[name="theme-color"]')?.getAttribute("content")).toBe("#ffffff");
  });

  it("reuses existing theme-color meta if present", () => {
    const existing = document.createElement("meta");
    existing.setAttribute("name", "theme-color");
    existing.setAttribute("content", "#000000");
    document.head.appendChild(existing);

    render(<ThemeColorMeta />);
    const metas = document.querySelectorAll('meta[name="theme-color"]');
    expect(metas.length).toBe(1);
    expect(metas[0].getAttribute("content")).toBe("#ffffff");
  });
});
