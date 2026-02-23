import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MediaCropWrapper from '../../components/organisms/MediaCropWrapper';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Organisms/MediaCropWrapper',
  component: MediaCropWrapper,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.card)],
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

