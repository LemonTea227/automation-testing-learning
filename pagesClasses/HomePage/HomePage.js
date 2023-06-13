const { Puppeteer } = require("puppeteer");
const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');

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
        const products = await this.getProductLst();
        await products[index].$eval(selectors.viewProducts, (element) => element.click());
    }
    
    async getProductLst() {
        this.page.waitForSelector(selectors.products);
        return await this.page.$$(selectors.products);
    }
}

module.exports = HomePage;