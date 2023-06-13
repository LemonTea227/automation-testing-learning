async function getElementText(page, element, selectorInElement = '') {
    if (selectorInElement === '') {
        return await page.evaluate((el) => el.value, elementHandle);
    }
    return await element.$eval(selectorInElement, (el) => el.textContent);
}

async function getLstOfSelector(page, selector) {
    await page.waitForSelector(selector);
    return await page.$$(selector);
}

async function getAttributeLst(page, selector, attribute) {
    await page.waitForSelector(selector);
    return await page.$$eval(selector, (elements, attribute) => {
        return elements.map((element) => element.getAttribute(attribute));
    }, attribute);
}

module.exports = { getElementText, getLstOfSelector, getAttributeLst }