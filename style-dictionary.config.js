import StyleDictionary from "style-dictionary";
import preprocessor from "./style-dictionary-preprocessor.js";
import "./style-dictionary-transforms.js";
import "./style-dictionary-formats.js";

// Register the preprocessor
StyleDictionary.registerPreprocessor(preprocessor);

export default {
  source: ["src/tokens/**/*.json"],
  log: {
    verbosity: "verbose",
    errors: {
      brokenReferences: "warn",
    },
  },
  platforms: {
    scss: {
      transforms: ["attribute/cti", "name/md3/scss", "size/px", "color/css"],
      buildPath: "src/style-dictionary-dist/",
      prefix: "", // No prefix for MD3 compliance
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
        },
      ],
    },
    css: {
      transforms: ["attribute/cti", "name/md3/scss", "color/css"],
      buildPath: "src/style-dictionary-dist/",
      files: [
        {
          destination: "theme.css",
          format: "css/variables-theme",
        },
      ],
    },
    js: {
      transforms: ["attribute/cti", "name/md3/js", "size/px", "color/hex"],
      buildPath: "src/style-dictionary-dist/",
      files: [
        {
          destination: "variables.js",
          format: "javascript/es6",
          filter: (token) => {
            // Only include color tokens from Light theme to avoid duplicates
            // In MD3, tokens have same name for both themes, so we use Light as default
            if (token.type !== "color") return false;

            // Check if token is from Light theme
            const path = token.path;
            if (Array.isArray(path)) {
              // Path can be ['md/Light', ...] or ['md', 'Light', ...]
              const firstPath = path[0];
              return (
                typeof firstPath === "string" && firstPath.includes("Light")
              );
            }

            return false;
          },
        },
      ],
    },
  },
};
