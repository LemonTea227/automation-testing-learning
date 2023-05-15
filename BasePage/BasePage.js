const fs = require('fs');
const puppeteer = require('puppeteer');

class BasePage {
  constructor() {
    this.siteURL = 'https://automationexercise.com/';
    this.conf = JSON.parse(fs.readFileSync('BasePage/conf.json'));
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

  async getTrimmedText(selector) {
    return await this.getSelectorValue(selector).trim();
  }

  async getSelectorValue(selector) {
    return await (await (await this.page.$(selector)).getProperty('textContent')).jsonValue();
  }

  async getTypedValue(selector) {
    return await this.page.evaluate(x => x.value, (await page.$(selector)));
  }

  async typeToSelector(selector, text) {
    await this.page.type(selector, text);
  }

  async uploadFile(selector, pathToFile) {
    await (await this.page.$(selector)).uploadFile(pathToFile);
  }

  async dialogAccept() {
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    })
  }

  async submitForm(selector) {
    await Promise.all([
      page.$eval('input[type=submit]', element =>
        element.click()
      ),
      await page.waitForNetworkIdle(), // check moving line to dialogAccept
    ]);
  }

  async BasePageFromBtn() {
    await this.clickBtn(this.conf.selector.homeBtn);
  }

  async BasePageFromLogo() {
    await this.clickBtn(this.conf.selector.homeLogo);
  }
};

module.exports = BasePage; // 👈 Export class
