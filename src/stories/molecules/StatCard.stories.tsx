import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "@mui/material";
import { StatCard } from "../../components/molecules/StatCard";

const meta = {
  title: "Molecules/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NetEarnings: Story = {
  args: {
    label: "Ganancias Netas",
    value: "300$",
    valueColor: "#146C2E",
    size: "large",
  },
};

export const Subscriptions: Story = {
  args: {
    label: "Suscripciones",
    value: 78,
    size: "large",
  },
};

export const Tips: Story = {
  args: {
    label: "Propinas",
    value: "189$",
    size: "large",
  },
};

export const AllThreeMainStats: Story = {
  render: () => (
    <Stack direction="row" spacing={4} justifyContent="space-around">
      <StatCard
        label="Ganancias Netas"
        value="300$"
        valueColor="#146C2E"
        size="large"
      />
      <StatCard label="Suscripciones" value="1K" size="large" />
      <StatCard label="Propinas" value="189$" size="large" />
    </Stack>
  ),
  args: {
    label: "Ganancias Netas",
    value: "300$",
    valueColor: "#146C2E",
    size: "large",
  },
};

export const MediumSize: Story = {
  args: {
    label: "Total Views",
    value: "5.2K",
    valueColor: "var(--md-sys-color-primary)",
    size: "medium",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Posts",
    value: 42,
    size: "small",
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <StatCard label="Small" value="10" size="small" />
      <StatCard label="Medium" value="20" size="medium" />
      <StatCard label="Large" value="300$" valueColor="#146C2E" size="large" />
    </Stack>
  ),
  args: {
    label: "Large",
    value: "300$",
    valueColor: "#146C2E",
    size: "large",
  },
};
