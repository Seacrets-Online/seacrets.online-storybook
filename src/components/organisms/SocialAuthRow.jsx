import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../atoms/Button.jsx';
import Divider from '../atoms/Divider.jsx';

/**
 * SocialAuthRow organism - Social login buttons.
 * Composes Button, Divider atoms.
 */
export const SocialAuthRow = ({
  providers = [],
  dividerLabel = 'or',
  ...props
}) => (
  <Box {...props}>
    {providers.map((p, i) => (
      <Button
        key={p.id ?? i}
        variant="outlined"
        fullWidth
        startIcon={p.icon}
        onClick={p.onClick}
        sx={{ mb: 1, whiteSpace: 'nowrap' }}
      >
        {p.label}
      </Button>
    ))}
    {dividerLabel && providers.length > 0 && (
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography component="span" variant="body2" sx={{ px: 2 }}>
          {dividerLabel}
        </Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>
    )}
  </Box>
);

export default SocialAuthRow;
