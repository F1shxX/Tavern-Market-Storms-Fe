# market-target-data Specification

## MODIFIED Requirements

### Requirement: Frontend mock market data MUST include temporary stock list

The frontend demo MUST include the 36 temporary stocks provided for the current product planning stage.

#### Scenario: User opens market page

- **GIVEN** the user opens the market page
- **WHEN** the market list is rendered
- **THEN** the list includes `豆豆农场`
- **AND** includes `俺的你男装`
- **AND** includes `野炊夜店`
- **AND** the user can scroll through the full list

### Requirement: Existing trading flow MUST continue to work

The frontend demo MUST preserve buy and sell behavior after replacing market target data.

#### Scenario: User trades a temporary stock

- **GIVEN** the user opens a stock detail page from the market list
- **WHEN** the user buys shares and then sells shares
- **THEN** the balance, holdings, and ranking flows continue to update without errors
