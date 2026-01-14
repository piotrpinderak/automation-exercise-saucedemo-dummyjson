// ui/steps/products.steps.js
const ProductsPage = require('../pages/ProductsPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');

const productsPage = new ProductsPage();
const productDetailsPage = new ProductDetailsPage();

Then('I should be on the products page', () => {
  productsPage.shouldBeVisible();
});

When('I add all items to the cart', () => {
  productsPage.addAllItemsToCart();
});

When('I go to the cart', () => {
  const { I } = inject();
  I.click('[data-test="shopping-cart-link"]');
});

When('I navigate directly to inventory page', () => {
  productsPage.open(); // /inventory.html
});

When('I sort products by name A to Z', () => {
  productsPage.sortByNameAsc();
});

Then('products should be sorted by name A to Z', async () => {
  await productsPage.shouldBeSortedByNameAsc();
});

When('I open product {string}', (name) => {
  productsPage.openProductByName(name);
});

When('I add the product to the cart from product page', () => {
  productDetailsPage.shouldBeVisible();
  productDetailsPage.addToCart();
});

When('I add product {string} to the cart', (name) => {
  productsPage.addItemToCartByName(name);
});

Then('cart badge should be {int}', (count) => {
  productsPage.shouldHaveCartBadge(count);
});

module.exports = {};
