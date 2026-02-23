import { useState, type ReactNode } from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { Add, Home, Notifications, Search, Send, KeyboardArrowDown } from '@mui/icons-material';
import BottomNavigation from '../organisms/BottomNavigation';
import type { BottomNavigationAction } from '../organisms/BottomNavigation';
import BottomSliderPanel from '../organisms/BottomSliderPanel';
import Text from '../atoms/Text';

type NavigationValue = number | string;

export interface CreateOptionsTemplateProps extends BoxProps {
  value?: NavigationValue;
  defaultValue?: NavigationValue;
  onValueChange?: (value: NavigationValue) => void;
  drawerOpen?: boolean;
  defaultDrawerOpen?: boolean;
  onDrawerOpenChange?: (open: boolean) => void;
  drawerTitle?: string;
  createStoryLabel?: string;
  createLiveLabel?: string;
  uploadMediaLabel?: string;
  uploadTrendLabel?: string;
  onCreateStory?: () => void;
  onCreateLive?: () => void;
  onUploadMedia?: () => void;
  onUploadTrend?: () => void;
  /**
   * Optional main content above the bottom navigation.
   * If omitted, a simple placeholder is rendered.
   */
  children?: ReactNode;
}

const rootSx: SxProps<Theme> = {
  flex: 1,
  height: '100%',
  maxHeight: '100%',
  // Ensures the bottom navigation can pin to the bottom in Storybook
  // (where parent containers may not provide an explicit height).
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
  position: 'relative',
};

const contentSx: SxProps<Theme> = (theme) => ({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: theme.layout.space16,
});

const bottomNavWrapperSx: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexShrink: 0,
  position: 'relative',
  zIndex: 1400, // Higher than MUI Drawer (1300)
};

export const CreateOptionsTemplate = ({
  value: valueProp,
  defaultValue = 'home',
  onValueChange,
  drawerOpen: drawerOpenProp,
  defaultDrawerOpen = false,
  onDrawerOpenChange,
  drawerTitle,
  createStoryLabel,
  createLiveLabel,
  uploadMediaLabel,
  uploadTrendLabel,
  onCreateStory,
  onCreateLive,
  onUploadMedia,
  onUploadTrend,
  children,
  sx,
  ...props
}: CreateOptionsTemplateProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<NavigationValue>(defaultValue);
  const [uncontrolledDrawerOpen, setUncontrolledDrawerOpen] = useState<boolean>(defaultDrawerOpen);

  const value = valueProp ?? uncontrolledValue;
  const drawerOpen = drawerOpenProp ?? uncontrolledDrawerOpen;

  const setValue = (next: NavigationValue) => {
    if (valueProp === undefined) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  };

  const setDrawerOpen = (next: boolean) => {
    if (drawerOpenProp === undefined) {
      setUncontrolledDrawerOpen(next);
    }
    onDrawerOpenChange?.(next);
  };

  const closeDrawer = () => setDrawerOpen(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleNavigate = (next: NavigationValue) => {
    setValue(next);
    closeDrawer();
  };

  const primaryValue: NavigationValue = 'add';

  const actions: BottomNavigationAction[] = [
    { label: 'Home', value: 'home', icon: <Home />, onClick: () => handleNavigate('home') },
    { label: 'Search', value: 'search', icon: <Search />, onClick: () => handleNavigate('search') },
    {
      label: drawerOpen ? 'Close' : 'Add',
      value: primaryValue,
      icon: drawerOpen ? <KeyboardArrowDown sx={{ fontSize: 32 }} /> : <Add sx={{ fontSize: 26 }} />,
      onClick: toggleDrawer,
    },
    { label: 'Send', value: 'send', icon: <Send />, onClick: () => handleNavigate('send') },
    {
      label: 'Notifications',
      value: 'notifications',
      icon: <Notifications />,
      onClick: () => handleNavigate('notifications'),
    },
  ];

  const bottomNavigation = (
    <Box sx={bottomNavWrapperSx}>
      <BottomNavigation value={value} actions={actions} primaryValue={primaryValue} />
    </Box>
  );

  return (
    <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
      <Box sx={contentSx}>
        {children ?? (
          <Text variant="body1" color="text.secondary" align="center">
            Content
          </Text>
        )}
      </Box>

      {bottomNavigation}

      <BottomSliderPanel
        open={drawerOpen}
        onClose={closeDrawer}
        title={drawerTitle}
        createStoryLabel={createStoryLabel}
        createLiveLabel={createLiveLabel}
        uploadMediaLabel={uploadMediaLabel}
        uploadTrendLabel={uploadTrendLabel}
        onCreateStory={() => {
          closeDrawer();
          onCreateStory?.();
        }}
        onCreateLive={() => {
          onCreateLive?.();
          closeDrawer();
        }}
        onUploadMedia={() => {
          onUploadMedia?.();
          closeDrawer();
        }}
        onUploadTrend={() => {
          onUploadTrend?.();
          closeDrawer();
        }}
      />
    </Box>
  );
};

export default CreateOptionsTemplate;
