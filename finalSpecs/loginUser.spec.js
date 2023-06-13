const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');
const DeleteAccountPage = require('../pagesClasses/DeleteAccountPage/DeleteAccountPage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');
const puppeteer = require('puppeteer');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;


describe('TC2 - Login User with correct email and password', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {LoginPage} */
    let loginPage;
    /** @type {DeleteAccountPage} */
    let deletedAccountPage;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        loginPage = new LoginPage(page);
        deletedAccountPage = new DeleteAccountPage(page);
        homePage = new HomePage(page);
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

    it('4th - Click on "Signup/Login" button (filling username and gmail felids)', async () => {
        //enter window login/signup
        await basePage.goToSignupLogin();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "Login to your account" is visible', async () => {
        await loginPage.verifyLoginPageLogin();

        expect(await loginPage.getLoginHeader()).toBe(loginPage.args.loginHeader);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        await loginPage.typeLogin();
        let loginObj = await loginPage.getLogin();
        let loginKey;
        for (let i = 0; i < Object.keys(loginObj).length; i++) {
            loginKey = Object.keys(loginObj)[i];
            expect(loginObj[loginKey]).toBe(loginPage.args[loginKey]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Login" button', async () => {
        await loginPage.clickLogin();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Logged in as username" is visible', async () => {
        await basePage.verifyLoggedInAs()

        expect(await basePage.getLoggedInAs()).toBe(basePage.args.loggedAs);
    }, MAX_SAFE_TIMEOUT)

    it('9th - Click "Delete Account" button', async () => {
        await basePage.goToDeleteAccount();

    }, MAX_SAFE_TIMEOUT)

    it('10th - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
        await deletedAccountPage.verifyDeleteAccountPage()

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await deletedAccountPage.getAccountDeletedHeader()).toBe(deletedAccountPage.args.AccountDeletedHeader);

        //  await deletedAccount.clickContinue();
    }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
