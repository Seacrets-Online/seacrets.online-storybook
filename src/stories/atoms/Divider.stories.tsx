import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import Divider from '../../components/atoms/Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {},
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%', minWidth: 300, p: 2.5 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Vertical: Story = {
  args: { orientation: 'vertical', flexItem: true },
  decorators: [
    (Story) => (
      <Box sx={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2.5, gap: 2 }}>
        <Box component="span">Left</Box>
        <Story />
        <Box component="span">Right</Box>
      </Box>
    ),
  ],
};
