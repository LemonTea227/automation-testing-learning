const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');
const {getElementText} = require('../../usable/useCase.js');

class PaymentPage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async typePaymentDetails(properties = { nameCard: args.nameCard, cardNumber: args.cardNumber, cvc: args.cvc, expirationMonth: args.expirationMonth, expirationYear: args.expirationYear }) {
        let paymentDetail;
        for (let i = 0; i < Object.keys(properties).length; i++) {
            paymentDetail = Object.keys(properties)[i];
            await this.page.waitForSelector(selectors[paymentDetail]);
            await this.page.$eval(selectors[paymentDetail], (el, value) => {
                el.value = value;
            }, properties[paymentDetail]);
            // await Promise.all([
            //     await this.page.$eval(selectors[paymentDetail], (element, value) => {
            //         element.value = value;
            //         element.dispatchEvent(new Event('input', { bubbles: true }));
            //       }, properties[paymentDetail])
            // ]);
        }
    }

    async getPaymentDetails() {
        let properties = ["nameCard", "cardNumber", "cvc", "expirationMonth", "expirationYear"];
        let paymentDetail;
        let retObj = {};
        for (let i = 0; i < properties.length; i++) {
            paymentDetail = properties[i];
            retObj[paymentDetail] = await this.getTypedValue(selectors[paymentDetail]);
        }
        return retObj;
    }

    async clickElement(selector, properties) {
        await this.page.waitForSelector(selector);
        await this.page.$eval(selectors.payBtn, (element, properties) => element.click(properties), properties);
    }

    async clickPayBtn() {
        // let successMessageHeader;
        await Promise.all([
            this.clickElement(selectors.payBtn),
            this.page.evaluate(() => window.stop()),
            this.verifySuccessMessageHeader(),
            // successMessageHeader = await this.getSuccessMessageHeader(), 
            // this.clickBtn(selectors.payBtn),
        ]);

        // return successMessageHeader;

        // await this.page.setRequestInterception(true);
        // this.page.on('request', interceptedRequest => {
        //     interceptedRequest.abort();
        // });
        // // Click the button that triggers navigation
        // await this.clickBtn(selectors.payBtn);
        // Wait for the page to settle without navigating
        // await this.page.waitForTimeout(2000);

        // await this.page.evaluate(() => {
        //     window.location.href = 'about:blank';
        //   });
    }
    // async abortNavigation() {
    //     // await this.page.evaluate(() => window.stop());

    //     // await this.page.evaluate(() => window.stop());

    //     // await this.page.setRequestInterception(true);
    //     // this.page.on('request', (request) => {
    //     //     if (request.isNavigationRequest()) {
    //     //         request.abort();
    //     //     } else {
    //     //         request.continue();
    //     //     }
    //     // });
    // };

    async stopAbortingNavigation() {
        await this.page.setRequestInterception(false);
    }

    async verifySuccessMessageHeader() {
        await this.page.waitForSelector(selectors.successMessageHeader);
    }
    async getSuccessMessageHeader() {
        // return await this.getTrimmedText(selectors.successMessageHeader);
        this.page.$(selectors.successMessageHeader);
        return await getElementText(selectors.successMessageHeader);
    }
}

module.exports = PaymentPage;