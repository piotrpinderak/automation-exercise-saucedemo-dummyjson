Feature: Standard user checkout - negative validation

  Scenario: Standard user cannot continue checkout without required information
    Given I am on the login page
    And I log in as standard user

    When I add all items to the cart
    And I go to the cart
    And I proceed to checkout

    When I continue checkout

    Then I should see checkout error "Error: First Name is required"