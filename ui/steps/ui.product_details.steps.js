// ui/pages/ProductDetailsPage.js
const { I } = inject();

module.exports = class ProductDetailsPage {
  // LOCATORS

  productTitle = '[data-test="inventory-item-name"]';

  addToCartButton = '[data-test^="add-to-cart"]';
  removeButton = '[data-test^="remove"]';

  cartLink = '[data-test="shopping-cart-link"]';

  // ASSERT
  shouldBeVisible() {
    I.seeElement(this.productTitle);
    I.seeElement(this.addToCartButton);
  }

  // ACT
  addToCart() {
    I.click(this.addToCartButton);
    
    I.waitForElement(this.removeButton, 5);
  }

  goToCart() {
    I.click(this.cartLink);
  }
};
