import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthForm from '../organisms/AuthForm.jsx';

/**
 * LoginTemplate - Layout for login/auth screens.
 * Composes organisms. No API calls.
 */
export const LoginTemplate = ({
  title = 'Sign in',
  subtitle,
  onLogin,
  onForgotPassword,
  ...props
}) => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 3,
    }}
    {...props}
  >
    <Box sx={{ maxWidth: 400, width: '100%' }}>
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
      />
    </Box>
  </Box>
);

export default LoginTemplate;
