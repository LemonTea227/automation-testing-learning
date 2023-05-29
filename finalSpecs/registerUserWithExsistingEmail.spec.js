const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');

const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';

describe('TC5 - Register User with existing email', () => {
    let base;
    let page;
    let login;
    beforeAll(async () => {
        base = new BasePage();
        page = await base.openSite();
        login = new LoginPage(page);
        
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

    it('8th - Verify that "Email Address already exist!" is visible', async () => {
        await login.verifyEmailExistsSignupHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await login.getEmailExistsSignupHeader()).toBe(login.getExpectedEmailExistsSignupHeader());
    }, MAX_SAFE_TIMEOUT)

    // await browser.close();
})
