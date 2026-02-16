import Box from '@mui/material/Box';
import Button from '../atoms/Button';
import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '../atoms/Button';

export interface ActionRowProps extends BoxProps {
  primaryAction?: ButtonProps;
  secondaryActions?: ButtonProps[];
}

export const ActionRow = ({
  primaryAction,
  secondaryActions = [],
  ...props
}: ActionRowProps) => (
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    }}
    {...props}
  >
    {secondaryActions.map((action, i) => (
      <Button key={i} variant="outlined" {...action} />
    ))}
    {primaryAction && <Button variant="contained" {...primaryAction} />}
  </Box>
);

export default ActionRow;
