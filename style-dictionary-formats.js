import StyleDictionary from "style-dictionary";

const normalizePathParts = (path) => {
  if (!path) return [];
  const parts = Array.isArray(path) ? path : String(path).split("/");
  const expanded = [];
  parts.forEach((part) => {
    if (typeof part === "string" && part.includes("/")) {
      expanded.push(...part.split("/").filter(Boolean));
    } else if (part !== undefined && part !== null) {
      expanded.push(String(part));
    }
  });
  return expanded.filter(Boolean);
};

const getThemeFromPath = (pathParts) => {
  const parts = normalizePathParts(pathParts);
  if (parts.includes("Light")) return "light";
  if (parts.includes("Dark")) return "dark";
  return null;
};

const filterMd3Path = (pathParts) => {
  const parts = normalizePathParts(pathParts);
  const filtered = [];
  for (const part of parts) {
    if (part === "Light" || part === "Dark") continue;
    if (part === "md" && filtered[filtered.length - 1] === "md") continue;
    filtered.push(part);
  }
  return filtered;
};

const toCssVarName = (pathParts) => {
  const filtered = filterMd3Path(pathParts);
  const name = filtered.join("-").toLowerCase();
  const cleaned = name
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `--${cleaned}`;
};

StyleDictionary.registerFormat({
  name: "css/variables-theme",
  format: ({ dictionary }) => {
    const lightVars = new Map();
    const darkVars = new Map();

    dictionary.allTokens.forEach((token) => {
      if (token.type !== "color") return;
      const theme = getThemeFromPath(token.path || token.originalPath);
      if (!theme) return;

      const varName = toCssVarName(token.path || token.originalPath);
      const value = token.value;

      if (theme === "light") {
        lightVars.set(varName, value);
      } else if (theme === "dark") {
        darkVars.set(varName, value);
      }
    });

    const serializeVars = (vars) => {
      const entries = Array.from(vars.entries()).sort(([a], [b]) =>
        a.localeCompare(b),
      );
      return entries.map(([name, value]) => `  ${name}: ${value};`).join("\n");
    };

    const lightBlock = serializeVars(lightVars);
    const darkBlock = serializeVars(darkVars);

    return `/* Do not edit directly, this file was auto-generated. */\n:root {\n${lightBlock}\n}\n\n[data-theme="dark"] {\n${darkBlock}\n}\n`;
  },
});
