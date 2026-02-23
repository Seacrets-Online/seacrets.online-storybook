import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import UploadArea from '../../components/molecules/UploadArea';
import { withWidth, WIDTH } from '../decorators';

const meta = {
  title: 'Molecules/UploadArea',
  component: UploadArea,
  tags: ['test'],
  decorators: [withWidth(WIDTH.card)],
} satisfies Meta<typeof UploadArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    const [file, setFile] = useState<string | undefined>();
    return (
      <UploadArea
        label="Subir Foto o Video"
        fileName={file}
        onSelect={(f) => setFile(f.name)}
      />
    );
  },
};
