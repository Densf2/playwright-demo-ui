/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Page, type Locator } from "@playwright/test";
import { Header } from "../components/header";

export class LoginPage {
  private page: Page;
  signInButton: Locator;
  inputEmail: Locator;
  inputPass: Locator;
  header: any;
  loginButtonForm: any;
  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Sign In" });
    this.inputEmail = page.getByLabel("Email");
    this.inputPass = page.getByLabel("Password");
    this.header = new Header(page);
    this.loginButtonForm = page.getByRole("button", { name: "Login" });
  }

  async openPage() {
    await this.page.goto("/");
  }

  async buttonLogin(): Promise<Locator> {
    return this.page.getByRole("button", { name: "Login" });
  }

  async loginWithDefaultParams() {
    await this.header.logoVisible();
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill("densf22@gmail.com");
    // click input for password
    await this.inputPass.click();
    await this.inputPass.fill("Qwerty+1");
    await this.loginButtonForm.click();
  }

  async loginWithDynamicData(userD: any, passD: any) {
    await this.signInButton.click();
    await this.inputEmail.click();
    await this.inputEmail.fill(userD);
    // click input for password
    await this.inputPass.click();
    await this.inputPass.fill(passD);
  }
}
