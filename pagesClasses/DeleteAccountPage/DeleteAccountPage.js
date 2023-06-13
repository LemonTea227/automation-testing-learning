const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class DeleteAccountPage extends BasePage {
    constructor(page){
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifyDeleteAccountPage() {
        await this.waitForSelectorToBeVisible(selectors.AccountDeletedHeader);
    }
    
    async getAccountDeletedHeader() {
        return await this.getTrimmedText(selectors.AccountDeletedHeader);
    }

    // getExpectedAccountDeleted() {
    //     return args.AccountDeletedHeader;
    // }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }
}

module.exports = DeleteAccountPage;