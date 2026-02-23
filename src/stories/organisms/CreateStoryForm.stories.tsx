import type { Meta, StoryObj } from '@storybook/react-vite';
import CreateStoryForm from '../../components/organisms/CreateStoryForm';
import { withMobileWidth } from '../decorators';

const meta = {
  title: 'Organisms/CreateStoryForm',
  component: CreateStoryForm,
  tags: ['test'],
  decorators: [withMobileWidth()],
} satisfies Meta<typeof CreateStoryForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Submit', data),
  },
};
