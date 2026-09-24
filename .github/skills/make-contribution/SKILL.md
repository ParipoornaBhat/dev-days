---
name: make-contribution
description: Use whenever changes need to be committed, pushed, or opened as a pull request. Ensure validation passes, commits are logically grouped, and the pull request explains the motivation, changed files, important snippets, and implementation details.
---

# Make a contribution

1. Inspect the worktree and review the complete diff before committing.
2. Run the smallest relevant typecheck, build, and test commands. Do not create a PR if required checks fail.
3. Keep commits focused and use clear imperative commit messages.
4. The pull request body must contain:
   - Why the change was made.
   - An overview of changed files.
   - Important code snippets or implementation notes.
   - A grouped summary of the changes.
   - Validation commands and their results.
5. Never include `.env`, credentials, generated secrets, or unrelated local changes.
