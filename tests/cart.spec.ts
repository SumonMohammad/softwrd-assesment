import { test } from "../src/fixtures/base-fixture";
import { products } from "../src/utils/test-data/products";

test.describe("Cart Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.HOME_PAGE || "/inventory.html");
  });

  test("Add single item and verify cart badge",{tag: ["@regression", "@smoke"]}, async ({
    productPage,
  }) => {
    await productPage.addItem(products.backpack.id);
    await productPage.verifyCartCount(1);
  });

  test("Add multiple items and verify in cart",{tag: ["@regression", "@smoke"]}, async ({
    productPage,
    cartPage,
  }) => {
    await productPage.addItem(products.backpack.id);
    await productPage.addItem(products.bikeLight.id);
    await productPage.goToCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemVisible(products.backpack.name);
    await cartPage.verifyItemVisible(products.bikeLight.name);
  });

  test("Remove item and verify cart updates",{tag: ["@regression"]}, async ({
    productPage,
    cartPage,
  }) => {
    await productPage.addItem(products.backpack.id);
    await productPage.addItem(products.bikeLight.id);
    await productPage.goToCart();
    await cartPage.removeItem(products.backpack.id);
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemVisible(products.bikeLight.name);
  });

  test("Cart persists across navigation",{tag: ["@regression"]}, async ({
    page,
    productPage,
    cartPage,
  }) => {
    await productPage.addItem(products.backpack.id);
    await productPage.goToCart();
    await cartPage.verifyItemCount(1);
    await page.goBack();
    await productPage.goToCart();
    await cartPage.verifyItemCount(1);
  });
});
