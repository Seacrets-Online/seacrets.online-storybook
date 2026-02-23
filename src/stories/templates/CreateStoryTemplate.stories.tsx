import type { Meta, StoryObj } from '@storybook/react-vite';
import CreateStoryTemplate from '../../components/templates/CreateStoryTemplate';
import { withFullscreen } from '../decorators';

const meta = {
  title: 'Templates/CreateStoryTemplate',
  component: CreateStoryTemplate,
  tags: ['test'],
  decorators: [withFullscreen],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CreateStoryTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onSubmit: (data) => console.log('Submit', data),
  },
};
