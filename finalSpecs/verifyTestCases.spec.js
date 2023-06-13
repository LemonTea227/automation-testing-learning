const puppeteer = require('puppeteer');
const TestCasesPage = require('../pagesClasses/TestCasesPage/TestCasesPage');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC7 - Verify Test Cases Page', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {TestCasesPage} */
    let testCasesPage;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        testCasesPage = new TestCasesPage(page);
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

    it('4th - Click on "Test Cases" button', async () => {
        await basePage.goToTestCases();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify user is navigated to test cases page successfully', async () => {
        await testCasesPage.verifyTestCasesPage();
        
        expect(await basePage.getCurrentURL()).toBe(testCasesPage.args.testCasesURL);
    }, MAX_SAFE_TIMEOUT)
})