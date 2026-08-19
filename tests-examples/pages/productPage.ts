import { type Page, type Locator } from "@playwright/test";
import { parsePrice } from "../helpers/priceHelper";

export class ProductPage {
  private page: Page;
  title: Locator;
  price: Locator;
  quantityInput: Locator;
  increaseQtyButton: Locator;
  decreaseQtyButton: Locator;
  addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const form = page.locator("form.ec_add_to_cart_form");
    this.title = form.locator("h1.ec_details_title");
    this.price = form.locator(".ec_product_price");
    this.quantityInput = form.locator("input.ec_quantity");
    this.increaseQtyButton = form.locator("input.ec_plus");
    this.decreaseQtyButton = form.locator("input.ec_minus");
    this.addToCartButton = form.locator('input[type="submit"][value="ADD TO CART"]');
  }

  async getTitle(): Promise<string> {
    return (await this.title.innerText()).trim();
  }

  async getPrice(): Promise<number | null> {
    return parsePrice(await this.price.innerText());
  }

  async increaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.increaseQtyButton.click();
    }
  }

  async decreaseQuantity(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.decreaseQtyButton.click();
    }
  }

  async getQuantity(): Promise<number> {
    return Number(await this.quantityInput.inputValue());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
