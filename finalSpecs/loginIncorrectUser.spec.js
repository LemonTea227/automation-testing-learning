const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');

const BasePage = require('../pagesClasses/BasePage/BasePage.js');
const LoginPage = require('../pagesClasses/LoginPage/LoginPage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';


describe('TC3 - Login User with incorrect email and password', () => {
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

    it('8th - Verify that "Your email or password is incorrect!" is visible', async () => {
        await login.verifyIncorrectLoginHeader()
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect(await login.getIncorrectLoginHeader()).toBe(login.getExpectedIncorrectLoginHeader());

    }, MAX_SAFE_TIMEOUT)

    // await browser.close();
})
