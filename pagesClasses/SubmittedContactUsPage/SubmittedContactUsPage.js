const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class SubmittedContactUsPage extends BasePage{
    constructor(page){
        super();
        this.page = page;
    }

    async getGetInTouchHeader() {
        return await this.getTrimmedText(selectors.contactUsHeader);
    }

    getExpectedGetInTouchHeader() {
        return args.contactUsHeader;
    }

    async clickHome() {
        await this.clickBtn(selectors.homeFormBtn);
    }
}

module.exports = SubmittedContactUsPage;