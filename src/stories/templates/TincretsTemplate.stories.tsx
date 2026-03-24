import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Search, Send, Notifications } from "@mui/icons-material";
import TincretsTemplate from "../../components/templates/TincretsTemplate";
import GlobalHeader from "../../components/organisms/GlobalHeader";
import TincretCard from "../../components/organisms/TincretCard";
import TincretsEmptyState from "../../components/organisms/TincretsEmptyState";
import FilterChipBar from "../../components/molecules/FilterChipBar";
import BottomNavigation from "../../components/organisms/BottomNavigation";
import { withFullscreen } from "../decorators";
import type { TincretProfile } from "../../components/templates/TincretsTemplate";

const sampleProfiles: TincretProfile[] = [
  {
    id: "1",
    name: "Mariana",
    priceLabel: "Pago",
    hashtag: "#tetas",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=42",
  },
  {
    id: "2",
    name: "Valentina",
    priceLabel: "Gratis",
    hashtag: "#fitness",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=7",
  },
  {
    id: "3",
    name: "Sofia",
    priceLabel: "Pago",
    hashtag: "#latina",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=99",
  },
  {
    id: "4",
    name: "Isabella",
    priceLabel: "Pago",
    hashtag: "#rubia",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=15",
  },
  {
    id: "5",
    name: "Camila",
    priceLabel: "Gratis",
    hashtag: "#morena",
    imageUrl: "https://100k-faces.vercel.app/api/random-image?seed=33",
  },
];

const filterChips = [
  { id: "1", label: "Costa Rica" },
  { id: "2", label: "Tetas" },
  { id: "3", label: "Rubia" },
];

const navActions = [
  { value: 0, label: "Home", icon: <Home /> },
  { value: 1, label: "Search", icon: <Search /> },
  { value: 2, label: "Send", icon: <Send /> },
  { value: 3, label: "Notifications", icon: <Notifications /> },
];

const meta: Meta<typeof TincretsTemplate> = {
  title: "Templates/TincretsTemplate",
  component: TincretsTemplate,
  tags: ["test"],
  decorators: [withFullscreen],
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: <GlobalHeader balance="$0" />,
    filterBar: (
      <FilterChipBar
        chips={filterChips}
        onSearch={() => {}}
        onDelete={() => {}}
      />
    ),
    profiles: sampleProfiles,
    renderCard: (profile, { onSwipeLeft, onSwipeRight, onUndo, onProfile }) => (
      <TincretCard
        name={profile.name}
        priceLabel={profile.priceLabel}
        hashtag={profile.hashtag}
        imageUrl={profile.imageUrl}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onUndo={onUndo}
        onProfile={onProfile}
      />
    ),
    emptyState: <TincretsEmptyState />,
    bottomNavigation: <BottomNavigation value={0} actions={navActions} />,
  },
};

export const EmptyStack: Story = {
  args: {
    header: <GlobalHeader balance="$0" />,
    filterBar: (
      <FilterChipBar
        chips={filterChips}
        onSearch={() => {}}
        onDelete={() => {}}
      />
    ),
    profiles: [],
    emptyState: <TincretsEmptyState />,
    bottomNavigation: <BottomNavigation value={0} actions={navActions} />,
  },
};

export const NoFilters: Story = {
  args: {
    header: <GlobalHeader balance="$300" />,
    profiles: sampleProfiles,
    renderCard: (profile, { onSwipeLeft, onSwipeRight, onUndo, onProfile }) => (
      <TincretCard
        name={profile.name}
        priceLabel={profile.priceLabel}
        hashtag={profile.hashtag}
        imageUrl={profile.imageUrl}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onUndo={onUndo}
        onProfile={onProfile}
      />
    ),
    emptyState: <TincretsEmptyState />,
    bottomNavigation: <BottomNavigation value={0} actions={navActions} />,
  },
};
