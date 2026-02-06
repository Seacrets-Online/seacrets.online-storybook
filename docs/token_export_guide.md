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

5. **Build CSS Tokens**
   - Run the build script to generate CSS variables using Style Dictionary:
     ```bash
     npm run tokens:build
     ```
   - This generates `src/styles/tokens.css` from the source JSON files.

6. **Verification**
   - Run Storybook (`npm run storybook`) and verify that components reflect the correct colors.

## Token Pipeline Architecture

- **Source of Truth**: `src/tokens/tokens.json` (Standard Design Tokens format)
- **Secondary Source**: `src/tokens/material-theme.json` (Material Theme Builder export)
- **Build Tool**: [Style Dictionary](https://styledictionary.com/)
- **Output**: `src/styles/tokens.css` (CSS Variables)

### How Style Dictionary Works

Style Dictionary is configured in `style-dictionary.config.js`. It reads all JSON files in `src/tokens/` and transforms them into standard CSS variables.

The pipeline implements:
- **Theme Support**: Automatically handles light and dark mode tokens.
- **Pure MD3**: Generates standard Material Design 3 CSS variables (e.g., `--md-sys-color-primary`).
- **Standard Compliance**: Follows the Design Tokens Community Group specification.

### Manual Rebuild

While tokens are automatically built during `npm run dev` and `npm run build`, you should run `npm run tokens:build` manually after updating any JSON file in `src/tokens/` to see the changes immediately in a running Storybook instance.
