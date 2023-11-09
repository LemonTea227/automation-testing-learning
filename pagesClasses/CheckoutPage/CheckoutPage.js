const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');
const {getElementText, getLstOfSelector} = require('../../usable/useCase.js');

class CheckoutPage extends BasePage {
    constructor(page) {
        super();
        /** @type {Puppeteer.Page} */
        this.page = page;
        this.args = args
    }

    async verifyCheckoutPage() {
        await this.waitForSelectorToBeVisible(selectors.reviewYourOrderHeader);
    }

    async getReviewYourOrderHeader() {
        return await this.getTrimmedText(selectors.reviewYourOrderHeader);
    }

    async getAddressesDetails() {
        let addressDetailsLst = Object.values(await getLstOfSelector(this.page, selectors.addressDetails));
        let addressesObj = {};
        for (let i = 0; i < addressDetailsLst.length; i++) {
            addressesObj[addressDetailsLst[i]] = {};
            let key;
            for (let j = 0; j < Object.keys(selectors.details).length; j++) {
                key = Object.keys(selectors.details)[j];
                addressesObj[addressDetailsLst[i]][key] = await getElementText(this.page, addressDetailsLst[i] , selectors.details[key]);
            }  
        }

        return addressesObj;
    }

    async typeDescription(description = args.description) {
        await this.typeToSelector(selectors.description, description);
    }
    async getDescription() {
        return this.getTypedValue(selectors.description);
    }

    async goToPlaceOrder() {
        await this.clickBtn(selectors.placeOrder);
    }


}

module.exports = CheckoutPage;