const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC5 - Register User with existing email', () => {
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

    it('5th - Verify "New User Signup!" is visible', async () => {
        //wait for signup to load and checks if loaded successfully
        await loginPage.verifyLoginPageSignup();

        expect(await loginPage.getSignupHeader()).toEqual(loginPage.args.signupHeader);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter name and email address', async () => {
        //enter username and password for signup
        await loginPage.typeSignup();
        let signup = await loginPage.getSignup();
        let signupKey;
        for (let i = 0; i < Object.keys(signup).length; i++) {
            signupKey = Object.keys(signup)[i];
            expect(signup[signupKey]).toBe(loginPage.args[signupKey]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Signup" button', async () => {
        //signup user you entered
        await loginPage.clickSignup(); //click signup button

    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Email Address already exist!" is visible', async () => {
        await loginPage.verifyEmailExistsSignupHeader();

        expect(await loginPage.getEmailExistsSignupHeader()).toBe(loginPage.args.emailExistsSignupHeader);
    }, MAX_SAFE_TIMEOUT)

    // await browser.close();
})
