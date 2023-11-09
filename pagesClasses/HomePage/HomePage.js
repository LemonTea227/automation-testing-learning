const { Puppeteer } = require("puppeteer");
const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');
const {getLstOfSelector} = require("../../usable/useCase.js") 

class HomePage extends BasePage {
    constructor(page) {
        super();
        /** @type {Puppeteer.page} */
        this.page = page;
        this.args = args;
    }

    async verifyHomePage() {
        await this.waitForSelectorToBeVisible(selectors.signupLogin);
    }

    async clickViewProductDetailsBtn(index) {
        const products = await this.getProductsLst();
        await products[index].$eval(selectors.viewProducts, (element) => element.click());
    }
    
    async getProductsLst() {
        return await getLstOfSelector(this.page, selectors.products);
    }

    async hoverAndClickAddToCartByIndex(index) {
        const products = await this.getProductsLst();
        await products[index].hover();
        await products[index].$eval(selectors.addProductsToCarts, (element) => element.click());
    }

    

    
}

module.exports = HomePage;