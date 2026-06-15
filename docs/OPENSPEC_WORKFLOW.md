# OpenSpec Workflow

## Rule

Future frontend changes must follow OpenSpec instead of one large AI-generated rewrite.

Use one proposal per module or focused change. Avoid bundling unrelated page, state, API, and styling work into one change.

## Standard Flow

1. Explore
   - Clarify the user goal.
   - Inspect existing code and docs.
   - Identify affected pages, state, components, and API assumptions.
   - Do not implement during exploration.

2. Propose
   - Create an OpenSpec change under `openspec/changes/<change-name>/`.
   - Include `proposal.md`, `design.md`, and `tasks.md`.
   - Keep the scope small enough to review and test.

3. Apply
   - Implement tasks one by one.
   - Update code and docs together.
   - Verify the touched workflow locally before committing.

4. Archive
   - After the change is complete and accepted, archive it with OpenSpec.
   - The archived record becomes project knowledge.

## Suggested Frontend Modules

Create separate proposals for:

- Mobile layout shell and navigation
- Home dashboard
- Market list and sorting
- Target detail and trend chart
- Buy/sell trading flow
- Holdings and profit/loss
- Ranking page
- Announcement page
- API integration
- Asset replacement and visual polish
- Douyin mini-game adaptation

## Commit Rule

Each accepted change should be committed and pushed to GitHub.

Recommended commit format:

```text
feat: add <module>
fix: correct <module issue>
docs: update <project document>
```

## Verification Rule

Every frontend change should include a practical verification step. For this demo, keep using:

```bash
npm run verify
node scripts/verify-home-scroll.js
```

Add new verification scripts when new workflows are added.

