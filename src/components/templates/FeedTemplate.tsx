import Box from '@mui/material/Box';
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
  <Box sx={{ maxWidth: 600, mx: 'auto', py: 2 }} {...props}>
    {header && <Box sx={{ px: 2, mb: 2 }}>{header}</Box>}
    {isEmpty && emptyState ? (
      emptyState
    ) : (
      <MuiList disablePadding>{children}</MuiList>
    )}
  </Box>
);

export default FeedTemplate;
