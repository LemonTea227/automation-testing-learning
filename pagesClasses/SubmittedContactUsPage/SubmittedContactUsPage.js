const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class SubmittedContactUsPage extends BasePage{
    constructor(page){
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifySubmittedContactUsPage() {
        await this.waitForSelectorToBeVisible(selectors.successHeader);
    }

    async getSuccessHeader() {
        return await this.getTrimmedText(selectors.successHeader);
    }

    // getExpectedSuccessHeader() {
    //     return args.successHeader;
    // }

    async clickHome() {
        await this.clickBtn(selectors.homeFormBtn);
    }
}

module.exports = SubmittedContactUsPage;