import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';

/**
 * ListItem molecule - MUI ListItem with optional avatar and secondary text.
 * Composes Avatar atom when avatar prop provided.
 */
export const ListItem = ({
  primary,
  secondary,
  avatar,
  onClick,
  children,
  ...props
}) => (
  <MuiListItem onClick={onClick} {...props}>
    {avatar && <MuiListItemAvatar>{avatar}</MuiListItemAvatar>}
    {primary != null || secondary != null ? (
      <MuiListItemText primary={primary} secondary={secondary} />
    ) : (
      children
    )}
  </MuiListItem>
);

export default ListItem;
