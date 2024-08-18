const { test, expect } = require('@playwright/test');

exports.LoginPage = class LoginPage{
    constructor(page){
        this.page=page;
        this.userLogo= '//*[@id="shopify-section-sections--22874883260718__header"]/sticky-header/header/div/a[1]';
        this.email='//*[@id="CustomerEmail"]';
        this.password='//*[@id="CustomerPassword"]';
        this.loginButton='//*[@id="customer_login"]/button';  
        this.successMessage = '//*[@id="shopify-section-template--22874882605358__main"]/div/div[1]/h1';
        this.errorMessage= '//*[@id="login"]';
        
    }

    async login(email,password){
        await this.page.locator(this.userLogo).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.email).fill(email);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.password).fill(password);
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.loginButton).click();
        await this.page.waitForTimeout(1000);
    }

    async verifyValidLogin(){
        const verifyLoginSucess =  await this.page.locator(this.successMessage);
        await expect(verifyLoginSucess).toHaveText("Account");
    }
    async verifyInvalidLogin(){
      const verifyLoginError =  await this.page.locator(this.errorMessage);
      await expect(verifyLoginError).toHaveText("Login");
  }
}