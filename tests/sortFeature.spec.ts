import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Sort Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await page.goto(process.env.BASEURL!);
    await loginPage.login(process.env['USER-NAME']!, process.env.PASSWORD!);
  });

  test('Sort products by Name (A to Z)', async () => {
    await inventoryPage.selectSortOption('az'); // 'az' = A to Z
    const names = await inventoryPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('Sort products by Price (High to Low)', async () => {
    await inventoryPage.selectSortOption('hilo'); // 'hilo' = High to Low
    const prices = await inventoryPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
