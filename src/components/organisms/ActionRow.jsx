import Box from '@mui/material/Box';
import Button from '../atoms/Button.jsx';

/**
 * ActionRow organism - Row of actions.
 * Composes Button atom.
 */
export const ActionRow = ({
  primaryAction,
  secondaryActions = [],
  ...props
}) => (
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
