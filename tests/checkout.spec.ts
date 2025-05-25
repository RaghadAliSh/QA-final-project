// tests/checkout.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(process.env.BASEURL!);
    await loginPage.login(process.env['USER-NAME']!, process.env.PASSWORD!);
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await page.locator('.shopping_cart_link').click(); // Go to cart
    await cartPage.goToCheckout(); // Click "Checkout"
  });

  test.describe('Valid Checkout', () => {
    test('Complete order with valid data', async ({ page }) => {
      await checkoutPage.fillCheckoutForm('raghad', 'mahdi', '0593966717');
      await checkoutPage.finishOrder();
      await expect(checkoutPage.completeHeader()).toHaveText('Thank you for your order!');
    });
  });

  test.describe('Invalid Checkout', () => {
    test('Missing first name', async () => {
      await checkoutPage.fillCheckoutForm('', 'mahdi', '0593966717');
      await expect(checkoutPage.errorMessage()).toBeVisible();
    });

    test('Missing last name', async () => {
      await checkoutPage.fillCheckoutForm('raghad', '', '0593966717');
      await expect(checkoutPage.errorMessage()).toBeVisible();
    });

    test('Missing postal code', async () => {
      await checkoutPage.fillCheckoutForm('raghad', 'mahdi', '');
      await expect(checkoutPage.errorMessage()).toBeVisible();
    });
  });

  test('Cancel checkout returns to cart page', async ({ page }) => {
    await checkoutPage.cancelCheckout();
    await expect(page).toHaveURL(/cart\.html/);
  });
});
