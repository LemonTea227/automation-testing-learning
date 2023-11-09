const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductDetailPage = require('../pagesClasses/ProductDetailPage/ProductDetailPage');
const CartPage = require('../pagesClasses/CartPage/CartPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC8 - Verify All Products and product detail page', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {CartPage} */
    let cartPage;
    /** @type {HomePage} */
    let homePage;
    /** @type {ProductDetailPage} */
    let productDetailPage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        homePage = new HomePage(page);
        productDetailPage = new ProductDetailPage(page);
        cartPage = new CartPage(page);
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

    it('4th - Click "View Product" for any product on home page', async () => {
        await homePage.clickViewProductDetailsBtn(0);
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify product detail is opened', async () => {
        await productDetailPage.verifyProductDetailPage();

        expect(await basePage.getCurrentURL()).toBe(productDetailPage.args.firstProductDetailURL);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Increase quantity to 4', async () => {
        await productDetailPage.changeProductQuantity();

        expect(await productDetailPage.getQuantity()).toBe(productDetailPage.args.quantityOfProduct.toString());
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Add to cart" button', async () => {
        await productDetailPage.clickAddToCartBtn();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "View Cart" button', async () => {
        await productDetailPage.clickViewCart();
    }, MAX_SAFE_TIMEOUT)

    it('9th - Verify that product is displayed in cart page with exact quantity', async () => {
        await cartPage.verifyCartPage();
        expect(await basePage.getCurrentURL()).toBe(cartPage.args.cartURL);

        expect(await cartPage.getQuantityByID(1)).toBe(productDetailPage.args.quantityOfProduct.toString());
    }, MAX_SAFE_TIMEOUT)
})