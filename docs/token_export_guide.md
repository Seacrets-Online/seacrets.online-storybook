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
   - Take the downloaded file and replace the existing file at:
     `src/tokens/material-theme.json`
   - **Note**: The file should be named `material-theme.json`.

5. **Build Design Tokens**
   - Run the build script to generate tokens using Style Dictionary:
     ```bash
     npm run build-dictionary
     ```
   - This generates:
     - `src/style-dictionary-dist/variables.scss` - SCSS variables for all tokens
     - `src/style-dictionary-dist/variables.js` - JavaScript tokens for colors
     - `src/styles/tokens.css` - CSS variables (legacy, used for typography/shapes/elevation)

6. **Verification**
   - Run `npm run build-dictionary` and check for any broken reference warnings
   - Review [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) if you see reference errors
   - Run Storybook (`npm run storybook`) and verify that components reflect the correct colors

## Token Pipeline Architecture

- **Source of Truth**: `src/tokens/tokens.json` (Standard Design Tokens format)
- **Secondary Source**: `src/tokens/material-theme.json` (Material Theme Builder export)
- **Build Tool**: [Style Dictionary](https://styledictionary.com/)
- **Output**: 
  - `src/style-dictionary-dist/variables.scss` - SCSS variables (all tokens)
  - `src/style-dictionary-dist/variables.js` - JavaScript tokens (colors only)
  - `src/styles/tokens.css` - CSS variables (legacy, typography/shapes/elevation)

### How Style Dictionary Works

Style Dictionary is configured in `style-dictionary.config.js` (JavaScript format to support preprocessors). It reads all JSON files in `src/tokens/**/*.json` and transforms them into multiple output formats.

**Important**: A preprocessor (`style-dictionary-preprocessor.js`) automatically adds missing base tokens that are referenced but not exported from Figma. See [FIGMA_EXPORT_REQUIREMENTS.md](./FIGMA_EXPORT_REQUIREMENTS.md) for details on what must be included in the export.

The pipeline implements:
- **Theme Support**: Automatically handles light and dark mode tokens.
- **Multiple Formats**: Generates SCSS variables, JavaScript tokens, and CSS variables.
- **Standard Compliance**: Follows the Design Tokens Community Group specification.

### Using Tokens in Components

**JavaScript Tokens (Recommended for colors):**
```javascript
import * as tokens from '../style-dictionary-dist/variables.js';

const styles = {
  backgroundColor: tokens.MdLightMdSysColorPrimary,
  color: tokens.MdLightMdSysColorOnPrimary,
};
```

**SCSS Variables:**
```scss
@import '../style-dictionary-dist/variables.scss';

.component {
  background-color: $token-md-light-md-sys-color-primary;
}
```

**CSS Variables (Legacy - for typography/shapes/elevation):**
```css
.component {
  font-family: var(--md-sys-typescale-body-large-font-family);
  border-radius: var(--md-sys-shape-corner-extra-small);
}
```

### Manual Rebuild

While tokens are automatically built during `npm run dev` and `npm run build`, you should run `npm run build-dictionary` manually after updating any JSON file in `src/tokens/` to see the changes immediately in a running Storybook instance.
