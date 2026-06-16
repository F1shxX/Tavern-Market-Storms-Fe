## Context

The supplied bottom navigation art uses large cream glyphs, heavy dark outlines, glossy colored panels, carved dark wood frames, and gold trim. Existing app components use a warmer tavern palette, but many text elements are thinner and several buttons still look like generic blue/gold controls.

## Goals / Non-Goals

**Goals:**

- Apply a consistent cream-and-outline text treatment to headings and key labels.
- Make panels and tables feel closer to the carved wood/gold-frame style.
- Keep dense market and trading information readable on a 390px mobile viewport.
- Avoid changing interaction behavior or data.

**Non-Goals:**

- Replacing every component with image assets.
- Changing the bottom navigation images.
- Adding animations or new screens.

## Decisions

- Use CSS variables for cream fill and dark text outline colors so style changes remain centralized.
- Use `text-shadow` outlines instead of webfont dependencies, keeping the static GitHub Pages deployment simple.
- Keep table body text smaller and less outlined than hero text to preserve scan speed.
- Add stronger borders and inset highlights to panels rather than wrapping sections in new containers.

## Risks / Trade-offs

- Heavy outlines can reduce readability at small sizes. Mitigation: apply the full outline only to headings, buttons, and key numbers; table metadata stays compact.
- More saturated panels can feel busy. Mitigation: keep dark wood backgrounds and use color accents sparingly.
