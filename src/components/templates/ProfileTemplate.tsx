import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { BoxProps } from '@mui/material';
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
      maxWidth="sm"
      disableGutters
      sx={(t) => ({
        flex: 1,
        minHeight: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        px: t.layout.space12,
        py: t.layout.space12,
      })}
    >
      <Box sx={(t) => ({ display: 'flex', flexDirection: 'column', gap: t.layout.space16, mb: t.layout.space24 })}>
        <Box sx={(t) => ({ display: 'flex', alignItems: 'center', gap: t.layout.space16 })}>
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
              <Text variant="title-large" sx={{ whiteSpace: 'nowrap' }}>
                {name}
              </Text>
            )}
            {username && (
              <Text variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
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
            sx={(t) => ({
              display: 'flex',
              justifyContent: 'space-around',
              py: t.layout.space12,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'divider',
            })}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="title-medium">
                {stats.posts ?? 0}
              </Text>
              <Text variant="label-small" color="text.secondary">
                Posts
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="title-medium">
                {stats.followers ?? 0}
              </Text>
              <Text variant="label-small" color="text.secondary">
                Seguidores
              </Text>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Text variant="title-medium">
                {stats.following ?? 0}
              </Text>
              <Text variant="label-small" color="text.secondary">
                Siguiendo
              </Text>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={(t) => ({
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: t.layout.space16,
        })}
      >
        {children}
      </Box>
    </Container>
  </Box>
);

export default ProfileTemplate;
