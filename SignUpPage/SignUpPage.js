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
        //excludes name and email - they come from the last page
        await this.clickBtn(this.conf.selector.title);
        await this.typeToSelector(this.conf.selector.password, this.conf.args.password);
        await this.selectOption(this.conf.selector.dateOfBirth.day, this.conf.args.dateOfBirth.day);
        await this.selectOption(this.conf.selector.dateOfBirth.month, this.conf.args.dateOfBirth.month);
        await this.selectOption(this.conf.selector.dateOfBirth.year, this.conf.args.dateOfBirth.year);
    }
    async fillAddressInformation() {
        await this.typeToSelector(this.conf.selector.firstName, this.conf.args.firstName);
        await this.typeToSelector(this.conf.selector.lastName, this.conf.args.lastName);
        await this.typeToSelector(this.conf.selector.company, this.conf.args.company);
        await this.typeToSelector(this.conf.selector.address, this.conf.args.address);
        await this.typeToSelector(this.conf.selector.address2, this.conf.args.address2);
        await this.typeToSelector(this.conf.selector.country, this.conf.args.country);
        await this.typeToSelector(this.conf.selector.state, this.conf.args.state);
        await this.typeToSelector(this.conf.selector.city, this.conf.args.city);
        await this.typeToSelector(this.conf.selector.zipcode, this.conf.args.zipcode);
        await this.typeToSelector(this.conf.selector.mobileNumber, this.conf.args.mobileNumber);
    }

    async getSignupHeader() {
        return await this.getTrimmedText(this.conf.selector.signupHeader);
    }
    async getAccountInformation() {
        return {
            "title": await this.getCheckedStatus(this.conf.selector.title),
            "username": await this.getTrimmedText(this.conf.selector.username),
            "email": await this.getTrimmedText(this.conf.selector.email1),
            "password": await this.getTrimmedText(this.conf.selector.password),
            "dateOfBirth": {
                "day": await this.getSelected(this.conf.selector.dateOfBirth.day),
                "month": await this.getSelected(this.conf.selector.dateOfBirth.month),
                "year": await this.getSelected(this.conf.selector.dateOfBirth.year)
            }
        }
    }
    async getAddressInformation() {
        return {
            "firstName": await this.getTrimmedText(this.conf.selector.firstName),
            "lastName": await this.getTrimmedText(this.conf.selector.lastName),
            "company": await this.getTrimmedText(this.conf.selector.company),
            "address": await this.getTrimmedText(this.conf.selector.address),
            "address2": await this.getTrimmedText(this.conf.selector.address2),
            "country": await this.getTrimmedText(this.conf.selector.country),
            "state": await this.getTrimmedText(this.conf.selector.state),
            "city": await this.getTrimmedText(this.conf.selector.city),
            "zipcode": await this.getTrimmedText(this.conf.selector.zipcode),
            "mobileNumber": await this.getTrimmedText(this.conf.selector.mobileNumber)
        }
    }

    getExpectedSignupHeader() {
        return this.conf.args.signupHeader;
    }
    getExpectedAccountInformation() {
        return {
            "title": true,
            "username": this.conf.args.username,
            "email": this.conf.args.email,
            "password": this.conf.args.password,
            "dateOfBirth": {
                "day": this.conf.args.dateOfBirth.day,
                "month": this.conf.args.dateOfBirth.month,
                "year": this.conf.args.dateOfBirth.year
            }
        }
    }
    getExpectedAddressInformation() {
        return {
            "firstName": this.conf.args.firstName,
            "lastName": this.conf.args.lastName,
            "company": this.conf.args.company,
            "address": this.conf.args.address,
            "address2": this.conf.args.address2,
            "country": this.conf.args.country,
            "state": this.conf.args.state,
            "city": this.conf.args.city,
            "zipcode": this.conf.args.zipcode,
            "mobileNumber": this.conf.args.mobileNumber
        }
    }
}
