import { test } from "../src/fixtures/base-fixture";
import { expect } from "@playwright/test";
test.describe("Product Sorting Functionality and product listing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.HOME_PAGE || "/inventory.html");
  });

  test("Verifying Product listing loads correctly",{tag: ["@regression","@smoke"]}, async ({
    page,
    inventoryPage,
  }) => {
    await expect(page).toHaveURL(process.env.HOME_PAGE || "/inventory.html");
    await expect(inventoryPage.productTitles.first()).toBeVisible();
    await expect(inventoryPage.productPrices.first()).toBeVisible();
    await expect(inventoryPage.productPrices).toHaveCount(6);
  });

  test("Verifying Name A to Z sorting correctly",{tag: ["@regression"]}, async ({ inventoryPage }) => {
    await inventoryPage.sortBy("az");
    await expect(inventoryPage.productTitles.first()).toBeVisible();
    const { actual, expected } = await inventoryPage.getNamesAndSort("asc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Name Z to A sorting correctly",{tag: ["@regression"]}, async ({ inventoryPage }) => {
    await inventoryPage.sortBy("za");
    await expect(inventoryPage.productTitles.first()).toBeVisible();
    const { actual, expected } = await inventoryPage.getNamesAndSort("desc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Price High to Low sorting correctly",{tag: ["@regression"]}, async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("hilo");
    await expect(inventoryPage.productPrices.first()).toBeVisible();
    const { actual, expected } = await inventoryPage.getPricesAndSort("desc");
    expect(actual).toEqual(expected);
  });
  test("Verifying Price Low to High sorting correctly",{tag: ["@regression"]}, async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy("lohi");
    await expect(inventoryPage.productPrices.first()).toBeVisible();
    const { actual, expected } = await inventoryPage.getPricesAndSort("asc");
    expect(actual).toEqual(expected);
  });
});
