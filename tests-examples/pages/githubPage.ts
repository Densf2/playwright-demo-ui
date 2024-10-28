import { type Page, type Locator } from "@playwright/test";

export class GithubPage {
  private page: Page;
  linkGetStarted: Locator;
  InstallationLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.linkGetStarted = page.getByRole("link", { name: "Get started" });
    this.InstallationLink = page.getByRole("heading", { name: "Installation" });
  }

  async openPlaywrightPage() {
    await this.page.goto("https://playwright.dev/");
  }
}
