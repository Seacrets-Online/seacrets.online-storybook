import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { FavoriteBorder, LocalFireDepartmentOutlined, Public } from '@mui/icons-material';
import SegmentedButtons from '../../components/molecules/SegmentedButtons';

const meta = {
  title: 'Molecules/SegmentedButtons',
  component: SegmentedButtons,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ width: 360 }}><Story /></Box>],
} satisfies Meta<typeof SegmentedButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fullWidth: true,
    options: [
      { value: 'forYou', label: 'For you', icon: <FavoriteBorder fontSize="small" /> },
      { value: 'trending', label: 'Trending', icon: <LocalFireDepartmentOutlined fontSize="small" /> },
      { value: 'world', label: 'World', icon: <Public fontSize="small" /> },
    ],
    defaultValue: 'forYou',
    onChange: () => {},
  },
};

