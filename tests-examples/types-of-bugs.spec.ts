import { test, expect } from "@playwright/test";
import { TypesOfBugsPage } from "./pages/typesOfBugsPage";

const EXPECTED_BUG_TYPES = ["Functional", "Visual", "Content", "Performance", "Crash"];

test.describe("AcademyBugs - Types of Bugs", () => {
  test("should display the Types of Bugs page", async ({ page }) => {
    const typesOfBugsPage = new TypesOfBugsPage(page);
    await typesOfBugsPage.open();

    await expect(typesOfBugsPage.heading).toBeVisible();
    await expect(typesOfBugsPage.subheading).toBeVisible();
    await expect(typesOfBugsPage.tiles).toHaveCount(EXPECTED_BUG_TYPES.length);
  });

  test("should list bug type categories in the expected order", async ({ page }) => {
    const typesOfBugsPage = new TypesOfBugsPage(page);
    await typesOfBugsPage.open();

    const names = await typesOfBugsPage.getBugTypeNames();
    expect(names).toEqual(EXPECTED_BUG_TYPES);
  });

  test("should display a non-empty description for every bug type tile", async ({ page }) => {
    const typesOfBugsPage = new TypesOfBugsPage(page);
    await typesOfBugsPage.open();

    const descriptions = await typesOfBugsPage.getBugTypeDescriptions();
    expect(descriptions).toHaveLength(EXPECTED_BUG_TYPES.length);
    for (const description of descriptions) {
      expect(description.length).toBeGreaterThan(0);
    }
  });
});
