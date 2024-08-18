const { expect } = require("@playwright/test");
const testData1 = require("../fixture/checkout.json");

exports.DashboardPage = class DashboardPage {
    constructor(page) {
        this.page = page;

        //search
        this.searchIcon= page.locator('//*[@id="shopify-section-sections--22874883260718__header"]/sticky-header/header/details-modal/details/summary');
        this.searchItem = page.locator('//*[@id="Search-In-Modal-1"]');
        this.searchBtn = page.locator('//*[@id="shopify-section-sections--22874883260718__header"]/sticky-header/header/details-modal/details/div/div[2]/predictive-search/form/div[1]/button[2]/svg/use');
        this.invalidSearchmsg=page.locator('//*[@id="shopify-section-template--22874882539822__main"]/div/div[1]/p');

        //addtocart
        this.chooseItem= page.locator('//*[@id="CardLink--8811761533230"]');
        this.cartBtn = page.locator('//*[@id="ProductSubmitButton-template--22874882474286__main"]');
        this.itemAdded = page.locator('//*[@id="cart-notification"]/div[1]/h2');
        this.viewCart = page.locator('//*[@id="cart-notification-button"]');
        
        //increase quantity
        this.increaseQty = page.locator('//*[@id="CartItem-1"]/td[4]/quantity-popover/div[1]/div/quantity-input/button[2]');
        this.remove = page.locator('//*[@id="Remove-1"]/a');
        this.emptyCart = page.locator('//*[@id="shopify-section-template--22874881851694__cart-items"]/cart-items/div/div[2]/h1');

        //checkout
        this.shop = page.locator('//*[@id="HeaderMenu-categories"]/span');
        this.chooseCategory= page.locator('//*[@id="HeaderMenu-categories-varsities"]');
        this.selectFromCategory= page.locator('//*[@id="CardLink-template--22874881949998__product-grid-8963640787246"]');
        this.addToCartForCheckout=page.locator('//*[@id="ProductSubmitButton-template--22874882474286__main"]');
        this.checkoutBtn = page.locator('//*[@id="cart-notification-form"]/button');
        this.cod=page.locator('//*[@id="basic"]/div/div[2]/label/div/div[2]/div/span');
        this.diffAddress=page.locator('//*[@id="billing_address_selector"]/div/div[2]/label');
        this.payNowBtn = page.locator('//*[@id="checkout-pay-button"]');

        //fillform
        this.email=testData1.contact.email;
        this.firstname = testData1.contact.firstname;
        this.lastname = testData1.contact.lastname;
        this.address = testData1.contact.address;
        this.apartment = testData1.contact.apartment;
        this.city = testData1.contact.city;
        this.postalCode= testData1.contact.postalCode;
        this.phone = testData1.contact.phone;

        //logout
        this.userLogo= page.locator('//*[@id="shopify-section-sections--22874883260718__header"]/sticky-header/header/div/a[1]');
        this.logout= page.locator('//*[@id="shopify-section-template--22874882605358__main"]/div/div[1]/a');
    }
    async searchfordiffcase(invalidterm) {
        await this.page.waitForTimeout(1000);
        await this.searchIcon.click();
        await this.searchItem.fill(invalidterm);
        await this.searchItem.press('Enter'); 
        await this.page.waitForTimeout(2000);
        await expect(this.invalidSearchmsg).toHaveText("No results found for “food”. Check the spelling or use a different word or phrase.");
        await this.page.waitForLoadState("domcontentloaded");
      }
    
    async searchOperation(term) {
        await this.page.waitForTimeout(2000);
        await this.searchIcon.click(); 
        await this.searchItem.fill(term);
        await this.page.waitForTimeout(2000);
        await this.searchItem.press("Enter");
        await this.page.waitForLoadState("domcontentloaded");
    }


    async addToCart(message) {
        await this.chooseItem.click();
        await this.page.waitForTimeout(3000);
        await this.cartBtn.click();
        await this.viewCart.click();
        await this.page.waitForTimeout(3000);
        await this.increaseQty.click();
        await this.page.waitForTimeout(3000);
        await expect(this.itemAdded).toHaveText(message);
    }

    async removeQuantity() {
        await this.remove.click();
        await expect(this.emptyCart).toHaveText("Your cart is empty");
    }

    async checkOut() {
        await this.page.waitForTimeout(2000);
        await this.shop.click();
        await this.chooseCategory.click();
        await this.selectFromCategory.click();
        await this.addToCartForCheckout.click();
        await this.page.waitForTimeout(3000);
        await this.checkoutBtn.click();
        await this.cod.click();
        await this.diffAddress.click();

    }

    async customerFill() {
        // await this.page.locator('//*[@id="TextField105"]').fill(this.firstname);
        // await this.page.locator('//*[@id="TextField106"]').fill(this.lastname);
        // await this.page.locator('//*[@id="TextField107"]').fill(this.address);
        // await this.page.locator('//*[@id="TextField108"]').fill(this.apartment);
        // await this.page.locator('//*[@id="TextField109"]').fill(this.city);
        // await this.page.locator('//*[@id="TextField110"]').fill(this.postalCode);
        // await this.page.locator('//*[@id="TextField111"]').fill(this.phone);
        // await this.page.locator('//*[@id="basic-paymentOnDelivery"]').click(); 
        await this.page.locator('//*[@id="basic"]/div/div[2]/label/div/div[2]/div/span').click();
    }

    async completeOrderFn(){
        await this.payNowBtn.click();
        await this.page.waitForTimeout(1000);
        await this.page.goto("https://brocadeofficial.com");
    }

    async logoutFn(){
        await this.page.waitForTimeout(2000);
        await this.userLogo.click();
        await this.logout.click();
    }
}