import { readdirSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

type Violation = {
  file: string;
  line: number;
  value: string;
};

const TARGET_EXTENSIONS = new Set(['.ts', '.tsx']);
const COMPONENT_DIR = 'src/components';

const COLOR_PROP_RE =
  /\b(?:color|bgcolor|background(?:Color)?|border(?:Top|Right|Bottom|Left)?(?:Color)?|outline(?:Color)?|boxShadow|fill|stroke|stopColor)\s*:\s*([^,\n}]+)/g;

const hasLiteralColor = (value: string): boolean => {
  return /#[0-9a-fA-F]{3,8}\b/.test(value) || /\brgba?\(/i.test(value) || /\b(?:white|black)\b/i.test(value);
};

const isAllowedTokenValue = (value: string): boolean => {
  const normalized = value.replace(/["'`]/g, '').trim();
  const hasTokenVar = /var\(\s*--(md|seacrets-online)-/.test(normalized);
  const hasThemeRef = /\btheme\.palette\./.test(value) || /\bpalette\.[a-z]/i.test(value);
  const hasAlias = /^[a-zA-Z_][\w.-]*$/.test(normalized);
  const hasOverrideComment = /token-allow-color-literal/.test(value);
  const isTransparent = normalized === 'transparent';
  return hasTokenVar || hasThemeRef || hasAlias || hasOverrideComment || isTransparent;
};

const collectFiles = (dir: string, acc: string[] = []): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, acc);
      continue;
    }

    if (TARGET_EXTENSIONS.has(extname(entry.name))) {
      acc.push(fullPath);
    }
  }

  return acc;
};

const findColorViolations = (file: string): Violation[] => {
  const content = readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const violations: Violation[] = [];

  lines.forEach((line, index) => {
    if (line.includes('token-allow-color-literal')) {
      return;
    }

    COLOR_PROP_RE.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = COLOR_PROP_RE.exec(line)) !== null) {
      const value = match[1];
      if (!value) continue;

      if (hasLiteralColor(value) && !isAllowedTokenValue(value)) {
        violations.push({ file, line: index + 1, value: value.trim() });
      }
    }
  });

  return violations;
};

const main = () => {
  const files = collectFiles(COMPONENT_DIR);
  const allViolations: Violation[] = files.flatMap((file) => findColorViolations(file));

  if (allViolations.length === 0) {
    return;
  }

  console.error('Token color policy violations found in component style tokens:');
  for (const violation of allViolations) {
    console.error(`${violation.file}:${violation.line}: ${violation.value}`);
  }

  process.exitCode = 1;
};

main();

