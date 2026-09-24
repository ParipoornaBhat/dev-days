# Copilot CLI Workshop and Task Manager Summary

This file records the work completed for each exercise in this repository.

## Database setup

From the repository root:

```powershell
pnpm install
pnpm db:setup
```

`pnpm db:setup` applies the current Drizzle schema with `db:push`, then seeds the database with `db:seed`.

For a clean local database reset:

```powershell
pnpm db:reset
pnpm db:setup
```

The database commands require a valid `DATABASE_URL` in `.env`. The scaffold creates `.env` from `.env.example`; update the connection value before running database commands.

## Exercise 1 — Installing Copilot CLI

- Prepared the repository for Copilot CLI-driven development and verified the project-root workflow.
- Created the application workspace with the THUNDER Stack scaffold.
- Kept all project work inside `D:\Codes\Codes\dev-days`.

## Exercise 2 — Custom instructions

- Added `.github/copilot-instructions.md` with project context and coding standards.
- Added rules requiring TSDoc comments for exported functions and file-level purpose headers.
- Documented TypeScript, accessibility, testing, validation, and secret-handling expectations.

## Exercise 3 — Adding project features

- Built a local-first Task Manager at the Next.js root route `/`.
- Added task creation with title, description, priority, and due date.
- Added search, all/active/completed filters, completion toggles, deletion, counters, and localStorage persistence.

## Exercise 4 — Playwright MCP testing

- Started the Next.js app successfully at `http://localhost:3000` and confirmed an HTTP 200 response.
- Added accessible labels and state attributes to the interactive controls for browser testing.
- Full Playwright MCP testing was not executed because this environment does not have an active Playwright MCP session; the app is ready for testing once the server is registered.

## Exercise 5 — Agent skills

- Added `.github/skills/make-contribution/SKILL.md`.
- Documented validation-before-PR, logical commit grouping, PR body requirements, and secret exclusion.
- Created the local feature commit `Build local-first task manager app`.

## Exercise 6 — Custom agents

- Added `.github/agents/accessibility.md` with WCAG, keyboard, contrast, semantics, and testing guidance.
- Implemented a persisted high-contrast mode toggle.
- Added high-contrast CSS variables while preserving the existing light and dark themes.

## Exercise 7 — Slash commands

- Prepared the repository for `/diff`, `/review`, `/context`, `/compact`, `/model`, `/session`, `/share`, and `/delegate`.
- `/delegate` and `/share gist` require an authenticated Copilot/GitHub session and were not run here.
- The project can be reviewed locally with `git diff` and the validation commands below.

## Exercise 8 — Optional Microsoft Foundry series

- Not executed because it requires Azure authentication, a Foundry project, model deployment, and billable cloud resources.
- No Azure resources, credentials, tokens, or Foundry configuration were created.
- The current application is a Task Manager and does not contain the Tailspin Toys catalog required by that optional series.

## Exercise 9 — Review and next steps

- Added this consolidated workshop record and database setup instructions.
- Verified the Next.js typecheck and production build.
- The next practical steps are to configure Playwright MCP, run browser checks, and connect a populated GitHub remote if a PR is required.

## Validation completed

```powershell
pnpm --filter nextjs typecheck
pnpm --filter nextjs build
git diff --check
```

