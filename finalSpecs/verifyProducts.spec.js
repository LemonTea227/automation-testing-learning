const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductsPage = require('../pagesClasses/ProductsPage/ProductsPage');
const ProductDetailPage = require('../pagesClasses/ProductDetailPage/ProductDetailPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC8 - Verify All Products and product detail page', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {ProductsPage} */
    let productsPage;
    /** @type {ProductDetailPage} */
    let productDetailPage;
    /** @type {HomePage} */
    let homePage;   

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        productsPage = new ProductsPage(page);
        productDetailPage = new ProductDetailPage(page);
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

    it('4th - Click on "Product" button', async () => {
        await basePage.goToProducts();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify user is navigated to ALL PRODUCTS page successfully', async () => {
        await productsPage.verifyProductsPage();

        expect(await basePage.getCurrentURL()).toBe(productsPage.args.productsURL);
    }, MAX_SAFE_TIMEOUT)

    it('6th - The products list is visible', async () => {
        await productsPage.verifyProductList();
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click on "View Product" of first product', async () => {
        await productsPage.goToFirstProductDetailPage();
    }, MAX_SAFE_TIMEOUT)

    it('8th - User is landed to product detail page', async () => {
        expect(await basePage.getCurrentURL()).toBe(productDetailPage.args.firstProductDetailURL);
    }, MAX_SAFE_TIMEOUT)

    it('9th - Verify that detail detail is visible: product name, category, price, availability, condition, brand', async () => {
        await productDetailPage.verifyProductDetailPage();
        let firstProductDetailsObj = await productDetailPage.getProductDetails();
        let firstPKey;
        for (let i = 0; i < Object.keys(firstProductDetailsObj).length; i++) {
            firstPKey = Object.keys(firstProductDetailsObj)[i];
            expect(firstProductDetailsObj[firstPKey]).toBe(productDetailPage.args[firstPKey]);
        }
    }, MAX_SAFE_TIMEOUT)
    




})