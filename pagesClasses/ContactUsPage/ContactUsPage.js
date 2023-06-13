const BasePage = require("../BasePage/BasePage.js");
const { selectors, args } = require('./conf.json');

class ContactUsPage extends BasePage {
    constructor(page) {
        super();
        /** @type {puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async uploadFileToForm(pathToFile = args.filePath) {
        await this.uploadFile(selectors.fileInput, pathToFile);
    }
    async submitContactUsForm() {
        await this.submitForm(selectors.submitBtn);
    }
    async dialogSubmitAccept() {
        await this.dialogAccept();
    }
    
    async waitForLoad() {
        await this.page.waitForNetworkIdle();
    }

    // async dialogAccept() {
    //     await Promise.all([
    //         this.page.on('dialog', async dialog => {
    //             await dialog.accept();
    //         }),
    //         this.waitForLoad(), // check moving line to dialogAccept
    //     ])

    // }

    async submitForm(selector) {
        // await this.page.$eval(selector, element => element.click())

        await Promise.all([
            this.page.on('dialog', async dialog => {
                await dialog.accept();
            }),
            this.page.$eval(selector, element =>
                element.click()
            ),
            this.waitForLoad(),
        ]);
    }

    async verifyContactUsPage() {
        await this.waitForSelectorToBeVisible(selectors.contactUsHeader);
    }


    async getContactUsHeader() {
        return await this.getTrimmedText(selectors.contactUsHeader);
    }

    // getExpectedGetInTouchHeader() {
    //     return args.contactUsHeader;
    // }

    async getContactUsFormInfo() {
        let properties = ["fullName", "email", "subject", "message"];
        let retObj = {};
        let contactKey;
        for (let i = 0; i < properties.length; i++) {
            contactKey = properties[i];
            retObj[contactKey] = await this.getTypedValue(selectors[contactKey]);
        }

        return retObj;
    }
    // getExpectedContactUsFormInfo() {
    //     return {
    //         "name": args.fullName,
    //         "email": args.email,
    //         "subject": args.subject,
    //         "message": args.message
    //     };
    // }

    async typeContactUsFormInfo(defaultArgs = { fullName : args.fullName, email : args.email, subject : args.subject, message : args.message }) {
        let properties = ["fullName", "email", "subject", "message"];
        let contactKey;
        for (let i = 0; i < properties.length; i++) {
            contactKey = properties[i];
            await this.typeToSelector(selectors[contactKey], defaultArgs[contactKey]);
        }
    }
}

module.exports = ContactUsPage;