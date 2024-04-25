import { test, expect } from "@playwright/test";

test.describe(
  "Verification of qauto app",
  { tag: ["@qauto", "@regression", "@add_car"] },
  () => {
    test.describe.configure({ mode: "serial" });

    // test.afterAll(async () => {
    //   await page.close();
    // });
    const loginName = process.env.LOGIN_USERNAME;
    const loginPass = process.env.LOGIN_PASS;

    test("open main page", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(3000);
      // await page.locator('button.header_signin').click();

      const signinButton = page.locator("button.header_signin");
      await signinButton.click();
    });

    test("usage of getByRole", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
    });

    test("usage of getByText", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByText("Sign In")).toBeVisible();
    });

    test.skip("usage of getByLabel", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByLabel("Email")).toBeVisible();
    });

    test.skip("usage of fill method", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.locator('input[name="email"]').fill(loginName);
      await page.locator('input[name="password"]').fill(loginPass);
      await page.waitForTimeout(3000);
    });

    test("usage of fill method and soft assert for pass field", async ({
      page,
    }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
      await page.locator('input[name="email"]').fill(loginName);
      await page.locator('input[name="password"]').fill(loginPass);
      await page.locator('input[name="password"]').clear();
      await page.getByRole("button", { name: "Login" }).click({ force: true });
      // soft assertion
      await expect
        .soft(page.locator("div.invalid-feedback p"))
        .toContainText("Blah-Blah");
      await page.locator('input[name="password"]').fill(loginPass);
      await page.getByRole("button", { name: "Login" }).click({ force: true });

      await page.waitForURL("/panel/garage");

      const textOnGaragePage = page.locator(".panel-page h1");
      await textOnGaragePage.waitFor({ state: "visible" });
      await expect(textOnGaragePage).toContainText("Garage");
    });

    test(
      "usage few selectors",
      { tag: "@contain_screenshot" },
      async ({ page }) => {
        await page.goto("/");
        await page.getByRole("QQQ.button", { name: "Sign In" }).click();
        await page.locator('input[name="email"]').fill(loginName);
        await page.locator('input[name="password"]').fill(loginPass);
        await page
          .locator('button:has-text("SignIn"), button:has-text("Login")')
          .click();
        await page.waitForURL("/panel/garage");
        await page.waitForTimeout(2000);
        // await expect(page.locator(".panel-page h1")).toHaveScreenshot(
        // "main-page.png"
        // );

        // need to rewrite
        await expect(page).toHaveScreenshot("main-page-actual.png");
        await page.pause();
        // const buttonLocator = page.locator("button");
        // await buttonLocator.filter({ hasText: "Login" }).click();

        // // locators in locators
        // const footerModal = page.locator("modal-footer");
        // const registerButton = footerModal.locator(".btn-link");
        // await registerButton.click();
      }
    );
  }
);
