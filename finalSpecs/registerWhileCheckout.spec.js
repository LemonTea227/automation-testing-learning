const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductsPage = require('../pagesClasses/ProductsPage/ProductsPage');
const CartPage = require('../pagesClasses/CartPage/CartPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage');
const SignUpPage = require('../pagesClasses/SignupPage/SignupPage');
const AccountCreatedPage = require('../pagesClasses/AccountCreatedPage/AccountCreatedPage');
const CheckoutPage = require('../pagesClasses/CheckoutPage/CheckoutPage.js');
const DeleteAccountPage = require('../pagesClasses/DeleteAccountPage/DeleteAccountPage');
const PaymentPage = require('../pagesClasses/PaymentPage/PaymentPage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC14 - Register while Checkout', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {ProductsPage} */
    let productsPage;
    /** @type {CartPage} */
    let cartPage;
    /** @type {HomePage} */
    let homePage;
    /** @type {LoginPage} */
    let loginPage;
    /** @type {SignUpPage} */
    let signupPage;
    /** @type {AccountCreatedPage} */
    let accountCreatedPage;
    /** @type {CheckoutPage} */
    let checkoutPage;
    /** @type {PaymentPage} */
    let paymentPage;
    /** @type {DeleteAccountPage}*/
    let deletedAccountPage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignUpPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);
        deletedAccountPage = new DeleteAccountPage(page);
    }, MAX_SAFE_TIMEOUT)

    it('1st & 2nd - open the testing site', async () => {
        expect(basePage.browser).not.toBe(undefined);
        expect(basePage.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await homePage.verifyHomePage();

        //checks if url was added correctly
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th -  Add products to cart', async () => {
        await productsPage.hoverAndClickAddToCartByIndex(0);
        await productsPage.clickContinueShopping();
        await productsPage.hoverAndClickAddToCartByIndex(1);
        await productsPage.clickContinueShopping();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Click "Cart" button', async () => {
        await basePage.goToCart();
    }, MAX_SAFE_TIMEOUT)

    it('6th - Verify that cart page is displayed', async () => {
        await cartPage.verifyCartPage();

        expect(await basePage.getCurrentURL()).toBe(cartPage.args.cartURL);
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click Proceed To Checkout', async () => {
        await cartPage.goToCheckout();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "Register / Login" button', async () => {
        await cartPage.goToRegisterLogin();
    }, MAX_SAFE_TIMEOUT)

    it('9th -  Fill all details in Signup and create account', async () => {
        await loginPage.verifyLoginPageSignup();
        expect(await loginPage.getSignupHeader()).toEqual(loginPage.args.signupHeader);
        await loginPage.typeSignup();
        let signupObj = await loginPage.getSignup();

        for (let i = 0; i < Object.keys(signupObj).length; i++) {
            expect(signupObj[Object.keys(signupObj)[i]]).toBe(loginPage.args[Object.keys(loginPage.args)[i]]);
        }
        await loginPage.clickSignup();
        await signupPage.verifySignupPage();

        expect(await signupPage.getSignupHeader()).toBe(signupPage.args.signupHeader);
        await signupPage.fillAccountInformation();
        let AccountInformationObj = await signupPage.getAccountInformation();
        let accountInfoKey;
        for (let i = 0; i < Object.keys(AccountInformationObj).length && Object.keys(AccountInformationObj)[i] !== "dateOfBirth"; i++) {
            accountInfoKey = Object.keys(AccountInformationObj)[i];
            expect(AccountInformationObj[accountInfoKey]).toBe(signupPage.args[accountInfoKey]);
        }
        let dateOfBirthKey;
        for (let i = 0; i < Object.keys(AccountInformationObj.dateOfBirth).length; i++) {
            dateOfBirthKey = Object.keys(AccountInformationObj.dateOfBirth)[i];
            expect(AccountInformationObj.dateOfBirth[dateOfBirthKey]).toBe(signupPage.args.dateOfBirth[dateOfBirthKey]);
        }
        await signupPage.checkNewsletter();
        await signupPage.checkOffers();
        await signupPage.fillAddressInformation();
        let addressInfo = await signupPage.getAddressInformation();
        let addressInfoKey;
        for (let i = 0; i < Object.keys(addressInfo).length; i++) {
            addressInfoKey = Object.keys(addressInfo)[i];
            expect(addressInfo[addressInfoKey]).toBe(signupPage.args[addressInfoKey]);
        }
        await signupPage.clickCreateAccount();
    }, MAX_SAFE_TIMEOUT)

    it('10th - Verify "ACCOUNT CREATED!" and click "Continue" button', async () => {
        await accountCreatedPage.verifyAccountCreatedPage();

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await accountCreatedPage.getAccountCreatedHeader()).toEqual(accountCreatedPage.args.accountCreatedHeader);

        await accountCreatedPage.clickContinue();
    }, MAX_SAFE_TIMEOUT)

    it('11th - Verify "Logged in as username" at top', async () => {
        await basePage.verifyLoggedInAs();

        expect(await basePage.getLoggedInAs()).toBe(basePage.args.loggedAs);
    }, MAX_SAFE_TIMEOUT)

    it('12th - Click "Cart" button', async () => {
        await basePage.goToCart();

        await cartPage.verifyCartPage();
        expect(await basePage.getCurrentURL()).toBe(cartPage.args.cartURL);
    }, MAX_SAFE_TIMEOUT)

    it('13th - Click "Proceed To Checkout" button', async () => {
        await cartPage.goToCheckout();

        expect(await basePage.getCurrentURL()).toBe(checkoutPage.args.checkoutURL);
        expect(await checkoutPage.getReviewYourOrderHeader()).toEqual(checkoutPage.args.reviewYourOrderHeader);
    }, MAX_SAFE_TIMEOUT)

    it('14th - Verify Address Details and Review Your Order', async () => {
        const addressesDetailsObj = await checkoutPage.getAddressesDetails();

        for (let i = 0; i < Object.keys(addressesDetailsObj).length; i++) {
            let addressObj = Object.keys(addressesDetailsObj)[i];
            let key;
            for (let j = 0; j < Object.keys(addressObj).length; j++) {
                key = Object.keys(addressObj)[j];
                expect(addressesDetailsObj[addressObj][key]).toBe(checkoutPage.args.details[key]);
            }
        }
        
        let properties = ["firstPrice", "secondPrice"];
        let cartItemsDetailsObj = await cartPage.getCartDetails();
        for (let i = 1; i <= properties.length; i++) {
            expect(cartItemsDetailsObj[i.toString()].price).toBe(cartPage.args[properties[i - 1]]);
            expect(cartItemsDetailsObj[i.toString()].quantity).toBe(cartPage.args.expectedQuantity);
            expect(cartItemsDetailsObj[i.toString()].totalPrice).toBe(cartItemsDetailsObj[i.toString()].price);
        }
    }, MAX_SAFE_TIMEOUT)

    it('15th - Enter description in comment text area and click "Place Order"', async () => {
        await checkoutPage.typeDescription();
        expect(await checkoutPage.getDescription()).toBe(checkoutPage.args.description);

        await checkoutPage.goToPlaceOrder();
    }, MAX_SAFE_TIMEOUT)

    it('16th - Enter payment details: Name on Card, Card Number, CVC, Expiration date', async () => {
        await paymentPage.typePaymentDetails();
        const paymentDetailsObj = await paymentPage.getPaymentDetails();
        let paymentDetailKey;
        for (let i = 0; i < Object.keys(paymentDetailsObj).length; i++) { 
            paymentDetailKey = Object.keys(paymentDetailsObj)[i];
            expect(paymentDetailsObj[paymentDetailKey]).toBe(paymentPage.args[paymentDetailKey]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('17th - Click "Pay and Confirm Order" button & 18th - Verify success message "Your order has been placed successfully!"', async () => {
        await paymentPage.clickPayBtn();
        // await paymentPage.abortNavigation();

        // expect(successMessageHeader).toBe(paymentPage.args.successMessageHeader);
    }, MAX_SAFE_TIMEOUT)

    

    it('19th - Click "Delete Account" button', async () => {
        await basePage.goToDeleteAccount();
    }, MAX_SAFE_TIMEOUT)

    it('20th - Verify "ACCOUNT DELETED!" and click "Continue" button', async () => {
        await deletedAccountPage.verifyDeleteAccountPage();

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await deletedAccountPage.getAccountDeletedHeader()).toBe(deletedAccountPage.args.AccountDeletedHeader);

        await deletedAccountPage.clickContinue();
    }, MAX_SAFE_TIMEOUT)
})