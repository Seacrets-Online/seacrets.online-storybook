import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import { Add, Home, KeyboardArrowDown, Login, Notifications, Search } from '@mui/icons-material';
import BottomNavigation from '../components/organisms/BottomNavigation';
import BottomSliderPanel from '../components/organisms/BottomSliderPanel';
import CreateStoryTemplate from '../components/templates/CreateStoryTemplate';
import LoginTemplate from '../components/templates/LoginTemplate';
import OnboardingStepTemplate from '../components/templates/OnboardingStepTemplate';
import SearchTemplate from '../components/templates/SearchTemplate';
import Text from '../components/atoms/Text';

type TabValue = 'home' | 'search' | 'add' | 'login' | 'onboarding' | 'createStory';

const meta = {
  title: 'App/Flow',
  parameters: { layout: 'fullscreen', docs: { page: null } },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithTemplateSwitching: Story = {
  render: function Render() {
    const [activeTab, setActiveTab] = useState<TabValue>('home');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(1);

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
      { label: 'Home', value: 'home' as TabValue, icon: <Home /> },
      { label: 'Search', value: 'search' as TabValue, icon: <Search /> },
      {
        label: drawerOpen ? 'Close' : 'Add',
        value: 'add' as TabValue,
        icon: drawerOpen ? <KeyboardArrowDown sx={{ fontSize: 32 }} /> : <Add sx={{ fontSize: 26 }} />,
      },
      { label: 'Login', value: 'login' as TabValue, icon: <Login /> },
      { label: 'Onboarding', value: 'onboarding' as TabValue, icon: <Notifications /> },
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
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
              <Text variant="body1" color="text.secondary" align="center">
                Home content. Tap + to open drawer.
              </Text>
            </Box>
          );
        case 'search':
          return <SearchTemplate />;
        case 'login':
          return <LoginTemplate />;
        case 'onboarding': {
          const stepTitles = ['Welcome', 'Almost there', "You're all set"];
          return (
            <OnboardingStepTemplate
              title={stepTitles[onboardingStep - 1]}
              subtitle={`Step ${onboardingStep} of 3`}
              step={onboardingStep}
              totalSteps={3}
              nextLabel={onboardingStep === 3 ? 'Finish' : 'Next'}
              onNext={() =>
                onboardingStep < 3 ? setOnboardingStep((s) => s + 1) : setActiveTab('home')
              }
              onBack={() =>
                onboardingStep > 1 ? setOnboardingStep((s) => s - 1) : setActiveTab('home')
              }
            />
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
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'auto',
            pb: activeTab !== 'createStory' ? '120px' : 0,
          }}
        >
          {renderContent()}
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
