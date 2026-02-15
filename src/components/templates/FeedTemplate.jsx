import Box from '@mui/material/Box';
import MuiList from '@mui/material/List';

/**
 * FeedTemplate - Layout for feed/list screens.
 * Composes organisms. No API logic.
 */
export const FeedTemplate = ({
  header,
  children,
  emptyState,
  isEmpty = false,
  ...props
}) => (
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
