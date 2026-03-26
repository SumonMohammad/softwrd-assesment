import { test } from "../src/fixtures/base-fixture";
import { products } from "../src/utils/test-data/products";
import { checkoutData } from "../src/utils/test-data/checkout";

test.describe("Checkout Flow", () => {
  test.beforeEach(async ({ productPage, cartPage }) => {
    await productPage.goToUrl();
    await productPage.addItem(products.backpack.id);
    await productPage.addItem(products.onesie.id);
    await productPage.goToCart();
    await cartPage.checkout();
  });

  test("Complete full purchase with valid data", {tag: ["@regression", "@smoke"]}, async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await checkoutInfoPage.fillCheckoutInfo(checkoutData.validUser);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.verifyTotalsCorrect();
    await checkoutOverviewPage.finish();
    await checkoutCompletePage.verifyOrderSuccess();
  });

  test("Checkout blocked when fields missing",{tag: ["@regression"]}, async ({ checkoutInfoPage }) => {
    const cases = Object.values(checkoutData.invalidUser);

    for (const user of cases) {
      await checkoutInfoPage.fillCheckoutInfo(user);
      await checkoutInfoPage.continue();
      await checkoutInfoPage.verifyErrorVisible();
    }
  });

  test("Verify order summary calculation",{tag: ["@regression", "@smoke"]}, async ({
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    await checkoutInfoPage.fillCheckoutInfo(checkoutData.validUser);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.verifyTotalsCorrect();
  });

  test("Verify confirmation screen content",{tag: ["@regression"]}, async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await checkoutInfoPage.fillCheckoutInfo(checkoutData.validUser);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.finish();
    await checkoutCompletePage.verifyOrderSuccess();
  });
});
