const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class SignUpPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
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
        await this.page.select(selector, valueToSelect);
    }

    async getSelected(selector) {
        return await this.page.evaluate(x => x.value, (await this.page.$(selector)));
    }

    async verifySignupHeader() {
        return await this.waitForSelectorToBeVisible(selectors.signupHeader);
    }

    async fillAccountInformation() {
        //excludes name and email - they come from the last page
        await this.clickBtn(selectors.title);
        await this.typeToSelector(selectors.password, args.password);
        await this.selectOption(selectors.dateOfBirth.day, args.dateOfBirth.day);
        await this.selectOption(selectors.dateOfBirth.month, args.dateOfBirth.month);
        await this.selectOption(selectors.dateOfBirth.year, args.dateOfBirth.year);
    }
    async fillAddressInformation() {
        await this.typeToSelector(selectors.firstName, args.firstName);
        await this.typeToSelector(selectors.lastName, args.lastName);
        await this.typeToSelector(selectors.company, args.company);
        await this.typeToSelector(selectors.address, args.address);
        await this.typeToSelector(selectors.address2, args.address2);
        await this.typeToSelector(selectors.country, args.country);
        await this.typeToSelector(selectors.state, args.state);
        await this.typeToSelector(selectors.city, args.city);
        await this.typeToSelector(selectors.zipcode, args.zipcode);
        await this.typeToSelector(selectors.mobileNumber, args.mobileNumber);
    }

    async getSignupHeader() {
        return await this.getTrimmedText(selectors.signupHeader);
    }
    async getAccountInformation() {
        return {
            "title": await this.getCheckedStatus(selectors.title),
            "username": await this.getTypedValue(selectors.username),
            "email": await this.getTypedValue(selectors.email),
            "password": await this.getTypedValue(selectors.password),
            "dateOfBirth": {
                "day": await this.getSelected(selectors.dateOfBirth.day),
                "month": await this.getSelected(selectors.dateOfBirth.month),
                "year": await this.getSelected(selectors.dateOfBirth.year)
            }
        }
    }
    async getAddressInformation() {
        return {
            "firstName": await this.getTypedValue(selectors.firstName),
            "lastName": await this.getTypedValue(selectors.lastName),
            "company": await this.getTypedValue(selectors.company),
            "address": await this.getTypedValue(selectors.address),
            "address2": await this.getTypedValue(selectors.address2),
            "country": await this.getTypedValue(selectors.country),
            "state": await this.getTypedValue(selectors.state),
            "city": await this.getTypedValue(selectors.city),
            "zipcode": await this.getTypedValue(selectors.zipcode),
            "mobileNumber": await this.getTypedValue(selectors.mobileNumber)
        }
    }

    getExpectedSignupHeader() {
        return args.signupHeader;
    }
    getExpectedAccountInformation() {
        return {
            "title": true,
            "username": args.username,
            "email": args.email,
            "password": args.password,
            "dateOfBirth": {
                "day": args.dateOfBirth.day,
                "month": args.dateOfBirth.month,
                "year": args.dateOfBirth.year
            }
        }
    }
    getExpectedAddressInformation() {
        return {
            "firstName": args.firstName,
            "lastName": args.lastName,
            "company": args.company,
            "address": args.address,
            "address2": args.address2,
            "country": args.country,
            "state": args.state,
            "city": args.city,
            "zipcode": args.zipcode,
            "mobileNumber": args.mobileNumber
        }
    }
}

module.exports = SignUpPage;
