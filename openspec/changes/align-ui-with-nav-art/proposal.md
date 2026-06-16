## Why

The bottom navigation now uses custom tavern-style image buttons, but the rest of the UI still has mixed text and panel styling. The overall app should match the button art's heavy cream lettering, dark outline, gold trim, and colored fantasy-board look.

## What Changes

- Update global typography to use heavier cream text with dark outline shadows.
- Restyle headers, panels, tables, group cards, and action buttons to better match the bottom button art.
- Keep the existing mobile portrait layout and all current functionality.
- Update visual verification screenshots through the existing Playwright checks.

## Capabilities

### New Capabilities

- `nav-art-aligned-ui`: The app uses a consistent visual style derived from the supplied bottom navigation art.

### Modified Capabilities

- None.

## Impact

- Affected code: `styles.css`.
- No data, route, or backend changes.
