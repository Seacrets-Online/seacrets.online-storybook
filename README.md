# Seacrets.Online - Design System (Storybook)

This repository contains the official Design System for Seacrets.Online, built on **Material Design 3 (M3) Expressive**.

## 🎨 Overview

The Design System serves as the single source of truth for all UI components and design decisions (tokens). It is used to ensure consistency across the main application and any future frontend projects.

## Technology Stack

- **Language**: TypeScript (strict mode)
- **Framework**: React 19
- **Documentation**: Storybook 10
- **UI Library**: MUI (Material UI) with MD3 theme
- **Design Guidelines**: Material Design 3 (Expressive)
- **Styling**: Design Tokens (CSS Variables) + MUI theme bridge
- **Testing**: Vitest + @storybook/addon-vitest, Playwright, addon-a11y, Chromatic
- **Token Pipeline**: Style Dictionary

## Repository Structure

```
seacrets.online-storybook/
├── .storybook/          # Storybook configuration
├── .github/workflows/   # CI/CD (Chromatic)
├── docs/                # Guides (mui-token-bridge, mui-component-plan)
├── src/
│   ├── components/      # Atomic Design: atoms, molecules, organisms, templates
│   ├── theme/mui/       # MUI theme from MD3 tokens
│   ├── tokens/          # Design tokens (JSON from Figma)
│   ├── stories/         # Stories by level (atoms, molecules, organisms, templates)
│   ├── style-dictionary-dist/  # Generated tokens (theme.css)
│   └── utils/          # Token adapters (typography, shapes); generated: colors.generated.ts, typography.generated.ts
└── README.md
```

### Key Files

- **`.storybook/main.ts`**: Storybook + addon-themes
- **`.storybook/preview.ts`**: MUI ThemeProvider, CssBaseline, theme switcher
- **`src/theme/mui/createTheme.ts`**: MD3 token bridge to MUI theme (palette from CSS vars in theme.css)
- **`docs/TOKEN_EXPORT.md`**: Token export standard (format, flow, outputs)
- **`docs/mui-token-bridge.md`**: Token consumption in MUI
- **`docs/mui-component-plan.md`**: Component backlog by wave

## 🧪 Testing Strategy

This project implements a dual testing strategy to ensure both visual consistency and functional correctness.

### 1. Functional & Interaction Testing (Storybook + Vitest)

We use `@storybook/addon-vitest` to run component tests directly from Storybook stories. These tests run in a real browser environment using Playwright.

- **Execution Policy**: Only stories marked with the `test` tag are executed in CI.
- **How to include a story in tests**: Add `'test'` to the `tags` array in the story's `meta` or individual story object.
  ```tsx
  const meta = {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs', 'test'], // Included in automated tests
  } satisfies Meta<typeof Button>;
  ```
- **Local Execution**: `npm run test:storybook`
- **CI Execution**: `npm run test:storybook:ci` (runs on every PR and push to main/devel/stage).

### 2. Visual Regression Testing (Chromatic)

