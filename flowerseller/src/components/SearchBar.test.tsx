import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { SearchBar } from "./SearchBar";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({ push: mockPush });

describe("SearchBar", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders search form with aria-label", () => {
    render(<SearchBar />);
    expect(screen.getByRole("search", { name: "商品検索" })).toBeInTheDocument();
  });

  it("renders search input and submit button", () => {
    render(<SearchBar />);
    expect(screen.getByRole("searchbox", { name: "検索キーワード" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "検索を実行" })).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "バラ" } });
    expect(input).toHaveValue("バラ");
  });

  it("navigates to search page with query on submit", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "春の花" } });
    fireEvent.click(screen.getByRole("button", { name: "検索を実行" }));
    expect(mockPush).toHaveBeenCalledWith("/search?q=%E6%98%A5%E3%81%AE%E8%8A%B1");
  });

  it("does not navigate when query is empty", () => {
    render(<SearchBar />);
    fireEvent.click(screen.getByRole("button", { name: "検索を実行" }));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("does not navigate when query is only whitespace", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: "検索を実行" }));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
