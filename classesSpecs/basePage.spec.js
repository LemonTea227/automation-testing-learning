const puppeteer = require('puppeteer');
const jasmine = require('jasmine');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');

// const base = new BasePage();

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe("Testing the BasePage class main functions", () => {
    /** @type {BasePage} */
    let basePage;
    let page;
    /** @type {LoginPage} */
    let loginPage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        loginPage = new LoginPage(page);
    }, MAX_SAFE_TIMEOUT)

    it("open the site", async () => {
        // await base.openSite();
        expect(basePage.browser).not.toBe(undefined);
        expect(basePage.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it("check url opened", async () => {
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it("check url opened", async () => {
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it("click a button", async () => {
        await basePage.goToSignupLogin()
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL + 'login')
    }, MAX_SAFE_TIMEOUT)

    it("wait for selector to be visible", async () => {
        await loginPage.verifyLoginPageSignup()
    }, MAX_SAFE_TIMEOUT)

    it("check get trimmed text", async () => {
        expect(await loginPage.getSignupHeader()).toBe(loginPage.args.signupHeader);
    }, MAX_SAFE_TIMEOUT)

    it("type to selector", async () => {
        await loginPage.typeSignup();
        let signupObj = await loginPage.getSignup();

        for (let i = 0; i < Object.keys(signupObj).length; i++) {
            expect(signupObj[Object.keys(signupObj)[i]]).toBe(loginPage.args[Object.keys(loginPage.args)[i]]);
        }
    }, MAX_SAFE_TIMEOUT)

})