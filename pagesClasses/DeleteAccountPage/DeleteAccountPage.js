const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class DeleteAccountPage extends BasePage {
    constructor(page){
        super();
        this.page = page;
    }

    async verifyDeleted() {
        return await this.waitForSelectorToBeVisible(selectors.AccountDeletedHeader);
    }
    
    async getAccountDeletedHeader() {
        return await this.getTrimmedText(selectors.AccountDeletedHeader);
    }

    getExpectedAccountDeleted() {
        return args.AccountDeletedHeader;
    }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }
}

module.exports = DeleteAccountPage;