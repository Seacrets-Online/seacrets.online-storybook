# Figma Export Requirements

Validation rules for token exports. Full standard: [TOKEN_EXPORT.md](./TOKEN_EXPORT.md).

## Pipeline

[@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms) + Style Dictionary. Validates before build via `scripts/validate-token-studio-export.ts`.

## Required

| Rule | Description |
|------|-------------|
| Format | W3C DTCG (`$value` / `$type`) |
| Token sets | `seacrets.online/Light`, `seacrets.online/Dark` |
| Metadata | `$metadata.tokenSetOrder` must include both sets |
| Root | `seacrets` object must exist |

## Validation

`npm run build-dictionary` fails if:

1. Validation script rejects the file (missing sets, wrong metadata)
2. Style Dictionary hits broken references (`log.errors.brokenReferences: "error"`)

## Expected Structure

```
seacrets/
  online/Light/    Schemes, Palettes, md (typography), ...
  online/Dark/     (same)
  online/global/   spacing (optional)
```

## Notes

- Single source: `src/tokens/tokens.json`
- Broken refs (e.g. `{lineHeights.24}` when missing) fail the build
- High/Medium Contrast themes exist in export but are not processed; only Light and Dark are used
