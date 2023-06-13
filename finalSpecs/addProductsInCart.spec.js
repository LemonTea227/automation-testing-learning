const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductsPage = require('../pagesClasses/ProductsPage/ProductsPage');
const CartPage = require('../pagesClasses/CartPage/CartPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC12 - Add Products in Cart', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {ProductsPage} */
    let productsPage;
    /** @type {CartPage} */
    let cartPage;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
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
        await productsPage.verifyProductsPage();

        expect(await basePage.getCurrentURL()).toBe(productsPage.args.productsURL);
    }, MAX_SAFE_TIMEOUT)

    it('5th - Hover over first product and click "Add to cart"', async () => {
        await productsPage.hoverAndClickAddToCartByIndex(0);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Click "Continue Shopping" button', async () => {
        await productsPage.clickContinueShopping();
    }, MAX_SAFE_TIMEOUT)

    it('7th - Hover over second product and click "Add to cart"', async () => {
        await productsPage.hoverAndClickAddToCartByIndex(1);
    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "View Cart" button', async () => {
        await productsPage.clickViewCart();
    }, MAX_SAFE_TIMEOUT)

    it('9th - Verify both products are added to Cart', async () => {
        const cart = await cartPage.getProductLst();
        expect(Object.values(cart).length).toBeGreaterThanOrEqual(2);
    }, MAX_SAFE_TIMEOUT)

    it('10th - Verify their prices, quantity and total price', async () => {
        let properties = ["firstPrice", "secondPrice"];
        let cartItemsDetailsObj = await cartPage.getCartDetails();
        for (let i = 1; i <= 2; i++) {
            expect(cartItemsDetailsObj[i.toString()].price).toBe(cartPage.args[properties[i - 1]]);
            expect(cartItemsDetailsObj[i.toString()].quantity).toBe(cartPage.args.expectedQuantity);
            expect(cartItemsDetailsObj[i.toString()].totalPrice).toBe(cartItemsDetailsObj[i.toString()].price);
        }
    }, MAX_SAFE_TIMEOUT)
})