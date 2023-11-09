const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');
const { getLstOfSelector, getElementText } = require('../../usable/useCase.js');

class ProductsPage extends BasePage {
    constructor(page) {
        super();
        /** @type {Puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifyProductsPage() {
        await this.waitForSelectorToBeVisible(selectors.ProductsHeader);
    }

    async verifyProductList() {
        await this.waitForSelectorToBeVisible(selectors.featuredItemsList);
    }
    async verifySearchedProductList() {
        await this.waitForSelectorToBeVisible(selectors.ProductsHeader);
    }

    async goToFirstProductDetailPage() {
        await this.waitForSelectorToBeVisible(selectors.firstItem);
        await this.clickBtn(selectors.firstItemViewProduct);
    }

    async typeSearch(searchInput = args.productToSearch) {
        await this.typeToSelector(selectors.searchBar, searchInput);
    }
    async getSearchBarValue() {
        return await this.getTypedValue(selectors.searchBar);
    }
    async clickSearchBtn() {
        await this.clickBtn(selectors.searchBtn);
    }

    async getProductsLstNames() {
        const data = await this.page.evaluate((selectors) => {
            const tds = Array.from(document.querySelectorAll(selectors.searchedProductsResultsText))
            return tds.map(td => {
                return td.textContent.trim();
            });
        }, selectors);

        return data;
    }

    async hoverOverSelector(selector) {
        await this.waitForSelectorToBeVisible(selector);
        await this.page.hover(selector);
    }
    async hoverAndClick(selector) {
        await this.hoverOverSelector(selector);
        await this.clickBtn(selector);
    }

    async getProductsLst() {
        return await getLstOfSelector(this.page, selectors.products);
    }

    async hoverAndClickAddToCartByIndex(index) {
        const products = await this.getProductsLst();
        await products[index].hover();
        await products[index].$eval(selectors.addProductsToCarts, (element) => element.click());
    }

    // async hoverAndClickFirstAddToCart() {
    //     await this.hoverAndClick(selectors.firstItemAddToCart);
    // }
    // async hoverAndClickSecondAddToCart() {
    //     await this.hoverAndClick(selectors.secondItemAddToCart);
    // }

    async clickContinueShopping() {
        await this.waitForSelectorToBeVisible(selectors.continueShoppingBtn);
        await this.clickBtn(selectors.continueShoppingBtn);
    }
    async clickViewCart() {
        await this.waitForSelectorToBeVisible(selectors.viewCartBtn);
        await this.clickBtn(selectors.viewCartBtn);
    }

    async verifyCatagories() {
        await this.waitForSelectorToBeVisible(selectors.categoryHeader);
        await this.waitForSelectorToBeVisible(selectors.categories);
    }

    async getCategoryLst() {
        return await getLstOfSelector(this.page, selectors.categories);
    }

    async clickCategory(category = "Women") {
        const categoryLst = await this.getCategoryLst();
        await categoryLst[args.catagoriesNames.indexOf(category)].click();
        return category.toLowerCase();
    }
    async getOpenCategoryName() {
        await this.page.waitForSelector(selectors.openCategory);
        return await this.page.$eval(selectors.openCategory, element => element.getAttribute('id'));
    }
    async clickSubCategory(subCategory = "Tops") {
        // await this.page.waitForFunction(() => {
        //     return this.getOpenCategoryName();
        // })
        await this.clickBtn("[href='/category_products/" + args[((await this.getOpenCategoryName()).toString()).toLowerCase()][subCategory.toLowerCase()] + "']");
        return subCategory.toLowerCase();
    }

}

module.exports = ProductsPage;