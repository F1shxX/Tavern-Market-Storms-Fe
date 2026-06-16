## Why

The current bottom navigation still uses plain text buttons while the supplied UI assets provide custom tavern-style button art for each tab. Replacing the text buttons makes the demo match the requested visual direction more closely.

## What Changes

- Add processed bottom navigation button images for 交易, 行情, 持仓, 排名, and 社区.
- Render the bottom navigation as image buttons while preserving accessible button names.
- Update responsive nav styling so the five image buttons fit the mobile portrait viewport.
- Update verification to ensure the image nav renders and remains fixed at the bottom.

## Capabilities

### New Capabilities

- `bottom-nav-image-buttons`: The app displays the supplied image assets as bottom navigation buttons.

### Modified Capabilities

- None.

## Impact

- Affected code: `app.js`, `styles.css`, `scripts/verify-home-scroll.js`.
- Affected assets: new PNG files under `assets/nav/`.
- No backend or dependency changes.
