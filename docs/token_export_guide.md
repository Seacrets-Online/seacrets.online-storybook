# Token Export Guide (Material Design 3)

This guide documents the process for exporting design tokens (colors, typography) from Figma and updating them in the project code using the Style Dictionary pipeline.

## Prerequisites
- Edit access to the Figma file.
- **Material Theme Builder** plugin installed in Figma.

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

- **Source of Truth**: `src/tokens/tokens.json` (only file used by Style Dictionary)
- **Build Tool**: [Style Dictionary](https://styledictionary.com/)
- **Output**: `src/style-dictionary-dist/theme.css` - CSS variables for light (`:root`) and dark (`[data-theme="dark"]`)

### How Style Dictionary Works

Style Dictionary is configured in `style-dictionary.config.js`. It reads `src/tokens/tokens.json` and transforms it into `theme.css`.

**Important**: A preprocessor (`style-dictionary-preprocessor.js`) adds missing base tokens and resolves typography references before the build. See [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) for export requirements.

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
