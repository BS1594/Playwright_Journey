const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/.*Swag Labs/);
});

test.describe("Login Five Test Cases", () => {
  test("Negative Testcase| wrong username, correct password", async ({
    page,
  }) => {
    await page.locator("[id = user-name]").fill("standard_use");
    await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Negative Testcase| correct username, wrong password", async ({
    page,
  }) => {
    await page.locator("[id = user-name]").fill("standard_user");
    await page.locator("[id = password]").fill("secretsauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Negative Testcase| wrong username, wrong password", async ({
    page,
  }) => {
    await page.locator("[id = user-name]").fill("standard_use");
    await page.locator("[id = password]").fill("secretsauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Negative Testcase| empty fields, click submit", async ({ page }) => {
    //await page.locator("[id = user-name]").fill("standard_use");
    //await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("Postive Testcase", async ({ page }) => {
    await page.locator("[id = user-name]").fill("standard_user");
    await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".title")).toHaveText("Products");

    // await new Promise(() => {}); // prevents your script from exiting!
    // await browser.close();
  });

 
});
