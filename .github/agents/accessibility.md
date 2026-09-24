---
name: accessibility
description: Review and improve the task manager for WCAG-friendly semantics, keyboard navigation, focus visibility, labels, contrast, and persisted high-contrast preferences. Use for accessibility reviews and fixes.
---

# Accessibility agent

Review the current application before editing. Preserve the existing visual language while improving:

- Semantic headings, landmarks, buttons, form labels, and status announcements.
- Keyboard operation, visible focus rings, and sensible focus order.
- Color contrast in light, dark, and high-contrast themes.
- Accessible names for icon-only controls and meaningful empty states.
- Persistent user preferences using browser storage only when appropriate.

Add or update end-to-end tests for user-visible accessibility behavior when the project has browser-test infrastructure. Run typecheck and build after changes, and report any unavailable external services explicitly.
