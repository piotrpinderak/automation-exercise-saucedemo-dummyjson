// ui/pages/ProductsPage.js
const { I } = inject();

module.exports = class ProductsPage {
  // LOCATORS

  headerTitle = '.title';

  // products list
  inventoryItem = '[data-test="inventory-item"]';
  productName = '[data-test="inventory-item-name"]';
  sortDropdown = '[data-test="product-sort-container"]';

  // cart
  cartLink = '[data-test="shopping-cart-link"]';
  cartBadge = '[data-test="shopping-cart-badge"]';

  // burger menu
  burgerMenuButton = '[data-test="react-burger-menu-btn"], #react-burger-menu-btn';
  logoutLink = '[data-test="logout-sidebar-link"], #logout_sidebar_link';
  menuCloseButton = '[data-test="react-burger-cross-btn"], #react-burger-cross-btn';

  // buttons
  addToCartButton = 'button[data-test^="add-to-cart-"]';
  removeButton = 'button[data-test^="remove-"]';

  // ACT

  open() {
    I.amOnPage('/inventory.html');
  }

  goToCart() {
    I.click(this.cartLink);
  }

  sortByNameAsc() {
    I.selectOption(this.sortDropdown, 'az');
  }

  openProductByName(name) {
    I.click(name, this.productName);
  }

  addAllItemsToCart() {
    I.waitForElement(this.addToCartButton, 5);

    for (let i = 0; i < 6; i++) {
      I.click(this.addToCartButton);
      I.wait(0.1);
    }

    I.seeElement(this.cartBadge);
  }

  addItemToCartByName(name) {
    const item = locate(this.inventoryItem).withDescendant(
      locate(this.productName).withText(name)
    );
    I.click(this.addToCartButton, item);
  }

  openMenu() {
    I.waitForElement(this.burgerMenuButton, 5);
    I.click(this.burgerMenuButton);
  }

  logout() {
    this.openMenu();
    I.waitForElement(this.logoutLink, 5);
    I.click(this.logoutLink);

    I.waitForElement('[data-test="login-button"]', 5);
  }

  // ASSERT

  shouldBeVisible() {
    I.see('Products', this.headerTitle);
    I.seeElement(this.productName);
  }

  shouldHaveCartBadge(expectedCount) {
    I.seeElement(this.cartBadge);
    I.see(String(expectedCount), this.cartBadge);
  }

  async shouldBeSortedByNameAsc() {
    const names = await I.grabTextFromAll(this.productName);
    const normalized = names.map(n => n.trim());
    const sorted = [...normalized].sort((a, b) => a.localeCompare(b, 'en'));

    if (JSON.stringify(normalized) !== JSON.stringify(sorted)) {
      throw new Error(
        `Products are not sorted A->Z.\nActual: ${normalized.join(' | ')}\nExpected: ${sorted.join(' | ')}`
      );
    }
  }
};
