const { test, expect } = require('@playwright/test');
const testData = require("../../fixture/loginBrocade.json");
const { LoginPage } =require ("../../pageObjects/loginBrocade.po");

test.beforeEach(async({page})=>{
    // await page.goto('https://brocadeofficial.com')
    await page.goto("./");
});

test.describe('Positive Scenario',()=>{
test.skip('has title', async ({ page }) => {
    await expect(page).toHaveTitle("Account – Brocade Official");
  });
});

test.describe('Valid Email Address and Password Login test', () =>{
  test.skip ("valid login", async ({ page }) => {
    const login = new LoginPage(page);

    await login.login(testData.validUser.email,testData.validUser.password);
    await login.verifyValidLogin();
  });
});


test.describe('Negative Scenario',() =>{
  test.describe.configure({ mode: "serial" });
    test('Invalid Email Address Login test', async ({ page }) => {
      const login= new LoginPage(page);
      await login.login(testData.invalidUser.invalidEmail.email,testData.invalidUser.invalidEmail.password);
      await login.verifyInvalidLogin();    
    });

    test('Invalid Password Login test', async ({ page }) => {
       const login= new LoginPage(page);
       await login.login(testData.invalidUser.invalidPassword.email,testData.invalidUser.invalidPassword.password);
       await login.verifyInvalidLogin();
    });
     

    test('Invalid Email Address and Password Login test', async ({ page }) => {
      const login= new LoginPage(page);
       await login.login(testData.invalidUser.invalidEmailandPassword.email,testData.invalidUser.invalidEmailandPassword.password);
       await login.verifyInvalidLogin();
    });

    test('Empty Email Address Login test', async ({ page }) => {
      const login= new LoginPage(page);
        await login.login(testData.invalidUser.emptyEmail.email,testData.invalidUser.emptyEmail.password);
        await login.verifyInvalidLogin();
    });

    test('Empty Password Login test', async ({ page }) => {
      const login= new LoginPage(page);
        await login.login(testData.invalidUser.emptyPassword.email,testData.invalidUser.emptyPassword.password);
        await login.verifyInvalidLogin();
      });

    test('Empty Email Addeess and Password Login test', async ({ page }) => {
      const login= new LoginPage(page);
        await login.login(testData.invalidUser.emptyEmailandPassword.email,testData.invalidUser.emptyEmailandPassword.password);
        await login.verifyInvalidLogin();
    });
  });
