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

describe('TC5 - Register User with existing email', () => {
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

    it('5th - Verify "New User Signup!" is visible', async () => {
        //wait for signup to load and checks if loaded successfully
        await page.waitForSelector("[class='signup-form'] h2", {
            visible: true,
        })
            .then(() => {
                expect(true).toBe(true);
            })
            .catch(err => {
                console.log('>>>ERROR - ' + err);
                expect(true).toBe(false);
            });
    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter name and email address', async () => {
        //enter username and password for signup
        await page.type(userInfo.login.usernameSignup[1], userInfo.login.usernameSignup[0]);//type username testName
        await page.type(userInfo.login.emailSignup[1], userInfo.login.emailSignup[0]); //type email test@gmail.com

        //test if the text entered correctly
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.login.usernameSignup[1])))).toBe(userInfo.login.usernameSignup[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.login.emailSignup[1])))).toBe(userInfo.login.emailSignup[0]);

    }, MAX_SAFE_TIMEOUT)

    it('7th - Click "Signup" button', async () => {
        //signup user you entered
        await page.click('#form .container .row :nth-child(3) form button'); //click signup button

    }, MAX_SAFE_TIMEOUT)

    it('8th - Verify that "Email Address already exist!" is visible', async () => {
        let titleSelector = "form [style='color: red;']";
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

        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Email Address already exist!');
    }, MAX_SAFE_TIMEOUT)

    // await browser.close();
})
