import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Button from '../atoms/Button';
import type { ButtonProps } from '../atoms/Button';

export interface ActionRowProps extends BoxProps {
  primaryAction?: ButtonProps;
  secondaryActions?: ButtonProps[];
}

const baseActionRowSx = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
};

export const ActionRow = ({
  primaryAction,
  secondaryActions = [],
  sx,
  ...props
}: ActionRowProps) => (
  <Box sx={[baseActionRowSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    {secondaryActions.map((action, i) => (
      <Button key={i} variant="outlined" {...action} />
    ))}
    {primaryAction && <Button variant="contained" {...primaryAction} />}
  </Box>
);

export default ActionRow;
