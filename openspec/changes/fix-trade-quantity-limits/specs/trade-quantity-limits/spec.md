# trade-quantity-limits Specification

## MODIFIED Requirements

### Requirement: Trade estimates MUST update with quantity changes

The trade page MUST update estimated buy cost and estimated sell proceeds whenever the corresponding quantity input changes.

#### Scenario: User edits buy quantity

- **GIVEN** the user opens a stock trade page
- **WHEN** the user changes buy quantity from 10 to 20
- **THEN** estimated buy cost updates to match 20 shares including fee

#### Scenario: User edits sell quantity

- **GIVEN** the user opens a stock trade page with a holding
- **WHEN** the user changes sell quantity
- **THEN** estimated sell proceeds updates to match the clamped sell quantity after fee

### Requirement: Trade quantity inputs MUST enforce limits

The trade page MUST prevent invalid order quantities before submit.

#### Scenario: User attempts to sell more than holding

- **GIVEN** the user has 80 shares
- **WHEN** the user enters 90 shares in the sell quantity input
- **THEN** the input is clamped to 80
- **AND** estimated proceeds are calculated for 80 shares

#### Scenario: User steps sell quantity above holding

- **GIVEN** the user has 80 shares
- **WHEN** the user taps the sell plus button past 80
- **THEN** the sell quantity remains 80
