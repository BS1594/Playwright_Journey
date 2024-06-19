const { test, expect } = require("@playwright/test");
const { syncBuiltinESMExports } = require("module");

const pageUrl = "https://demoqa.com/";

test.beforeAll(async () => {
  console.log("The Automation script has started.");
});

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(pageUrl);
  console.log("The page title is ", testInfo.title);
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished test ${testInfo.title} with status ${testInfo.status}`);
  if (testInfo.expectedStatus != testInfo.status) {
    console.log(`Did not run as expected , ended up at ${page.url()}`);
  }
});

test.afterAll(async () => {
  console.log("The Automation script has finished");
});

test.describe("Test Scenario 1", async () => {
  test("Click on Elements", async ({ page }) => {
    await page.getByText("Elements", { exact: true }).click();
  });
});
