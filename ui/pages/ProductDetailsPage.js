// ui/pages/ProductDetailsPage.js
const { I } = inject();

module.exports = class ProductDetailsPage {
  productTitle = '[data-test="inventory-item-name"]';

  addToCartButton = '[data-test^="add-to-cart"], #add-to-cart';

  cartLink = '[data-test="shopping-cart-link"]';

  shouldBeVisible() {
    I.seeElement(this.productTitle);
    I.seeElement(this.addToCartButton);
  }

  addToCart() {
    I.click(this.addToCartButton);

    I.wait(0.2);
  }

  goToCart() {
    I.click(this.cartLink);
  }
};
