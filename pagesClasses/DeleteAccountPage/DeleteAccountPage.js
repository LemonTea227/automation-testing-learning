const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class DeleteAccountPage extends BasePage {
    constructor(page){
        this.page = page;
    }
    
    async getAccountDeletedHeader() {
        return await this.getTrimmedTextFromSelector(selectors.AccountDeletedHeader);
    }

    getExpectedAccountDeleted() {
        return args.AccountDeletedHeader;
    }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }
}

module.exports = DeleteAccountPage;