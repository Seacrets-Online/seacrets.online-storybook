import {
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemAvatar as MuiListItemAvatar,
} from '@mui/material';
import type { ListItemProps } from '@mui/material';

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
