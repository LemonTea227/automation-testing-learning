const puppeteer = require('puppeteer');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const ContactUsPage = require('../pagesClasses/ContactUsPage/ContactUsPage.js');
const SubmittedContactUsPage = require('../pagesClasses/SubmittedContactUsPage/SubmittedContactUsPage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;


describe('TC6 - Contact us', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {ContactUsPage} */
    let contactUsPage;
    /** @type {SubmittedContactUsPage} */
    let submittedContactUsPage;
    /** @type {HomePage} */
    let homePage;

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();
        contactUsPage = new ContactUsPage(page);
        submittedContactUsPage = new SubmittedContactUsPage(page);
        homePage = new HomePage(page);
    }, MAX_SAFE_TIMEOUT)

    it('1st & 2nd - open the testing site', async () => {
        expect(basePage.browser).not.toBe(undefined);
        expect(basePage.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await homePage.verifyHomePage();

        //checks if url was added correctly
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Contact Us" button (filling username and gmail felids)', async () => {
        await basePage.goToContactUs();
        await contactUsPage.waitForLoad();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "GET IN TOUCH" is visible', async () => {
        await contactUsPage.verifyContactUsPage();

        expect(await contactUsPage.getContactUsHeader()).toBe(contactUsPage.args.contactUsHeader);

    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        await contactUsPage.typeContactUsFormInfo();

        let contactUsInfoObj = await contactUsPage.getContactUsFormInfo();

        for (let i = 0; i < Object.keys(contactUsInfoObj).length; i++) {
            expect(contactUsInfoObj[Object.keys(contactUsInfoObj)[i]]).toBe(contactUsPage.args[Object.keys(contactUsInfoObj)[i]]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('7th - Upload file', async () => {
        await contactUsPage.uploadFileToForm();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "Submit" button and, 9th - Click OK button', async () => {
        await contactUsPage.submitContactUsForm();
    }, MAX_SAFE_TIMEOUT)

    // it('9th - Click OK button', async () => {
    //     await contactUs.dialogSubmitAccept();
    // }, MAX_SAFE_TIMEOUT)

    it('10th - Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
        await submittedContactUsPage.verifySubmittedContactUsPage()

        expect(await submittedContactUsPage.getSuccessHeader()).toBe(submittedContactUsPage.args.successHeader);

    }, MAX_SAFE_TIMEOUT)


    it('11th - Click "Home" button and verify that landed to home page successfully', async () => {
        await submittedContactUsPage.clickHome();
        await homePage.verifyHomePage();

        //checks if url was added correctly
        expect(await basePage.getCurrentURL()).toBe(basePage.siteURL);

    }, MAX_SAFE_TIMEOUT)
    //await browser.close();
})
