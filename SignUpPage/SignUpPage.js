const BasePage = require("../BasePage/BasePage");

class SignUpPage extends BasePage {
    constructor() {
        this.conf = JSON.parse(fs.readFileSync('SignUpPage/conf.json'));
    }

    async clickCreateAccount() {
        await this.clickBtn(this.conf.selector.createAccountBtn);
    }
    async checkNewsletter() {
        await this.clickBtn(this.conf.selector.newsletter);
    }
    async checkOffers() {
        await this.clickBtn(this.conf.selector.offers);
    }

    async fillAccountInformation() {

    }
    async fillAddressInformation() {

    }

    async getSignupHeader() {
        return await this.getTrimmedText(this.conf.selector.signupHeader);
    }
    async getAccountInformation() {
        return {

        }
    }
    async getAddressInformation() {
        return {

        }
    }

    getExpectedSignupHeader() {
        return this.conf.args.signupHeader;
    }
    getExpectedAccountInformation() {
        return {

        }
    }
    getExpectedAddressInformation() {
        return {

        }
    }
}