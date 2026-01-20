import { fn } from '@storybook/test';

export default {
  title: 'Example/Button',
  component: 'button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
};

export const Primary = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
  render: ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {children}
    </button>
  ),
};

export const Secondary = {
  args: {
    children: 'Button',
    onClick: fn(),
  },
  render: ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
    >
      {children}
    </button>
  ),
};
