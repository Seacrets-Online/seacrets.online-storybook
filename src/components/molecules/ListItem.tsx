import MuiListItem from '@mui/material/ListItem';
import MuiListItemText from '@mui/material/ListItemText';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import type { ListItemProps } from '@mui/material/ListItem';

export interface ListItemPropsExtended extends ListItemProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
  avatar?: React.ReactNode;
}

export const ListItem = ({
  primary,
  secondary,
  avatar,
  onClick,
  children,
  ...props
}: ListItemPropsExtended) => (
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
