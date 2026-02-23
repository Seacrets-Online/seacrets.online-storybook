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
      maxWidth="sm"
      disableGutters
      sx={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: (t) => t.layout.space16,
        py: (t) => t.layout.space16,
      }}
    >
      {header && <Box sx={(t) => ({ flexShrink: 0, mb: t.layout.space24 })}>{header}</Box>}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {isEmpty && emptyState ? (
          emptyState
        ) : (
          <MuiList disablePadding sx={(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space16 })}>
            {children}
          </MuiList>
        )}
      </Box>
    </Container>
  </Box>
);

export default FeedTemplate;
