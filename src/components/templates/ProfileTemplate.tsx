import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '../atoms/Avatar';
import type { BoxProps } from '@mui/material/Box';

export interface ProfileTemplateProps extends BoxProps {
  name?: string;
  subtitle?: string;
  avatar?: React.ReactNode;
}

export const ProfileTemplate = ({
  name,
  subtitle,
  avatar,
  children,
  ...props
}: ProfileTemplateProps) => (
  <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }} {...props}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      {avatar ?? <Avatar sx={{ width: 64, height: 64 }}>{name?.[0]}</Avatar>}
      <div>
        {name && <Typography variant="h6">{name}</Typography>}
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </div>
    </Box>
    {children}
  </Box>
);

export default ProfileTemplate;
