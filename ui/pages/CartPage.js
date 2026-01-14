// ui/pages/CartPage.js
const { I } = inject();

module.exports = class CartPage {
  // LOCATORS
  cartList = '.cart_list';
  cartItem = '.cart_item';

  itemName = '.inventory_item_name';
  itemPrice = '.inventory_item_price';
  itemQuantity = '.cart_quantity';

  removeButton = 'button[data-test^="remove-"], button[id^="remove-"], button[name^="remove-"]';
  checkoutButton = '[data-test="checkout"]';

  // ACT 
  open() {
    I.amOnPage('/cart.html');
  }

  removeItemByIndex(index) {
    I.click(this.removeButton, locate(this.cartItem).at(index + 1));
  }

  goToCheckout() {
    I.click(this.checkoutButton);
  }

  // ASSERT
  shouldBeVisible() {
    I.seeElement(this.cartList);
    I.seeElement(this.cartItem);
  }

  shouldHaveItemsCount(expectedCount) {
    I.seeNumberOfElements(this.cartItem, expectedCount);
  }

  shouldContainOnlyItems(expectedNames) {
    expectedNames.forEach(name => {
      I.see(name, this.itemName);
    });
  }
};
