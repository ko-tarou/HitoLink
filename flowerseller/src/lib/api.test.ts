import { getAuthToken } from "./api";

describe("getAuthToken", () => {
  beforeEach(() => {
    if (typeof document !== "undefined") {
      document.cookie = "";
    }
  });

  it("returns null when no auth cookie", () => {
    if (typeof document !== "undefined") {
      document.cookie = "other=value";
    }
    expect(getAuthToken()).toBeNull();
  });

  it("returns token from cookie when auth cookie present", () => {
    const token = "abc123";
    if (typeof document !== "undefined") {
      document.cookie = `auth=${encodeURIComponent(token)}; path=/`;
    }
    expect(getAuthToken()).toBe(token);
  });

  it("returns decoded token from cookieHeader when passed", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxx";
    expect(getAuthToken(`auth=${encodeURIComponent(token)}`)).toBe(token);
  });

  it("returns null when cookieHeader is null", () => {
    if (typeof document !== "undefined") {
      document.cookie = "auth=; Max-Age=0";
    }
    expect(getAuthToken(null)).toBeNull();
  });
});
