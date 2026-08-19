import { test, expect } from "@playwright/test";
import { FindBugsPage } from "./pages/findBugsPage";
import { ProductPage } from "./pages/productPage";
import { CartPage } from "./pages/cartPage";

const KNOWN_PRODUCT = "DNK Yellow Shoes";

test.describe("AcademyBugs - Find Bugs Store", () => {
  test("should display the Find Bugs product listing", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();

    await expect(findBugsPage.heading).toBeVisible();
    await expect(findBugsPage.resultsCountText).toContainText("results");
    await expect(findBugsPage.productCards.first()).toBeVisible();
  });

  test("should sort products by price ascending when Price Low-High is selected", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.sortBy("Price Low-High");

    const prices = (await findBugsPage.getProductPrices()).filter(
      (price): price is number => price !== null,
    );
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test("should sort products alphabetically when Title A-Z is selected", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.sortBy("Title A-Z");

    const titles = await findBugsPage.getProductTitles();
    const sortedTitles = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sortedTitles);
  });

  test("should open a product page with matching title and price", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.openProduct(KNOWN_PRODUCT);

    const productPage = new ProductPage(page);
    await expect(page).toHaveURL(/\/store\/dnk-yellow-shoes\//);
    expect(await productPage.getTitle()).toBe(KNOWN_PRODUCT);
    expect(await productPage.getPrice()).toBe(45);
  });

  test("should update the quantity field when using the +/- steppers", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.openProduct(KNOWN_PRODUCT);

    const productPage = new ProductPage(page);
    await productPage.increaseQuantity(2);
    expect(await productPage.getQuantity()).toBe(3);

    await productPage.decreaseQuantity(1);
    expect(await productPage.getQuantity()).toBe(2);
  });

  test("should add the selected quantity to the cart", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.openProduct(KNOWN_PRODUCT);

    const productPage = new ProductPage(page);
    await productPage.increaseQuantity(1);
    await productPage.addToCart();

    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(/\/my-cart\//);
    await expect(
      cartPage.cartRows.filter({ hasText: KNOWN_PRODUCT }),
    ).toBeVisible();
    expect(await cartPage.getItemQuantity(KNOWN_PRODUCT)).toBe(2);
  });

  test("should empty the cart after removing the only item", async ({ page }) => {
    const findBugsPage = new FindBugsPage(page);
    await findBugsPage.open();
    await findBugsPage.openProduct(KNOWN_PRODUCT);

    const productPage = new ProductPage(page);
    await productPage.addToCart();

    const cartPage = new CartPage(page);
    await cartPage.removeItem(KNOWN_PRODUCT);
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});
