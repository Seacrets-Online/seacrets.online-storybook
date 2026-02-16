import type { Meta, StoryObj } from '@storybook/react';
import Divider from '../../components/atoms/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ width: '100%', minWidth: 300, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: { orientation: 'vertical', flexItem: true },
  decorators: [
    (Story) => (
      <div style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, gap: 16 }}>
        <div>Left</div>
        <Story />
        <div>Right</div>
      </div>
    ),
  ],
};
