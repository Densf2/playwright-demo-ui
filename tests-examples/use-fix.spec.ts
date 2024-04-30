import { test, expect } from "../util/fixture";

test(
  "test based on fixture",
  { tag: "@fixture-usage" },
  async ({ loginPage, page }) => {
    await loginPage.openPage();
    await loginPage.loginWithDefaultParams();
    await page.screenshot();
    await expect(page.getByRole("list")).toContainText("Porsche Panamera");
  }
);
