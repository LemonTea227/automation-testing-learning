const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class ContactUsPage extends BasePage {
    constructor(page) {
        this.page = page;
    }

    async uploadFileToForm() {
        await this.uploadFile(selectors.fileInput, args.filePath);
    }
    async submitContactUsForm() {
        await this.submitForm(selectors.submitBtn);
    }
    async dialogSubmitAccept() {
        await this.dialogAccept();
    }
    async uploadFile(selector, pathToFile) {
        await (await this.page.$(selector)).uploadFile(pathToFile);
    }

    async dialogAccept() {
        await Promise.all([
            this.page.on('dialog', async dialog => {
                await dialog.accept();
            }),
            await page.waitForNetworkIdle(), // check moving line to dialogAccept
        ])

    }

    async submitForm(selector) {
        await Promise.all([
            page.$eval(selector, element =>
                element.click()
            )
        ]);
    }


    async getGetInTouchHeader() {
        return await this.getTrimmedText(selectors.contactUsHeader);
    }

    getExpectedGetInTouchHeader() {
        return args.contactUsHeader;
    }

    async getContactUsFormInfo() {
        return {
            "username": await this.getTypedValue(selectors.fullName),
            "email": await this.getTypedValue(selectors.email),
            "subject": await this.getTypedValue(selectors.subject),
            "message": await this.getTypedValue(selectors.message)
        };
    }
    getExpectedContactUsFormInfo() {
        return {
            "name": args.fullName,
            "email": args.email,
            "subject": args.subject,
            "message": args.message
        };
    }

    async typeContactUsFormInfo() {
        await this.typeToSelector(selectors.fullName, args.fullName);
        await this.typeToSelector(selectors.email, args.email);
        await this.typeToSelector(selectors.subject, args.subject);
        await this.typeToSelector(selectors.message, args.message);
    }
}

module.exports = ContactUsPage;