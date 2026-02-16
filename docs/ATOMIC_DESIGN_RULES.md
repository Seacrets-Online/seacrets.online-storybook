# Atomic Design Rules

## Folder Structure

```
src/components/
  atoms/       # Primitives - Button, IconButton, Checkbox, etc.
  molecules/   # Composed - TextField, Select, Chip, etc.
  organisms/   # Blocks - AuthForm, Card, EmptyState, etc.
  templates/   # Layout - LoginTemplate, FeedTemplate, etc.

src/stories/
  atoms/
  molecules/
  organisms/
  templates/
```

## Import Rules

| Level | Allowed Imports |
|-------|-----------------|
| Atoms | MUI primitives (`@mui/material`), React, no other design-system components |
| Molecules | Atoms only |
| Organisms | Atoms + Molecules |
| Templates | Organisms + layout primitives |

MUI imports are allowed at any level. The restriction applies to imports between design-system component levels (atoms, molecules, organisms, templates).

## Naming

- `ComponentName.tsx` - component file
- `ComponentName.stories.tsx` - Storybook stories
- `ComponentName.test.tsx` - tests
- Story title: `Atoms/Button`, `Molecules/TextField`, etc.

## Enforcement

- ESLint: no-restricted-imports can enforce molecule/organism import paths
- Code review: verify composition level before merge
