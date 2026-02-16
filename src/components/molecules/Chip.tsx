import MuiChip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

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
}: ChipProps) => (
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
