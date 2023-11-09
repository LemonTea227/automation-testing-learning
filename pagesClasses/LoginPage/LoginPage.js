const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class LoginPage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async clickSignup() {
        await this.clickBtn(selectors.signupBtn);
    }
    async clickLogin() {
        await this.clickBtn(selectors.loginBtn);
    }

    async verifyLoginPageSignup() {
        await this.waitForSelectorToBeVisible(selectors.signupHeader);
    }
    async verifyLoginPageLogin() {
        await this.waitForSelectorToBeVisible(selectors.loginHeader);
    }
    async verifyIncorrectLoginHeader() {
        // validate different selectors for different errors, return the text and check it in spec in case they are similar
        await this.waitForSelectorToBeVisible(selectors.incorrectLoginHeader);
    }
    async verifyEmailExistsSignupHeader() {
        await this.waitForSelectorToBeVisible(selectors.emailExistsSignupHeader);
    }

    async getSignup() {
        let retObj = {};
        let properties = ["username", "email"];
        let signupKey;
        for (let i = 0; i < properties.length; i++) {
            signupKey = properties[i];
            retObj[signupKey] = await this.getTypedValue(selectors[signupKey+'Signup']);
        }

        return retObj;
    }
    async getLogin() {
        let retObj = {};
        let properties = ["email", "password"];
        let loginKey;
        for (let i = 0; i < properties.length; i++) {
            const loginKey = properties[i];
            retObj[loginKey] = await this.getTypedValue(selectors[loginKey+'Login']);
        }

        return retObj;
    }
    async getUnregisteredInfo() {
        let retObj = {};
        let properties = ["email", "password"];
        let unregisteredLoginKey;
        for (let i = 0; i < properties.length; i++) {
            unregisteredLoginKey = properties[i];
            retObj[unregisteredLoginKey+'Incorrect'] = await this.getTypedValue(selectors[unregisteredLoginKey+'Login']);
        }

        return retObj;
    }
    async getSignupHeader() {
        return await this.getTrimmedText(selectors.signupHeader);
    }
    async getLoginHeader() {
        return await this.getTrimmedText(selectors.loginHeader);
    }
    async getIncorrectLoginHeader() {
        return await this.getTrimmedText(selectors.incorrectLoginHeader);
    }
    async getEmailExistsSignupHeader() {
        return await this.getTrimmedText(selectors.emailExistsSignupHeader);
    }


    // getExpectedSignup() {
    //     return {
    //         "username": args.username,
    //         "email": args.email
    //     };
    // }
    // getExpectedLogin() {
    //     return {
    //         "email": args.email,
    //         "password": args.password
    //     };
    // }
    // getExpectedSignupHeader() {
    //     return args.signupHeader;
    // }
    // getExpectedLoginHeader() {
    //     return args.loginHeader;
    // }
    // getExpectedIncorrectLoginHeader() {
    //     return args.incorrectLoginHeader;
    // }
    // getExpectedEmailExistsSignupHeader() {
    //     return args.emailExistsSignupHeader;
    // }
    // getExpectedLoginURL() {
    //     return args.loginURL;
    // }

    // add parameters
    async typeSignup(username = args.username, email = args.email) {
        await this.typeToSelector(selectors.usernameSignup, username);
        await this.typeToSelector(selectors.emailSignup, email);
    }

    // add parameters
    async typeLogin(email = args.email, password = args.password) {
        await this.typeToSelector(selectors.emailLogin, email);
        await this.typeToSelector(selectors.passwordLogin, password);
    }

    // make specific unregistered args and function for the incorrect user login spec
    async typeUnregisteredInfo(email = args.emailIncorrect, password = args.passwordIncorrect) {
        await this.typeToSelector(selectors.emailLogin, email);
        await this.typeToSelector(selectors.passwordLogin, password);
    }
}

module.exports = LoginPage;