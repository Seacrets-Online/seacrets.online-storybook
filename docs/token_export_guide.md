# Token Export Guide (Material Design 3)

This guide documents the process for exporting design tokens (colors, typography) from Figma and updating them in the project code using the Style Dictionary pipeline.

## Prerequisites
- Edit access to the Figma file.
- **Material Theme Builder** plugin installed in Figma.

## Token Studio Settings (if you export with Tokens Studio)

This repository expects **W3C DTCG** token format.

- Set **Token Format = W3C DTCG** (`$value` / `$type`).
- Keep token set names exactly as:
  - `md/Light`
  - `md/Dark`
  - `Primitives/Mode 1`
- Keep token references/aliases enabled (for example `{fontFamilies.roboto}` in typography).
- Optional: define Theme Groups (for design-side workflows) so Light/Dark mapping is explicit when exporting Variables in Figma.

The token build validates these expectations before running Style Dictionary and fails fast when they are not met.

### Optional Theme Group Setup (Figma Variables workflow)

If your design team exports Variables from Token Studio, configure a Theme Group such as `Color Mode`:

1. Add theme option `Light` with `md/Light` enabled and `md/Dark` disabled.
2. Add theme option `Dark` with `md/Dark` enabled and `md/Light` disabled.
3. Keep `Primitives/Mode 1` enabled on both options when needed by your variable strategy.

This is optional for the code pipeline, but reduces ambiguity when exporting Light/Dark modes to Figma Variables.

## Export Steps

1. **Open the Plugin**
   - In Figma, press `Shift + I`, search for **"Material Theme Builder"** and run it.
   - Make sure you're on the `🎨 Foundations` or `🧩 Components` page.

2. **Verify the Theme**
   - Confirm that the "Source Color" is the brand pink (`#FF0061`).
   - Verify there are no pending changes (if the "Update" button appears enabled, click it).

3. **Generate the File**
   - Inside the plugin, click the **Export** button (download icon or "Export" text).
   - Select **JSON** format (Generic / Design Tokens).
   - The plugin will download a file (e.g., `material-theme.json`).

4. **Update the Repository**
   - Merge or replace tokens in `src/tokens/tokens.json` (the only source used by Style Dictionary).
   - Ensure `md/Light` and `md/Dark` themes include base tokens (fontFamilies, fontWeights, lineHeights, fontSize, letterSpacing) at the theme root.
   - Preserve the expected token set names and metadata ordering (`$metadata.tokenSetOrder`) used by this repository.

5. **Build Design Tokens**
   - Run the build script to generate tokens using Style Dictionary:
     ```bash
     npm run build-dictionary
     ```
   - This generates `src/style-dictionary-dist/theme.css` (CSS variables for light/dark).

6. **Verification**
   - Run `npm run build-dictionary` – it must complete without errors (broken references fail the build)
   - Review [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) if you see reference errors
   - Run Storybook (`npm run storybook`) and verify that components reflect the correct colors

## Token Pipeline Architecture

- **Source of Truth**: `src/tokens/tokens.json` (only file used by Style Dictionary). **NEVER edit this file manually; it is exported from Figma.**
- **Build Tool**: [Style Dictionary](https://styledictionary.com/) + [@tokens-studio/sd-transforms](https://github.com/tokens-studio/sd-transforms)
- **Output**: `src/style-dictionary-dist/theme.css` - CSS variables for light (`:root`) and dark (`[data-theme="dark"]`)

### How the Pipeline Works

The pipeline uses `@tokens-studio/sd-transforms` (official Token Studio integration) and Style Dictionary. The config reads `src/tokens/tokens.json`, runs the `tokens-studio` preprocessor and transform group, and outputs `theme.css`.

**Important**: sd-transforms handles Token Studio format parsing, DTCG type alignment, and typography when present. See [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) for export requirements.

The pipeline implements:
- **Theme Support**: Automatically handles light and dark mode tokens.
- **Standard Compliance**: Follows the Design Tokens Community Group specification.

### Using Tokens in Components

**CSS Variables (recommended):**
```css
.component {
  background-color: var(--md-sys-color-primary);
  color: var(--md-sys-color-on-primary);
}
```

MUI components use the theme from `createTheme.js`, which maps palette values to `var(--md-sys-color-*)`. See [mui-token-bridge.md](./mui-token-bridge.md).

### Manual Rebuild

While tokens are automatically built during `npm run dev` and `npm run build`, run `npm run build-dictionary` manually after updating `src/tokens/tokens.json` to see changes immediately in a running Storybook instance.
