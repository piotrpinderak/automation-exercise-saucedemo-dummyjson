// ui/pages/CheckoutCompletePage.js
const { I } = inject();

module.exports = class CheckoutCompletePage {
  // LOCATORS
  pageTitle = '.title';

  completeHeader = '[data-test="complete-header"]';
  completeText = '[data-test="complete-text"]';
  backHomeButton = '[data-test="back-to-products"]';

  // ASSERT
  shouldConfirmOrder() {
    I.see('Checkout: Complete!', this.pageTitle);
    I.see('Thank you for your order!', this.completeHeader);
    I.seeElement(this.completeText);
    I.seeElement(this.backHomeButton);
  }
};