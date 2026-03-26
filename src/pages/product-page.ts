import { Locator, Page, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly productTitles: Locator;
  readonly productDescription: Locator;
  readonly productPrices: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly backToProductsButton: Locator;
  readonly productSortDropdown: Locator;
  readonly hamburgerMenuButton: Locator;
  readonly logoutLink: Locator;
  readonly productImages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrices = page.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.removeFromCartButton = page.locator('button[data-test^="remove"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.backToProductsButton = page.locator(
      'button[data-test="back-to-products"]',
    );
    this.productSortDropdown = page.locator(
      'select[data-test="product-sort-container"]',
    );
    this.hamburgerMenuButton = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
    this.productImages = page.locator(".inventory_item_img img");
  }

  async goToUrl(): Promise<void> {
    await this.page.goto(`${process.env.INVENTORY_PAGE}`, {
      waitUntil: "domcontentloaded",
    });
  }

  async getNamesAndSort(order: "asc" | "desc") {
    const names = await this.productTitles.allTextContents();

    const sorted = [...names].sort((a, b) =>
      order === "asc" ? a.localeCompare(b) : b.localeCompare(a),
    );

    return { actual: names, expected: sorted };
  }

  async getPricesAndSort(order: "asc" | "desc") {
    const pricesText = await this.productPrices.allTextContents();

    const prices = pricesText.map((p) => parseFloat(p.replace("$", "")));

    const sorted = [...prices].sort((a, b) =>
      order === "asc" ? a - b : b - a,
    );

    return { actual: prices, expected: sorted };
  }

  async sortBy(option: "az" | "za" | "lohi" | "hilo") {
    await this.productSortDropdown.selectOption(option);
  }

  async addItem(item: string) {
    await this.page.locator(`[data-test="add-to-cart-${item}"]`).click();
  }

  async removeItem(item: string) {
    await this.page.locator(`[data-test="remove-${item}"]`).click();
  }

  removeButton(item: string) {
    return this.page.locator(`[data-test="remove-${item}"]`);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(count.toString());
  }
  async logout() {
    await this.hamburgerMenuButton.click();
    await this.logoutLink.click();
  }

  async getAllProductImageSrcs(): Promise<string[]> {
    const images = this.productImages;
    const count = await images.count();
    const srcs: string[] = [];
    for (let i = 0; i < count; i++) {
      const src = await images.nth(i).getAttribute("src");
      srcs.push(src ?? "");
    }
    return srcs;
  }
}
