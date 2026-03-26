import { Locator, Page, expect } from "@playwright/test";

export interface DocumentData {
  title: string;
  content: string;
}

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly lockedOutErrorMessage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
    
    this.lockedOutErrorMessage = page.getByText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  }

  async goToUrl(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async enterLoginCredentials(
    username: string,
    password: string,
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }
  async clickToLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async verifyError() {
    await expect(this.errorMessage).toBeVisible();
  }

 
}
