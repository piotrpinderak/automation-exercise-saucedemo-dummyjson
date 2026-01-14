// ui/steps/login.steps.js
const LoginPage = require('../pages/LoginPage');
const users = require('../support/users');

Given('I am on the login page', () => {
  LoginPage.open();
});

When('I log in as standard user', () => {
  LoginPage.login(users.standard.username, users.standard.password);
});

When('I log in as locked out user', () => {
  LoginPage.login(users.locked.username, users.locked.password);
});

When('I log in with invalid credentials', () => {
  LoginPage.login('wrong_user', 'wrong_password');
});

When('I log in as problem user', () => {
  LoginPage.login(users.problem.username, users.problem.password);
});

Then('I should be logged in successfully', () => {
  LoginPage.assertLoginSuccessful();
});

Then('I should see login error message {string}', (message) => {
  LoginPage.assertLoginFailed(message);
});

Then('I should see locked out error', () => {
  LoginPage.assertLoginFailed('Epic sadface: Sorry, this user has been locked out.');
});

module.exports = {};
