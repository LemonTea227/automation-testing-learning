const BasePage = require("../BasePage/BasePage");

class DeleteAccountPage extends BasePage {
    constructor(){
        this.conf = JSON.parse(fs.readFileSync('DeleteAccountPage/conf.json'));
    }
    
    async getAccountDeletedHeader() {
        return await this.getTrimmedTextFromSelector(this.conf.selector.AccountDeletedHeader);
    }

    getExpectedAccountDeleted() {
        return this.conf.args.AccountDeletedHeader;
    }

    async clickContinue() {
        await this.clickBtn(this.conf.selector.continueBtn);
    }
}