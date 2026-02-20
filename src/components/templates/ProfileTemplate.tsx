import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { BoxProps } from '@mui/material/Box';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

export interface ProfileTemplateProps extends BoxProps {
  name?: string;
  username?: string;
  bio?: string;
  avatarSrc?: string;
  isOwnProfile?: boolean;
  stats?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
}

export const ProfileTemplate = ({
  name,
  username,
  bio,
  avatarSrc,
  isOwnProfile = false,
  stats,
  children,
  ...props
}: ProfileTemplateProps) => (
  <Box
    sx={{
      flex: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      height: '100%',
    }}
    {...props}
  >
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={avatarSrc}
            sx={{
              width: 80,
              height: 80,
              border: '2px solid',
              borderColor: 'primary.main',
            }}
          >
            {name?.[0]}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {name && (
              <Text variant="h6" sx={{ fontWeight: 600, noWrap: true }}>
                {name}
              </Text>
            )}
            {username && (
              <Text variant="body2" color="text.secondary" sx={{ noWrap: true }}>
                @{username}
              </Text>
            )}
          </Box>
          <Button variant="contained" size="small" shape="pill">
            {isOwnProfile ? 'Editar' : 'Seguir'}
          </Button>
        </Box>

        {bio && (
          <Text variant="body2" sx={{ color: 'text.primary' }}>
            {bio}
          </Text>
        )}

        {stats && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              py: 1.5,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="subtitle2" sx={{ fontWeight: 700 }}>
                {stats.posts ?? 0}
              </Text>
              <Text variant="caption" color="text.secondary">
                Posts
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="subtitle2" sx={{ fontWeight: 700 }}>
                {stats.followers ?? 0}
              </Text>
              <Text variant="caption" color="text.secondary">
                Seguidores
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="subtitle2" sx={{ fontWeight: 700 }}>
                {stats.following ?? 0}
              </Text>
              <Text variant="caption" color="text.secondary">
                Siguiendo
              </Text>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Container>
  </Box>
);

export default ProfileTemplate;
