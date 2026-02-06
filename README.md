# Seacrets.Online - Design System (Storybook)

This repository contains the official Design System for Seacrets.Online, built on **Material Design 3 (M3) Expressive**.

## 🎨 Overview

The Design System serves as the single source of truth for all UI components and design decisions (tokens). It is used to ensure consistency across the main application and any future frontend projects.

## 🛠️ Technology Stack

- **Framework**: React 18
- **Documentation**: Storybook 8
- **Design Guidelines**: Material Design 3 (Expressive)
- **Styling**: Design Tokens (CSS Variables) & Pure MD3
- **Testing**: Chromatic / Visual Regression Testing
- **Token Pipeline**: Style Dictionary

## 📂 Repository Structure

```
seacrets.online-storybook/
├── .storybook/          # Storybook configuration
├── .github/
│   └── workflows/       # CI/CD workflows (Chromatic)
├── src/
│   ├── components/      # Reusable UI components
│   ├── tokens/          # Design tokens (JSON from Figma)
│   ├── stories/         # Story files and documentation
│   └── styles/         # Global styles and CSS variables
├── .env                 # Local environment variables (gitignored)
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

### Key Files

- **`.storybook/main.js`**: Storybook configuration
- **`.storybook/preview.js`**: Global decorators and parameters
- **`src/styles/tokens.css`**: CSS variables for design tokens
- **`src/tokens/tokens.json`**: Source design tokens from Figma

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
3. When you modify token JSON files, run `npm run tokens:build` manually
4. Storybook automatically detects changes in `tokens.css` and reloads

**Other useful commands:**

```bash
# Build Storybook for production
# Note: Design tokens are automatically built before building
npm run build

# Validate that everything builds correctly
npm run validate

# Run Chromatic visual regression tests
npm run chromatic
```

**Important:** Design tokens (`src/styles/tokens.css`) are automatically generated before running `dev` or `build` commands via npm lifecycle hooks (`predev`, `prebuild`). The transformation is handled by **Style Dictionary**. When you modify token JSON files during development, run `npm run tokens:build` manually to rebuild them. Storybook will automatically detect the updated `tokens.css` file and reload.

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
   - Edit `src/tokens/tokens.json` or export from Figma
   - Run `npm run tokens:build` to rebuild tokens using **Style Dictionary**
2. **Make your changes** to components or styles (using pure MD3 CSS variables)
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

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Storybook dev server on port 6006 (tokens auto-built) |
| `npm run build` | Build Storybook for production (tokens auto-built) |
| `npm run storybook` | Alias for `dev` (tokens auto-built) |
| `npm run build-storybook` | Alias for `build` (tokens auto-built) |
| `npm run tokens:build` | Build design tokens from JSON to CSS using **Style Dictionary** (runs automatically via hooks, run manually when tokens change) |
| `npm run validate` | Validate imports and build (builds tokens + Vite build) |
| `npm run chromatic` | Run Chromatic visual regression tests |

**Note:** Commands marked with "(tokens auto-built)" automatically run `tokens:build` before execution using npm lifecycle hooks (`predev`, `prebuild`). The transformation is handled by **Style Dictionary**. When you modify token JSON files during development, run `npm run tokens:build` manually to rebuild them. Storybook will automatically detect the updated CSS file and reload.

## 🔗 Related Documentation

- [Frontend Architecture](../seacrets.online-docs/architecture/frontend-architecture.md)
- [Figma to Storybook Pipeline](../seacrets.online-docs/guides/figma-to-storybook-pipeline.md)
- [Material Design 3 Implementation Guide](../seacrets.online-docs/guides/material-design3-implementation-guide.md)

## 🔧 Troubleshooting

### npm install fails

If you encounter peer dependency conflicts, use:
```bash
npm install --legacy-peer-deps
```

This is required due to Vite 7 compatibility with Storybook 8.

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
*Part of the Seacrets.Online Platform*
