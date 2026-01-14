Feature: Problem user cart

  Scenario: Problem user cannot reliably add item from product page
    Given I am on the login page
    When I log in as problem user

    When I open product "Sauce Labs Backpack"
    And I add the product to the cart from product page
    And I go to the cart

    Then cart should contain 0 items
