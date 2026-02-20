import { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Fade } from '@mui/material';
import { Add, Home, HomeOutlined, KeyboardArrowDown, Login, LoginOutlined, Notifications, NotificationsOutlined, Search, SearchOutlined, Menu as MenuIcon } from '@mui/icons-material';
import BottomNavigation from '../components/organisms/BottomNavigation';
import BottomSliderPanel from '../components/organisms/BottomSliderPanel';
import CreateStoryTemplate from '../components/templates/CreateStoryTemplate';
import LoginTemplate from '../components/templates/LoginTemplate';
import OnboardingStepTemplate from '../components/templates/OnboardingStepTemplate';
import SearchTemplate from '../components/templates/SearchTemplate';
import FeedTemplate from '../components/templates/FeedTemplate';
import FeedCard from '../components/organisms/FeedCard';
import TextField from '../components/molecules/TextField';
import GlobalHeader from '../components/organisms/GlobalHeader';
import AppBar from '../components/organisms/AppBar';
import Card from '../components/organisms/Card';
import Avatar from '../components/atoms/Avatar';
import Text from '../components/atoms/Text';

type TabValue = 'home' | 'search' | 'add' | 'login' | 'onboarding' | 'createStory';

const meta = {
  title: 'App/Flow',
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTemplateSwitching: Story = {
  render: function Render() {
    const [activeTab, setActiveTab] = useState<TabValue>('home');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(1);
    const [feedItems, setFeedItems] = useState(() =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `feed-${i}`,
        username: i === 0 ? 'Mariana' : `user_${i + 1}`,
        handle: i === 0 ? 'mariana12' : `user${i + 1}`,
        userAvatar: `https://i.pravatar.cc/150?u=${i}`,
        imageUrl: i === 0 
          ? 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e'
          : `https://picsum.photos/seed/${i + 20}/600/800`,
        caption: i === 0 ? 'Why just one if you can have double?' : `Esta es la publicación número ${i + 1}`,
        likesCount: i === 0 ? '1K' : `${Math.floor(Math.random() * 1000)}`,
        hashtags: i === 0 ? ['petite', 'boobs', 'colombian'] : ['seacrets', 'lifestyle'],
        timeAgo: '1h',
      }))
    );
    const [searchResults, setSearchResults] = useState(() =>
      Array.from({ length: 6 }, (_, i) => ({
        id: `res-${i}`,
        name: ['Daniela', 'Georgia', 'Sofia', 'Martina', 'Lucia', 'Elena'][i % 6],
        priceLabel: 'Gratis',
        hashtag: '#seacrets',
        imageUrl: `https://100k-faces.vercel.app/api/random-image?seed=${i + 100}`,
      }))
    );
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadMore = () => {
      if (isLoadingMore) return;
      setIsLoadingMore(true);
      
      setTimeout(() => {
        if (activeTab === 'home') {
          setFeedItems((prev) => [
            ...prev,
            ...Array.from({ length: 6 }, (_, i) => ({
              id: `feed-${prev.length + i}`,
              username: `user_${prev.length + i + 1}`,
              handle: `user${prev.length + i + 1}`,
              userAvatar: `https://i.pravatar.cc/150?u=${prev.length + i}`,
              imageUrl: `https://picsum.photos/seed/${prev.length + i + 40}/600/800`,
              caption: `Nueva publicación ${prev.length + i + 1}`,
              likesCount: `${Math.floor(Math.random() * 500)}`,
              hashtags: ['new', 'feed'],
              timeAgo: 'ahora',
            })),
          ]);
        } else if (activeTab === 'search') {
          setSearchResults((prev) => [
            ...prev,
            ...Array.from({ length: 6 }, (_, i) => ({
              id: `res-${prev.length + i}`,
              name: ['Valeria', 'Camila', 'Isabella', 'Sara', 'Victoria', 'Mia'][i % 6],
              priceLabel: 'Gratis',
              hashtag: '#new',
              imageUrl: `https://100k-faces.vercel.app/api/random-image?seed=${prev.length + i + 200}`,
            })),
          ]);
        }
        setIsLoadingMore(false);
      }, 800);
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
      if (bottom && (activeTab === 'search' || activeTab === 'home')) {
        loadMore();
      }
    };

    const handleNavChange = (v: TabValue) => {
      if (v === 'add') {
        setDrawerOpen((prev) => !prev);
      } else {
        setDrawerOpen(false);
        setActiveTab(v);
        if (v !== 'onboarding') setOnboardingStep(1);
      }
    };

    const navValue = drawerOpen ? 'add' : activeTab === 'createStory' ? 'home' : activeTab;

    const actions = [
      {
        label: 'Home',
        value: 'home' as TabValue,
        icon: <HomeOutlined />,
        activeIcon: <Home />,
      },
      {
        label: 'Search',
        value: 'search' as TabValue,
        icon: <SearchOutlined />,
        activeIcon: <Search />,
      },
      {
        label: drawerOpen ? 'Close' : 'Add',
        value: 'add' as TabValue,
        icon: drawerOpen ? <KeyboardArrowDown sx={{ fontSize: 32 }} /> : <Add sx={{ fontSize: 26 }} />,
      },
      {
        label: 'Login',
        value: 'login' as TabValue,
        icon: <LoginOutlined />,
        activeIcon: <Login />,
      },
      {
        label: 'Onboarding',
        value: 'onboarding' as TabValue,
        icon: <NotificationsOutlined />,
        activeIcon: <Notifications />,
      },
    ];

    const renderContent = () => {
      switch (activeTab) {
        case 'createStory':
          return (
            <CreateStoryTemplate
              onBack={() => setActiveTab('home')}
              onSubmit={(data) => console.log('Story submitted', data)}
            />
          );
        case 'home':
          return (
            <FeedTemplate
              header={
                <GlobalHeader
                  balance="12.50"
                  onProfileClick={() => console.log('Profile')}
                  onBalanceClick={() => console.log('Balance')}
                />
              }
            >
              {feedItems.map((item) => (
                <FeedCard key={item.id} {...item} />
              ))}
            </FeedTemplate>
          );
        case 'search':
          return <SearchTemplate results={searchResults} />;
        case 'login':
          return <LoginTemplate />;
        case 'onboarding': {
          const steps = [
            {
              title: 'Selecciona tu Nombre de Usuario',
              subtitle: 'Este será tu nombre público en la plataforma.',
              children: <TextField label="Nombre de Usuario" placeholder="@usuario" />,
            },
            {
              title: 'Tu Fecha de Nacimiento',
              subtitle: 'Necesitamos verificar que eres mayor de edad.',
              children: <TextField label="Fecha de Nacimiento" placeholder="DD/MM/AAAA" />,
            },
            {
              title: 'Carga tu Foto de Perfil',
              subtitle: '¡Haz que tu perfil destaque!',
              children: (
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 3,
                  }}
                >
                  <Text variant="body2" color="text.secondary">
                    Área de carga de imagen
                  </Text>
                </Box>
              ),
            },
          ];

          const stepData = steps[onboardingStep - 1];

          return (
            <OnboardingStepTemplate
              title={stepData.title}
              subtitle={stepData.subtitle}
              step={onboardingStep}
              totalSteps={steps.length}
              nextLabel={onboardingStep === steps.length ? 'Finalizar' : 'Siguiente'}
              onNext={() =>
                onboardingStep < steps.length ? setOnboardingStep((s) => s + 1) : setActiveTab('home')
              }
              onBack={() =>
                onboardingStep > 1 ? setOnboardingStep((s) => s - 1) : setActiveTab('home')
              }
            >
              {stepData.children}
            </OnboardingStepTemplate>
          );
        }
        default:
          return (
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
              <Text variant="body1" color="text.secondary">{String(activeTab)}</Text>
            </Box>
          );
      }
    };

    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          overflow: 'hidden', // Prevent body scroll
        }}
      >
        <Box
          id="app-flow-content"
          onScroll={handleScroll}
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto', // Scroll only here
            overflowX: 'hidden',
            pb: activeTab !== 'createStory' ? '120px' : 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Fade in={true} key={activeTab} timeout={300}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {renderContent()}
            </Box>
          </Fade>
        </Box>
        {activeTab !== 'createStory' && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              p: 1,
              zIndex: 1400,
            }}
          >
            <BottomNavigation
              value={navValue}
              primaryValue="add"
              actions={actions}
              onChange={(v) => handleNavChange(v as TabValue)}
            />
          </Box>
        )}
        <BottomSliderPanel
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onCreateStory={() => {
            setDrawerOpen(false);
            setActiveTab('createStory');
          }}
          onCreateLive={() => setDrawerOpen(false)}
          onUploadMedia={() => setDrawerOpen(false)}
          onUploadTrend={() => setDrawerOpen(false)}
        />
      </Box>
    );
  },
};
