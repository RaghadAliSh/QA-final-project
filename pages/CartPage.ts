// pages/CartPage.ts
import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  checkoutButton = () => this.page.locator('[data-test="checkout"]');
  continueShoppingButton = () => this.page.locator('[data-test="continue-shopping"]');
  removeButton = (itemName: string) => this.page.locator(`[data-test="remove-${itemName}"]`);
  cartItem = (itemName: string) => this.page.locator(`.inventory_item_name`, { hasText: itemName });

  async goToCheckout() {
    await this.checkoutButton().click();
  }

  async removeItemFromCart(itemName: string) {
    await this.removeButton(itemName).click();
  }

  async continueShopping() {
    await this.continueShoppingButton().click();
  }

  async isItemInCart(itemName: string) {
    return await this.cartItem(itemName).isVisible();
  }
}
