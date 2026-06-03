import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/#atlas", "/#research", "/#translator", "/#trials", "/#portfolio"];

test.describe("CommonAxon accessibility smoke checks", () => {
  for (const route of routes) {
    test(`has no detectable axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("main#app")).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
