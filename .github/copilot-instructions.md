# Task Manager project guidance

This repository contains a THUNDER Stack monorepo with a Next.js task-management web app, a Hono API, and a Drizzle database package.

## Code standards

- Use strict TypeScript and existing workspace conventions.
- Keep the task manager fast, responsive, and usable on mobile and desktop.
- Prefer accessible semantic HTML, visible focus states, descriptive labels, and keyboard-friendly controls.
- Every exported function should have a TSDoc comment describing its purpose, parameters, and return value.
- Before imports or any code, add a comment block to the file that explains its purpose.
- Keep UI in the existing dark-mode-compatible design system and reuse Lucide icons where appropriate.
- Data-layer changes must include unit tests; user-facing behavior should include end-to-end coverage when practical.

## Validation

- Run `pnpm --filter nextjs typecheck` for TypeScript changes.
- Run `pnpm --filter nextjs build` before shipping web changes.
- Do not commit secrets or local environment files.
