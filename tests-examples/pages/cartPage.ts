import { type Page, type Locator } from "@playwright/test";

export class CartPage {
  private page: Page;
  cartRows: Locator;
  emptyCartMessage: Locator;
  cartSubtotal: Locator;
  grandTotal: Locator;
  checkoutButton: Locator;
  continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartRows = page.locator("tr.ec_cartitem_row");
    this.emptyCartMessage = page.getByText("There are no items in your cart.");
    this.cartSubtotal = page.locator("#ec_cart_subtotal");
    this.grandTotal = page.locator("#ec_cart_total");
    this.checkoutButton = page.locator("a.ec_cart_button_checkout");
    this.continueShoppingButton = page.locator("a.ec_cart_button_shopping");
  }

  private rowByProduct(productName: string): Locator {
    return this.cartRows.filter({
      has: this.page.locator("a.ec_cartitem_title", { hasText: productName }),
    });
  }

  async getItemQuantity(productName: string): Promise<number> {
    const input = this.rowByProduct(productName).locator("input.ec_quantity");
    return Number(await input.inputValue());
  }

  async removeItem(productName: string) {
    await this.rowByProduct(productName).locator(".ec_cartitem_delete").click();
  }

  async isEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }
}
