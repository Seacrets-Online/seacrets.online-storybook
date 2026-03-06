import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IdentityOption } from '../../components/molecules/IdentityOption';
import { spacingTokens } from '../../utils/spacing.generated';

const meta = {
  title: 'Molecules/IdentityOption',
  component: IdentityOption,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['passport', 'badge'],
    },
    selected: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof IdentityOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PassportDefault: Story = {
  args: {
    type: 'passport',
    label: 'Pasaporte',
    selected: false,
  },
};

export const BadgeSelected: Story = {
  args: {
    type: 'badge',
    label: 'Cédula',
    selected: true,
  },
};

export const SelectionGroup: Story = {
  render: () => {
    const [selectedType, setSelectedType] = useState<'passport' | 'badge' | null>(null);

    return (
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: `${spacingTokens['24']}px`, 
          alignItems: 'center' 
        }}
      >
        <IdentityOption 
          type="passport" 
          label="Pasaporte" 
          selected={selectedType === 'passport'} 
          onClick={() => setSelectedType('passport')}
        />
        <IdentityOption 
          type="badge" 
          label="Cédula" 
          selected={selectedType === 'badge'} 
          onClick={() => setSelectedType('badge')}
        />
      </div>
    );
  },
};

