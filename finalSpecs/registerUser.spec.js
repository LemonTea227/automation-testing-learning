const puppeteer = require('puppeteer');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');
const SignupPage = require('../pagesClasses/SignupPage/SignupPage.js');
const AccountCreatedPage = require('../pagesClasses/AccountCreatedPage/AccountCreatedPage.js');
const DeleteAccountPage = require('../pagesClasses/DeleteAccountPage/DeleteAccountPage.js');
const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const HomePage = require('../pagesClasses/HomePage/HomePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;

describe('TC1 - Register User', () => {
    /** @type {BasePage} */
    let basePage;
    /** @type {puppeteer.Page} */
    let page;
    /** @type {LoginPage} */
    let loginPage;
    /** @type {SignupPage} */
    let signupPage;
    /** @type {AccountCreatedPage} */
    let accountCreatedPage;
    /** @type {DeleteAccountPage} */
    let deletedAccountPage;
    /** @type {HomePage} */
    let homePage;   

    beforeAll(async () => {
        basePage = new BasePage();
        page = await basePage.openSite();

        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        deletedAccountPage = new DeleteAccountPage(page);
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

    it('4th - Click on "Signup/Login" button (filling username and gmail felids)', async () => {
        //enter window login/signup
        await basePage.goToSignupLogin();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "New User Signup!" is visible', async () => {
        //wait for signup to load and checks if loaded successfully
        await loginPage.verifyLoginPageSignup();

        expect(await loginPage.getSignupHeader()).toEqual(loginPage.args.signupHeader);
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter name and email address', async () => {
        //enter username and password for signup
        await loginPage.typeSignup();
        let signupObj = await loginPage.getSignup();

        for (let i = 0; i < Object.keys(signupObj).length; i++) {
            expect(signupObj[Object.keys(signupObj)[i]]).toBe(loginPage.args[Object.keys(loginPage.args)[i]]);
        }

    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Signup" button', async () => {
        //signup user you entered
        await loginPage.clickSignup(); //click signup button

    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
        await signupPage.verifySignupPage()

        expect(await signupPage.getSignupHeader()).toBe(signupPage.args.signupHeader);
    }, MAX_SAFE_TIMEOUT)

    it('9th - Fill details: Title, Name, Email, Password, Date of birth', async () => {
        await signupPage.fillAccountInformation();
        let AccountInformationObj = await signupPage.getAccountInformation();
        let accountInfoKey;
        for (let i = 0; i < Object.keys(AccountInformationObj).length && Object.keys(AccountInformationObj)[i] !== "dateOfBirth"; i++) {
            accountInfoKey = Object.keys(AccountInformationObj)[i];
            expect(AccountInformationObj[accountInfoKey]).toBe(signupPage.args[accountInfoKey]);
        }
        let dateOfBirthKey;
        for (let i = 0; i < Object.keys(AccountInformationObj.dateOfBirth).length; i++) {
            dateOfBirthKey = Object.keys(AccountInformationObj.dateOfBirth)[i];
            expect(AccountInformationObj.dateOfBirth[dateOfBirthKey]).toBe(signupPage.args.dateOfBirth[dateOfBirthKey]);
        }

    }, MAX_SAFE_TIMEOUT)

    it('10th - Select checkbox "Sign up for our newsletter!"', async () => {
        await signupPage.checkNewsletter();
    }, MAX_SAFE_TIMEOUT)

    it('11th - Select checkbox "Receive special offers from our partners!"', async () => {
        await signupPage.checkOffers();
    }, MAX_SAFE_TIMEOUT)

    it('12th - Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
        await signupPage.fillAddressInformation();
        let addressInfo = await signupPage.getAddressInformation();
        let addressInfoKey;
        for (let i = 0; i < Object.keys(addressInfo).length; i++) {
            addressInfoKey = Object.keys(addressInfo)[i];
            expect(addressInfo[addressInfoKey]).toBe(signupPage.args[addressInfoKey]);
        }
    }, MAX_SAFE_TIMEOUT)

    it('13th - Click "Create Account" button', async () => {
        //signup user you entered
        await signupPage.clickCreateAccount()//click create account button

    }, MAX_SAFE_TIMEOUT)

    it('14th - Verify that "ACCOUNT CREATED!" is visible', async () => {
        await accountCreatedPage.verifyAccountCreatedPage();

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await accountCreatedPage.getAccountCreatedHeader()).toEqual(accountCreatedPage.args.AccountCreatedHeader);

    }, MAX_SAFE_TIMEOUT)

    it('15th - Click "Continue" button', async () => {
        await accountCreatedPage.clickContinue();
    }, MAX_SAFE_TIMEOUT)

    it('16th - Verify that "Logged in as username" is visible', async () => {
        await basePage.verifyLoggedInAs();

        expect(await basePage.getLoggedInAs()).toBe(basePage.args.loggedAs);

    }, MAX_SAFE_TIMEOUT)

    xit('17th - Click "Delete Account" button', async () => {
        await basePage.goToDeleteAccount();

    }, MAX_SAFE_TIMEOUT)

    xit('18th - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
        await deletedAccountPage.verifyDeleteAccountPage();

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect(await deletedAccountPage.getAccountDeletedHeader()).toBe(deletedAccountPage.args.AccountDeletedHeader);

        await deletedAccountPage.clickContinue();
    }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
