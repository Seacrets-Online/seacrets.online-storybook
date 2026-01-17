# Seacrets.Online - Design System (Storybook)

This repository contains the official Design System for Seacrets.Online, built on **Material Design 3 (M3) Expressive**.

## 🎨 Overview

The Design System serves as the single source of truth for all UI components and design decisions (tokens). It is used to ensure consistency across the main application and any future frontend projects.

## 🛠️ Technology Stack

- **Framework**: React 18
- **Documentation**: Storybook 8
- **Design Guidelines**: Material Design 3 (Expressive)
- **Styling**: Tailwind CSS & Design Tokens (JSON/CSS Variables)
- **Testing**: Chromatic / Visual Regression Testing

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
# Run Storybook locally (http://localhost:6006)
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run Chromatic visual regression tests
npm run chromatic
```

### Local Chromatic Setup

For local testing, create a `.env` file in the project root:

```bash
CHROMATIC_PROJECT_TOKEN=your_token_here
```

The `.env` file is already in `.gitignore` and won't be committed. The `chromatic` script automatically loads environment variables from `.env` using `dotenv-cli`.

## 🧪 Visual Regression Testing

This project uses [Chromatic](https://www.chromatic.com/) for visual regression testing. Chromatic automatically detects visual changes in components and provides a review interface for approving or rejecting changes.

### How It Works

1. **Baseline**: First build establishes baseline snapshots
2. **Change Detection**: Subsequent builds compare against baseline
3. **Visual Review**: Changes are highlighted in the Chromatic dashboard
4. **Approval**: Changes must be approved before merging

### Local Testing

1. **Get your Chromatic project token** from [chromatic.com](https://www.chromatic.com/)
2. **Create `.env` file** in the project root:
   ```bash
   CHROMATIC_PROJECT_TOKEN=your_token_here
   ```
3. **Run Chromatic**:
   ```bash
   npm run chromatic
   ```

The script uses `dotenv-cli` to automatically load the token from `.env`. The `.env` file is gitignored and won't be committed.

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

1. **Make your changes** to components, styles, or tokens
2. **Test locally** with `npm run storybook`
3. **Publish to Chromatic** with `npm run chromatic`
4. **Review changes** in the Chromatic dashboard
5. **Approve or request changes** as needed

Chromatic will detect:
- Color palette changes
- Typography adjustments
- Layout modifications
- Size and scale changes
- Any visual differences in component rendering

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build Vite app for production |
| `npm run preview` | Preview production build |
| `npm run storybook` | Start Storybook dev server (port 6006) |
| `npm run build-storybook` | Build Storybook for production |
| `npm run chromatic` | Run Chromatic visual regression tests |
| `npm run tokens:build` | Build design tokens (to be implemented) |

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
*Part of the Seacrets.Online GitOps Platform*
