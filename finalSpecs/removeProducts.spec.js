const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage');
const ProductsPage = require('../pagesClasses/ProductsPage/ProductsPage');
const CartPage = require('../pagesClasses/CartPage/CartPage');
const HomePage = require('../pagesClasses/HomePage/HomePage');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC17 - Remove Products From Cart', () => {
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

    it('4th - Hover over first product and click "Add to cart"', async () => {
        await productsPage.hoverAndClickAddToCartByIndex(0);
        await productsPage.clickContinueShopping();
        await productsPage.hoverAndClickAddToCartByIndex(1);
        await productsPage.clickContinueShopping();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Click "Cart" button', async () => {
        await basePage.goToCart();
    }, MAX_SAFE_TIMEOUT)

    it('6th - Verify that cart page is displayed', async () => {
        expect(await basePage.getCurrentURL()).toBe(cartPage.args.cartURL);

        const cart = await cartPage.getProductLst();
        expect(Object.values(cart).length).toBeGreaterThanOrEqual(2);

        let properties = ["firstPrice", "secondPrice"];
        let cartItemsDetailsObj = await cartPage.getCartDetails();
        for (let i = 1; i <= properties.length; i++) {
            expect(cartItemsDetailsObj[i.toString()].price).toBe(cartPage.args[properties[i - 1]]);
            expect(cartItemsDetailsObj[i.toString()].quantity).toBe(cartPage.args.expectedQuantity);
            expect(cartItemsDetailsObj[i.toString()].totalPrice).toBe(cartItemsDetailsObj[i.toString()].price);
        }
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "X" button corresponding to particular product', async () => {
        await cartPage.deleteProductByID(1);
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that product is removed from the cart', async () => {
        let properties = ["firstPrice", "secondPrice"];
        let cartItemsDetailsObj = await cartPage.getCartDetails();
        for (let i = 1; i <= properties.length; i++) {
            if (i == 1) {
                expect(Object.keys(cartItemsDetailsObj)).not.toContain(i.toString());
            }
            else {
                expect(cartItemsDetailsObj[i.toString()].price).toBe(cartPage.args[properties[i - 1]]);
                expect(cartItemsDetailsObj[i.toString()].quantity).toBe(cartPage.args.expectedQuantity);
                expect(cartItemsDetailsObj[i.toString()].totalPrice).toBe(cartItemsDetailsObj[i.toString()].price);
            }
        }
    }, MAX_SAFE_TIMEOUT)
})