const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');
const {getElementText, getLstOfSelector, getAttributeLst} = require('../../usable/useCase.js');

class CartPage extends BasePage {
    constructor(page) {
        super();
        /** @type {Puppeteer.Page} */
        this.page = page;
        this.args = args
    }

    async verifyCartPage() {
        await this.waitForSelectorToBeVisible(selectors.ShoppingCartHeader);
    }

    async getShoppingCartHeader() {
        return await this.getTrimmedText(selectors.ShoppingCartHeader);
    }


    //verify that the list of elements contain at least 2 items
    async getProductLst() {
        return await getLstOfSelector(this.page, selectors.products);
    }

    // same with getting list and using index

    // async getCartDetails() {
    //     let properties = ["prices", "quantities", "totalPrices"];
    //     let names = ["price", "quantity", "totalPrice"];
    //     let retObj = {};

    //     //makes a list of product ids
    //     let dataProductIdLst = await this.getIDsLst();

    //     //makes an object of products properties by subjects
    //     let propertiesObj = {};
    //     for (let index = 0; index < properties.length; index++) {
    //         propertiesObj[properties[i]] = await this.page.$$eval(selectors[properties[j]], (elements) => {
    //             return elements.map((element) => element.textContent);
    //         });
    //     }

    //     //connects all to a single object
    //     for (let i = 0; i < dataProductIdLst.length; i++) {
    //         retObj[dataProductIdLst[i]] = {};
    //         for (let j = 0; j < properties.length; j++) {
    //             retObj[dataProductIdLst[i]][names[j]] = propertiesObj[properties[j]][i];
    //         }
    //     }
    //     return retObj;
    // }

    async getCartDetails() {
        const products = await this.getProductLst();
        // list of product ids
        const productIds = await this.getIDsLst();
        let productsDetails = {};

        for (let i = 0; i < products.length; i++) {
            productsDetails[productIds[i]] = {};
            productsDetails[productIds[i]]["price"] = await this.getPriceByID(productIds[i]);
            productsDetails[productIds[i]]["quantity"] = await this.getQuantityByID(productIds[i]);
            productsDetails[productIds[i]]["totalPrice"] = await this.getTotalPriceByID(productIds[i]);
        }

        return productsDetails;
    }

    async getPriceByID(id) {
        const products = await this.getProductLst();
        return await this.getPriceOfElement(Object.values(products)[Object.values(await this.getIDsLst()).indexOf(id.toString())]);
    }
    async getQuantityByID(id) {
        const products = await this.getProductLst();
        return await this.getQuantityOfElement(Object.values(products)[Object.values(await this.getIDsLst()).indexOf(id.toString())]);
    }
    async getTotalPriceByID(id) {
        const products = await this.getProductLst();
        return await this.getTotalPriceOfElement(Object.values(products)[Object.values(await this.getIDsLst()).indexOf(id.toString())]);
    }
    async getIDsLst() {
        return await getAttributeLst(this.page, selectors.deleteButtons, 'data-product-id'); //only delete buttons have the ids of the products
    }
    async getPriceOfElement(element) {
        return await getElementText(this.page, element, selectors.pricesOfProduct);
    }
    async getQuantityOfElement(element) {
        return await getElementText(this.page, element, selectors.quantitiesOfProduct);
    }
    async getTotalPriceOfElement(element) {
        return await getElementText(this.page, element, selectors.totalPricesOfProduct);
    }
}

module.exports = CartPage;