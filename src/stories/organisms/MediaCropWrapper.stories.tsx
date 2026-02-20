import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import MediaCropWrapper from '../../components/organisms/MediaCropWrapper';

const meta = {
  title: 'Organisms/MediaCropWrapper',
  component: MediaCropWrapper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <Box sx={{ width: 360 }}><Story /></Box>],
} satisfies Meta<typeof MediaCropWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PlaceholderViewport: Story = {
  args: {
    title: 'Crop media',
    aspectRatio: 9 / 16,
    onCancel: () => {},
    onConfirm: () => {},
    children: (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        Cropper goes here
      </Box>
    ),
  },
};

