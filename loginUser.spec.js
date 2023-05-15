const fs = require('fs');
const puppeteer = require('puppeteer');
const jasmine = require('jasmine');

const MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
const siteURL = 'https://automationexercise.com/';

async function openSite() {
    //open browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();
    // go to test site and wait for it to load fully
    await page.goto(siteURL, {
        waitUntil: 'networkidle0',
        timeout: 0
    });
    return [browser, page];
}

describe('TC2 - Login User with correct email and password', () => {
    let browser;
    let page;

    const userInfo = JSON.parse(fs.readFileSync('user-info.json'));

    // const usernameTag = "[data-qa='signup-name']";
    // const emailTag = "[data-qa='signup-email']";
    // const username = 'testTavor';
    // const email = 'testTavor@gmail.com';
    // const password

    it('1st & 2nd - open the testing site', async () => {
        const args = await openSite();
        browser = args[0];
        page = args[1];

        await page.setRequestInterception(true);
 
        const rejectRequestPattern = [
          "googlesyndication.com",
          "/*.doubleclick.net",
          "/*.amazon-adsystem.com",
          "/*.adnxs.com",
        ];
        const blockList = [];
       
        page.on("request", (request) => {
          if (rejectRequestPattern.find((pattern) => request.url().match(pattern))) {
            blockList.push(request.url());
            request.abort();
          } else request.continue();
        });
    }, MAX_SAFE_TIMEOUT)

    it('3rd - Verify that home page is visible successfully', async () => {
        //checks if the signup/login button is visible - indicator that the page loaded successfully
        await page.waitForSelector(".shop-menu .nav :nth-child(4)", {
            visible: true,
        })
            .then(() => {
                console.log('loaded successfully');
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        //checks if url was added correctly
        const url = await page.evaluate(() => document.location.href);
        expect(url).toBe(siteURL);
    }, MAX_SAFE_TIMEOUT)

    it('4th - Click on "Signup/Login" button (filling username and gmail felids)', async () => {
        //enter window login/signup
        await page.click('.shop-menu .nav :nth-child(4)'); // click login/signup button
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "Login to your account" is visible', async () => {
        let titleSelector = ".login-form h2";
        //wait for signup to load and checks if loaded successfully
        await page.waitForSelector(titleSelector, {
            visible: true,
        })
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });
        
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Login to your account');

    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        //enter username and password for signup
        await page.type(userInfo.login.emailLogin[1], userInfo.login.emailLogin[0]);//type username testName
        await page.type(userInfo.login.passwordLogin[1], userInfo.login.passwordLogin[0]); //type email test@gmail.com

        //test if the text entered correctly
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.login.emailLogin[1])))).toBe(userInfo.login.emailLogin[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.login.passwordLogin[1])))).toBe(userInfo.login.passwordLogin[0]);

    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Login" button', async () => {
        //login user you entered
        await page.click('[data-qa="login-button"]'); //click login button

    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Logged in as username" is visible', async () => {
        let titleSelector = '.shop-menu .nav :nth-child(10)';
        await page.waitForSelector(titleSelector, {
            visible: true,
        })
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Logged in as ' + userInfo.login.usernameSignup[0]);

    }, MAX_SAFE_TIMEOUT)

   
    it('9th - Click "Delete Account" button', async () => {
        await page.click('.fa-trash-o');

    }, MAX_SAFE_TIMEOUT)

    it('10h - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
        let titleSelector = '[data-qa="account-deleted"] b';
        //check if 'ENTER ACCOUNT INFORMATION' if visible
        await page.waitForSelector(titleSelector, {
            visible: true,
        })
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });

        //check if the text of 'ENTER ACCOUNT INFORMATION' is correct
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Account Deleted!');

        // await page.click('[data-qa="continue-button"]');
    }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
