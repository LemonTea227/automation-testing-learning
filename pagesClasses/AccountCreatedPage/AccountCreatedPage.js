const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class AccountCreatedPage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifyAccountCreatedPage() {
        await this.waitForSelectorToBeVisible(selectors.accountCreatedHeader);
    }

    async getAccountCreatedHeader() {
        return await this.getTrimmedText(selectors.accountCreatedHeader);
    }

    // getExpectedAccountCreated() {
    //     return args.accountCreatedHeader;
    // }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }

}

module.exports = AccountCreatedPage;