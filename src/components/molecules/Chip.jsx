import MuiChip from '@mui/material/Chip';

/**
 * Chip molecule - MUI Chip with MD3 theme.
 */
export const Chip = ({
  label,
  onDelete,
  onClick,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  icon,
  avatar,
  ...props
}) => (
  <MuiChip
    label={label}
    onDelete={onDelete}
    onClick={onClick}
    variant={variant}
    color={color}
    size={size}
    icon={icon}
    avatar={avatar}
    {...props}
  />
);

export default Chip;
