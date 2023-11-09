const puppeteer = require('puppeteer');
const { selectors, args } = require('./conf.json');

class BasePage {
  constructor() {
    this.siteURL = 'https://automationexercise.com/';
    this.browser;
    /** @type {puppeteer.Page} */
    this.page;
    this.args = args;
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

  async clickBtn(selector, properties = {}) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector, properties);
  }

  async waitForSelectorToBeVisible(selector) {
    await this.page.waitForSelector(selector, {
      visible: true,
    });
  }

  // async getSelected(selector) {
  //   return await await this.page.evaluate(x => x.value, (await page.$(selector)));
  // }

  async getTrimmedText(selector) {
    await this.page.waitForSelector(selector);
    return (await this.getSelectorValue(selector)).trim();
  }

  async getSelectorValue(selector) {
    await this.page.waitForSelector(selector);
    return await (await (await this.page.$(selector)).getProperty('textContent')).jsonValue();
  }

  async getTypedValue(selector) {
    await this.page.waitForSelector(selector);
    return await this.page.evaluate(x => x.value, (await this.page.$(selector)));
  }

  async typeToSelector(selector, text) {
    await this.page.waitForSelector(selector);
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

  // change verifies to the pages, no need expect because of the wait for selector
  // async verifyHomePage() {
  //   await this.waitForSelectorToBeVisible(selectors.signupLogin);
  // }

  async verifyLoggedInAs() {
    await this.waitForSelectorToBeVisible(selectors.loggedAs);
  }
 

  async getLoggedInAs() {
    return await this.getTrimmedText(selectors.loggedAs);
  }
  // getExpectedLoggedInAs() {
  //   return args.loggedAs;
  // }

  async scrollToSelector(selector) {
    await this.page.waitForSelector(selector);
    await this.page.evaluate(x => x.scrollIntoView(), (await this.page.$(selector)));
  }
  async scrollToSubscription() {
    await this.scrollToSelector(selectors.SubscriptionFooter);
  }

  async isSelectorInScreen(selector) {
    //checks if you can see the selector on the screen or if you need to scroll
    return await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    }, selector);
  }

  async isSubscriptionOnScreen() {
    return await this.isSelectorInScreen(selectors.SubscriptionFooter);
  }

  async verifySubscriptionHeader () {
    await this.waitForSelectorToBeVisible(selectors.SubscriptionHeader);
  }

  async typeEmailToSubscription(email = args.subscriptionEmail) {
    await this.typeToSelector(selectors.subscribeEmailInput, email);
  }
  async getTypedEmailFromSubscription() {
    return await this.getTypedValue(selectors.subscribeEmailInput);
  }

  async clickSubmitSubscriptionBtn() {
    await this.clickBtn(selectors.subscribeBtn);
  }
  async verifySubscriptionSuccessMessage() {
    await this.waitForSelectorToBeVisible(selectors.successSubscribeHeder);
  }

  async getSubscriptionHeader() {
    return await this.getTrimmedText(selectors.SubscriptionHeader);
  }
  async getSubscriptionSuccessMessageHeader() {
      return await this.getTrimmedText(selectors.successSubscribeHeder);
  }

  async uploadFile(selector, pathToFile) {
    await (await this.page.$(selector)).uploadFile(pathToFile);
}


};

module.exports = BasePage; // 👈 Export class
