import type { Meta, StoryObj } from '@storybook/react';
import CreateOptionsTemplate from '../../components/templates/CreateOptionsTemplate';
import { withTemplateStoryWrapper } from '../decorators/templateStoryWrapper';
import Text from '../../components/atoms/Text';

const meta = {
  title: 'Templates/CreateOptionsTemplate',
  component: CreateOptionsTemplate,
  parameters: { layout: 'fullscreen', docs: { page: null } },
  decorators: [withTemplateStoryWrapper],
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

