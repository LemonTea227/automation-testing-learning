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

describe('TC1 - Register User', () => {
    // let basePage = new BasePage
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

    it('8th - Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
        let titleSelector = "h2 b";
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
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Enter Account Information');
    }, MAX_SAFE_TIMEOUT)

    it('9th - Fill details: Title, Name, Email, Password, Date of birth', async () => {
        await page.click(userInfo.signup.title[1]); //click title button
        //expect to be clicked
        expect(await (await (await page.$(userInfo.signup.title[1])).getProperty('checked')).jsonValue()).toBeTruthy();

        //expect the username and gmail to be there and written correctly
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.username[1])))).toBe(userInfo.signup.username[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.email[1])))).toBe(userInfo.signup.email[0]);

        await page.type(userInfo.signup.password[1], userInfo.signup.password[0]); //fill password testTavor123$
        //expect the password to be typed
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.password[1])))).toBe(userInfo.signup.password[0]);

        //pick the date of birth
        await page.select(userInfo.signup.dateOfBirth.day[1], userInfo.signup.dateOfBirth.day[0]);
        await page.select(userInfo.signup.dateOfBirth.month[1], userInfo.signup.dateOfBirth.month[0]);
        await page.select(userInfo.signup.dateOfBirth.year[1], userInfo.signup.dateOfBirth.year[0]);
        //expect the date to be in the selectors
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.dateOfBirth.day[1])))).toBe(userInfo.signup.dateOfBirth.day[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.dateOfBirth.month[1])))).toBe(userInfo.signup.dateOfBirth.month[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.dateOfBirth.year[1])))).toBe(userInfo.signup.dateOfBirth.year[0]);

    }, MAX_SAFE_TIMEOUT)
    it('10th - Select checkbox "Sign up for our newsletter!"', async () => {
        let newsletter = '[id="newsletter"]';
        await page.click(newsletter); //click title button
        //expect to be checked
        expect(await (await (await page.$(newsletter)).getProperty('checked')).jsonValue()).toBeTruthy();

    }, MAX_SAFE_TIMEOUT)

    it('11th - Select checkbox "Receive special offers from our partners!"', async () => {
        let offers = '[id="optin"]';
        await page.click(offers); //click title button
        //expect to be checked
        expect(await (await (await page.$(offers)).getProperty('checked')).jsonValue()).toBeTruthy();

    }, MAX_SAFE_TIMEOUT)

    it('12th - Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number', async () => {
        await page.type(userInfo.signup.firstName[1], userInfo.signup.firstName[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.firstName[1])))).toBe(userInfo.signup.firstName[0]);

        await page.type(userInfo.signup.lastName[1], userInfo.signup.lastName[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.lastName[1])))).toBe(userInfo.signup.lastName[0]);

        await page.type(userInfo.signup.company[1], userInfo.signup.company[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.company[1])))).toBe(userInfo.signup.company[0]);

        await page.type(userInfo.signup.address[1], userInfo.signup.address[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.address[1])))).toBe(userInfo.signup.address[0]);

        await page.type(userInfo.signup.address2[1], userInfo.signup.address2[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.address2[1])))).toBe(userInfo.signup.address2[0]);

        await page.select(userInfo.signup.country[1], userInfo.signup.country[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.country[1])))).toBe(userInfo.signup.country[0]);

        await page.type(userInfo.signup.state[1], userInfo.signup.state[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.state[1])))).toBe(userInfo.signup.state[0]);

        await page.type(userInfo.signup.city[1], userInfo.signup.city[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.city[1])))).toBe(userInfo.signup.city[0]);

        await page.type(userInfo.signup.zipcode[1], userInfo.signup.zipcode[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.zipcode[1])))).toBe(userInfo.signup.zipcode[0]);

        await page.type(userInfo.signup.mobileNumber[1], userInfo.signup.mobileNumber[0]);
        expect(await page.evaluate(x => x.value, (await page.$(userInfo.signup.mobileNumber[1])))).toBe(userInfo.signup.mobileNumber[0]);

    }, MAX_SAFE_TIMEOUT)

    it('13th - Click "Create Account" button', async () => {
        //signup user you entered
        await page.click('[data-qa="create-account"]'); //click create account button

    }, MAX_SAFE_TIMEOUT)

    it('14th - Verify that "ACCOUNT CREATED!" is visible', async () => {
        let titleSelector = '[data-qa="account-created"]';
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
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Account Created!');

    }, MAX_SAFE_TIMEOUT)

    it('15th - Click "Continue" button', async () => {
        //signup user you entered
        await page.click('[data-qa="continue-button"]'); //click create account button

    }, MAX_SAFE_TIMEOUT)

    it('16th - Verify that "Logged in as username" is visible', async () => {
        let titleSelector = '.shop-menu .nav :nth-child(10)';
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
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Logged in as ' + userInfo.login.usernameSignup[0]);

    }, MAX_SAFE_TIMEOUT)

    it('17th - Click "Delete Account" button', async () => {
        await page.click('.fa-trash-o');

    }, MAX_SAFE_TIMEOUT)

    it('18th - Verify that "ACCOUNT DELETED!" is visible and click "Continue" button', async () => {
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

        await page.click('[data-qa="continue-button"]');
    }, MAX_SAFE_TIMEOUT)


    // await browser.close();
})
