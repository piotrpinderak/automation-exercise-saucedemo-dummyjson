// ui/steps/checkout.steps.js

const CheckoutInformationPage = require('../pages/CheckoutInformationPage.js');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage.js');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage.js');

const checkoutInformationPage = new CheckoutInformationPage();
const checkoutOverviewPage = new CheckoutOverviewPage();
const checkoutCompletePage = new CheckoutCompletePage();

When(
  'I enter checkout information {string} {string} {string}',
  (firstName, lastName, postalCode) => {
    checkoutInformationPage.fillForm({ firstName, lastName, postalCode });
  }
);

When('I continue checkout', () => {
  checkoutInformationPage.continue();
});

Then('I should see checkout error {string}', (message) => {
  checkoutInformationPage.shouldShowError(message);
});

Then('I should see checkout overview', () => {
  checkoutOverviewPage.shouldBeVisible();
});

Then('checkout overview should contain {int} items', (count) => {
  checkoutOverviewPage.shouldHaveItemsCount(count);
});

When('I finish checkout', () => {
  checkoutOverviewPage.finish();
});

Then('order should be completed successfully', () => {
  checkoutCompletePage.shouldConfirmOrder();
});

module.exports = {};
