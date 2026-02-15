import StyleDictionary from "style-dictionary";
import preprocessor from "./style-dictionary-preprocessor.js";
import "./style-dictionary-transforms.js";
import "./style-dictionary-formats.js";

// Register the preprocessor
StyleDictionary.registerPreprocessor(preprocessor);

export default {
  source: ["src/tokens/tokens.json"],
  preprocessors: ["fix-token-references-and-add-missing"],
  log: {
    verbosity: "verbose",
    errors: {
      brokenReferences: "error",
    },
  },
  platforms: {
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
  },
};
