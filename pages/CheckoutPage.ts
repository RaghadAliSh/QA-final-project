// pages/CheckoutPage.ts
import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  firstNameInput = () => this.page.locator('[data-test="firstName"]');
  lastNameInput = () => this.page.locator('[data-test="lastName"]');
  postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
  continueButton = () => this.page.locator('[data-test="continue"]');
  finishButton = () => this.page.locator('[data-test="finish"]');
  cancelButton = () => this.page.locator('[data-test="cancel"]');
  completeHeader = () => this.page.locator('.complete-header');
  errorMessage = () => this.page.locator('[data-test="error"]');

  async fillCheckoutForm(first: string, last: string, postal: string) {
    await this.firstNameInput().fill(first);
    await this.lastNameInput().fill(last);
    await this.postalCodeInput().fill(postal);
    await this.continueButton().click();
  }

  async finishOrder() {
    await this.finishButton().click();
  }

  async cancelCheckout() {
    await this.cancelButton().click();
  }
  
}
