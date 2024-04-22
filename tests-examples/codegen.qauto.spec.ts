import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { Header } from "./components/header";

test.beforeEach(async ({ page }) => {
  // const loginpage = new LoginPage(page);
  await page.goto("/");
});

test("test with valid data", async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.loginWithDefaultParams();
  const button = await loginpage.buttonLogin();
  await expect(button).toBeVisible();
  await button.click();

  //   await expect(page.getByRole("button", { name: "Add car" })).toBeVisible();
  //   await page.getByRole("button", { name: "Add car" }).click();
  //   await page.getByLabel("Brand").selectOption("3: 4");
  //   await page
  //     .locator("div")
  //     .filter({
  //       hasText: /^BrandAudiBMWFordPorscheFiatModel911CayennePanameraMileagekm$/,
  //     })
  //     .click();
  //   await page.getByLabel("Model").selectOption("10: 18");
  //   await page.getByLabel("Mileage").click();
  //   await page.getByLabel("Mileage").fill("101010");
  //   await expect(page.getByRole("button", { name: "Add" })).toBeVisible();
  //   await page.getByRole("button", { name: "Add" }).click();
  await expect(page.getByRole("list")).toContainText("Porsche Panamera");
  await expect(page.getByText("Update mileage • 08.04.2024")).toBeVisible();
});

test("login with invalid data", async ({ page }) => {
  const loginpage = new LoginPage(page);
  const header = new Header(page);
  await header.logoVisible();
  await loginpage.loginWithDynamicData("fhhhf", "292948bb22323");
});
