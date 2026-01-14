Feature: DummyJSON Products - Create

  Scenario: Scenario_2 - Create a new product and validate response data
    When I create a new product with title "Test Product" description "Created via API test" price 123 brand "NEW_BRAND"
    Then the product creation should be successful
    And the created product response should match the request data
