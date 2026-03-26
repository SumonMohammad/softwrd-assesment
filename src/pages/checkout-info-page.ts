import { Page, Locator, expect } from "@playwright/test";

export class CheckoutInfoPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.errorMsg = page.locator('[data-test="error"]');
  }

  async fillCheckoutInfo(user: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.postalCode.fill(user.postalCode);
  }

  async continue() {
    await this.continueBtn.click();
  }

  async verifyErrorVisible() {
    await expect(this.errorMsg).toBeVisible();
  }
}
