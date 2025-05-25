import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Remove From Cart Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await page.goto(process.env.BASEURL!);
    await loginPage.login(process.env['USER-NAME']!, process.env.PASSWORD!);
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await page.locator('.shopping_cart_link').click(); // Navigate to cart
  });

  test('Remove single item from cart', async () => {
    await cartPage.removeItemFromCart('sauce-labs-backpack');
    const itemVisible = await cartPage.isItemInCart('sauce-labs-backpack');
    expect(itemVisible).toBeFalsy();
  });

  test('Remove all items from cart', async () => {
    await cartPage.removeItemFromCart('sauce-labs-backpack');
    await cartPage.removeItemFromCart('sauce-labs-bike-light');

    const item1 = await cartPage.isItemInCart('sauce-labs-backpack');
    const item2 = await cartPage.isItemInCart('sauce-labs-bike-light');

    expect(item1).toBeFalsy();
    expect(item2).toBeFalsy();
  });

  test('Continue shopping button returns to inventory page', async ({ page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
