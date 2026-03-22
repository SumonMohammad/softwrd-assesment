import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";

test.describe("Login Functionality", () => {
  test("should allow user to login with valid credentials", async ({
    loginPage,
  }) => {
    await loginPage.goToUrl();
    await loginPage.login(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );
    await expect(loginPage.page).toHaveURL("/inventory.html");
  });

  test("should show error message with invalid credentials", async ({
    loginPage,
  }) => {
    await loginPage.goToUrl();
    await loginPage.usernameInput.fill("invalid_user");
    await loginPage.passwordInput.fill("invalid_password");
    await loginPage.loginButton.click();
    // Add assertions to verify error message is displayed, e.g., check for an error element
  });
});
