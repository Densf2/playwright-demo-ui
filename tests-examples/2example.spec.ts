import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

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
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
