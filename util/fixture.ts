import { test as base } from "@playwright/test";
import { LoginPage } from "../tests-examples/pages/loginPage";

type MyFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.openPage();
    await loginPage.loginWithDefaultParams();
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";
