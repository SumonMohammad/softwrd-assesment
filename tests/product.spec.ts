import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";
test.describe("Product Sorting Functionality and product listing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.HOME_PAGE || "/inventory.html");
  });

  test("Verifying Product listing loads correctly",{tag: ["@regression","@smoke"]}, async ({
    page,
    productPage,
  }) => {
    await expect(page).toHaveURL(process.env.HOME_PAGE || "/inventory.html");
    await expect(productPage.productTitles.first()).toBeVisible();
    await expect(productPage.productPrices.first()).toBeVisible();
    await expect(productPage.productPrices).toHaveCount(6);
  });

  test("Verifying Name A to Z sorting correctly",{tag: ["@regression"]}, async ({ productPage }) => {
    await productPage.sortBy("az");
    await expect(productPage.productTitles.first()).toBeVisible();
    const { actual, expected } = await productPage.getNamesAndSort("asc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Name Z to A sorting correctly",{tag: ["@regression"]}, async ({ productPage }) => {
    await productPage.sortBy("za");
    await expect(productPage.productTitles.first()).toBeVisible();
    const { actual, expected } = await productPage.getNamesAndSort("desc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Price High to Low sorting correctly",{tag: ["@regression"]}, async ({
    productPage,
  }) => {
    await productPage.sortBy("hilo");
    await expect(productPage.productPrices.first()).toBeVisible();
    const { actual, expected } = await productPage.getPricesAndSort("desc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Price Low to High sorting correctly",{tag: ["@regression"]}, async ({
    productPage,
  }) => {
    await productPage.sortBy("lohi");
    await expect(productPage.productPrices.first()).toBeVisible();
    const { actual, expected } = await productPage.getPricesAndSort("asc");
    expect(actual).toEqual(expected);
  });
});
