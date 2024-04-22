import { expect, type Page, type Locator } from "@playwright/test";

export class Header {
  logoInHeader: Locator;
  constructor(page: Page) {
    this.logoInHeader = page.locator("a.header_logo");
  }

  async logoVisible() {
    await expect(this.logoInHeader).toBeVisible();
  }
}
