import type { Meta, StoryObj } from '@storybook/react';
import LegalLinks from '../../components/molecules/LegalLinks';

const meta = {
  title: 'Molecules/LegalLinks',
  component: LegalLinks,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LegalLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomHrefs: Story = {
  args: {
    termsHref: '/terms',
    privacyHref: '/privacy',
    cookiesHref: '/cookies',
    contactHref: '/contact',
  },
};

export const WithSpacing: Story = {
  args: {
    sx: { mt: 3, pb: 2 },
  },
};
