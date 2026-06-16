## Overview

Quantity validation should be centralized in helper functions so render, input changes, step buttons, and submit handlers use the same limits.

## Rules

- Buy maximum is based on available balance and current price including fee.
- Sell maximum is the current holding quantity.
- Manual input values are clamped after input/change.
- Step buttons apply the same clamp after adding or subtracting step size.
- Estimate labels are updated in-place without needing a full view rerender.

## Verification

- Fill buy quantity with a larger value and confirm estimated cost changes.
- Fill sell quantity above holding and confirm it clamps to holding.
- Use the plus button on sell and confirm it cannot exceed holding.
- Existing buy/sell flow still passes.
