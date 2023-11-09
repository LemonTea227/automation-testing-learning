const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class PaymentDonePage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async verifyPaymentDonePage() {
        await this.waitForSelectorToBeVisible(selectors.paymentDoneHeader);
    }

    async getPaymentDoneHeader() {
        return await this.getTrimmedText(selectors.paymentDoneHeader);
    }

}

module.exports = PaymentDonePage;