const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductsPage = require('../pagesClasses/ProductsPage/ProductsPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC8 - Verify All Products and product detail page', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {ProductsPage} */
    let productsPage;
    /** @type {HomePage} */
    let homePage;


    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        productsPage = new ProductsPage(page);
        homePage = new HomePage(page);
    }, MAX_SAFE_TIMEOUT)

    it('1st & 2nd - open the testing site', async () => {
        expect(basePage.browser).not.toBe(undefined);
        expect(basePage.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await homePage.verifyHomePage()

        //checks if url was added correctly
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Product" button', async () => {
        await basePage.goToProducts();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify user is navigated to ALL PRODUCTS page successfully', async () => {
        await productsPage.verifyProductsPage();

        expect(await basePage.getCurrentURL()).toBe(productsPage.args.productsURL);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter product name in search input and click search button', async () => {
        await productsPage.typeSearch();
        expect(await productsPage.getSearchBarValue()).toBe(productsPage.args.productToSearch);

        await productsPage.clickSearchBtn();
    }, MAX_SAFE_TIMEOUT)

    it('7th - Verify "SEARCHED PRODUCTS" is visible', async () => {
        await productsPage.verifySearchedProductList();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify all the products related to search are visible', async () => {
        let productsArr = await productsPage.getProductsListNames();
        let productsName;

        for (let i = 0; i < productsArr.length; i++) {
            productsName = productsArr[i];

            expect(productsName.toLowerCase()).toContain(productsPage.args.productToSearch.toLowerCase());
        }
    }, MAX_SAFE_TIMEOUT)


    

})