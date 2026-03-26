import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkOutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkOutButton = this.page.locator('[data-test="checkout"]')
  }

  async goToUrl(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async getItemCount() {
    return await this.cartItems.count();
  }

  async verifyItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyItemVisible(itemName: string) {
    await expect(this.page.getByText(itemName)).toBeVisible();
  }

  async removeItem(item: string) {
    await this.page.locator(`[data-test="remove-${item}"]`).click();
  }

  async checkout() {
    await this.checkOutButton.click();
  }
}
