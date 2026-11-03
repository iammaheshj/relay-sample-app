# Agent instructions

Relay's agents read this file as the project's coding standards.

## Code
- TypeScript in strict mode. No `any`.
- List logic lives in `src/todos.ts` as pure functions. UI lives in `src/App.tsx`.
- Keep changes small and focused on the task. Don't reformat code you don't change.
- Use accessible markup: every input has a label, and buttons have names a screen reader can read.

## Tests
- Unit tests sit next to the code, as `src/<name>.test.ts`, using Vitest.
- Every change to `src/todos.ts` adds or updates unit tests.
- Playwright tests live in `e2e/`, one file per feature, and find elements by role and label, never by CSS class.
- Name each Playwright test after its acceptance criterion's scenario.

## Checks
- `npm run lint`, `npx tsc --noEmit`, `npm test` and `npm run e2e` must pass.
- Don't change files in `.github/`.
