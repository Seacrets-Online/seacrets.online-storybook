import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import viteConfig from './vite.config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(__dirname, '.storybook'),
              storybookScript: 'npm run storybook -- --no-open',
              tags: {
                include: ['test'],
                exclude: ['experimental', 'no-tests'],
              },
            }),
          ],
          test: {
            name: 'storybook',
            testTimeout: 25000,
            setupFiles: ['./src/test-setup.ts', './.storybook/vitest.setup.ts'],
            browser: {
              enabled: true,
              instances: [
                {
                  browser: 'chromium',
                },
              ],
              provider: 'playwright',
            },
          },
        },
      ],
    },
  }),
);
