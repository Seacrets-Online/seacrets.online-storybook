import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from '../../components/atoms/Radio';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { 'aria-label': 'Option' } };
export const Checked: Story = { args: { checked: true, 'aria-label': 'Option' } };
export const Disabled: Story = { args: { disabled: true, 'aria-label': 'Option' } };
