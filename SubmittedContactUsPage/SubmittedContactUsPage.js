const BasePage = require("../BasePage/BasePage");

class SubmittedContactUsPage extends BasePage{
    constructor(){
        this.conf = JSON.parse(fs.readFileSync('SubmittedContactUsPage/conf.json'));
    }

    async getGetInTouchHeader() {
        return await this.getTrimmedText(this.conf.selector.contactUsHeader);
    }

    getExpectedGetInTouchHeader() {
        return this.conf.args.contactUsHeader;
    }

    async clickHome() {
        await this.clickBtn(this.conf.selector.homeFormBtn);
    }
}