import type { Meta, StoryObj } from '@storybook/react-vite';
import Text from '../../components/atoms/Text';
import type { TypographyTokenName } from '../../utils/typography';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: { layout: 'centered' },
  tags: ['autodocs', 'test'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-large',
        'display-medium',
        'display-small',
        'headline-large',
        'headline-medium',
        'headline-small',
        'title-large',
        'title-medium',
        'title-small',
        'body-large',
        'body-medium',
        'body-small',
        'label-large',
        'label-medium',
        'label-small',
        'overline',
      ] as TypographyTokenName[],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleText = 'The quick brown fox jumps over the lazy dog';

export const BodyLarge: Story = {
  args: {
    variant: 'body-large',
    children: sampleText,
  },
};

export const BodyMedium: Story = {
  args: {
    variant: 'body-medium',
    children: sampleText,
  },
};

export const BodySmall: Story = {
  args: {
    variant: 'body-small',
    children: sampleText,
  },
};

export const LabelLarge: Story = {
  args: {
    variant: 'label-large',
    children: sampleText,
  },
};

export const LabelMedium: Story = {
  args: {
    variant: 'label-medium',
    children: sampleText,
  },
};

export const LabelSmall: Story = {
  args: {
    variant: 'label-small',
    children: sampleText,
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: sampleText,
  },
};

export const TitleLarge: Story = {
  args: {
    variant: 'title-large',
    children: sampleText,
  },
};

export const TitleMedium: Story = {
  args: {
    variant: 'title-medium',
    children: sampleText,
  },
};

export const TitleSmall: Story = {
  args: {
    variant: 'title-small',
    children: sampleText,
  },
};

export const HeadlineLarge: Story = {
  args: {
    variant: 'headline-large',
    children: sampleText,
  },
};

export const HeadlineMedium: Story = {
  args: {
    variant: 'headline-medium',
    children: sampleText,
  },
};

export const HeadlineSmall: Story = {
  args: {
    variant: 'headline-small',
    children: sampleText,
  },
};

export const DisplayLarge: Story = {
  args: {
    variant: 'display-large',
    children: sampleText,
  },
};

export const DisplayMedium: Story = {
  args: {
    variant: 'display-medium',
    children: sampleText,
  },
};

export const DisplaySmall: Story = {
  args: {
    variant: 'display-small',
    children: sampleText,
  },
};
