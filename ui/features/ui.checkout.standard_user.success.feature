Feature: Checkout flow

  Scenario: Standard user completes purchase successfully
    Given I am on the login page
    And I log in as standard user

    When I add all items to the cart
    And I go to the cart
    And I remove item number 3 from the cart

    Then cart should contain 5 items

    When I proceed to checkout
    And I enter checkout information "Piotr" "Kowalski" "46-255"
    And I continue checkout

    Then I should see checkout overview
    And checkout overview should contain 5 items

    When I finish checkout

    Then order should be completed successfully
