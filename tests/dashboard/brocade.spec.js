const { test, expect } = require('@playwright/test');
const testData = require("../../fixture/loginBrocade.json");
const { LoginPage } = require("../../pageObjects/loginBrocade.po");
const { DashboardPage } = require("../../pageObjects/brocade.po");

test.describe.configure({ timeout: 80000 });
test.beforeEach(async ({ page }) => {
  await page.goto("./");
  const login = new LoginPage(page);
  await login.login(testData.validUser.email, testData.validUser.password);
  await login.verifyValidLogin();
});

test.afterEach(async ({ page }) => {
  const logout = new DashboardPage(page);
  await logout.logoutFn();
});

test.describe("Search Operation", () => {
  test.describe.configure({ mode: "serial" });
  
  test("Search Items", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.addToCart("Shopping Basket");
    await dashboard.removeQuantity();
  });

  test("Search Add", async ({ page }) => {
    const search = new DashboardPage(page);
    await search.searchOperation(testData.searchValid.searchTerm);
  });

  test("Add and remove", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.addToCart("Item added to your cart");
    await dashboard.removeQuantity();
  });

  test("checkout", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.checkOut();
  });

  test("finish", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.customerFill();
    await dashboard.completeOrderFn();
  });
});



