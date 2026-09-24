# Copilot CLI Workshop — Requested Work and Project Output

This file maps each exercise to what the lesson asked for and what was actually produced in this Task Manager project.

## Database setup

Run these commands from `D:\Codes\Codes\dev-days`:

```powershell
pnpm install
pnpm db:setup
```

`pnpm db:setup` runs `pnpm db:push` followed by `pnpm db:seed`. A valid `DATABASE_URL` must be configured in `.env`.

For a clean reset:

```powershell
pnpm db:reset
pnpm db:setup
```

## Exercise 1 — Installing Copilot CLI

**What the exercise asked:** Install and authenticate Copilot CLI, open the repository from its root, and prepare the project for the workshop.

**Project output:** The empty repository was scaffolded with `npx create-thunder-stack .`, creating a THUNDER Stack monorepo with a Next.js client, Expo client, Hono server, Drizzle database package, shared package, environment templates, and workspace scripts. Dependencies were installed successfully with pnpm.

## Exercise 2 — Custom instructions

**What the exercise asked:** Explore repository and path-scoped instruction files, generate a data helper, add project-wide documentation standards, and keep the instruction changes with the generated code.

**Project output:** Added `.github/copilot-instructions.md` containing project context, TypeScript conventions, accessibility guidance, testing rules, validation commands, TSDoc requirements, file-header requirements, and secret-handling rules. A Tailspin Toys `publishers.ts` helper was not created because this project is a Task Manager rather than the catalog application described by the lesson.

## Exercise 3 — Adding project features

**What the exercise asked:** Retrieve the filtering issue, plan the remaining data-layer and UI work, implement filtering, add tests, and review the resulting diff.

**Project output:** Implemented a local-first Task Manager in `client/nextjs/src/app/page.tsx` with task creation, descriptions, priorities, due dates, search, all/active/completed filters, completion toggles, deletion, counters, empty states, and browser localStorage persistence. The original Tailspin Toys game/category/publisher filtering feature was not applicable to this project.

## Exercise 4 — Playwright MCP testing

**What the exercise asked:** Register the Playwright MCP server, start the website, use a browser to test filtering, and report the observed results.

**Project output:** Started the Next.js app at `http://localhost:3000` and confirmed it returned HTTP 200. The Task Manager controls include accessible labels and state attributes suitable for browser testing. Full Playwright MCP testing was not completed because no active Playwright MCP session was available in this environment; the lesson’s Astro URL and game-filter scenarios do not exist in this project.

## Exercise 5 — Using agent skills

**What the exercise asked:** Inspect a contribution skill, run tests, create logical commits, push a branch, and open a pull request with the required sections.

**Project output:** Added `.github/skills/make-contribution/SKILL.md` with rules for validation, logical commits, PR content, changed-file summaries, implementation snippets, and secret exclusion. Created local commits `f5fdda6` and `4b97ca4`. No PR was opened because the configured GitHub remote is empty and has no usable default branch.

## Exercise 6 — Custom agents

**What the exercise asked:** Select an accessibility agent, review the site, implement persisted high-contrast mode, add end-to-end tests, and create a PR.

**Project output:** Added `.github/agents/accessibility.md` with WCAG, semantic HTML, keyboard navigation, focus, contrast, preference persistence, and testing guidance. Added a high-contrast toggle to the Task Manager with `aria-pressed` state and localStorage persistence, plus high-contrast CSS variables in `globals.css`. A PR and dedicated browser tests were not created because GitHub and Playwright MCP were unavailable.

## Exercise 7 — Slash commands

**What the exercise asked:** Use `/share`, `/context`, `/compact`, `/model`, and optionally `/delegate` to inspect, manage, share, or delegate the Copilot CLI session.

**Project output:** The repository is prepared for `/diff`, `/review`, `/context`, `/compact`, `/model`, `/session`, `/share`, and `/delegate`. No gist or cloud-agent task was created because those operations require an authenticated external Copilot/GitHub session.

## Exercise 8 — Optional Microsoft Foundry series

**What the exercise asked:** Set up Azure and Microsoft Foundry, export the Tailspin Toys catalog, deploy a model, build a hosted Backer Concierge, connect it through a secure proxy and chat widget, test it, and clean up Azure resources.

**Project output:** Not executed. This Task Manager project has no Tailspin Toys catalog, Foundry agent, Azure Functions proxy, or Astro chat widget. No Azure resources, credentials, tokens, or billable deployments were created.

## Exercise 9 — Review and next steps

**What the exercise asked:** Review the workshop, document useful slash commands and best practices, and identify practical next steps.

**Project output:** Added this consolidated mapping of lesson requirements to project results. The Task Manager was type-checked and production-built successfully, and formatting was checked with `git diff --check`.

## Validation completed

```powershell
pnpm --filter nextjs typecheck
pnpm --filter nextjs build
git diff --check
```

## Main project files produced

```text
client/nextjs/src/app/page.tsx       Task Manager UI and behavior
client/nextjs/src/app/globals.css    Theme and high-contrast styles
.github/copilot-instructions.md     Repository Copilot instructions
.github/skills/make-contribution/   Pull request workflow skill
.github/agents/accessibility.md     Accessibility custom agent
package.json                         Workspace and database commands
EXERCISES-SUMMARY.md                 This exercise-to-output summary
```
