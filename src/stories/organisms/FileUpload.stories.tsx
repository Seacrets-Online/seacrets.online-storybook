import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from '../../components/organisms/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Organisms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: (f) => console.log('Selected', f),
    label: 'Choose file',
    hint: 'PNG, JPG up to 5MB',
  },
};
