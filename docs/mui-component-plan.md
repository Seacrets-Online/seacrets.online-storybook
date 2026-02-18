# MUI Component Backlog - Atomic Design

Consolidated backlog for Seacrets.Online design system. Components are classified by Atomic Design level and prioritized by waves for Login, Onboarding, Feed, and Navigation.

## Composition Rules (Hard)

| Level | Imports | Description |
|-------|---------|-------------|
| Atoms | None from design system; MUI (`@mui/material`) allowed | Primitives only |
| Molecules | Atoms only | Composed inputs, labels |
| Organisms | Atoms + Molecules | Forms, cards, lists |
| Templates | Organisms + layout | Page structure, no API logic |

MUI (`@mui/material`, `@mui/icons-material`) can be imported at any level. The restriction applies only to design-system component imports (atoms, molecules, organisms, templates).

## Naming Convention

- Component: `ComponentName.tsx`
- Stories: `ComponentName.stories.tsx`
- Tests: `ComponentName.test.tsx`
- Story title: `Atoms/Button`, `Molecules/TextField`, etc.

---

## Wave A - Login & Base Onboarding (Blockers)

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Button | Atom | Done | Variants: filled, outlined, text |
| IconButton | Atom | Done | |
| Icon | Atom | Done | |
| Text | Atom | Done | |
| Checkbox | Atom | Done | |
| Link | Atom | Done | |
| Alert | Atom | Done | Base alert |
| TextField | Molecule | Done | Includes password toggle |
| LegalLinks | Molecule | Done | |
| AuthForm | Organism | Done | Login form |
| LoginTemplate | Template | Done | Auth layout |

---

## Wave B - Onboarding Extended

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Radio | Atom | Done | |
| LinearProgress | Atom | Done | |
| Divider | Atom | Done | |
| Avatar | Atom | Done | |
| RadioGroup/RadioLabel | Molecule | Done | |
| Select | Molecule | Done | |
| DatePicker | Molecule | Done | Wrapper |
| Chip/Tag | Molecule | Done | |
| LabeledCheckbox | Molecule | Done | |
| Snackbar | Molecule | Done | Wrapper |
| OnboardingStepTemplate | Template | Done | Step layout |

---

## Wave C - Feed & List States

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Skeleton | Atom | Done | |
| Badge | Atom | Done | |
| ListItem | Molecule | Done | |
| Card/Post | Organism | Partial | Card implemented; Post-specific variant pending if needed |
| EmptyState | Organism | Done | |
| ActionRow | Organism | Done | |
| FeedTemplate | Template | Pending | |

---

## Wave D - Navigation & Structure

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| AppBar | Molecule/Organism | Done | TopAppBar variants |
| Tabs | Molecule | Done | |
| BottomNavigation | Organism | Done | ADR-003 |
| ProfileTemplate | Template | Pending | |

---

## Wave E - Composed Flows

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| SocialAuthRow | Organism | Done | |
| Upload/Crop wrappers | Organism | Partial | FileUpload implemented; crop wrapper pending |
| Multi-step forms | Organism/Template | Pending | |

---

## Component Locations

All components use Atomic Design paths: `src/components/atoms/`, `molecules/`, `organisms/`, `templates/`. Stories live under `src/stories/atoms/`, `molecules/`, `organisms/`, `templates/`.
