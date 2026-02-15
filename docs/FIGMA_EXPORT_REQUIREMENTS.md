# Figma Export Requirements for Style Dictionary

This document describes what must be included in the token export from Figma to ensure Style Dictionary builds successfully without errors.

## Preprocessor Resolution

A preprocessor (`style-dictionary-preprocessor.js`) runs before the build and:

1. **Adds missing base tokens**: `paragraphSpacing`, `paragraphIndent`, `textCase`, `textDecoration` when absent
2. **Resolves typography references**: Replaces `{fontFamilies.roboto}`, `{fontWeights.roboto-0}`, etc. with actual values so Style Dictionary does not report broken references

Typography tokens use references like `{fontFamilies.roboto}` that Style Dictionary cannot resolve due to path structure. The preprocessor resolves them explicitly per theme (`md/Light`, `md/Dark`).

## Required Base Tokens

The following base tokens **must be included** in the export for each theme (Light and Dark) at the theme root (e.g. `md/Light.fontFamilies`, not `md/Light.md.fontFamilies`):

- `fontFamilies` (e.g. `roboto`)
- `fontWeights` (e.g. `roboto-0`, `roboto-1`, `roboto-2`)
- `lineHeights` (indices `0` through `29` as referenced by typography)
- `fontSize` (indices `0` through `10`)
- `letterSpacing` (indices `0` through `6`)

The preprocessor adds if missing: `paragraphSpacing.0`, `paragraphIndent.0`, `textCase.none`, `textDecoration.none`.

## Token Reference Structure

Typography tokens reference base tokens using: `{fontFamilies.roboto}`, `{fontWeights.roboto-0}`, `{lineHeights.N}`, `{fontSize.N}`, `{letterSpacing.N}`, etc. Base tokens live at the theme root (e.g. `md/Light.fontFamilies.roboto`).

## Verification Checklist

After exporting from Figma and updating `src/tokens/tokens.json`:

1. Run `npm run build-dictionary` – must complete without errors
2. Broken references are treated as errors (`log.errors.brokenReferences: "error"`) – any unresolved ref will fail the build
3. Ensure all referenced base token indices exist (e.g. `lineHeights.24` if used)

## Expected Export Structure

```
md/Light/
  md/
    display/, headline/, body/, label/, title/  (typography)
    ref/, sys/                                 (colors)
  fontFamilies/
  fontWeights/
  lineHeights/
  fontSize/
  letterSpacing/
  paragraphSpacing/   (preprocessor adds if missing)
  paragraphIndent/
  textCase/
  textDecoration/

md/Dark/
  md/
    ref/, sys/        (colors; typography may inherit from Light)
  [base tokens if different from Light]
```

## Notes

- The build uses only `src/tokens/tokens.json` as source
- Broken references cause the build to fail (strict mode)
- Token name collisions are avoided by including theme in internal token names
