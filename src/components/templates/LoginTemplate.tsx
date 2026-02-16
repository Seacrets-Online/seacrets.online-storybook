import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthForm from '../organisms/AuthForm';
import type { BoxProps } from '@mui/material/Box';
import type { AuthFormCredentials } from '../organisms/AuthForm';

export interface LoginTemplateProps extends BoxProps {
  title?: string;
  subtitle?: string;
  onLogin?: (credentials: AuthFormCredentials) => void;
  onForgotPassword?: () => void;
}

export const LoginTemplate = ({
  title = 'Sign in',
  subtitle,
  onLogin,
  onForgotPassword,
  ...props
}: LoginTemplateProps) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      bgcolor: 'background.default',
    }}
    {...props}
  >
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            {subtitle}
          </Typography>
        )}
        <AuthForm
          onSubmit={onLogin}
          onForgotPassword={onForgotPassword}
          sx={{ width: '100%' }}
        />
      </Box>
    </Container>
  </Box>
);

export default LoginTemplate;
