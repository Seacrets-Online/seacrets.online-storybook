# Token Export Standard

Single source of truth for exporting design tokens from Figma into this project. All token consumers follow this format.

## Format: W3C DTCG via Token Studio

- **Standard**: [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/) (`$value` / `$type`)
- **Export tool**: Token Studio (or any plugin that outputs Token Studio single-file format)
- **Source file**: `src/tokens/tokens.json` — **never edit manually**

## Required Structure

```
seacrets/
  online/Light/          # Light theme (required)
    Schemes/            # MD3 color scheme
    Palettes/           # Reference palettes
    State Layers/       # Hover/pressed overlays
    Extended Colors/    # Custom colors
    Surfaces/           # Surface tints
    md/                 # Typography (display, headline, body, label, title)

  online/Dark/          # Dark theme (required)
    (same structure)

  online/global/        # Theme-agnostic tokens
    spacing/            # 4, 8, 12, 16, 24, 32, 48, 64 (px)
```

**Metadata**: `$metadata.tokenSetOrder` must include `seacrets.online/Light` and `seacrets.online/Dark`.

## Export Flow

1. **Export from Figma**
   - Use Token Studio or Material Theme Builder (JSON export)
   - Output must be Token Studio single-file format with the structure above

2. **Replace source**
   ```bash
   # Replace src/tokens/tokens.json with exported file
   ```

3. **Build**
   ```bash
   npm run build-dictionary
   ```

4. **Verify**
   - Build must complete without errors (broken refs fail the build)
   - Run `npm run dev` and check Storybook

## Generated Outputs

| Output | Content |
|--------|---------|
| `src/style-dictionary-dist/theme.css` | CSS variables (`--md-sys-color-*`, `--md-sys-typography-*`) |
| `src/utils/colors.generated.ts` | Color tokens (light/dark) |
| `src/utils/typography.generated.ts` | Typography tokens |
| `src/utils/spacing.generated.ts` | Spacing tokens + MUI units |

## Manual Tokens (not in tokens.json)

| File | Purpose |
|------|---------|
| `src/utils/shapes.ts` | Border radius (corner-extra-small, corner-small, etc.) |

Shapes are hardcoded until Figma exports them. If you add shape tokens to `tokens.json` under `online/global/shapes`, extend the Style Dictionary config to generate `shapes.generated.ts`.

## Validation

`scripts/validate-token-studio-export.ts` runs before Style Dictionary and fails if:

- Root `seacrets` is missing
- `$metadata.tokenSetOrder` does not include `seacrets.online/Light` and `seacrets.online/Dark`

Style Dictionary itself fails on broken references (e.g. `{lineHeights.24}` when that token does not exist).

## References

- [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) — Validation details
- [mui-token-bridge.md](./mui-token-bridge.md) — Consuming tokens in MUI
- [token_export_guide.md](./token_export_guide.md) — Figma plugin steps
