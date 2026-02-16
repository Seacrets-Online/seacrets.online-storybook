import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type JsonObject = Record<string, unknown>;

const REQUIRED_TOKEN_SETS = ['md/Light', 'md/Dark', 'Primitives/Mode 1'] as const;

const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const formatList = (items: string[]): string => items.map((item) => `- ${item}`).join('\n');

const validateTokenStudioExportObject = (tokens: unknown): void => {
  if (!isObject(tokens)) {
    throw new Error('Invalid tokens file: root must be a JSON object.');
  }

  const requiredSets = new Set(REQUIRED_TOKEN_SETS);
  const topLevelSets = Object.keys(tokens).filter((key) => !key.startsWith('$'));
  const missingSets = REQUIRED_TOKEN_SETS.filter((setName) => !(setName in tokens));

  if (missingSets.length > 0) {
    throw new Error(
      [
        'Token set validation failed.',
        'Missing required token sets:',
        formatList(missingSets),
        '',
        'Required token sets:',
        formatList([...requiredSets]),
      ].join('\n')
    );
  }

  const metadata = isObject(tokens.$metadata) ? tokens.$metadata : null;
  const tokenSetOrder = metadata ? asStringArray(metadata.tokenSetOrder) : [];
  const missingInOrder = REQUIRED_TOKEN_SETS.filter((setName) => !tokenSetOrder.includes(setName));

  if (missingInOrder.length > 0) {
    throw new Error(
      [
        'Token set order validation failed.',
        'The following required token sets are missing from "$metadata.tokenSetOrder":',
        formatList(missingInOrder),
        '',
        'Current token set order:',
        tokenSetOrder.length > 0 ? formatList(tokenSetOrder) : '- (empty)',
        '',
        'Top-level token sets detected:',
        topLevelSets.length > 0 ? formatList(topLevelSets) : '- (none)',
      ].join('\n')
    );
  }
};

export const validateTokenStudioExportFile = (relativePath = 'src/tokens/tokens.json'): void => {
  const absolutePath = resolve(process.cwd(), relativePath);
  const raw = readFileSync(absolutePath, 'utf8');
  const parsed: unknown = JSON.parse(raw);
  validateTokenStudioExportObject(parsed);
};

