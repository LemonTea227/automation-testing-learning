const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');
const BasePage = require('../../BasePage/BasePage.js');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';



describe('TC6 - Contact us', () => {
    const userInfo = JSON.parse(fs.readFileSync('user-info.json'));
    const site = new BasePage();
    
    it('1st & 2nd - open the testing site', async () => {
        await site.openSite(true);

    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        site.waitForSelectorToBeVisible(site.conf.selector.signupLogin);

        //checks if url was added correctly
        let url = await site.getCurrentURL();
        expect(url).toBe(site.siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Signup/Login" button (filling username and gmail felids)', async () => {
        //enter window login/signup
       await site.clickBtn(site.conf.selector.signupLogin) // click login/signup button
    }, MAX_SAFE_TIMEOUT)

    
})
