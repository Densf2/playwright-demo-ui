import { test, expect } from "@playwright/test";
import { GithubPage } from "./pages/githubPage";

test.describe("Playwright test", async () => {
  test("has title", async ({ page }) => {
    const githubPage = new GithubPage(page);
    await githubPage.openPlaywrightPage();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole("link", { name: "Community" }).click();
    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
    await expect(page.getByLabel("Breadcrumbs").locator("span")).toContainText(
      "Welcome"
    );
    await page.getByRole("link", { name: "Live Streams", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Live Streams" })
    ).toBeVisible();
    await page.getByLabel("Switch between dark and light").click();
  });

  test("get started link", async ({ page }) => {
    const githubPage = new GithubPage(page);
    await githubPage.openPlaywrightPage();

    // Click the get started link.
    await githubPage.linkGetStarted.click();

    // Expects page to have a heading with the name of Installation.
    await expect(githubPage.InstallationLink).toBeVisible();
  });
});
