const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');

const BasePage = require('../../pagesClasses/BasePage/BasePage.js');
const ContactUsPage = require('../../pagesClasses/ContactUsPage/ContactUsPage.js');
const SubmittedContactUsPage = require('../../pagesClasses/SubmittedContactUsPage/SubmittedContactUsPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';


describe('TC6 - Contact us', () => {
    let base;
    let page;
    let contactUs;
    let submittedContactUsPage;

    beforeAll(async () => {
        base = new BasePage();
        page = await base.openSite();
        contactUs = new ContactUsPage(page);
        submittedContactUsPage = new SubmittedContactUsPage(page);
    }, MAX_SAFE_TIMEOUT)

    it('1st & 2nd - open the testing site', async () => {
        expect(base.browser).not.toBe(undefined);
        expect(base.page).not.toBe(undefined);
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await base.waitForSignupLogin()
            .then(() => {
                //loaded successfully
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(false).toBe(true);
            });

        //checks if url was added correctly
        expect(await base.getCurrentURL()).toBe(base.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Contact Us" button (filling username and gmail felids)', async () => {
        await base.goToContactUs();
        await contactUs.waitForLoad();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "GET IN TOUCH" is visible', async () => {
        await contactUs.verifyGetInTouchHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await contactUs.getGetInTouchHeader()).toBe(contactUs.getExpectedGetInTouchHeader());

    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        await contactUs.typeContactUsFormInfo();

        //test if the text entered correctly
        expect(await contactUs.getContactUsFormInfo()).toEqual(contactUs.getExpectedContactUsFormInfo());


    }, MAX_SAFE_TIMEOUT)

    it('7th - Upload file', async () => {
        await contactUs.uploadFileToForm();

    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "Submit" button and, 9th - Click OK button', async () => {
        await contactUs.submitContactUsForm();
    }, MAX_SAFE_TIMEOUT)

    // it('9th - Click OK button', async () => {
    //     await contactUs.dialogSubmitAccept();
    // }, MAX_SAFE_TIMEOUT)

    it('10th -  Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
        await submittedContactUsPage.verifySuccessHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await submittedContactUsPage.getSuccessHeader()).toBe(submittedContactUsPage.getExpectedSuccessHeader());

    }, MAX_SAFE_TIMEOUT)


    it('11th - Click "Home" button and verify that landed to home page successfully', async () => {
        await submittedContactUsPage.clickHome();

        await base.verifySignupLoginBtn()
            .then(() => {
                console.log('loaded successfully');
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        //checks if url was added correctly
        expect(await base.getCurrentURL()).toBe(base.siteURL);

    }, MAX_SAFE_TIMEOUT)
    //await browser.close();
})
