const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC10 - Verify Subscription in home page', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
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

    it('4th - Scroll down to footer', async () => {
        await basePage.scrollToSubscription();

        expect(await basePage.isSubscriptionOnScreen()).toBe(true);
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify text "SUBSCRIPTION"', async () => {
        await basePage.verifySubscriptionHeader();

        expect(await basePage.getSubscriptionHeader()).toBe(basePage.args.SubscriptionHeader)
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email address in input and click arrow button', async () => {
        await basePage.typeEmailToSubscription();
        expect(await basePage.getTypedEmailFromSubscription()).toBe(basePage.args.subscriptionEmail);

        await basePage.clickSubmitSubscriptionBtn();
    }, MAX_SAFE_TIMEOUT)

    it('7th - Verify success message "You have been successfully subscribed!"" is visible', async () => {
        await basePage.verifySubscriptionSuccessMessage();

        expect(await basePage.getSubscriptionSuccessMessageHeader()).toBe(basePage.args.successSubscribeHeder)
    }, MAX_SAFE_TIMEOUT)

    


})