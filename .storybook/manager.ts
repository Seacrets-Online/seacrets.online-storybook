import { addons } from 'storybook/manager-api';

addons.setConfig({
  showToolbar: true,
  toolbar: {
    viewport: { hidden: false },
    'storybook/viewport': { hidden: false },
  },
});
