// ui/steps/cart.steps.js

const CartPage = require('../pages/CartPage.js');

const cartPage = new CartPage();

Then('I should be on the cart page', () => {
  cartPage.shouldBeVisible();
});

When('I remove item number {int} from the cart', (index) => {
  cartPage.removeItemByIndex(index - 1);
});

When('I proceed to checkout', () => {
  cartPage.goToCheckout();
});

Then('cart should contain {int} items', (count) => {
  cartPage.shouldHaveItemsCount(count);
});

Then('cart should contain only following items:', (table) => {
  const expectedNames = table.rows.map(row => row[0]);
  cartPage.shouldContainOnlyItems(expectedNames);
});

Then('cart should contain only item {string}', (name) => {
  cartPage.shouldContainOnlyItems([name]);
});

module.exports = {};