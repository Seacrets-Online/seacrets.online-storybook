# UI Contribution Guide

Welcome to the Seacrets Design System! This guide outlines the standard workflow for developers adding or modifying UI components. 

For deep technical details, this guide references our core architectural documents.

---

## 1. Atomic Design & Composition Rules

We strictly follow the Atomic Design methodology[cite: 2, 6]. Every component belongs to a specific level, which dictates what it can import[cite: 2, 6]. MUI components (`@mui/material`) can be imported at any level[cite: 2, 6].

**Composition Rules:**
*   **Atoms:** Allowed to import MUI primitives and React, but no other design-system components[cite: 2].
*   **Molecules:** Allowed to import Atoms only[cite: 2].
*   **Organisms:** Allowed to import Atoms and Molecules[cite: 2].
*   **Templates:** Allowed to import Organisms and layout primitives[cite: 2].

**Deep Dive References:**
*   For strict structure, naming conventions, and allowed imports, read: **[Atomic Design Rules](./ATOMIC_DESIGN_RULES.md)**
*   To see our backlog by waves and component classifications, check: **[MUI Component Plan](./mui-component-plan.md)**

---

## 2. How to Add or Modify Components

All components use Atomic Design paths[cite: 6]. Follow this flow when working on a component:

1.  **Locate the Level:** Determine if it is an atom, molecule, organism, or template[cite: 2].
2.  **Create the Files:** Create the component in `src/components/atoms/`, `molecules/`, `organisms/`, or `templates/`[cite: 6].
3.  **Naming Convention:** Use `ComponentName.tsx` for the component file and `ComponentName.test.tsx` for tests[cite: 2, 6].
4.  **Add Stories:** Create the `.stories.tsx` file inside `src/stories/atoms/`, `molecules/`, `organisms/`, or `templates/`[cite: 2, 6].

---

## 3. Token Usage & MUI Bridge

We rely on a centralized Material Design 3 (M3) Token System generated via Style Dictionary[cite: 7]. Hardcoding values is strictly prohibited.

*   **CSS Variables:** Components can use CSS variables like `var(--md-sys-color-*)` and `--md-sys-typography-*` for custom styling[cite: 7].
*   **MUI Theme:** Component overrides should utilize the mapped theme defined in `src/theme/mui/createTheme.ts`[cite: 7].
*   **Theme Switching:** The `theme.css` file switches light and dark variables based on the `data-theme` attribute[cite: 7].
*   **Deep Dive:** For full architectural details on token consumption, read: **[MUI Token Bridge](./mui-token-bridge.md)**

---

## 4. Storybook Guidance

Storybook is our single source of truth for UI development. When creating a component, you must include its `.stories.tsx` file[cite: 2, 6].

*   **Story Titles:** Use formats like `Atoms/Button` or `Molecules/TextField`[cite: 2, 6].
*   **Format:** Write stories using Component Story Format 3 (CSF3).
*   **Tags:** Include `tags: ['autodocs']` for auto-generated documentation, and `tags: ['test']` for CI/CD integration.
*   **States & Variants:** Your story must cover all states (e.g., base, `loading`, `disabled`, `error`).

---

## 5. Definition of Done (DoD) Checklist

Before submitting your Pull Request, ensure your component passes these Quality Gates:

- [ ] **Token System:** Uses `var(--md-sys-color-*)` or MUI Theme[cite: 7].
- [ ] **Composition:** Complies with strict Atomic Design import restrictions[cite: 2, 6].
- [ ] **M3 States:** Interactive states align with Material 3 guidelines.
- [ ] **Accessibility (a11y):** Passes contrast checks and uses proper semantic HTML.
- [ ] **Stories:** CSF3 stories cover all variants and interactive states.
- [ ] **Tests:** Unit tests (`ComponentName.test.tsx`) pass successfully[cite: 2, 6].
- [ ] **Chromatic Baseline:** Visual regression checks are approved in Chromatic.