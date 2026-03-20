import type { Meta, StoryObj } from "@storybook/react-vite";
import { Close, Undo, Person, Favorite, Check } from "@mui/icons-material";
import SwipeActionButton from "../../components/atoms/SwipeActionButton";

const meta = {
  title: "Atoms/SwipeActionButton",
  component: SwipeActionButton,
  tags: ["test"],
} satisfies Meta<typeof SwipeActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Reject: Story = {
  args: { variant: "reject", icon: <Close /> },
};

export const Undo_: Story = {
  name: "Undo",
  args: { variant: "undo", icon: <Undo /> },
};

export const Profile: Story = {
  args: { variant: "profile", icon: <Person /> },
};

export const Like: Story = {
  args: { variant: "like", icon: <Favorite /> },
};

export const Approve: Story = {
  args: { variant: "approve", icon: <Check /> },
};

export const Disabled: Story = {
  args: { variant: "reject", icon: <Close />, disabled: true },
};
