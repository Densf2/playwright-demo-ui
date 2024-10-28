import { test, expect } from "@playwright/test";
import { GithubPage } from "./pages/githubPage";

test("has title", async ({ page }) => {
  const githubPage = new GithubPage(page);
  await githubPage.openPlaywrightPage();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  const githubPage = new GithubPage(page);
  await githubPage.openPlaywrightPage();

  // Click the get started link.
  await githubPage.linkGetStarted.click();

  // Expects page to have a heading with the name of Installation.
  await expect(githubPage.InstallationLink).toBeVisible();
});
