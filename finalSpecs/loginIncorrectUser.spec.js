const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;


describe('TC3 - Login User with incorrect email and password', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {LoginPage} */
    let loginPage;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        loginPage = new LoginPage(page);
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
        await loginPage.typeUnregisteredInfo();
        let loginObj = await loginPage.getUnregisteredInfo();
        let loginKey;
        for (let i = 0; i < Object.keys(loginObj).length; i++) {
            loginKey = Object.keys(loginObj)[i];
            expect(loginObj[loginKey]).toBe(loginPage.args[loginKey]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Login" button', async () => {
        await loginPage.clickLogin();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Your email or password is incorrect!" is visible', async () => {
        await loginPage.verifyIncorrectLoginHeader()

        expect(await loginPage.getIncorrectLoginHeader()).toBe(loginPage.args.incorrectLoginHeader);//login.args
    }, MAX_SAFE_TIMEOUT)

    // await browser.close();
})
