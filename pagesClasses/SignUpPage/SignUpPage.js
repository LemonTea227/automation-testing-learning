const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class SignUpPage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async clickCreateAccount() {
        await this.clickBtn(selectors.createAccountBtn);
    }
    async checkNewsletter() {
        await this.clickBtn(selectors.newsletter);
    }
    async checkOffers() {
        await this.clickBtn(selectors.offers);
    }

    async getCheckedStatus(selector) {
        return await (await (await this.page.$(selector)).getProperty('checked')).jsonValue();
    }

    async selectOption(selector, valueToSelect) {
        await this.page.waitForSelector(selector);
        await this.page.select(selector, valueToSelect);
    }

    async getSelected(selector) {
        return await this.page.evaluate(x => x.value, (await this.page.$(selector)));
    }

    async verifySignupPage() {
        await this.waitForSelectorToBeVisible(selectors.signupHeader);
    }

    async fillAccountInformation() {
        let dateProperties = ["day","month","year"];

        //excludes name and email - they come from the last page
        await this.clickBtn(selectors.title);
        await this.typeToSelector(selectors.password, args.password);

        let dateKey;
        for (let i = 0; i < dateProperties.length; i++) {
            dateKey = dateProperties[i];
            await this.selectOption(selectors.dateOfBirth[dateKey], args.dateOfBirth[dateKey]);
        }
    }
    async fillAddressInformation() {
        let properties = ["firstName", "lastName", "company", "address", "address2", "country", "state", "city", "zipcode", "mobileNumber"];
        let addressKey;
        for (let i = 0; i < properties.length; i++) {
            addressKey = properties[i];
            await this.typeToSelector(selectors[addressKey], args[addressKey]);
            
        }
    }

    async getSignupHeader() {
        return await this.getTrimmedText(selectors.signupHeader);
    }
    async getAccountInformation() {
        let properties = ["username", "email", "password"];
        let dateProperties = ["day","month","year"];
        let retObj = {};
        retObj["title"] = await this.getCheckedStatus(selectors.title);
        let accountInfoKey;
        for (let i = 0; i < properties.length; i++) {
            accountInfoKey = properties[i];
            retObj[accountInfoKey] = await this.getTypedValue(selectors[accountInfoKey]);
            
        }
        retObj.dateOfBirth = {};
        let dateKey;
        for (let i = 0; i < dateProperties.length; i++) {
            dateKey = dateProperties[i];
            retObj.dateOfBirth[dateKey] = await this.getSelected(selectors.dateOfBirth[dateKey]);
        }
       
        return retObj;
    }
    async getAddressInformation() {
        let retObj = {};
        let properties = ["firstName", "lastName",  "company", "address", "address2", "country", "state", "city", "zipcode", "mobileNumber"];
        let addressInfoKey;
        for (let i = 0; i < properties.length; i++) {
            addressInfoKey = properties[i];
            retObj[addressInfoKey] = await this.getTypedValue(selectors[addressInfoKey]);
        }

        return retObj;
    }

    // getExpectedSignupHeader() {
    //     return args.signupHeader;
    // }
    // getExpectedAccountInformation() {
    //     return {
    //         "title": true,
    //         "username": args.username,
    //         "email": args.email,
    //         "password": args.password,
    //         "dateOfBirth": {
    //             "day": args.dateOfBirth.day,
    //             "month": args.dateOfBirth.month,
    //             "year": args.dateOfBirth.year
    //         }
    //     }
    // }
    // getExpectedAddressInformation() {
    //     return {
    //         "firstName": args.firstName,
    //         "lastName": args.lastName,
    //         "company": args.company,
    //         "address": args.address,
    //         "address2": args.address2,
    //         "country": args.country,
    //         "state": args.state,
    //         "city": args.city,
    //         "zipcode": args.zipcode,
    //         "mobileNumber": args.mobileNumber
    //     }
    // }
}

module.exports = SignUpPage;
