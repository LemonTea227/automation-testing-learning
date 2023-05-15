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

describe('TC6 - Contact us', () => {
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

    it('4th - Click on "Contact Us" button (filling username and gmail felids)', async () => {
        await page.click('.shop-menu .nav :nth-child(8)');
        await page.waitForNetworkIdle();
    }, MAX_SAFE_TIMEOUT)

    it('5th - Verify "GET IN TOUCH" is visible', async () => {
        let titleSelector = ".contact-form h2";
        
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
        
        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Get In Touch');

    }, MAX_SAFE_TIMEOUT)

    it('6th - Enter email and password', async () => {
        let subject = 'QA';
        let message = 'I love testing my automations in this site!';
        let fullName = userInfo.signup.firstName[0] + ' ' + userInfo.signup.lastName[0];

        await page.type("[data-qa='name']", fullName);
        await page.type("[data-qa='email']", userInfo.login.emailLogin[0]); 
        await page.type("[data-qa='subject']", subject); 
        await page.type("[data-qa='message']", message); 

        //test if the text entered correctly
        expect(await page.evaluate(x => x.value, (await page.$("[data-qa='name']")))).toBe(fullName);
        expect(await page.evaluate(x => x.value, (await page.$("[data-qa='email']")))).toBe(userInfo.login.emailLogin[0]);
        expect(await page.evaluate(x => x.value, (await page.$("[data-qa='subject']")))).toBe(subject);
        expect(await page.evaluate(x => x.value, (await page.$("[data-qa='message']")))).toBe(message);

    }, MAX_SAFE_TIMEOUT)

    it('7th - Upload file', async () => {
        await (await page.$("input[type=file]")).uploadFile("C:/Users/tavor's_tini_lapci/Pictures/Saved Pictures/a closer look.gif");
        
    }, MAX_SAFE_TIMEOUT)

    it('8th - Click "Submit" button and 9th - Click OK button', async () => {
        await Promise.all([
            page.$eval('input[type=submit]', element =>
              element.click()
            ),
            page.on('dialog', async dialog => {
                await dialog.accept();
            }),
            await page.waitForNetworkIdle(),
        ]);

        // await page.click('input[type=submit]');
        
        // await page.click('[data-qa="submit-button"]'); 
        // await page.waitForNavigation(); 

        // page.$eval('input[type=submit]', element =>
        //     element.click()
        // );
        // await page.waitForNavigation();
       
        // await (await page.$('[data-qa="submit-button"]')).submit(); 
        // await page.waitForNavigation(); 

        // await (await page.$('[data-qa="submit-button"]')).evaluate(submitForm => submitForm.submit());
        // await page.waitForNavigation();

        // await page.$eval('.contact-form', form => form.submit());

    }, MAX_SAFE_TIMEOUT)

    // it('9th - Click OK button', async () => {
    //     page.on('dialog', async dialog => {
    //         await dialog.accept();
    //     });
        

    // }, MAX_SAFE_TIMEOUT)

    it('10th -  Verify success message "Success! Your details have been submitted successfully." is visible', async () => {
        let titleSelector = '.status.alert.alert-success';
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

        expect((await (await (await page.$(titleSelector)).getProperty('textContent')).jsonValue()).trim()).toBe('Success! Your details have been submitted successfully.');

    }, MAX_SAFE_TIMEOUT)

   
    it('11th - Click "Home" button and verify that landed to home page successfully', async () => {
        await page.click('.btn.btn-success');

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
    //await browser.close();
})
