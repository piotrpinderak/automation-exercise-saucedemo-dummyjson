Feature: DummyJSON Products - Delay robustness

  Scenario Outline: Scenario_4 - Products list behaves correctly with delay param
    When I get list of products with delay <delay>
    Then the delay request should behave correctly
    And the effective response time should be no longer than 1000 ms

    Examples:
      | delay |
      | 0     |
      | 5000  |
      | 6000  |