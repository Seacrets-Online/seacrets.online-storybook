import type { Meta, StoryObj } from '@storybook/react-vite';
import { FavoriteBorder, LocalFireDepartmentOutlined, Public } from '@mui/icons-material';
import SegmentedButtons from '../../components/molecules/SegmentedButtons';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Molecules/SegmentedButtons',
  component: SegmentedButtons,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  decorators: [withWidth(WIDTH.card)],
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

