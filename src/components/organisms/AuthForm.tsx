import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '../atoms/Button';
import TextField from '../molecules/TextField';
import type { BoxProps } from '@mui/material/Box';

export interface AuthFormCredentials {
  email: string;
  password: string;
}

export interface AuthFormProps extends Omit<BoxProps, 'onSubmit'> {
  onSubmit?: (credentials: AuthFormCredentials) => void;
  onForgotPassword?: () => void;
  submitLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  forgotPasswordLabel?: string;
}

export const AuthForm = ({
  onSubmit,
  onForgotPassword,
  submitLabel = 'Sign in',
  emailLabel = 'Email',
  passwordLabel = 'Password',
  forgotPasswordLabel = 'Forgot password?',
  ...props
}: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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
            sx={{ maxWidth: '100%' }}
          >
            {forgotPasswordLabel}
          </Button>
        </Box>
      )}
      <Button type="submit" variant="contained" fullWidth size="large">
        {submitLabel}
      </Button>
    </Box>
  );
};

export default AuthForm;
