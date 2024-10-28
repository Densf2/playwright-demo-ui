import { test, expect } from "@playwright/test";
import { GithubPage } from "./pages/githubPage";

test("has title", async ({ page }) => {
  const githubPage = new GithubPage(page);
  await githubPage.openPlaywrightPage();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
