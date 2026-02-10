# Figma Export Requirements for Style Dictionary

This document describes what must be included in the token export from Figma to ensure Style Dictionary builds successfully without errors.

## Current Issues

When exporting tokens from Figma using Material Theme Builder, there are two main problems:

1. **Missing Base Tokens**: Some base tokens are missing that are referenced by typography tokens
2. **Broken Token References**: Typography tokens reference base tokens using relative paths that don't resolve correctly in Style Dictionary's token structure

### Problem Explanation

Typography tokens use references like `{fontFamilies.roboto}`, but Style Dictionary resolves references relative to the token's location in the object hierarchy. 

For a token at path `md/Light/md/typescale/display/large`, Style Dictionary searches for `{fontFamilies.roboto}` by looking up the hierarchy:
- `md/Light/md/typescale/display/large/fontFamilies/roboto` ❌
- `md/Light/md/typescale/display/fontFamilies/roboto` ❌  
- `md/Light/md/typescale/fontFamilies/roboto` ❌
- `md/Light/md/fontFamilies/roboto` ✅ (should find it here)

However, Style Dictionary is not finding these tokens, suggesting the reference resolution algorithm may not be traversing correctly, or the references need to use absolute paths from the root.

## Required Base Tokens

The following base tokens **must be included** in the export from Figma for each theme (Light and Dark):

### 1. Paragraph Spacing
```json
{
  "md": {
    "paragraphSpacing": {
      "0": {
        "value": 0,
        "type": "paragraphSpacing"
      }
    }
  }
}
```

### 2. Paragraph Indent
```json
{
  "md": {
    "paragraphIndent": {
      "0": {
        "value": 0,
        "type": "paragraphIndent"
      }
    }
  }
}
```

### 3. Text Case
```json
{
  "md": {
    "textCase": {
      "none": {
        "value": "none",
        "type": "textCase"
      }
    }
  }
}
```

### 4. Text Decoration
```json
{
  "md": {
    "textDecoration": {
      "none": {
        "value": "none",
        "type": "textDecoration"
      }
    }
  }
}
```

## Token Reference Structure

Typography tokens reference base tokens using the following pattern:
- `{fontFamilies.roboto}` → Should resolve to `md/Light/md/fontFamilies/roboto`
- `{fontWeights.roboto-0}` → Should resolve to `md/Light/md/fontWeights/roboto-0`
- `{lineHeights.24}` → Should resolve to `md/Light/md/lineHeights/24`
- `{fontSize.4}` → Should resolve to `md/Light/md/fontSize/4`
- `{letterSpacing.1}` → Should resolve to `md/Light/md/letterSpacing/1`
- `{paragraphSpacing.0}` → Should resolve to `md/Light/md/paragraphSpacing/0`
- `{paragraphIndent.0}` → Should resolve to `md/Light/md/paragraphIndent/0`
- `{textCase.none}` → Should resolve to `md/Light/md/textCase/none`
- `{textDecoration.none}` → Should resolve to `md/Light/md/textDecoration/none`

## Current Workaround

A preprocessor (`style-dictionary-preprocessor.js`) automatically adds missing base tokens during the build process. However, **these tokens should be included in the Figma export** to avoid relying on the workaround.

## Verification Steps

After exporting from Figma, verify that:

1. ✅ All base tokens exist: `fontFamilies`, `fontWeights`, `lineHeights`, `fontSize`, `letterSpacing`
2. ✅ Missing tokens are added: `paragraphSpacing`, `paragraphIndent`, `textCase`, `textDecoration`
3. ✅ All lineHeight indices referenced exist (e.g., if `lineHeights.24` is referenced, it must exist)
4. ✅ Run `npm run build-dictionary` and check for broken reference warnings

## Expected Export Structure

The export should follow this structure for each theme:

```
md/
  Light/
    md/
      fontFamilies/
        roboto/
      fontWeights/
        roboto-0/
        roboto-1/
        roboto-2/
      lineHeights/
        0/ through 29/
      fontSize/
        0/ through 10/
      letterSpacing/
        0/ through 6/
      paragraphSpacing/    ← MISSING - must be added
        0/
      paragraphIndent/     ← MISSING - must be added
        0/
      textCase/            ← MISSING - must be added
        none/
      textDecoration/      ← MISSING - must be added
        none/
      typescale/
        display/
        headline/
        body/
        label/
        title/
  Dark/
    md/
      [same structure as Light]
```

## Current Workaround Status

A preprocessor (`style-dictionary-preprocessor.js`) has been created to:
- ✅ Add missing base tokens (`paragraphSpacing`, `paragraphIndent`, `textCase`, `textDecoration`)
- ⚠️ Token references still fail to resolve correctly

The build completes with warnings, but typography tokens serialize as `[object Object]` in SCSS output because references cannot be resolved.

## Root Cause Analysis

The fundamental issue is that **token references in the Figma export use relative paths that don't match Style Dictionary's reference resolution algorithm**.

### Expected Behavior

According to [Style Dictionary Architecture](https://styledictionary.com/info/architecture/), references should resolve by:
1. Looking for the referenced token relative to the current token's location
2. Traversing up the object hierarchy until found
3. If not found, Style Dictionary reports a broken reference warning

### Actual Behavior

Style Dictionary reports 36 broken references for typography tokens, even though the referenced tokens exist in the correct location (`md/Light/md/fontFamilies/roboto`, etc.).

### Possible Solutions

1. **Fix in Figma Export** (Recommended): Ensure Material Theme Builder exports references using absolute paths from the root (e.g., `{md.Light.md.fontFamilies.roboto}`)

2. **Fix in tokens.json** (Not recommended per user requirements): Modify references to use absolute paths

3. **Custom Transform** (Complex): Create a custom transform that resolves references before Style Dictionary processes them

## Notes

- The preprocessor currently handles missing tokens automatically
- Style Dictionary will warn about broken references but continue building
- Typography tokens that reference missing/unresolved tokens will serialize as `[object Object]` in SCSS output
- JavaScript output will only include tokens that resolve successfully (currently only color tokens work)
- The build completes successfully but with warnings - this is expected behavior until references are fixed
