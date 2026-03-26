import { Page, Locator, expect } from "@playwright/test";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly itemPrices: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async getPrices() {
    const prices = await this.itemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace("$", "")));
  }

  async getSummaryValues() {
    const itemTotal = parseFloat(
      (await this.itemTotal.textContent())!.replace("Item total: $", "")
    );
    const tax = parseFloat(
      (await this.tax.textContent())!.replace("Tax: $", "")
    );
    const total = parseFloat(
      (await this.total.textContent())!.replace("Total: $", "")
    );

    return { itemTotal, tax, total };
  }

  async verifyTotalsCorrect() {
    const prices = await this.getPrices();
    const sum = prices.reduce((a, b) => a + b, 0);

    const { itemTotal, tax, total } = await this.getSummaryValues();

    expect(itemTotal).toBeCloseTo(sum, 2);
    expect(total).toBeCloseTo(itemTotal + tax, 2);
  }

  async finish() {
    await this.finishBtn.click();
  }
}