const { I } = inject();

class LoginPage {
  fields = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
  };

  buttons = {
    login: '[data-test="login-button"]',
  };

  messages = {
    error: '[data-test="error"]',
  };

  headers = {
    products: '.title',
  };

  open() {
    I.amOnPage('/');
  }

  login(username, password) {
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.buttons.login);
  }

    shouldBeVisible() {
    I.seeElement(this.fields.username);
    I.seeElement(this.fields.password);
    I.seeElement(this.buttons.login);
  }

  assertLoginSuccessful() {
    I.see('Products', this.headers.products);
  }

  assertLoginFailed(message) {
    I.see(message, this.messages.error);
  }
}

module.exports = new LoginPage();
