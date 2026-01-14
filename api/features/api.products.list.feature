Feature: DummyJSON Products - List

  Scenario: Scenario_1 - Get products and print titles for odd IDs
    When I get a list of all products
    Then the request should be successful
    And I print titles of products with odd IDs