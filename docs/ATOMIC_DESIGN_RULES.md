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
| Atoms | MUI primitives, React, no other design-system components |
| Molecules | Atoms only |
| Organisms | Atoms + Molecules |
| Templates | Organisms + layout primitives |

## Naming

- `ComponentName.jsx` - component file
- `ComponentName.stories.jsx` - Storybook stories
- `ComponentName.test.jsx` - tests
- Story title: `Atoms/Button`, `Molecules/TextField`, etc.

## Enforcement

- ESLint: no-restricted-imports can enforce molecule/organism import paths
- Code review: verify composition level before merge
