const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');
const SignupPage = require('../pagesClasses/SignupPage/SignupPage.js');
const AccountCreatedPage = require('../pagesClasses/AccountCreatedPage/AccountCreatedPage.js');
const DeleteAccountPage = require('../pagesClasses/DeleteAccountPage/DeleteAccountPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';

describe('TC1 - Register User', () => {
    let base;
    let page;
    let login;
    let signup;
    let accountCreated;
    let deletedAccount;

    beforeAll(async () => {
        base = new BasePage();
        page = await base.openSite();
        login = new LoginPage(page);
        signup = new SignupPage(page);
        accountCreated = new AccountCreatedPage(page);
        deletedAccount = new DeleteAccountPage(page);
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

    it('4th - Click on "Signup/Login" button (filling username and gmail felids)', async () => {
        //enter window login/signup
        await base.goToSignupLogin();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "New User Signup!" is visible', async () => {
        //wait for signup to load and checks if loaded successfully
        await login.verifySignupHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await login.getSignupHeader()).toEqual(login.getExpectedSignupHeader());
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter name and email address', async () => {
        //enter username and password for signup
        await login.typeSignup();

        //test if the text entered correctly
        expect(await login.getSignup()).toEqual(login.getExpectedSignup());


    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Signup" button', async () => {
        //signup user you entered
        await login.clickSignup(); //click signup button

    }, MAX_SAFE_TIMEOUT)


    it('8th - Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
        await signup.verifySignupHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await signup.getSignupHeader()).toBe(signup.getExpectedSignupHeader());
    }, MAX_SAFE_TIMEOUT)

    it('9th - Fill details: Title, Name, Email, Password, Date of birth', async () => {
        await signup.fillAccountInformation();
        expect(await signup.getAccountInformation()).toEqual(signup.getExpectedAccountInformation());

    }, MAX_SAFE_TIMEOUT)
    it('10th - Select checkbox "Sign up for our newsletter!"', async () => {
        await signup.checkNewsletter();
    }, MAX_SAFE_TIMEOUT)

    it('11th - Select checkbox "Receive special offers from our partners!"', async () => {
        await signup.checkOffers();
    }, MAX_SAFE_TIMEOUT)

    it('12th - Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
        await signup.fillAddressInformation();
        expect(await signup.getAddressInformation()).toEqual(signup.getExpectedAddressInformation());
    }, MAX_SAFE_TIMEOUT)

    it('13th - Click "Create Account" button', async () => {
        //signup user you entered
        await signup.clickCreateAccount()//click create account button

    }, MAX_SAFE_TIMEOUT)

    it('14th - Verify that "ACCOUNT CREATED!" is visible', async () => {
        await accountCreated.verifyAccountCreatedHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
       expect(await accountCreated.getAccountCreatedHeader()).toEqual(accountCreated.getExpectedAccountCreated());

    }, MAX_SAFE_TIMEOUT)

    it('15th - Click "Continue" button', async () => {
        await accountCreated.clickContinue();
    }, MAX_SAFE_TIMEOUT)

    it('16th - Verify that "Logged in as username" is visible', async () => {
        await base.verifyLoggedInAs()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await base.getLoggedInAs()).toBe(base.getExpectedLoggedInAs());

    }, MAX_SAFE_TIMEOUT)

    xit('17th - Click "Delete Account" button', async () => {
       await base.goToDeleteAccount();

    }, MAX_SAFE_TIMEOUT)

    xit('18th - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
       
        await deletedAccount.verifyDeleted()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await deletedAccount.getAccountDeletedHeader()).toBe(deletedAccount.getExpectedAccountDeleted());

        await deletedAccount.clickContinue();
    }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
