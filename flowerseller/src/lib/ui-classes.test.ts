import { btn, pageContainer, formContainer } from "./ui-classes";

describe("ui-classes", () => {
  describe("btn.primary", () => {
    it("includes primary button styles", () => {
      expect(btn.primary).toMatch(/bg-primary/);
      expect(btn.primary).toMatch(/text-white/);
      expect(btn.primary).toMatch(/rounded-lg/);
      expect(btn.primary).toMatch(/min-h-\[48px\]/);
    });
  });

  describe("btn.secondary", () => {
    it("includes secondary button styles", () => {
      expect(btn.secondary).toMatch(/border-2/);
      expect(btn.secondary).toMatch(/bg-base/);
      expect(btn.secondary).toMatch(/text-text/);
      expect(btn.secondary).toMatch(/min-h-\[48px\]/);
    });
  });

  describe("btn.iconBack", () => {
    it("includes icon back button styles", () => {
      expect(btn.iconBack).toMatch(/min-w-\[56px\]/);
      expect(btn.iconBack).toMatch(/min-h-\[56px\]/);
      expect(btn.iconBack).toMatch(/rounded-xl/);
    });
  });

  describe("pageContainer", () => {
    it("includes max-w-4xl and padding", () => {
      expect(pageContainer).toMatch(/max-w-4xl/);
      expect(pageContainer).toMatch(/px-6/);
      expect(pageContainer).toMatch(/py-6/);
    });
  });

  describe("formContainer", () => {
    it("includes max-w-2xl and padding", () => {
      expect(formContainer).toMatch(/max-w-2xl/);
      expect(formContainer).toMatch(/px-6/);
      expect(formContainer).toMatch(/py-6/);
    });
  });
});
