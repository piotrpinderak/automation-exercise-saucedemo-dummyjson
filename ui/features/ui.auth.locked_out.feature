Feature: Locked out user

  Scenario: Locked out user cannot log in
    Given I am on the login page
    When I log in as locked out user
    Then I should see locked out error