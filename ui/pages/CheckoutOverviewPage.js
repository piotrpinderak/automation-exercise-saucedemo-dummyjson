// ui/pages/CheckoutOverviewPage.js
const { I } = inject();

module.exports = class CheckoutOverviewPage {
  // LOCATORS
  pageTitle = '.title';

  cartItem = '[data-test="inventory-item"]';
  itemName = '[data-test="inventory-item-name"]';
  itemPrice = '[data-test="inventory-item-price"]';
  itemQuantity = '[data-test="item-quantity"]';

  finishButton = '[data-test="finish"]';

  summarySubtotal = '[data-test="subtotal-label"]';
  summaryTax = '[data-test="tax-label"]';
  summaryTotal = '[data-test="total-label"]';

  // ASSERT
  shouldBeVisible() {
    I.see('Checkout: Overview', this.pageTitle);
    I.seeElement(this.cartItem);
    I.seeElement(this.finishButton);
  }

  shouldHaveItemsCount(expectedCount) {
    I.seeNumberOfElements(this.cartItem, expectedCount);
  }

  shouldContainOnlyItems(expectedNames) {
    expectedNames.forEach(name => I.see(name, this.itemName));
  }

  // ACT
  finish() {
    I.click(this.finishButton);
  }
};
