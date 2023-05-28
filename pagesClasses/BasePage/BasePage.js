const fs = require('fs');
const puppeteer = require('puppeteer');
const { selectors, args } = require('./conf.json');

class BasePage {
  constructor() {
    this.siteURL = 'https://automationexercise.com/';
    this.browser;
    this.page;
  }


  async openBrowser() {
    //open browser
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized']
    });
  }

  async goToSite() {
    await this.page.goto(this.siteURL, {
      waitUntil: 'networkidle0',
      timeout: 0
    });
  }

  async openSite(addAdBlocker = true) {
    //open browser
    await this.openBrowser();
    this.page = await this.browser.newPage();

    //if ad blocker is needed add ad blocker
    if (addAdBlocker) {
      await this.addAdBlocker();
    }

    // go to test site and wait for it to load fully
    await this.goToSite();

    return this.page;
  }

  async getCurrentURL() {
    return await this.page.evaluate(() => document.location.href);
  }

  async addAdBlocker() {
    await this.page.setRequestInterception(true);

    const rejectRequestPattern = [
      "googlesyndication.com",
      "/*.doubleclick.net",
      "/*.amazon-adsystem.com",
      "/*.adnxs.com",
    ];
    const blockList = [];

    this.page.on("request", (request) => {
      if (rejectRequestPattern.find((pattern) => request.url().match(pattern))) {
        blockList.push(request.url());
        request.abort();
      } else request.continue();
    });
  }

  async clickBtn(selector) {
    await this.page.click(selector);
  }

  async waitForSelectorToBeVisible(selector) {
    await this.page.waitForSelector(selector, {
      visible: true,
    })
      .then(() => {
        return true;
      })
      .catch(err => {
        return err;
      });
  }

  // async getSelected(selector) {
  //   return await await this.page.evaluate(x => x.value, (await page.$(selector)));
  // }

  async getTrimmedText(selector) {
    return (await this.getSelectorValue(selector)).trim();
  }

  async getSelectorValue(selector) {
    return await (await (await this.page.$(selector)).getProperty('textContent')).jsonValue();
  }

  async getTypedValue(selector) {
    return await this.page.evaluate(x => x.value, (await this.page.$(selector)));
  }

  async typeToSelector(selector, text) {
    await this.page.type(selector, text);
  }



  async homePageFromBtn() {
    await this.clickBtn(selectors.homeBtn);
  }
  async homePageFromLogo() {
    await this.clickBtn(selectors.homeLogo);
  }
  async goToProducts() {
    await this.clickBtn(selectors.products);
  }
  async goToCart() {
    await this.clickBtn(selectors.cart);
  }
  async goToSignupLogin() {
    await this.clickBtn(selectors.signupLogin);
  }
  async goToTestCases() {
    await this.clickBtn(selectors.testCases);
  }
  async goToAPITesting() {
    await this.clickBtn(selectors.APITesting);
  }
  async goToVideoTutorials() {
    await this.clickBtn(selectors.videoTutorials);
  }
  async goToContactUs() {
    await this.clickBtn(selectors.contactUs);
  }
  async goToLogout() {
    await this.clickBtn(selectors.logout);
  }
  async goToDeleteAccount() {
    await this.clickBtn(selectors.deleteAccount);
  }

  async waitForSignupLogin() {
    return await this.waitForSelectorToBeVisible(selectors.signupLogin);
  }

  async verifyLoggedInAs() {
    return await this.waitForSelectorToBeVisible(selectors.loggedAs);
  }

  async getLoggedInAs() {
    return await this.getTrimmedText(selectors.loggedAs);
  }
  getExpectedLoggedInAs() {
    return args.loggedAs;
  }
};

module.exports = BasePage; // 👈 Export class
