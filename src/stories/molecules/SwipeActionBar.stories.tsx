import type { Meta, StoryObj } from "@storybook/react-vite";
import SwipeActionBar from "../../components/molecules/SwipeActionBar";
import { withWidth, WIDTH } from "../decorators";

const meta = {
  title: "Molecules/SwipeActionBar",
  component: SwipeActionBar,
  tags: ["test"],
  decorators: [withWidth(WIDTH.mobile)],
} satisfies Meta<typeof SwipeActionBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};
