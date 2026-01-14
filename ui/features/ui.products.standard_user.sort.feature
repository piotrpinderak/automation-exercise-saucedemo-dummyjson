Feature: Products sorting

  Scenario: Sort products by name A to Z
    Given I am on the login page
    When I log in as standard user
    Then I should be on the products page
    When I sort products by name A to Z
    Then products should be sorted by name A to Z
