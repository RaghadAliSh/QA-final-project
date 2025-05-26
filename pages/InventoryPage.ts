import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  addToCartButton = (itemName: string) =>
    this.page.locator(`button[data-test="add-to-cart-${itemName}"]`);

  shoppingCartBadge = () =>
    this.page.locator('.shopping_cart_badge');

  async addItemToCart(itemName: string) {
    await this.addToCartButton(itemName).click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.shoppingCartBadge().innerText();
    return parseInt(text, 10);
  }

  sortDropdown = () => this.page.getByText('Name (A to Z)Name (A to Z)').locator('..').getByRole('combobox');
  async selectSortOption(option: string) {
    await this.sortDropdown().waitFor({ state: 'visible', timeout: 5000 });
    await this.sortDropdown().selectOption(option);
  }

async getProductNames(): Promise<string[]> {
  return await this.page.locator('.inventory_item_name').allTextContents();
}

async getProductPrices(): Promise<number[]> {
  const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
  return priceTexts.map(price => parseFloat(price.replace('$', '')));
}

}
