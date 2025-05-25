import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(process.env.BASEURL!);
  });

  test.describe('Valid Login', () => {
    test('Login with valid information', async ({ page }) => {
      await loginPage.login(process.env['USER-NAME']!, process.env.PASSWORD!);
      await expect(page).toHaveURL(/inventory\.html/);
    });
  });

  test.describe('Invalid Login', () => {
    test('invalid username', async ({ page }) => {
      await loginPage.login('invalid_user', process.env.PASSWORD!);
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('invalid password', async ({ page }) => {
      await loginPage.login(process.env['USER-NAME']!, 'invalid_pass');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Empty username', async ({ page }) => {
      await loginPage.login('', process.env.PASSWORD!);
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Empty password', async ({ page }) => {
      await loginPage.login(process.env['USER-NAME']!, '');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });

    test('Both password & username are empty', async ({ page }) => {
      await loginPage.login('', '');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    });
  });
});
