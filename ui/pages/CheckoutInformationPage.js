// ui/pages/CheckoutInformationPage.js
const { I } = inject();

module.exports = class CheckoutInformationPage {
  // LOCATORS
  pageTitle = '[data-test="title"]';

  firstNameInput = '[data-test="firstName"]';
  lastNameInput = '[data-test="lastName"]';
  postalCodeInput = '[data-test="postalCode"]';

  continueButton = '[data-test="continue"]';
  cancelButton = '[data-test="cancel"]';

  errorMessage = '[data-test="error"]';

  // ACT
  fillForm({ firstName, lastName, postalCode }) {
    I.fillField(this.firstNameInput, firstName);
    I.fillField(this.lastNameInput, lastName);
    I.fillField(this.postalCodeInput, postalCode);
  }

  continue() {
    I.click(this.continueButton);
  }

  cancel() {
    I.click(this.cancelButton);
  }

  // ASSERT
  shouldBeVisible() {
    I.see('Checkout: Your Information', this.pageTitle);
    I.seeElement(this.firstNameInput);
    I.seeElement(this.lastNameInput);
    I.seeElement(this.postalCodeInput);
  }

  shouldShowError(expectedMessage) {
    I.see(expectedMessage, this.errorMessage);
  }
};