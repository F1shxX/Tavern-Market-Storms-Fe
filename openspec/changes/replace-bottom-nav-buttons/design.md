## Context

The app is a mobile portrait static front-end. The bottom navigation is a fixed five-column control rendered by `renderNav()`. The supplied source images are rectangular PNGs with white canvas margins around the decorative button frame.

## Goals / Non-Goals

**Goals:**

- Use the supplied bottom button art for all five nav tabs.
- Keep each tab clickable and accessible by its Chinese label.
- Keep the nav fixed at the bottom without blocking content more than the current layout.
- Avoid visible white image backgrounds on the dark tavern UI.

**Non-Goals:**

- Changing the navigation destinations.
- Adding animation beyond a small selected-state treatment.
- Reworking the overall page layout.

## Decisions

- Store assets with ASCII names in `assets/nav/` to avoid URL encoding issues.
- Convert edge-connected white pixels to transparency and crop transparent margins before committing assets.
- Use `aria-label` on each nav button and empty `alt` text on the image so tests and screen readers use the intended tab label.
- Preserve a stable five-column grid and apply selected-state scale via transform only, so layout does not shift when the active tab changes.

## Risks / Trade-offs

- The buttons are detailed images and must be scaled down heavily on mobile. Mitigation: maximize available nav width, reduce gaps, and keep the source aspect ratio.
- Image buttons can make text tests brittle if accessible names are lost. Mitigation: use explicit `aria-label` and keep role-based Playwright checks.
