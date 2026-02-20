# Spacing rules (Figma)

Source: [Figma – PANTALLAS DE SEACRETS PASANTES](https://www.figma.com/design/66dpAkPGF6MZ6PeeDgqHaV/PANTALLAS-DE-SEACRETS-PASANTES?node-id=4352-4174) — Rules node.

## Levels

| Level        | Tokens (px) | Use case                          | Theme keys                    |
|-------------|-------------|------------------------------------|-------------------------------|
| **1 Compact**   | 4, 8        | Related items                      | `space4`, `space8`            |
| **2 Default**   | 12, 16, 24  | Component padding, standard gap   | `space12`, `space16`, `space24` |
| **3 Sectional** | 32, 48, 64  | Major breaks between sections     | `space32`, `space48`, `space64` |

## Usage in code

All values are in MUI spacing units (8px base). Use with `theme.spacing()`:

```ts
theme.spacing(theme.layout.space8)   // 8px  (compact)
theme.spacing(theme.layout.space16)  // 16px (default)
theme.spacing(theme.layout.space32)  // 32px (sectional)
```

Component overrides (buttons, icons, typography, dividers) already use these tokens via `createTheme.ts`.
