import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.spec.tsx', 'src/**/*.spec.ts'],
    exclude: ['src/style-dictionary-dist'],
    setupFiles: ['src/test-setup.ts'],
  },
}),
);
