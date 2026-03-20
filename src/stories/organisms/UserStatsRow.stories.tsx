import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserStatsRow } from "../../components/organisms/UserStatsRow";

const meta = {
  title: "Organisms/UserStatsRow",
  component: UserStatsRow,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserStatsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    likesCount: "1K",
    followersCount: "4K",
    location: "Colombia",
    color: "white",
    size: "medium",
  },
};

export const SmallSize: Story = {
  args: {
    likesCount: "1K",
    followersCount: "4K",
    location: "Colombia",
    color: "white",
    size: "small",
  },
};

export const LargeSize: Story = {
  args: {
    likesCount: "1K",
    followersCount: "4K",
    location: "Colombia",
    color: "white",
    size: "large",
  },
};

export const WithDifferentValues: Story = {
  args: {
    likesCount: "2.5K",
    followersCount: "12K",
    location: "México",
    color: "white",
    size: "medium",
  },
};

export const HighNumbers: Story = {
  args: {
    likesCount: "50K",
    followersCount: "125K",
    location: "Argentina",
    color: "white",
    size: "medium",
  },
};

export const SmallNumbers: Story = {
  args: {
    likesCount: 234,
    followersCount: 567,
    location: "España",
    color: "white",
    size: "medium",
  },
};

export const CustomColor: Story = {
  args: {
    likesCount: "1K",
    followersCount: "4K",
    location: "Colombia",
    color: "#E1276B",
    size: "medium",
  },
};
