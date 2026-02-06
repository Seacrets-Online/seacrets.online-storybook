import { fn } from '@storybook/test';
import { Button } from '../components/Button';

export default {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'elevated'],
    },
    children: {
      control: 'text',
    },
  },
};

export const Primary = {
  args: {
    variant: 'filled',
    children: 'Primary Button',
    onClick: fn(),
  },
};

export const Secondary = {
  args: {
    variant: 'outlined',
    children: 'Secondary Button',
    onClick: fn(),
  },
};

export const Text = {
  args: {
    variant: 'text',
    children: 'Text Button',
    onClick: fn(),
  },
};

export const Elevated = {
  args: {
    variant: 'elevated',
    children: 'Elevated Button',
    onClick: fn(),
  },
};
