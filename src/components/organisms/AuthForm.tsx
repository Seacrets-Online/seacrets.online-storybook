import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import type { BoxProps } from '@mui/material';
import Button from '../atoms/Button';
import TextField from '../molecules/TextField';
import LabeledCheckbox from '../molecules/LabeledCheckbox';

export interface AuthFormCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthFormProps extends Omit<BoxProps, 'onSubmit'> {
  mode?: 'login' | 'forgotPassword';
  onSubmit?: (credentials: AuthFormCredentials) => void;
  onForgotPassword?: () => void;
  onRequestReset?: (email: string) => void;
  submitLabel?: string;
  sendResetLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  forgotPasswordLabel?: string;
  rememberMeLabel?: string;
  showRememberMe?: boolean;
  inputVariant?: 'default' | 'auth-filled';
  isLoading?: boolean;
  errors?: Record<string, string>;
}

export const AuthForm = ({
  mode = 'login',
  onSubmit,
  onForgotPassword,
  onRequestReset,
  submitLabel = 'Sign in',
  sendResetLabel = 'Send reset link',
  emailLabel = 'EMAIL',
  passwordLabel = 'PASSWORD',
  forgotPasswordLabel = 'FORGOT PASSWORD?',
  rememberMeLabel = 'REMEMBER ME',
  showRememberMe = false,
  isLoading = false,
  errors = {},
  ...props
}: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const isForgotPassword = mode === 'forgotPassword';
  const theme = useTheme();
  const formFieldToButtonGap = theme.layout?.formFieldToButton ?? 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgotPassword) {
      onRequestReset?.(email);
    } else {
      onSubmit?.({ email, password, rememberMe: showRememberMe ? rememberMe : undefined });
    }
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
        autoComplete={isForgotPassword ? 'email' : 'email'}
        error={!!errors?.email}
        helperText={errors?.email}
        disabled={isLoading}
      />
      {!isForgotPassword && (
        <>
          <TextField
            label={passwordLabel}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoComplete="current-password"
            error={!!errors?.password}
            helperText={errors?.password}
            disabled={isLoading}
          />
          {(onForgotPassword || showRememberMe) && (
            <Box sx={(t) => ({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: t.layout.space8, mb: t.layout.space32, width: '100%', fontSize: '0.875rem' })}>
              {onForgotPassword ? (
                <Button
                  variant="text"
                  type="button"
                  onClick={() => onForgotPassword()}
                  sx={{ whiteSpace: 'nowrap', fontSize: 'inherit' }}
                  disabled={isLoading}
                >
                  {forgotPasswordLabel}
                </Button>
              ) : (
                <span />
              )}
              {showRememberMe && (
                <LabeledCheckbox
                  label={rememberMeLabel}
                  checked={rememberMe}
                  onChange={(_, checked) => setRememberMe(checked)}
                  sx={{ whiteSpace: 'nowrap', '& .MuiFormControlLabel-label': { fontSize: 'inherit' } }}
                  disabled={isLoading}
                />
              )}
            </Box>
          )}
        </>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="extraLarge"
        shape="pill"
        sx={isForgotPassword ? { mt: formFieldToButtonGap } : undefined}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : (isForgotPassword ? sendResetLabel : submitLabel)}
      </Button>
    </Box>
  );
};

export default AuthForm;