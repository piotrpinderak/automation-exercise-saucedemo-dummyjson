// ui/steps/session.steps.js
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

const productsPage = new ProductsPage();

When('I log out', () => {
  productsPage.logout();
});

Then('I should see login page', () => {
  LoginPage.shouldBeVisible();
});

module.exports = {};
