import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileTemplate from '../../components/templates/ProfileTemplate';
import Card from '../../components/organisms/Card';
import Avatar from '../../components/atoms/Avatar';

const meta: Meta<typeof ProfileTemplate> = {
  title: 'Templates/ProfileTemplate',
  component: ProfileTemplate,
  tags: ['test'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const profilePosts = Array.from({ length: 3 }, (_, i) => (
  <Card
    key={`post-${i}`}
    title={`Publicación ${i + 1}`}
    subtitle="Hace 2 días"
    avatar={<Avatar src="https://100k-faces.vercel.app/api/random-image?seed=1" />}
    content="Contenido exclusivo de mi perfil."
  />
));

export const Default: Story = {
  args: {
    name: 'Sofia Martinez',
    username: 'sofia.mtz',
    bio: 'Creadora de contenido digital. Amante de la fotografía y los viajes. 📸✈️',
    avatarSrc: 'https://100k-faces.vercel.app/api/random-image?seed=1',
    stats: {
      posts: 42,
      followers: 1200,
      following: 150,
    },
    children: profilePosts,
  },
};

export const OwnProfile: Story = {
  args: {
    ...Default.args,
    isOwnProfile: true,
  },
};
