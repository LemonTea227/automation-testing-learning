const BasePage = require("../BasePage/BasePage");

class ContactUsPage extends BasePage {
    constructor() {
        this.conf = JSON.parse(fs.readFileSync('ContactUsPage/conf.json'));
    }

    async uploadFileToForm() {
        await this.uploadFile(this.conf.selector.fileInput, this.conf.args.filePath);
    }
    async submitContactUsForm() {
        await this.submitForm(this.conf.selector.submitBtn);
    }
    async dialogSubmitAccept() {
        await this.dialogAccept();
    }


    async getGetInTouchHeader() {
        return await this.getTrimmedText(this.conf.selector.contactUsHeader);
    }

    getExpectedGetInTouchHeader() {
        return this.conf.args.contactUsHeader;
    }

    async getContactUsFormInfo() {
        return {
            "username": await this.getTypedValue(this.conf.selector.fullName),
            "email": await this.getTypedValue(this.conf.selector.email),
            "subject": await this.getTypedValue(this.conf.selector.subject),
            "message": await this.getTypedValue(this.conf.selector.message)
        };
    }
    getExpectedContactUsFormInfo() {
        return {
            "name": this.conf.args.fullName,
            "email": this.conf.args.email,
            "subject": this.conf.args.subject,
            "message": this.conf.args.message
        };
    }

    async typeContactUsFormInfo() {
        await this.typeToSelector(this.conf.selector.fullName, this.conf.args.fullName);
        await this.typeToSelector(this.conf.selector.email, this.conf.args.email);
        await this.typeToSelector(this.conf.selector.subject, this.conf.args.subject);
        await this.typeToSelector(this.conf.selector.message, this.conf.args.message);
    }
}