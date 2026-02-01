import { render, screen } from "@testing-library/react";
import { FormActions } from "./FormActions";

describe("FormActions", () => {
  it("renders primary button", () => {
    render(
      <FormActions primary={<button type="submit">登録</button>} />
    );
    expect(screen.getByRole("button", { name: "登録" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "フォーム操作" })).toBeInTheDocument();
  });

  it("renders secondary and primary", () => {
    render(
      <FormActions
        secondary={<button type="button">キャンセル</button>}
        primary={<button type="submit">登録</button>}
      />
    );
    expect(screen.getByRole("button", { name: "キャンセル" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "登録" })).toBeInTheDocument();
  });

  it("renders only primary when secondary is omitted", () => {
    render(
      <FormActions primary={<button type="submit">適用</button>} />
    );
    expect(screen.getByRole("button", { name: "適用" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "キャンセル" })).not.toBeInTheDocument();
  });
});
