import type { Meta, StoryObj } from '@storybook/react';
import CreateStoryForm from '../../components/organisms/CreateStoryForm';

const meta = {
  title: 'Organisms/CreateStoryForm',
  component: CreateStoryForm,
  parameters: { layout: 'centered', docs: { page: null } },
  decorators: [
    (Story) => (
      <div style={{ width: 390, maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CreateStoryForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log('Submit', data),
  },
};
