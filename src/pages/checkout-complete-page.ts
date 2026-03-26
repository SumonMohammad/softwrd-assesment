import { Page, Locator, expect } from "@playwright/test";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly successMsg: Locator;
  readonly description: Locator;

  constructor(page: Page) {
    this.page = page;
    this.successMsg = page.locator('[data-test="complete-header"]');
    this.description = page.locator('[data-test="complete-text"]');
  }

  async verifyOrderSuccess() {
    await expect(this.successMsg).toHaveText("Thank you for your order!");
    await expect(this.description).toBeVisible();
  }
}
