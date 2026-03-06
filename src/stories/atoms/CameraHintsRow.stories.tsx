import type { Meta, StoryObj } from "@storybook/react";
import { CameraHintsRow } from "../../components/atoms/CameraHintsRow";

const meta = {
  title: "Atoms/CameraHintsRow",
  component: CameraHintsRow,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
  argTypes: {
    hints: {
      control: "object",
      description: "Array of hint messages to display",
    },
  },
} satisfies Meta<typeof CameraHintsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hints: ["Too Blur", "Too Small", "Too Dark"],
  },
};

export const DocumentHints: Story = {
  args: {
    hints: ["Too Blur", "Too Small", "Bad Angle"],
  },
};

export const SelfieHints: Story = {
  args: {
    hints: ["Too Dark", "Face Not Clear", "Wrong Position"],
  },
};

export const TwoHints: Story = {
  args: {
    hints: ["Too Blur", "Too Dark"],
  },
};

export const SingleHint: Story = {
  args: {
    hints: ["Focus Required"],
  },
};

export const Spanish: Story = {
  args: {
    hints: ["Muy Borroso", "Muy Pequeño", "Muy Oscuro"],
  },
};