[Chromatic](https://www.chromatic.com/) is used for visual regression testing. It automatically detects visual changes in components and provides a review interface.

- **Baseline**: First build establishes baseline snapshots.
- **Change Detection**: Subsequent builds compare against baseline.
- **Review**: Changes must be approved in the Chromatic dashboard before merging.
- **Execution**: `npm run chromatic`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 20.0.0 or higher (LTS recommended)
- **npm**: Comes with Node.js

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Note: --legacy-peer-deps is required due to Vite 7 compatibility
```

### Development

```bash
# Start Storybook dev server (http://localhost:6006)
# Note: Design tokens are automatically built before starting
npm run dev
```

**What happens when you run `npm run dev`:**

1. Design tokens are built automatically (`predev` hook) using **Style Dictionary**
2. Storybook dev server starts with hot reload for components
3. When you modify token JSON files, run `npm run build-dictionary` manually
4. Storybook automatically detects changes in generated files and reloads

**Other useful commands:**

```bash
# Build Storybook for production
# Note: Design tokens are automatically built before building
npm run build

# Run unit tests
npm run test

# Run Storybook story-level Vitest integration tests
npm run test:storybook

# Validate that everything builds correctly
npm run validate

# Run Chromatic visual regression tests
npm run chromatic
```

**Important:** Design tokens are automatically generated before running `dev` or `build` commands via npm lifecycle hooks (`predev`, `prebuild`). The transformation is handled by **Style Dictionary** and generates:

- `src/style-dictionary-dist/theme.css` - CSS variables for light/dark; source for MUI theme palette
- `src/utils/colors.generated.ts` - Color tokens (light/dark)
- `src/utils/typography.generated.ts` - Typography tokens (consumed via `src/utils/typography.ts`)

When you modify token JSON files during development, run `npm run build-dictionary` manually to rebuild them. Storybook will automatically detect the updated files and reload.

**Note:** `npm run storybook` and `npm run build-storybook` are also available as aliases for `dev` and `build` respectively.

### Local Chromatic Setup

For local testing, create a `.env` file in the project root:

1. **Copy the example file**:

   ```bash
   cp .env.example .env
   ```

2. **Add your Chromatic project token** to `.env`:
   ```bash
   CHROMATIC_PROJECT_TOKEN=your_token_here
   ```

The `.env` file is already in `.gitignore` and won't be committed. The `chromatic` script automatically loads environment variables from `.env` using `dotenv-cli`.

**Security Note**: If your `.env` file contains a real token that may have been exposed, rotate it immediately in the Chromatic dashboard and update your local `.env` file with the new token.

## 🧪 Visual Regression Testing

This project uses [Chromatic](https://www.chromatic.com/) for visual regression testing. Chromatic automatically detects visual changes in components and provides a review interface for approving or rejecting changes.

### How It Works

1. **Baseline**: First build establishes baseline snapshots
2. **Change Detection**: Subsequent builds compare against baseline
3. **Visual Review**: Changes are highlighted in the Chromatic dashboard
4. **Approval**: Changes must be approved before merging

### Local Testing

1. **Get your Chromatic project token** from [chromatic.com](https://www.chromatic.com/)
2. **Copy `.env.example` to `.env`**:
   ```bash
   cp .env.example .env
   ```
3. **Add your token** to `.env`:
   ```bash
   CHROMATIC_PROJECT_TOKEN=your_token_here
   ```
4. **Run Chromatic**:
   ```bash
   npm run chromatic
   ```

The script uses `dotenv-cli` to automatically load the token from `.env`. The `.env` file is gitignored and won't be committed.

**Token Rotation**: If your token is exposed or compromised, rotate it in the Chromatic dashboard and update your local `.env` file.

### CI/CD Integration

The Chromatic workflow (`.github/workflows/chromatic.yml`) automatically runs on:

- **Pull requests** to `main`, `devel`, or `stage` branches
- **Pushes** to `main`, `devel`, or `stage` branches
- **Manual dispatch** via GitHub Actions UI

The Storybook Tests workflow (`.github/workflows/storybook-tests.yml`) runs on:

- **Pushes** to `main`, `devel`, or `stage` branches
- **Pull requests** to `main`, `devel`, or `stage` branches
- **Playwright-backed Storybook component tests** through `npm run test:storybook:ci`

#### GitHub Secret Setup

1. Go to Repository Settings → Secrets and variables → Actions
2. Add a new secret named `CHROMATIC_PROJECT_TOKEN`
3. Paste your Chromatic project token

The workflow will:

- Install dependencies
- Build Storybook
- Publish to Chromatic
- Run visual regression tests
- Report results in pull requests

#### Workflow Configuration

The workflow uses the secret `CHROMATIC_PROJECT_TOKEN` from GitHub Actions secrets. Results are automatically reported back to pull requests when the repository is linked to Chromatic.

### Making UI Changes

When making visual changes to components:

1. **Update design tokens** (if needed):
   - Export from Figma (W3C DTCG format, see [docs/TOKEN_EXPORT.md](docs/TOKEN_EXPORT.md))
   - Replace `src/tokens/tokens.json` (never edit manually)
   - Run `npm run build-dictionary` to rebuild tokens
2. **Make your changes** to components:
   - Colors: use CSS variables `var(--md-sys-color-*)` (generated in `src/style-dictionary-dist/theme.css`)
   - Typography/shape/elevation: prefer MUI theme tokens (and `src/utils/typography.ts` from Style Dictionary, `src/utils/shapes.ts`) over hardcoded values
3. **Test locally** with `npm run storybook` (tokens auto-built)
4. **Validate changes** with `npm run validate` (optional)
5. **Publish to Chromatic** with `npm run chromatic`
6. **Review changes** in the Chromatic dashboard
7. **Approve or request changes** as needed

Chromatic will detect:

- Color palette changes
- Typography adjustments
- Layout modifications
- Size and scale changes
- Any visual differences in component rendering

## Theme Switching (Light/Dark)

MUI ThemeProvider + addon-themes provide light/dark switching. The toolbar theme selector switches between `lightTheme` and `darkTheme` from `src/theme/mui/createTheme.ts`. The `data-theme` attribute is synced for CSS variables in `theme.css`.

## 📝 Available Scripts

| Script                     | Description                                                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`              | Start Storybook dev server on port 6006 (tokens auto-built)                                                                         |
| `npm run build`            | Build Storybook for production (tokens auto-built)                                                                                  |
| `npm run storybook`        | Alias for `dev` (tokens auto-built)                                                                                                 |
| `npm run build-storybook`  | Alias for `build` (tokens auto-built)                                                                                               |
| `npm run build-dictionary` | Build design tokens from JSON to theme.css using **Style Dictionary** (runs automatically via hooks, run manually when tokens change) |
| `npm run tokens:build`     | Alias for `build-dictionary`                                                                                                        |
| `npm run typecheck`        | Run TypeScript compiler check (no emit)                                                                                              |
| `npm run test`             | Run unit tests (Vitest)                                                                                                            |
| `npm run test:unit`        | Alias for `vitest run`                                                                                                            |
| `npm run test:watch`       | Run unit tests in watch mode                                                                                                         |
| `npm run test:storybook`   | Run Storybook-backed component tests (`@storybook/addon-vitest`)                                                                       |
| `npm run test:storybook:ci`| Run Storybook-backed component tests with CI-friendly options                                                                           |
| `npm run validate`         | Validate imports, types, and build (builds tokens + typecheck + Vite build)                                                          |
| `npm run chromatic`        | Run Chromatic visual regression tests                                                                                               |

**Note:** Commands marked with "(tokens auto-built)" automatically run `build-dictionary` before execution using npm lifecycle hooks (`predev`, `prebuild`). The transformation is handled by **Style Dictionary** and generates `theme.css`. When you modify token JSON files during development, run `npm run build-dictionary` manually to rebuild them. Storybook will automatically detect the updated files and reload.

## MUI Integration

- [docs/TOKEN_EXPORT.md](docs/TOKEN_EXPORT.md) - Token export standard (single format)
- [docs/mui-token-bridge.md](docs/mui-token-bridge.md) - Consuming tokens in MUI
- [docs/mui-component-plan.md](docs/mui-component-plan.md) - Component backlog
- [docs/ATOMIC_DESIGN_RULES.md](docs/ATOMIC_DESIGN_RULES.md) - Atomic Design rules

## Related Documentation

- [Frontend Architecture](../seacrets.online-docs/architecture/frontend-architecture.md)
- [Figma to Storybook Pipeline](../seacrets.online-docs/guides/figma-to-storybook-pipeline.md)

## 🔧 Troubleshooting

### npm install fails

If you encounter peer dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

This is required due to Vite 7 compatibility with Storybook 10.

### Chromatic not detecting changes

- Ensure `.env` file exists with `CHROMATIC_PROJECT_TOKEN`
- Verify token is valid at [chromatic.com](https://www.chromatic.com/)
- Check that Storybook builds successfully: `npm run build-storybook`

### Node.js version issues

This project requires Node.js 20+. If using `nvm`:

```bash
nvm install 20
nvm use 20
nvm alias default 20
```

---

_Part of the Seacrets.Online Platform_
