const BasePage = require("../BasePage/BasePage");

class LoginPage extends BasePage {
    constructor() {
        this.conf = JSON.parse(fs.readFileSync('LoginPage/conf.json'));
    }

    async clickSignup() {
        await this.clickBtn(this.conf.selector.signupBtn);
    }
    async clickLogin() {
        await this.clickBtn(this.conf.selector.loginBtn);
    }


    async getSignup() {
        return {
            "username": await this.getTypedValue(this.conf.selector.usernameSignup),
            "email": await this.getTypedValue(this.conf.selector.emailSignup)
        };
    }
    async getLogin() {
        return {
            "email": await this.getTypedValue(this.conf.selector.emailLogin),
            "password": await this.getTypedValue(this.conf.selector.passwordLogin)
        };
    }
    async getSignupHeader() {
        return await this.getTrimmedText(this.conf.selector.signupHeader);
    }
    async getLoginHeader() {
        return await this.getTrimmedText(this.conf.selector.loginHeader);
    }


    getExpectedSignup() {
        return {
            "username": this.conf.args.username,
            "email": this.conf.args.email
        };
    }
    getExpectedLogin() {
        return {
            "email": this.conf.args.email,
            "password": this.conf.args.password
        };
    }
    getExpectedSignupHeader() {
        return this.conf.args.signupHeader;
    }
    getExpectedLoginHeader() {
        return this.conf.args.loginHeader;
    }

    async typeSignup() {
        await this.typeToSelector(this.conf.selector.username, this.conf.args.usernameSignup);
        await this.typeToSelector(this.conf.selector.email, this.conf.args.emailSignup);
    }
    async typeLogin() {
        await this.typeToSelector(this.conf.selector.username, this.conf.args.usernameSignup);
        await this.typeToSelector(this.conf.selector.email, this.conf.args.emailSignup);
    }
}