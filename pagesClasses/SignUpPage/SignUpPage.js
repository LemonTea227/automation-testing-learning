const BasePage = require("../BasePage/BasePage");
const {selectors, args} = require('./conf.json');

class SignUpPage extends BasePage {
    constructor(page) {
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
            "username": await this.getTrimmedText(selectors.username),
            "email": await this.getTrimmedText(selectors.email1),
            "password": await this.getTrimmedText(selectors.password),
            "dateOfBirth": {
                "day": await this.getSelected(selectors.dateOfBirth.day),
                "month": await this.getSelected(selectors.dateOfBirth.month),
                "year": await this.getSelected(selectors.dateOfBirth.year)
            }
        }
    }
    async getAddressInformation() {
        return {
            "firstName": await this.getTrimmedText(selectors.firstName),
            "lastName": await this.getTrimmedText(selectors.lastName),
            "company": await this.getTrimmedText(selectors.company),
            "address": await this.getTrimmedText(selectors.address),
            "address2": await this.getTrimmedText(selectors.address2),
            "country": await this.getTrimmedText(selectors.country),
            "state": await this.getTrimmedText(selectors.state),
            "city": await this.getTrimmedText(selectors.city),
            "zipcode": await this.getTrimmedText(selectors.zipcode),
            "mobileNumber": await this.getTrimmedText(selectors.mobileNumber)
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
