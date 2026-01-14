Feature: DummyJSON Products - Update

  Scenario: Scenario_3 - Update third product and validate unchanged fields
    When I get product with id 3
    And I update product with id 3 with new title "Funny updated title" and price 9999
    Then the update should be successful
    And response should match original product data where applicable
