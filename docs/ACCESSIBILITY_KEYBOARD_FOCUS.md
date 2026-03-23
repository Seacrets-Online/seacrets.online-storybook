# Keyboard Navigation & Focus Styles Guide

As part of the Seacrets Design System, accessibility (a11y) is a core requirement. This document outlines the standard rules for keyboard navigation and visual focus indicators across all components, ensuring compliance with WCAG 2.1 AA standards.

---

## 1. Focus Styles (Visual Indicators)

Users navigating via keyboard must always know exactly which element currently has focus.

### The Golden Rule
**Never use `outline: none;` or `outline: 0;` unless you are providing a custom, highly visible focus state as a replacement.**

### Standard Implementation
We rely on Material Design 3 (M3) and MUI's default focus behaviors, but when creating custom components or overriding styles, adhere to these rules:

* **Focus Ring:** Custom interactive elements must display a solid outline or ring.
* **Color Token:** Use `var(--md-sys-color-primary)` or a high-contrast equivalent for the focus ring.
* **Contrast Ratio:** The focus indicator must have a contrast ratio of at least **3:1** against the background color.
* **Offset:** Provide a slight gap (`outline-offset: 2px;`) between the element and the focus ring to ensure it doesn't blend into the component's border.
* **Focus-Visible:** Prefer the `:focus-visible` pseudo-class over `:focus`. This ensures the focus ring only appears for keyboard users and doesn't show up when a mouse user clicks a button.

---

## 2. Keyboard Navigation Rules

Components must respond predictably to standard keyboard interactions.

### General Navigation
* `Tab`: Moves focus to the **next** interactive element.
* `Shift + Tab`: Moves focus to the **previous** interactive element.

### Action Keys
* `Enter`: Activates Links (`<a>`) and Buttons (`<button>`).
* `Space`: Activates Buttons, and toggles states for Checkboxes, Switches, and Radio Buttons. *(Note: Space should also prevent the default browser scrolling behavior when used on an input).*

### Composite Components (Arrow Key Navigation)
For grouped elements (e.g., Radio Groups, Tabs, Menus, Select dropdowns), `Tab` should only enter and exit the group. Once inside the group, use arrow keys:
* `Arrow Down / Arrow Right`: Move to the next item in the group.
* `Arrow Up / Arrow Left`: Move to the previous item in the group.
* `Home / End`: (Optional but recommended) Move to the first or last item in the group.

### Dismissal
* `Escape`: Must close or dismiss transient UI elements such as Modals, Dialogs, Snackbars, Dropdowns, and Tooltips.

---

## 3. Focus Management (Modals & Dialogs)

When rendering overlays (Dialogs, Bottom Sheets, Modals), focus must be strictly managed to prevent users from interacting with the background page.

1.  **Focus Trapping:** Once a modal opens, pressing `Tab` must cycle focus *only* within the modal's interactive elements. Focus must not escape to the main page.
2.  **Initial Focus:** When a modal opens, automatically move focus to the most logical starting element (e.g., the first input field, or the "Close" button if it's purely informational).
3.  **Return Focus:** When the modal closes, focus **must** return to the exact element that originally triggered the modal to open.

---

## 4. Testing Focus

Before opening a PR, test your component manually:
1.  Click inside the Storybook canvas.
2.  Press `Tab` repeatedly to navigate through your component.
3.  Verify that the focus ring is clearly visible on every interactive element.
4.  Test `Enter`, `Space`, and `Escape` where applicable.