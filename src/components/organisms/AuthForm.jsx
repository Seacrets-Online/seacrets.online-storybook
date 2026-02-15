import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '../atoms/Button.jsx';
import TextField from '../molecules/TextField.jsx';

/**
 * AuthForm organism - Login form.
 * Composes atoms + molecules. No business logic/API calls.
 */
export const AuthForm = ({
  onSubmit,
  onForgotPassword,
  submitLabel = 'Sign in',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  forgotPasswordLabel = 'Forgot password?',
  ...props
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} {...props}>
      <TextField
        label={emailLabel}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
        autoComplete="email"
      />
      <TextField
        label={passwordLabel}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
        showPasswordToggle
        autoComplete="current-password"
      />
      {onForgotPassword && (
        <Box sx={{ mt: 1, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="text"
            type="button"
            onClick={() => onForgotPassword()}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {forgotPasswordLabel}
          </Button>
        </Box>
      )}
      <Button type="submit" variant="contained" fullWidth size="large" sx={{ whiteSpace: 'nowrap' }}>
        {submitLabel}
      </Button>
    </Box>
  );
};

export default AuthForm;
