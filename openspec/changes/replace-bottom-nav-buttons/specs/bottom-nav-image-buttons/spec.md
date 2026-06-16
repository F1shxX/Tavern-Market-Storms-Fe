## ADDED Requirements

### Requirement: Bottom navigation MUST use supplied image buttons

The app SHALL render the five bottom navigation tabs with the supplied button image assets.

#### Scenario: Home screen nav renders image buttons

- **WHEN** the user opens the app
- **THEN** the bottom navigation contains five image buttons
- **AND** each button is accessible by its Chinese tab label

### Requirement: Bottom image navigation MUST remain mobile friendly

The bottom navigation SHALL stay fixed near the viewport bottom and keep all five tabs within the mobile portrait app width.

#### Scenario: User views the app on mobile portrait

- **WHEN** the app renders at 390px by 844px
- **THEN** the bottom navigation is fixed near the viewport bottom
- **AND** the five image buttons do not overflow the app shell

### Requirement: Active tab MUST be visually distinguishable

The selected bottom navigation tab SHALL have a visible active state without changing the layout size.

#### Scenario: User changes tabs

- **WHEN** the user opens the market tab
- **THEN** the market image button is marked active
- **AND** the navigation layout does not shift
