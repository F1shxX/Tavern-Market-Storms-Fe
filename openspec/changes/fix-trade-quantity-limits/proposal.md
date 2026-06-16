## Why

The trade page estimate fields are rendered once and do not update when the user changes buy or sell quantity. Sell quantity can also be increased beyond the current holding, which lets the UI show an invalid order amount before submit.

## What Changes

- Recalculate estimated buy cost and sell proceeds whenever quantity changes.
- Clamp sell quantity to the current holding.
- Clamp buy quantity to the maximum affordable quantity for the current balance and price.
- Apply the same quantity limits to manual input, step buttons, and final submit.

## Impact

- Affected files:
  - `app.js`
  - verification scripts
- No backend/API changes.
- No dependency changes.
