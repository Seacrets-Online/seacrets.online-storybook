# Figma Export Requirements for Style Dictionary

This document describes what must be included in the token export from Figma to ensure Style Dictionary builds successfully without errors.

## Pipeline: @tokens-studio/sd-transforms

The build uses [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms), the official Token Studio integration for Style Dictionary. It:

- Parses Token Studio single-file export (this repo validates `seacrets.online/Light` and `seacrets.online/Dark`)
- Aligns Token Studio token types to DTCG
- Handles typography and references when present

## Token Studio Compatibility (Required)

The repository includes a pre-build validation step in `scripts/build-dictionary.ts` to fail fast when token exports are incompatible.

- Required token format: **W3C DTCG** (`$value` / `$type`)
- Required token set names:
  - `seacrets.online/Light`
  - `seacrets.online/Dark`
- Required metadata: `"$metadata".tokenSetOrder` must include the same set names

If any rule is violated, `npm run build-dictionary` fails before Style Dictionary execution.

## Verification Checklist

After exporting from Figma and updating `src/tokens/tokens.json`:

1. Run `npm run build-dictionary` – must complete without errors
2. Broken references are treated as errors (`log.errors.brokenReferences: "error"`) – any unresolved ref will fail the build
3. Ensure all referenced base token indices exist (e.g. `lineHeights.24` if used)

## Expected Export Structure

```
seacrets/
  online/Light/
    Schemes/, Palettes/, ...   (colors)
    md/                        (optional: typography if exported)

  online/Dark/
    Schemes/, Palettes/, ...   (colors)
    md/                        (optional: typography if exported)
```

## Notes

- The build uses only `src/tokens/tokens.json` as source
- Broken references cause the build to fail (strict mode)
- Token name collisions are avoided by including theme in internal token names
