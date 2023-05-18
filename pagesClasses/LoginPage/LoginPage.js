const BasePage = require("../BasePage/BasePage.js");
const {selectors, args} = require('./conf.json');

class LoginPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
    }

    async clickSignup() {
        await this.clickBtn(selectors.signupBtn);
    }
    async clickLogin() {
        await this.clickBtn(selectors.loginBtn);
    }

    async verifySignupHeader() {
        return await this.waitForSelectorToBeVisible(selectors.signupHeader);
    }
    async verifyLoginHeader() {
        return await this.waitForSelectorToBeVisible(selectors.loginHeader);
    }


    async getSignup() {
        return {
            "username": await this.getTypedValue(selectors.usernameSignup),
            "email": await this.getTypedValue(selectors.emailSignup)
        };
    }
    async getLogin() {
        return {
            "email": await this.getTypedValue(selectors.emailLogin),
            "password": await this.getTypedValue(selectors.passwordLogin)
        };
    }
    async getSignupHeader() {
        return await this.getTrimmedText(selectors.signupHeader);
    }
    async getLoginHeader() {
        return await this.getTrimmedText(selectors.loginHeader);
    }


    getExpectedSignup() {
        return {
            "username": args.username,
            "email": args.email
        };
    }
    getExpectedLogin() {
        return {
            "email": args.email,
            "password": args.password
        };
    }
    getExpectedSignupHeader() {
        return args.signupHeader;
    }
    getExpectedLoginHeader() {
        return args.loginHeader;
    }

    async typeSignup() {
        await this.typeToSelector(selectors.usernameSignup, args.username);
        await this.typeToSelector(selectors.emailSignup, args.email);
    }
    async typeLogin() {
        await this.typeToSelector(selectors.usernameLogin, args.username);
        await this.typeToSelector(selectors.passwordLogin, args.password);
    }
}

module.exports = LoginPage;