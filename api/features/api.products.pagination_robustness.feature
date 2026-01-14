Feature: DummyJSON Products - Pagination robustness

  Scenario: Scenario_5 - Products endpoint handles invalid pagination parameters gracefully
    When I get products total count
    And I get list of products with limit -1 and skip -10
    Then the request should not fail with server error
    And the response should be handled gracefully for negative pagination

    When I get list of products with limit -10 and skip -100
    Then the request should not fail with server error
    And the response should be handled gracefully for negative pagination

    When I get list of products with limit -100 and skip -100
    Then the request should not fail with server error
    And the response should be handled gracefully for negative pagination