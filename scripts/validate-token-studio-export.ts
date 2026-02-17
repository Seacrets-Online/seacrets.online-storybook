import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

type JsonObject = Record<string, unknown>;

// The exact paths that Token Studio saves in the $metadata
const REQUIRED_TOKEN_SETS = [
  'seacrets.online/Light',
  'seacrets.online/Dark'
];

const isObject = (value: unknown): value is JsonObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const formatList = (items: string[]): string => items.map((item) => `- ${item}`).join('\n');

const validateTokenStudioExportObject = (tokens: unknown): void => {
  if (!isObject(tokens)) {
    throw new Error('Invalid tokens file: root must be a JSON object.');
  }

  if (!('seacrets' in tokens)) {
    throw new Error('Token set validation failed.\nMissing root token folder: "seacrets"');
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
        tokenSetOrder.length > 0 ? formatList(tokenSetOrder) : '- (empty)'
      ].join('\n')
    );
  }
};

export const validateTokenStudioExportFile = (relativePath = 'src/tokens/tokens.json'): void => {
  const filePath = resolve(process.cwd(), relativePath);
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    const tokens = JSON.parse(fileContent);
    validateTokenStudioExportObject(tokens);
  } catch (error) {
    if (error instanceof Error && error.message.includes('ENOENT')) {
      throw new Error(`Tokens file not found at: ${filePath}`);
    }
    throw error;
  }
};