import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { InventoryPage } from "../pages/inventory-page";
import { CheckoutPage } from "../pages/checkout-page";
import { CartPage } from "../pages/cart-page";
import { CheckoutInfoPage } from "../pages/checkout-info-page";
import { CheckoutCompletePage } from "../pages/checkout-complete-page";
import { CheckoutOverviewPage } from "../pages/checkout-overview-page";

export const test = base.extend<{
  loginPage: LoginPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  inventoryPage: InventoryPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutCompletePage: CheckoutCompletePage;
  checkoutOverviewPage: CheckoutOverviewPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  checkoutInfoPage: async ({ page }, use) => {
    const checkoutInfoPage = new CheckoutInfoPage(page);
    await use(checkoutInfoPage);
  },
  checkoutOverviewPage: async ({ page }, use) => {
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    await use(checkoutOverviewPage);
  },
  checkoutCompletePage: async ({ page }, use) => {
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await use(checkoutCompletePage);
  },
});
