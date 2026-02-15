# MUI Component Backlog - Atomic Design

Consolidated backlog for Seacrets.Online design system. Components are classified by Atomic Design level and prioritized by waves for Login, Onboarding, Feed, and Navigation.

## Composition Rules (Hard)

| Level | Imports | Description |
|-------|---------|-------------|
| Atoms | None from design system | Primitives only |
| Molecules | Atoms only | Composed inputs, labels |
| Organisms | Atoms + Molecules | Forms, cards, lists |
| Templates | Organisms + layout | Page structure, no API logic |

## Naming Convention

- Component: `ComponentName.jsx`
- Stories: `ComponentName.stories.jsx`
- Tests: `ComponentName.test.jsx`
- Story title: `Atoms/Button`, `Molecules/TextField`, etc.

---

## Wave A - Login & Base Onboarding (Blockers)

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Button | Atom | Pending | Variants: filled, outlined, text |
| IconButton | Atom | Pending | |
| Checkbox | Atom | Pending | |
| Link | Atom | Pending | |
| Alert | Atom | Pending | Base alert |
| TextField | Molecule | Pending | Includes password toggle |
| AuthForm | Organism | Pending | Login form |
| LoginTemplate | Template | Pending | Auth layout |

---

## Wave B - Onboarding Extended

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Radio | Atom | Pending | |
| LinearProgress | Atom | Pending | |
| Divider | Atom | Pending | |
| Avatar | Atom | Pending | |
| RadioGroup/RadioLabel | Molecule | Pending | |
| Select | Molecule | Pending | |
| DatePicker | Molecule | Pending | Wrapper |
| Chip/Tag | Molecule | Pending | |
| Snackbar | Molecule | Pending | Wrapper |
| OnboardingStepTemplate | Template | Pending | Step layout |

---

## Wave C - Feed & List States

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| Skeleton | Atom | Pending | |
| Badge | Atom | Pending | |
| ListItem | Molecule | Pending | |
| Card/Post | Organism | Pending | |
| EmptyState | Organism | Pending | |
| ActionRow | Organism | Pending | |
| FeedTemplate | Template | Pending | |

---

## Wave D - Navigation & Structure

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| AppBar | Molecule/Organism | Pending | TopAppBar variants |
| Tabs | Molecule | Pending | |
| BottomNavigation | Organism | Pending | ADR-003 |
| ProfileTemplate | Template | Pending | |

---

## Wave E - Composed Flows

| Component | Level | Status | Notes |
|-----------|-------|--------|-------|
| SocialAuthRow | Organism | Pending | |
| Upload/Crop wrappers | Organism | Pending | |
| Multi-step forms | Organism/Template | Pending | |

---

## Component Locations

All components use Atomic Design paths: `src/components/atoms/`, `molecules/`, `organisms/`, `templates/`. Stories live under `src/stories/atoms/`, `molecules/`, `organisms/`, `templates/`.
