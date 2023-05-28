const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');

const BasePage = require('../../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../../pagesClasses/LoginPage/LoginPage.js');
const DeleteAccountPage = require('../../pagesClasses/DeleteAccountPage/DeleteAccountPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';

describe('TC2 - Login User with correct email and password', () => {
    let base;
    let page;
    let login;
    let deletedAccount;

    beforeAll(async () => {
        base = new BasePage();
        page = await base.openSite();
        login = new LoginPage(page);
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

    it('5th - Verify "Login to your account" is visible', async () => {
        await login.verifyLoginHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await login.getLoginHeader()).toBe(login.getExpectedLoginHeader());

    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        await login.typeLogin();

        //test if the text entered correctly
        expect(await login.getLogin()).toEqual(login.getExpectedLogin());
    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Login" button', async () => {
        await login.clickLogin();
    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Logged in as username" is visible', async () => {
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

    it('9th - Click "Delete Account" button', async () => {
        await base.goToDeleteAccount();
 
     }, MAX_SAFE_TIMEOUT)
 
     it('10th - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
        
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
 
        //  await deletedAccount.clickContinue();
     }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
