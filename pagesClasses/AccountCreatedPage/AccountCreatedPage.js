const BasePage = require("../BasePage/BasePage");
const {selectors, args} = require('./conf.json');

class AccountCreatedPage extends BasePage{
    constructor(page){
        this.page = page;
    }

    async getAccountCreatedHeader() {
        return await this.getTrimmedTextFromSelector(selectors.AccountCreatedHeader);
    }

    getExpectedAccountCreated() {
        return args.AccountCreatedHeader;
    }

    async clickContinue() {
        await this.clickBtn(selectors.continueBtn);
    }

} 