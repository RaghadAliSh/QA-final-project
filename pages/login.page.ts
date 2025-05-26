import { Page } from '@playwright/test';

export class LoginPage {
  
  constructor(private page: Page) {
  }
  usernemeInput = () => this.page.locator('[data-test="username"]');
  passwordInput = () => this.page.locator('[data-test="password"]');
  loginButton = () => this.page.locator('[data-test="login-button"]');

  async login(username: string, password: string) {
    await this.usernemeInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }
}


