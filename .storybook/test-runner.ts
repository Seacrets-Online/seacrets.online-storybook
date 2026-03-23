import { injectAxe, checkA11y } from 'axe-playwright';
import type { TestRunnerConfig, TestContext } from '@storybook/test-runner';
import type { Page } from 'playwright-core';

const config: TestRunnerConfig = {
  async preVisit(page: Page) {
    await injectAxe(page);
  },
  async postVisit(page: Page, context: TestContext) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      includedImpacts: ['critical', 'serious'], 
    });
  },
};

export default config;