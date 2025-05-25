// tests/addToCart.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Add to Cart Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto(process.env.BASEURL!);
    await loginPage.login(process.env['USER-NAME']!, process.env.PASSWORD!);
  });

  test('Add a single item to cart', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(1);
  });

  test('Add multiple items to cart', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    const count = await inventoryPage.getCartCount();
    expect(count).toBe(2);
  });
});
