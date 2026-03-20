import type { Meta, StoryObj } from "@storybook/react";
import { ProfileHeader } from "../../components/organisms/ProfileHeader";

const meta = {
  title: "Organisms/ProfileHeader",
  component: ProfileHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSecondaryStats = [
  { label: "Hoy", value: "$0", valueColor: "#F00" },
  { label: "Esta Semana", value: "$0", valueColor: "#F00" },
  { label: "Este Mes", value: "$0", valueColor: "#146C2E" },
];

export const Default: Story = {
  args: {
    name: "María García",
    username: "maria.garcia",
    isVerified: true,
    likesCount: "1K",
    followersCount: "4K",
    location: "Colombia",
    netEarnings: "300$",
    subscriptions: "1K",
    tips: "189$",
    secondaryStats: mockSecondaryStats,
    onAddClick: () => console.log("Add clicked"),
  },
};

export const WithAvatar: Story = {
  args: {
    avatarUrl: "https://i.pravatar.cc/300?img=47",
    name: "Ana Martínez",
    username: "ana.martinez",
    isVerified: true,
    likesCount: "2.5K",
    followersCount: "12K",
    location: "México",
    netEarnings: "1,500$",
    subscriptions: 245,
    tips: "800$",
    secondaryStats: [
      { label: "Hoy", value: "$45", valueColor: "#146C2E" },
      { label: "Esta Semana", value: "$210", valueColor: "#146C2E" },
      { label: "Este Mes", value: "$890", valueColor: "#146C2E" },
    ],
    onAddClick: () => console.log("Add clicked"),
  },
};

export const NotVerified: Story = {
  args: {
    name: "Carlos López",
    username: "carlos.lopez",
    isVerified: false,
    likesCount: "500",
    followersCount: "1.2K",
    location: "España",
    netEarnings: "50$",
    subscriptions: 12,
    tips: "20$",
    secondaryStats: mockSecondaryStats,
  },
};

export const HighEarnings: Story = {
  args: {
    avatarUrl: "https://i.pravatar.cc/300?img=31",
    name: "Laura Fernández",
    username: "laura.fernandez",
    isVerified: true,
    likesCount: "50K",
    followersCount: "125K",
    location: "Argentina",
    netEarnings: "15,000$",
    subscriptions: 1250,
    tips: "5,500$",
    secondaryStats: [
      { label: "Hoy", value: "$450" },
      { label: "Esta Semana", value: "$2,100" },
      { label: "Este Mes", value: "$8,900" },
    ],
    onAddClick: () => console.log("Add clicked"),
  },
};
