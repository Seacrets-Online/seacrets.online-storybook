import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from '../../components/organisms/FileUpload';

const meta = {
  title: 'Organisms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
    label: 'Choose file',
    hint: 'PNG, JPG up to 5MB',
  },
};
