import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";
import { users } from "../src/utils/test-data/users";
import { products } from "../src/utils/test-data/products";

test.describe("Login Functionality for positive case", () => {
  test("should allow user to login with valid credentials and logout successfully",{tag: [ "@smoke","@sanity","@regression"]}, async ({
    loginPage,
    inventoryPage
  }) => {
    await loginPage.goToUrl();
    await loginPage.enterLoginCredentials(
      process.env.VALID_USERNAME!,
      process.env.VALID_PASSWORD!,
    );
    await loginPage.clickToLogin();
    await expect(loginPage.page).toHaveURL("/inventory.html");
    await inventoryPage.logout();
    await expect(loginPage.page).toHaveURL(/saucedemo.com/);
  });
});

test.describe("Login Functionality for Negative Cases", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToUrl();
  });

  test("Try to login with invalid password",{tag: ["@regression"]}, async ({ loginPage }) => {
    await loginPage.enterLoginCredentials(
      users.invalid.wrongPassword.username,
      users.invalid.wrongPassword.password,
    );
    await loginPage.clickToLogin();
    await loginPage.verifyError();
  });

  test("Try to login with empty fields",{tag: ["@regression"]}, async ({ loginPage }) => {
    await loginPage.enterLoginCredentials("", "");
    await loginPage.clickToLogin();
    await loginPage.verifyError();
  });

  test("SQL Injection attempt",{tag: ["@regression"]}, async ({ loginPage }) => {
    await loginPage.enterLoginCredentials(
      users.invalid.sqlInjection.username,
      users.invalid.sqlInjection.password,
    );
    await loginPage.clickToLogin();
    await loginPage.verifyError();
  });

  test("Locked out user behavior",{tag: ["@regression"]}, async ({ loginPage }) => {
    await loginPage.enterLoginCredentials(
      users.locked.username,
      users.locked.password,
    );
    await loginPage.clickToLogin();
    await expect(loginPage.lockedOutErrorMessage).toBeVisible();
  });

  test("Verify UI glitches for problem user",{tag: ["@regression"]}, async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.goToUrl();
    await loginPage.enterLoginCredentials(
      users.problem.username,
      users.problem.password,
    );
    await loginPage.clickToLogin();
    const imageSrcs = await inventoryPage.getAllProductImageSrcs();
    for (const src of imageSrcs) {
      expect(src).toContain("sl-404");
    }
  });

  test("Error user actions validation",{tag: ["@regression"]}, async ({ loginPage, inventoryPage }) => {
    await loginPage.goToUrl();
    await loginPage.enterLoginCredentials(
      users.error.username,
      users.error.password,
    );
    await loginPage.clickToLogin();
    await inventoryPage.addItem(products.fleeceJacket.id); // this button is not clickable for error user
    await expect(
      inventoryPage.removeButton(products.fleeceJacket.id),
    ).not.toBeVisible();// That's why we are checking that remove button is not visible because item is not added to the cart
  });

  test("Performance glitch user login",{tag: ["@regression"]}, async ({ loginPage, page ,inventoryPage}) => {
    await loginPage.goToUrl();
    await loginPage.enterLoginCredentials(
      users.performance.username,
      users.performance.password,
    );
    await loginPage.clickToLogin();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("/inventory.html");
    await expect(inventoryPage.productTitles.first()).toBeVisible();
    await expect(inventoryPage.productImages.nth(3)).toBeVisible();
  });
});
