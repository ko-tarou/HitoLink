import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="在庫管理" />);
    expect(screen.getByRole("heading", { name: "在庫管理" })).toBeInTheDocument();
  });

  it("renders action when provided", () => {
    render(
      <PageHeader
        title="在庫管理"
        action={<button type="button">新規登録</button>}
      />
    );
    expect(screen.getByRole("heading", { name: "在庫管理" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "新規登録" })).toBeInTheDocument();
  });

  it("does not render action wrapper when action is undefined", () => {
    render(<PageHeader title="商品登録" />);
    expect(screen.getByRole("heading", { name: "商品登録" })).toBeInTheDocument();
    expect(screen.queryByLabelText("フォーム操作")).not.toBeInTheDocument();
  });
});
