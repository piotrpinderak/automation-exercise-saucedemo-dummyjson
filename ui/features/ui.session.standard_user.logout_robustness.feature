Feature: Standard user session robustness

  Scenario: User cannot access inventory page after logout
    Given I am on the login page
    And I log in as standard user
    Then I should be on the products page

    When I log out

    When I navigate directly to inventory page
    Then I should see login page