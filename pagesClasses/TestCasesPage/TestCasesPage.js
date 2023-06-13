const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class TestCasesPage extends BasePage {
    constructor(page){
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifyTestCasesPage() {
        await this.waitForSelectorToBeVisible(selectors.testCasesHeader);
    }
}

module.exports = TestCasesPage;