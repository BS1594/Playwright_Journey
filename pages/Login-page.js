const { expect } = require("@playwright/test");

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("[id = user-name]");
    this.password = page.locator("[id = password]");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.errorMsg = page.locator(".error-message-container");
    this.pageTitle = page.locator(".title");
  }

  async clickOnLoginBtnW(assertionText) {
    await this.loginBtn.click();
    await expect(this.errorMsg).toHaveText(assertionText);
  }

  async clickOnLoginBtnR(assertionText) {
    await this.loginBtn.click();
    await expect(this.pageTitle).toHaveText(assertionText);
  }
}
export default LoginPage;
