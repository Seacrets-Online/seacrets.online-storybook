import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UploadArea from '../../components/molecules/UploadArea';

const meta = {
  title: 'Molecules/UploadArea',
  component: UploadArea,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
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
