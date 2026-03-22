import { test as base } from '@playwright/test';
import {LoginPage,  } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { CheckoutPage } from '../pages/checkout-page';
import { CartPage } from '../pages/cart-page';

export const test = base.extend<{
    
   loginPage: LoginPage;
   cartPage : CartPage;
   checkoutPage : CheckoutPage;
   productPage : ProductPage;
   
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
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    
});