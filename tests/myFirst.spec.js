const { test, expect } = require("@playwright/test");
const { syncBuiltinESMExports } = require("module");

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("https://www.saucedemo.com/");
  
  console.log(`Running  ${testInfo.title}`);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/.*Swag Labs/);
});

test.afterEach( async ({page}, testInfo) =>{
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
})

test.describe("Login Five Test Cases", () => {
  test("Test Scenario 1| wrong username, correct password", async ({
    page,
  }) => {
    await page.locator("[id = user-name]").fill("standard_use");
    await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 2| correct username, wrong password", async ({
    page,
  }) => {
    await page.locator("[id = user-name]").fill("standard_user");
    await page.locator("[id = password]").fill("secretsauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 3| wrong username, wrong password", async ({ page }) => {
    await page.locator("[id = user-name]").fill("standard_use");
    await page.locator("[id = password]").fill("secretsauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 4| correct id, password", async ({ page }) => {
    await page.locator("[id = user-name]").fill("standard_user");
    await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".title")).toHaveText("Products");

    // await new Promise(() => {}); // prevents your script from exiting!
    // await browser.close();
  });

  test("Test Scenario 5| empty fields, click submit", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".error-message-container")).toHaveText(
      "Epic sadface: Username is required"
    );
  });
});

test.describe("Purchase the lowest price item", () => {
  test("Test Scenario 1", async ({ page }) => {
    //await page.pause();
    await page.locator("[id = user-name]").fill("standard_user");
    await page.locator("[id = password]").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".title")).toHaveText("Products");

    const itemList = await page
      .locator("data-test=inventory-item-price")
      .allTextContents();

    var min = Number.MAX_VALUE;
    let arraValue = 0.0;
    let index = 0;
    for (let i in itemList) {
      arraValue = eval(itemList[i].replace("$", ""));
      if (min > arraValue) {
        min = arraValue;
        index = i;
      }
    }
    console.log(min);

    const lstItemBtn = await page.locator("button").all();
    await lstItemBtn[index].click();

    await page.locator(".shopping_cart_link").click();
    await page.getByRole("button", { name: "Checkout" }).click();

    const addressForm1 = await page.getByRole("textbox").all();

    await addressForm1[0].fill("john");
    await addressForm1[1].fill("Doe");
    await addressForm1[2].fill("8200");
    await page.locator('id=continue').click();
    await expect(page.locator(".title")).toHaveText("Checkout: Overview");

    console.log(await page.locator('data-test=payment-info-value').textContent());

    await page.locator('id=finish').click();

    await expect(page.locator('data-test=complete-header')).toHaveText('Thank you for your order!');
    
  });
});
