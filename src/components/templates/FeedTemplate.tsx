import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiList from '@mui/material/List';
import type { BoxProps } from '@mui/material/Box';

export interface FeedTemplateProps extends BoxProps {
  header?: React.ReactNode;
  emptyState?: React.ReactNode;
  isEmpty?: boolean;
}

export const FeedTemplate = ({
  header,
  children,
  emptyState,
  isEmpty = false,
  ...props
}: FeedTemplateProps) => (
  <Box
    sx={{
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      height: '100%',
    }}
    {...props}
  >
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2,
      }}
    >
      {header && <Box sx={{ flexShrink: 0, mb: 2 }}>{header}</Box>}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {isEmpty && emptyState ? (
          emptyState
        ) : (
          <MuiList disablePadding sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {children}
          </MuiList>
        )}
      </Box>
    </Container>
  </Box>
);

export default FeedTemplate;
