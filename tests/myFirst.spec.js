const { test, expect } = require("@playwright/test");
const { syncBuiltinESMExports } = require("module");
const { LoginPage } = require("../pages/Login-page");

const url = "https://www.saucedemo.com/";

test.beforeAll(async () => {
  console.log("Autoamtion Testscirpt has started.");
});

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(url);
  console.log(`Running  ${testInfo.title}`);
  await expect(page).toHaveTitle(/.*Swag Labs/);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.expectedStatus != testInfo.status) {
    console.log(`Did not run as expected , ended up at ${page.url()}`);
  }
});

test.afterAll(async () => {
  console.log("The Autoamtion script has completed.");
});

test.describe("Login Five Test Cases", () => {
  test("Test Scenario 1| wrong username, correct password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.userName.fill("standard_use");
    await loginPage.password.fill("secret_sauce");
    await loginPage.clickOnLoginBtnW(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 2| correct username, wrong password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.userName.fill("standard_user");
    await loginPage.password.fill("secretsauce");
    await loginPage.clickOnLoginBtnW(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 3| wrong username, wrong password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.userName.fill("standard_use");
    await loginPage.password.fill("secretsauce");
    await loginPage.clickOnLoginBtnW(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Test Scenario 4| correct id, password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.userName.fill("standard_user");
    await loginPage.password.fill("secret_sauce");
    await loginPage.clickOnLoginBtnR("Products");
  });

  test("Test Scenario 5| empty fields, click submit", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickOnLoginBtnW("Epic sadface: Username is required");
  });
});

test.describe("Purchase Item", () => {
  test("Test Scenario | Purchase the lowest price item", async ({ page }) => {
    await test.step("Login Step", async () => {
      //await page.pause();
      await page.locator("[id = user-name]").fill("standard_user");
      await page.locator("[id = password]").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator(".title")).toHaveText("Products");
    });

    await test.step("Find least item", async () => {
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
    });

    await test.step("Add to Cart", async () => {
      await page.locator(".shopping_cart_link").click();
      await page.getByRole("button", { name: "Checkout" }).click();
    });

    await test.step("Checkout with Address", async () => {
      const addressForm1 = await page.getByRole("textbox").all();
      await addressForm1[0].fill("john");
      await addressForm1[1].fill("Doe");
      await addressForm1[2].fill("8200");
      await page.locator("id=continue").click();
      await expect(page.locator(".title")).toHaveText("Checkout: Overview");
    });

    await test.step("Verify | Completed the order", async () => {
      console.log(
        await page.locator("data-test=payment-info-value").textContent()
      );

      await page.locator("id=finish").click();

      await expect(page.locator("data-test=complete-header")).toHaveText(
        "Thank you for your order!"
      );
    });
  });
});
