const BasePage = require("../BasePage/BasePage");

class AccountCreatedPage extends BasePage{
    constructor(){
        this.conf = JSON.parse(fs.readFileSync('AccountCreatedPage/conf.json'));
    }

    async getAccountCreatedHeader() {
        return await this.getTrimmedTextFromSelector(this.conf.selector.AccountCreatedHeader);
    }

    getExpectedAccountCreated() {
        return this.conf.AccountCreatedHeader;
    }

    async clickContinue() {
        await this.clickBtn(this.conf.selector.continueBtn);
    }

} 