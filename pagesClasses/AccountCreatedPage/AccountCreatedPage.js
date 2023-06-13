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
        await this.waitForSelectorToBeVisible(selectors.AccountCreatedHeader);
    }

    async getAccountCreatedHeader() {
        return await this.getTrimmedText(selectors.AccountCreatedHeader);
    }

    // getExpectedAccountCreated() {
    //     return args.AccountCreatedHeader;
    // }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }

}

module.exports = AccountCreatedPage;