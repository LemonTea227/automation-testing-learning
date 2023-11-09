const BasePage = require("../BasePage/BasePage");
const { selectors, args } = require('./conf.json');

class ProductDetailPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
        this.args = args;
    }

    async verifyProductDetailPage() {
        let properties = ["productNameHeader", "productCategoryHeader", "productPriceHeader", "productAvailabilityHeader", "productConditionHeader", "productBrandHeader"];
        let productKey;
        for (let i = 0; i < properties.length; i++) {
            productKey = properties[i];
            await this.waitForSelectorToBeVisible(selectors[productKey]);
        }
    }

    async getProductDetails() {
        let retObj = {};
        let properties = ["productNameHeader", "productCategoryHeader", "productPriceHeader", "productAvailabilityHeader", "productConditionHeader", "productBrandHeader"];
        let productKey;
        for (let i = 0; i < properties.length; i++) {
            productKey = properties[i];
            retObj[productKey] = await this.getTrimmedText(selectors[productKey]);
        }

        return retObj;
    }

    async changeProductQuantity(quantity = args.quantityOfProduct) {
        await this.clickBtn(selectors.productQuantityInput, { clickCount: 3 }) // Select all existing text in the element
        await this.typeToSelector(selectors.productQuantityInput, quantity.toString());
        return quantity;
    }

    async getQuantity() {
        return await this.getTypedValue(selectors.productQuantityInput);
    }

    async clickAddToCartBtn() {
        await this.clickBtn(selectors.addToCart);
    }

    async clickViewCart() {
        await this.waitForSelectorToBeVisible(selectors.viewCart);
        await this.clickBtn(selectors.viewCart);
    }

}

module.exports = ProductDetailPage;