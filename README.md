# Relay sample app

A small to-do app for demonstrating Relay end to end. Copy this folder into a new GitHub
repository, push it to `main`, and check the **Relay checks** workflow passes.

```bash
npm install
npm test
npm run e2e
```

The workflow uploads two artifacts that Relay reads: `relay-unit` (ESLint JSON and Vitest
JUnit) and `relay-e2e` (Playwright JUnit and HTML report). Any repository can work with
Relay by adding a workflow that uploads artifacts with the same names and files.
