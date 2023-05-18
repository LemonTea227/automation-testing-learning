const puppeteer = require('puppeteer');
const jasmine = require('jasmine');
const BasePage = require('../../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../../pagesClasses/LoginPage/LoginPage.js');

// const base = new BasePage();

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe("Testing the BasePage class main functions", () => {
    let base;
    let page;
    let login;

    beforeAll(async() => {
        base = new BasePage();
        page = await base.openSite();
        login = new LoginPage(page);
    }, MAX_SAFE_TIMEOUT)

    it("open the site", async () => {
        // await base.openSite();
        expect(base.browser).not.toBe(undefined);
        expect(base.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it("check url opened", async () => {
        expect(await base.getCurrentURL()).toBe(base.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it("check url opened", async () => {
        expect(await base.getCurrentURL()).toBe(base.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it("click a button", async () => {
        await base.goToSignupLogin()
        expect(await base.getCurrentURL()).toBe(base.siteURL+'login')
    }, MAX_SAFE_TIMEOUT)

    it("wait for selector to be visible", async () => {
        expect(login.verifySignupHeader()).toBeTruthy();
    }, MAX_SAFE_TIMEOUT)

    it("check get trimmed text", async () => {
        expect(login.getSignupHeader).toBe(login.getExpectedSignupHeader());
    }, MAX_SAFE_TIMEOUT)

    it("type to selector", async () => {
        
    }, MAX_SAFE_TIMEOUT)

    it("get typed value", async () => {
        
    }, MAX_SAFE_TIMEOUT)

    
})