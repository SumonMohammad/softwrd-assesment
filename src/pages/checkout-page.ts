import { Locator, Page } from "@playwright/test";

                                                                
export class CheckoutPage {
  readonly page: Page;
 

  constructor(page: Page) {
    this.page = page;
   
  }

  async goToUrl(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }
}
