import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from '../../components/molecules/Autocomplete';

const options = [
  { label: 'Petite', value: '1' },
  { label: 'Boobs', value: '2' },
  { label: 'Option3', value: '3' },
];

const meta = {
  title: 'Molecules/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    label: 'Category',
    options: options,
    width: '100%',
  }
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
    placeholder: 'Select multiple...',
    defaultValue: [options[0]],
  },
};

export const WithError: Story = {
  args: {
    error: true,
    helperText: 'You must select at least one category.',
  },
};