# Token Export Guide (Figma)

Step-by-step guide for exporting tokens from Figma. For format and structure, see [TOKEN_EXPORT.md](./TOKEN_EXPORT.md).

## Prerequisites

- Edit access to the Figma file
- **Token Studio** or **Material Theme Builder** plugin

## Token Studio Settings

- **Token Format**: W3C DTCG (`$value` / `$type`)
- **Token set names** (exact):
  - `seacrets.online/Light`
  - `seacrets.online/Dark`
- **References**: Keep enabled (e.g. `{fontFamilies.roboto}` in typography)

## Export Steps

1. **Export**
   - Token Studio: Export → JSON (single file)
   - Material Theme Builder: Export → JSON (Generic / Design Tokens)

2. **Replace**
   - Replace `src/tokens/tokens.json` with the exported file
   - Ensure `seacrets.online/Light` and `seacrets.online/Dark` exist in `$metadata.tokenSetOrder`

3. **Build**
   ```bash
   npm run build-dictionary
   ```

4. **Verify**
   - Build completes without errors
   - Run `npm run dev` and check Storybook

## Optional: Figma Variables Theme Group

For design-side Light/Dark switching:

1. Add theme option `Light` → enable `seacrets.online/Light`, disable `seacrets.online/Dark`
2. Add theme option `Dark` → enable `seacrets.online/Dark`, disable `seacrets.online/Light`

## Troubleshooting

- **Broken references**: See [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md)
- **Validation errors**: Check `$metadata.tokenSetOrder` and token set names
