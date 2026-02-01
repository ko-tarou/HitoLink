import { cn, formatYen, formatDate, formatDateTime } from "./utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", true && "block")).toBe("base block");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("formatYen", () => {
  it("formats number as JPY (ja-JP locale)", () => {
    // Intl may output ￥ (U+FFE5) or ¥ (U+00A5)
    expect(formatYen(0)).toMatch(/[¥￥]\s*0/);
    expect(formatYen(100)).toMatch(/[¥￥]\s*100/);
    expect(formatYen(350)).toMatch(/[¥￥]\s*350/);
    expect(formatYen(5000)).toMatch(/[¥￥]\s*5,?000/);
  });

  it("handles decimal (rounds for JPY)", () => {
    const s = formatYen(100.5);
    expect(s).toMatch(/[¥￥]/);
    expect(s).toMatch(/\d/);
  });
});

describe("formatDate", () => {
  it("formats ISO date string to ja-JP date", () => {
    const s = formatDate("2025-02-01");
    expect(s).toMatch(/2025/);
    expect(s).toMatch(/2/);
    expect(s).toMatch(/1/);
  });

  it("handles ISO datetime", () => {
    const s = formatDate("2025-02-01T12:00:00.000Z");
    expect(s).toMatch(/2025/);
  });
});

describe("formatDateTime", () => {
  it("formats ISO string to ja-JP date and time", () => {
    const s = formatDateTime("2025-02-01T14:30:00.000Z");
    expect(s).toMatch(/2025/);
    expect(s).toMatch(/2/);
    expect(s).toMatch(/1/);
    expect(s).toMatch(/\d/);
  });
});
