const BasePage = require('../../pagesClasses/BasePage/BasePage.js');
const HomePage = require('../../pagesClasses/HomePage/HomePage.js');
const puppeteer = require('puppeteer');
const ProductsPage = require('../../pagesClasses/ProductsPage/ProductsPage.js');
const SubCategoryPage = require('../../pagesClasses/SubCatagoryPage/SubCatagoryPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;


describe('TC18 - View Category Products', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {HomePage} */
    let homePage;
    /** @type {ProductsPage} */
    let productsPage;
    /** @type {SubCategoryPage} */
    let subCategoryPage;

    let category;
    let subCategory;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        subCategoryPage = new SubCategoryPage(page);
        
    }, MAX_SAFE_TIMEOUT)

    it('1st & 2nd - open the testing site', async () => {
        expect(basePage.browser).not.toBe(undefined);
        expect(basePage.page).not.toBe(undefined);

        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await homePage.verifyHomePage();

        //checks if url was added correctly
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that categories are visible on left side bar', async () => {
        await productsPage.verifyCatagories();

    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Women" category', async () => {
        category = await productsPage.clickCategory();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Click on any category link under "Women" category, for example: Dress', async () => {
        subCategory = await productsPage.clickSubCategory();
    }, MAX_SAFE_TIMEOUT)

    it('6th - Verify that category page is displayed and confirm text "WOMEN - TOPS PRODUCTS"', async () => {
        expect(await basePage.getCurrentURL()).toBe(subCategoryPage.args.subCategoryPageURL + productsPage.args[category][subCategory]);
        expect(await subCategoryPage.getSubCategoryPageHeader()).toBe(subCategoryPage.buildSubCategoryPageHeader(category, subCategory));
    }, MAX_SAFE_TIMEOUT)

    it('7th - On left side bar, click on any sub-category link of "Men" category', async () => {
        category = await productsPage.clickCategory("Men");
        subCategory = await productsPage.clickSubCategory("Tshirts");
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that user is navigated to that category page', async () => {
        expect(await basePage.getCurrentURL()).toBe(subCategoryPage.args.subCategoryPageURL + productsPage.args[category][subCategory]);
        expect(await subCategoryPage.getSubCategoryPageHeader()).toBe(subCategoryPage.buildSubCategoryPageHeader(category, subCategory));
    }, MAX_SAFE_TIMEOUT)

})
