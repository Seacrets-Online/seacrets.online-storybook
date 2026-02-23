import type { Meta, StoryObj } from '@storybook/react-vite';
import CreateOptionsTemplate from '../../components/templates/CreateOptionsTemplate';
import Text from '../../components/atoms/Text';
import { withFullscreen } from '../decorators';

const meta = {
  title: 'Templates/CreateOptionsTemplate',
  component: CreateOptionsTemplate,
  tags: ['test'],
  decorators: [withFullscreen],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CreateOptionsTemplate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCreateStory: () => {},
    onCreateLive: () => {},
    onUploadMedia: () => {},
    onUploadTrend: () => {},
    children: (
      <Text variant="body1" color="text.secondary" align="center">
        Tap the + button to open the drawer.
      </Text>
    ),
  },
};

