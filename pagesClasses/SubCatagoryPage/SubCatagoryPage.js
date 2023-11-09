const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');
const { getLstOfSelector } = require('../../usable/useCase.js');

class SubCategoryPage extends BasePage {
    constructor(page) {
        super();
        /** @type {Puppeteer.Page} */
        this.page = page;
        this.args = args;
    }

    async getSubCategoryPageHeader() {
        return (await this.getTrimmedText(selectors.subCategoryPageHeader)).toLowerCase();
    }

    buildSubCategoryPageHeader(category, subCategory) {
        return (category + " - " + subCategory + " Products").toLowerCase();
    }



}

module.exports = SubCategoryPage;