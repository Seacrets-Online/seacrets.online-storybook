import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ProfileEarningsTemplate } from "../../components/templates/ProfileEarningsTemplate";
import { ProfileHeader } from "../../components/organisms/ProfileHeader";
import { EarningsSection } from "../../components/organisms/EarningsSection";
import { withFullscreen } from "../decorators";

const meta = {
  title: "Templates/ProfileEarningsTemplate",
  component: ProfileEarningsTemplate,
  decorators: [withFullscreen],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  tags: ["autodocs", "test"],
} satisfies Meta<typeof ProfileEarningsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSecondaryStats = [
  { label: "Hoy", value: "$0", valueColor: "#F00" },
  { label: "Esta Semana", value: "$0", valueColor: "#F00" },
  { label: "Este Mes", value: "$0", valueColor: "#F00" },
];

const weeklyData = [
  { label: "L", value: 50 },
  { label: "K", value: 120 },
  { label: "M", value: 180 },
  { label: "J", value: 40 },
  { label: "V", value: 160 },
  { label: "S", value: 90 },
  { label: "D", value: 200 },
];

const monthlyData = [
  { label: "Ene", value: 300 },
  { label: "Feb", value: 450 },
  { label: "Mar", value: 280 },
  { label: "Abr", value: 520 },
  { label: "May", value: 600 },
  { label: "Jun", value: 350 },
];

export const Default: Story = {
  render: () => {
    const [period, setPeriod] = useState("month");

    return (
      <ProfileEarningsTemplate
        balance="$300"
        headerNavItems={[
          { value: "tincrets", label: "Tincrets" },
          { value: "suscripciones", label: "Mis Suscripciones" },
          { value: "trends", label: "Trends" },
          { value: "marcadores", label: "Marcadores" },
        ]}
        onProfileClick={() => console.log("Profile clicked")}
        onBalanceClick={() => console.log("Balance clicked")}
        onNavClick={(value) => console.log("Nav clicked:", value)}
        profileHeader={
          <ProfileHeader
            avatarUrl="https://i.pravatar.cc/300?img=47"
            name="Mariana"
            username="mariana12"
            isVerified={true}
            likesCount="1K"
            followersCount="4K"
            location="Colombia"
            netEarnings="300$"
            subscriptions="1K"
            tips="189$"
            secondaryStats={mockSecondaryStats}
            onAddClick={() => console.log("Add clicked")}
          />
        }
        earningsSection={
          <EarningsSection
            data={weeklyData}
            period={period}
            onPeriodChange={setPeriod}
            maxValue={200}
            showScale={true}
            currencySymbol="$"
          />
        }
      />
    );
  },
};

export const WithAvatar: Story = {
  render: () => {
    const [period, setPeriod] = useState("month");

    return (
      <ProfileEarningsTemplate
        balance="$1,500"
        profileHeader={
          <ProfileHeader
            avatarUrl="https://i.pravatar.cc/300?img=47"
            name="Ana Martínez"
            username="ana.martinez"
            isVerified={true}
            likesCount="2.5K"
            followersCount="12K"
            location="México"
            netEarnings="1,500$"
            subscriptions={245}
            tips="800$"
            secondaryStats={[
              { label: "Hoy", value: "$45", valueColor: "#146C2E" },
              { label: "Esta Semana", value: "$210", valueColor: "#146C2E" },
              { label: "Este Mes", value: "$890", valueColor: "#146C2E" },
            ]}
            onAddClick={() => console.log("Add clicked")}
          />
        }
        earningsSection={
          <EarningsSection
            data={monthlyData}
            period={period}
            onPeriodChange={setPeriod}
            maxValue={700}
            showScale={true}
            currencySymbol="$"
          />
        }
      />
    );
  },
};

export const HighEarner: Story = {
  render: () => {
    const [period, setPeriod] = useState("year");

    return (
      <ProfileEarningsTemplate
        balance="$15,000"
        profileHeader={
          <ProfileHeader
            avatarUrl="https://i.pravatar.cc/300?img=31"
            name="Laura Fernández"
            username="laura.fernandez"
            isVerified={true}
            likesCount="50K"
            followersCount="125K"
            location="Argentina"
            netEarnings="15,000$"
            subscriptions={1250}
            tips="5,500$"
            secondaryStats={[
              { label: "Hoy", value: "$450", valueColor: "#146C2E" },
              {
                label: "Esta Semana",
                value: "$2,100",
                valueColor: "#146C2E",
              },
              { label: "Este Mes", value: "$8,900", valueColor: "#146C2E" },
            ]}
            onAddClick={() => console.log("Add clicked")}
          />
        }
        earningsSection={
          <EarningsSection
            data={[
              { label: "Ene", value: 1200 },
              { label: "Feb", value: 1450 },
              { label: "Mar", value: 1180 },
              { label: "Abr", value: 1520 },
              { label: "May", value: 1600 },
              { label: "Jun", value: 1350 },
              { label: "Jul", value: 1700 },
              { label: "Ago", value: 1550 },
            ]}
            period={period}
            onPeriodChange={setPeriod}
            maxValue={2000}
            showScale={true}
            currencySymbol="$"
          />
        }
      />
    );
  },
};
