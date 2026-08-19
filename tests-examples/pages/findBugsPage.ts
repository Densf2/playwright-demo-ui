import { type Page, type Locator } from "@playwright/test";
import { parsePrice } from "../helpers/priceHelper";

export class FindBugsPage {
  private page: Page;
  heading: Locator;
  resultsCountText: Locator;
  sortDropdown: Locator;
  productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Find Bugs" });
    this.resultsCountText = page.locator(".ec_product_page_showing");
    this.sortDropdown = page.locator("#sortfield");
    this.productCards = page.locator("li.ec_product_li");
  }

  async open() {
    await this.page.goto("https://academybugs.com/find-bugs/");
  }

  async sortBy(label: string) {
    await this.sortDropdown.selectOption({ label });
    await this.page.waitForLoadState("networkidle");
  }

  private cardTitleLink(card: Locator): Locator {
    return card.locator(".ec_product_type1 h3.ec_product_title_type1 a");
  }

  private cardPrice(card: Locator): Locator {
    return card.locator(".ec_product_type1 .ec_price");
  }

  async getProductTitles(): Promise<string[]> {
    const cards = await this.productCards.all();
    const titles: string[] = [];
    for (const card of cards) {
      titles.push((await this.cardTitleLink(card).innerText()).trim());
    }
    return titles;
  }

  async getProductPrices(): Promise<(number | null)[]> {
    const cards = await this.productCards.all();
    const prices: (number | null)[] = [];
    for (const card of cards) {
      const priceLocator = this.cardPrice(card);
      if ((await priceLocator.count()) === 0) {
        prices.push(null);
        continue;
      }
      prices.push(parsePrice(await priceLocator.innerText()));
    }
    return prices;
  }

  async openProduct(title: string) {
    const card = this.productCards.filter({ hasText: title }).first();
    await this.cardTitleLink(card).click();
  }
}
